import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {locales, defaultLocale, type Locale} from '../../i18n/config';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://jigsawdesigner.com";

// 动态生成SEO元数据（包括canonical和hreflang）
export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>
}): Promise<Metadata> {
  const {locale} = await params;
  
  // 生成所有语言版本的hreflang链接
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${BASE_URL}/${loc}`;
  }
  // 添加x-default指向默认语言
  languages['x-default'] = `${BASE_URL}/${defaultLocale}`;
  
  return {
    title: "JigsawDesigner - Professional Jigsaw Puzzle Design Software",
    description: "Create stunning custom jigsaw puzzles with multi-platform support (macOS, iOS, iPadOS). Features advanced SVG editing, Voronoi algorithms, and export to PDF/SVG/PNG.",
    keywords: ["jigsaw puzzle maker", "puzzle generator", "SVG editor", "vector design", "JigsawDesigner", "puzzle software", "custom puzzles", "Voronoi diagram", "Apple platforms"],
    authors: [{ name: "JigsawDesigner Team" }],
    creator: "JigsawDesigner",
    publisher: "JigsawDesigner",
    
    // 🔧 SEO: Canonical标签 - 每个语言版本指向自己
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: languages,
    },
    
    openGraph: {
      type: "website",
      url: `${BASE_URL}/${locale}`,
      title: "JigsawDesigner - Professional Jigsaw Puzzle Design Software",
      description: "The ultimate tool for creating custom jigsaw puzzles. Native SVG support, powerful C++ engine, and seamless cross-platform experience.",
      siteName: "JigsawDesigner",
      locale: locale,
      images: [
        {
          url: "/og-image.jpg", 
          width: 1200,
          height: 630,
          alt: "JigsawDesigner Interface Preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "JigsawDesigner - Professional Jigsaw Puzzle Design Software",
      description: "Create stunning custom jigsaw puzzles with multi-platform support. Advanced SVG editing and powerful algorithms.",
      creator: "@JigsawDesigner",
    },
    appleWebApp: {
      capable: true,
      title: "JigsawDesigner",
      statusBarStyle: "black-translucent",
    },
    applicationName: "JigsawDesigner",
    metadataBase: new URL(BASE_URL),
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3TZD2EK8YR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-3TZD2EK8YR');
          `}
        </Script>
      </body>
    </html>
  );
}
