import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#09080A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.commerce-agents.design"),
  title: {
    default: "COMMERCE AGENTS | 0→1 Product Engineering & Autonomous AI Commerce Studio",
    template: "%s | COMMERCE AGENTS",
  },
  description:
    "Elite product design and 0→1 autonomous commerce engineering studio founded by Santhosh A. We engineer 24/7 autonomous sales agents, headless commerce engines, and hardware telemetry dashboards. Based in Chennai, deploying globally.",
  applicationName: "Commerce Agents Studio",
  keywords: [
    // Primary Brand Keywords
    "Commerce Agents",
    "Commerce Agents Design",
    "Commerce Agents Studio",
    "commerce-agents.design",
    "Santhosh A",
    "Santhosh A Designer",
    "Design by Santhosh",
    
    // AI Agents & Autonomous Commerce Keywords
    "AI Commerce Agents",
    "Autonomous Ecommerce Agents",
    "Autonomous Sales Agents",
    "AI Sales Assistant",
    "WhatsApp Commerce AI Bot",
    "Autonomous Cart Recovery Agent",
    "AI Inventory Routing Agent",
    "Shopify AI Automation",
    "Autonomous Revenue Engine",
    
    // Engineering & Architecture Keywords
    "0 to 1 Commerce Engineering",
    "Headless Commerce Architecture",
    "Next.js 16 Commerce Studio",
    "Next.js E-commerce Developers",
    "Bespoke E-commerce Platform Design",
    "Custom Checkout Engine",
    "Progressive Web App Commerce",
    
    // Hardware & IoT Dashboards
    "Hardware Telemetry Dashboard Design",
    "IoT Telemetry Interface",
    "Drone Telemetry Dashboard UI UX",
    "Industrial Fleet Analytics Platform",
    
    // Regional & Location-Based Keywords (Chennai Local Pack)
    "Product Design Studio Chennai",
    "Design Engineering Studio India",
    "UI UX Design Studio Chennai",
    "Design Engineer Chennai",
    "Top Product Designers in Chennai",
    "Nungambakkam Design Studio",
  ],
  authors: [{ name: "Santhosh A", url: "https://designbysanthosh.com" }],
  creator: "Santhosh A",
  publisher: "Commerce Agents Studio",
  alternates: {
    canonical: "https://www.commerce-agents.design",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "COMMERCE AGENTS | 0→1 Product Engineering & Autonomous AI Commerce Studio",
    description:
      "Crafting high-velocity autonomous commerce engines, 24/7 AI sales agents, and mission-critical hardware telemetry dashboards. Founded by Santhosh A.",
    url: "https://www.commerce-agents.design",
    siteName: "Commerce Agents Studio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/commerce-agents-logo-grad.png",
        width: 1200,
        height: 630,
        alt: "Commerce Agents Studio - 0→1 Product Engineering & Autonomous AI Commerce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "COMMERCE AGENTS | 0→1 Product Engineering & Autonomous AI Commerce",
    description:
      "High-performance autonomous commerce engines, 24/7 sales agents, and hardware telemetry dashboards. Founded by Santhosh A in Chennai.",
    creator: "@santhoshadesign",
    images: ["/commerce-agents-logo-grad.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  category: "technology",
};

// Machine-readable JSON-LD Schema (Google Knowledge Graph & Rich Snippets)
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.commerce-agents.design/#website",
      "url": "https://www.commerce-agents.design",
      "name": "Commerce Agents Studio",
      "description":
        "Elite product design and 0→1 autonomous commerce engineering studio founded by Santhosh A.",
      "inLanguage": "en-US",
      "publisher": {
        "@id": "https://www.commerce-agents.design/#organization",
      },
    },
    {
      "@type": ["ProfessionalService", "Organization"],
      "@id": "https://www.commerce-agents.design/#organization",
      "name": "Commerce Agents Studio",
      "url": "https://www.commerce-agents.design",
      "logo": "https://www.commerce-agents.design/commerce-agents-logo-grad.png",
      "image": "https://www.commerce-agents.design/commerce-agents-logo-grad.png",
      "email": "hello.commerceagents@gmail.com",
      "telephone": "+91-9840000000",
      "priceRange": "$$$$",
      "founder": {
        "@id": "https://www.commerce-agents.design/#founder",
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress":
          "No: 143/1, Uthamar Gandhi Road, opp. The Park Hotel, Thousand Lights West, Nungambakkam",
        "addressLocality": "Chennai",
        "addressRegion": "Tamil Nadu",
        "postalCode": "600006",
        "addressCountry": "IN",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 13.0604,
        "longitude": 80.2496,
      },
      "areaServed": [
        "Global",
        "United States",
        "United Kingdom",
        "India",
        "United Arab Emirates",
        "Singapore",
        "Germany",
        "Australia",
      ],
      "knowsAbout": [
        "Autonomous AI Agents",
        "0 to 1 Product Engineering",
        "Headless Commerce Architecture",
        "Next.js 16 Web Applications",
        "IoT Hardware Telemetry Dashboards",
        "Custom Checkout Systems",
        "High-Converting Sales Automations",
        "Design Engineering",
      ],
      "sameAs": [
        "https://www.commerce-agents.design",
        "https://designbysanthosh.com",
        "https://github.com/santhosh-a-designer",
      ],
    },
    {
      "@type": "Person",
      "@id": "https://www.commerce-agents.design/#founder",
      "name": "Santhosh A",
      "jobTitle": "Co-Founder & Lead Product Design Engineer",
      "url": "https://designbysanthosh.com",
      "image": "https://www.commerce-agents.design/cofounder/santhosh.jpg",
      "sameAs": [
        "https://designbysanthosh.com",
        "https://github.com/santhosh-a-designer",
      ],
      "worksFor": {
        "@id": "https://www.commerce-agents.design/#organization",
      },
    },
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-[#09080A] text-[#F4F3F6] antialiased selection:bg-[#9780FF]/30 selection:text-[#00F0FF]">
        {children}
      </body>
    </html>
  );
}
