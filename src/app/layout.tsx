import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Yararlan | Dijital Küratör İçin AI Dizin",
  description: "İnternetin en iyi yapay zeka araçlarını keşfedin. Searchable AI tool directory for the modern digital curator.",
  keywords: ["ai tools", "yapay zeka", "dizin", "yararlan", "directory", "curation"],
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
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
