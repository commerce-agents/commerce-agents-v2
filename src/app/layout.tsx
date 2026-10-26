import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const serifFont = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "COMMERCE AGENTS | 0→1 Product Engineering & Commerce Architecture",
  description:
    "Elite product design and 0→1 commerce engineering studio founded by Santhosh A. Based in Chennai, crafting high-performance commerce engines, hardware telemetry dashboards, and multi-tenant retail platforms.",
  keywords: [
    "Commerce Agents",
    "Product Design Studio Chennai",
    "0 to 1 Commerce Engineering",
    "Next.js Commerce",
    "IoT Dashboard Design",
    "Santhosh A",
    "Design Engineer Chennai",
  ],
  authors: [{ name: "Santhosh A", url: "https://designbysanthosh.com" }],
  creator: "Commerce Agents Studio",
  openGraph: {
    title: "COMMERCE AGENTS | 0→1 Product Engineering & Commerce Architecture",
    description:
      "Crafting high-velocity commerce engines, hardware telemetry dashboards, and multi-tenant retail platforms.",
    url: "https://commerceagents.co",
    siteName: "Commerce Agents",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${serifFont.variable} ${monoFont.variable} dark`}
    >
      <body className="bg-[#09080A] text-[#F4F3F6] antialiased selection:bg-[#9780FF]/30 selection:text-[#00F0FF]">
        {children}
      </body>
    </html>
  );
}
