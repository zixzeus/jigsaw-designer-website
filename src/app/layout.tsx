import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JigsawDesigner - Professional Jigsaw Puzzle Design Software",
  description: "Create stunning custom jigsaw puzzles with multi-platform support (macOS, iOS, iPadOS). Features advanced SVG editing, Voronoi algorithms, and export to PDF/SVG/PNG.",
  keywords: ["jigsaw puzzle maker", "puzzle generator", "SVG editor", "vector design", "JigsawDesigner", "puzzle software", "custom puzzles", "Voronoi diagram", "Apple platforms"],
  authors: [{ name: "JigsawDesigner Team" }],
  creator: "JigsawDesigner",
  publisher: "JigsawDesigner",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jigsawdesigner.com",
    title: "JigsawDesigner - Professional Jigsaw Puzzle Design Software",
    description: "The ultimate tool for creating custom jigsaw puzzles. Native SVG support, powerful C++ engine, and seamless cross-platform experience.",
    siteName: "JigsawDesigner",
    images: [
      {
        url: "/og-image.jpg", // Assuming we might add this later or it exists
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
    creator: "@JigsawDesigner", // Placeholder handle
  },
  appleWebApp: {
    capable: true,
    title: "JigsawDesigner",
    statusBarStyle: "black-translucent",
  },
  applicationName: "JigsawDesigner",
  metadataBase: new URL("https://jigsawdesigner.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
