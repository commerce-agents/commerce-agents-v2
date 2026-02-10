import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://commerce-agents.design"),
  title: "Commerce Agent | AI-Driven Ecommerce Intelligence",
  description: "Empowering ecommerce with AI agents that analyze real-time sales and price drops to create high-converting social marketing content.",
  openGraph: {
    title: "Commerce Agent | AI-Driven Ecommerce Intelligence",
    description: "Empowering ecommerce with AI agents that analyze real-time sales and price drops to create high-converting social marketing content.",
    url: "https://commerce-agents.design",
    siteName: "Commerce Agent",
    images: [
      {
        url: "/img/live image.jpeg",
        width: 1200,
        height: 630,
        alt: "Commerce Agent Intelligence",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <LoadingScreen />
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
