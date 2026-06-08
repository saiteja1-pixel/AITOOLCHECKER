import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Tools Directory — Discover the Best AI Tools",
  description:
    "Find and explore the best AI tools across image editing, video generation, writing, code, audio, and more. Curated, searchable, and always up to date.",
  keywords: "AI tools, artificial intelligence, image generation, video AI, writing AI, code AI",
  openGraph: {
    title: "AI Tools Directory",
    description: "Discover the best AI tools across every domain.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
