import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { LanguageProvider } from "@/components/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yararlan.com'),
  title: {
    default: "Yararlan | Dijital Küratör İçin AI Keşif Motoru",
    template: "%s | Yararlan"
  },
  description: "İnternetin en iyi yapay zeka araçlarını keşfedin, ücretsiz ve ücretli GPT varyasyonlarını karşılaştırın. Searchable AI tool directory for the modern digital curator.",
  keywords: ["ai tools", "yapay zeka", "dizin", "yararlan", "directory", "curation", "ai arama motoru"],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Yararlan | AI Keşif Motoru',
    description: 'En gelişmiş yapay zeka araçlarını ve GPT-4 tabanlı asistanları Yararlan ile saniyeler içinde keşfedin.',
    url: 'https://yararlan.com',
    siteName: 'Yararlan',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yararlan | AI Keşif Motoru',
    description: 'En popüler yapay zeka araçlarını keşfetmeye başlayın.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="light">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
