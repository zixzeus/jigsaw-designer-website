import type {Metadata} from "next";
import "../globals.css";
import {NextIntlClientProvider} from "next-intl";
import {getMessages, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {isSiteLocale, LOCALE_SPECS} from "@/config/seo";
import {PRODUCT_FACTS} from "@/config/product";
import {locales} from "@/i18n/config";
import {GA_MEASUREMENT_ID} from "@/lib/analytics";

/**
 * Locale-independent defaults only. Route pages must call
 * createPageMetadata so canonical, hreflang and social URLs include the full
 * pathname; putting those fields here would make child pages canonicalize to
 * the locale homepage.
 */
export const metadata: Metadata = {
  metadataBase: new URL(PRODUCT_FACTS.websiteOrigin),
  title: {
    default: PRODUCT_FACTS.name,
    template: `%s | ${PRODUCT_FACTS.name}`,
  },
  description:
    "Create and edit custom jigsaw puzzle cutlines as SVG on iPhone, iPad and Mac.",
  applicationName: PRODUCT_FACTS.name,
  authors: [{name: "JigsawDesigner Team"}],
  creator: PRODUCT_FACTS.name,
  publisher: PRODUCT_FACTS.name,
  appleWebApp: {
    capable: true,
    title: PRODUCT_FACTS.name,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    siteName: PRODUCT_FACTS.name,
    images: [
      {
        url: PRODUCT_FACTS.defaultSocialImage,
        width: 1200,
        height: 630,
        alt: PRODUCT_FACTS.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [PRODUCT_FACTS.defaultSocialImage],
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!isSiteLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const clientMessages = {
    Navigation: messages.Navigation,
    Common: messages.Common,
  };
  const localeSpec = LOCALE_SPECS[locale];

  return (
    <html lang={localeSpec.htmlLang} dir={localeSpec.direction}>
      <head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={clientMessages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
