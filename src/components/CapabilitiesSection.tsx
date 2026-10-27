"use client";

import React, { useState } from "react";
import FluidScrollReveal from "@/components/FluidScrollReveal";
import dynamic from "next/dynamic";
import { CheckCircle2, ArrowRight, Code2, Cpu, Smartphone, ShoppingBag } from "lucide-react";



const capabilities = [
  {
    index: "01",
    icon: ShoppingBag,
    title: "0→1 Commerce Engines",
    subtitle: "HIGH-VELOCITY HEADLESS ARCHITECTURES",
    description:
      "We design and build bespoke e-commerce platforms from blank canvas to scale. Fast Next.js PWAs, unified inventory dispatch, automated WhatsApp ordering bots, and zero-latency cart experiences.",
    highlights: [
      "Custom Headless Checkout & Subscriptions",
      "WhatsApp Instant Order & Dispatch Bots",
      "Multi-Currency & Instant Gateway Integration",
      "Kitchen / Warehouse Dispatch Management",
    ],
    lottieSrc: "/lottie/icon1.json",
    glowColor: "from-[#9780FF]/20 to-transparent",
  },
  {
    index: "02",
    icon: Smartphone,
    title: "In-Store Kiosk & Omnichannel",
    subtitle: "DIGITAL PHYSICAL BRIDGES",
    description:
      "Bridging digital convenience into brick-and-mortar showrooms. We engineered custom kiosk software and digital scheduling portals for retail giants like Nebraska Furniture Mart & Parla.",
    highlights: [
      "Rugged Touchscreen Kiosk Interfaces",
      "+31% Documented Lift in Consultation Bookings",
      "-26% Drop-off in Checkout Flow",
      "Multi-Showroom Distributed Synchronization",
    ],
    lottieSrc: "/lottie/icon2.json",
    glowColor: "from-[#FF7410]/20 to-transparent",
  },
  {
    index: "03",
    icon: Cpu,
    title: "Hardware & Fleet Telemetry",
    subtitle: "REAL-TIME IOT TRIAGE",
    description:
      "Turning complex hardware telemetry into actionable, high-velocity dashboards. From EV battery pack thermal warnings (iRasus) to ATM franchise cash replenishment apps.",
    highlights: [
      "Sub-Second Sensor & CAN Bus Stream Visualizers",
      "3-Tier Hardware Battery Health Triage",
      "Field Loadman Route & Cash Vault Dispatches",
      "Edge-to-Cloud Fault Early Detection",
    ],
    lottieSrc: "/lottie/icon3.json",
    glowColor: "from-[#00F0FF]/20 to-transparent",
  },
  {
    index: "04",
    icon: Code2,
    title: "Design Engineering & Motion",
    subtitle: "LUXURY MICRO-INTERACTION CRAFT",
    description:
      "Design without engineering creates debt; engineering without design creates friction. We merge pixel-perfect aesthetics with production-grade React/Next.js code.",
    highlights: [
      "Lenis Fluid Smooth Scrolling Physics",
      "Tailored Dark Aesthetic & Pixelated HUDs",
      "Micro-Animations & Dynamic SVG Particle Engines",
      "Extreme Core Web Vitals Optimization (95+)",
    ],
    lottieSrc: "/lottie/circles.json",
    glowColor: "from-[#9780FF]/20 to-transparent",
  },
];

export default function CapabilitiesSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="capabilities" className="relative py-28 px-4 sm:px-8 md:px-12 bg-[#09080A]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <FluidScrollReveal blurAmount={24} yOffset={35}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-xs font-mono text-[#FF7410] mb-3">
              <span>[02] STUDIO CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
              WHAT WE <br />
              <span className="font-editorial text-[#9780FF]">Engineer</span> &amp; DEPLOY.
            </h2>
          </div>

          <p className="max-w-md text-sm text-zinc-400 font-light leading-relaxed">
            We don't do generic templates or bloated WordPress sites. We engineer proprietary,
            scalable software products tailored to your revenue and operational model.
          </p>
          </div>
        </FluidScrollReveal>

        {/* 4 Cards Grid with Rotating Border Accent */}
        <FluidScrollReveal staggerChildren={true} staggerDelay={0.1} blurAmount={28} yOffset={45}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.index}
                data-reveal-item className="relative group rounded-3xl p-[1px] overflow-hidden transition-all duration-500 hover:-translate-y-1"
              >
                {/* 360 Rotating Border Gradient */}
                <div className="absolute -inset-[200%] animate-border-rotate opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="w-full h-full bg-[conic-gradient(from_0deg,#9780FF_0deg,#FF7410_120deg,#00F0FF_240deg,#9780FF_360deg)]" />
                </div>

                {/* Inner Card Background */}
                <div className="relative h-full bg-[#0E0D11]/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-white/5 flex flex-col justify-between">
                  <div>
                    {/* Top Meta */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#9780FF] group-hover:text-white transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs text-zinc-500 tracking-widest">
                        PHASE {cap.index}
                      </span>
                    </div>

                    <span className="font-mono text-[11px] text-[#FF7410] tracking-wider uppercase block mb-2">
                      {cap.subtitle}
                    </span>
                    <h3 className="text-2xl font-light text-white tracking-tight mb-4">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">
                      {cap.description}
                    </p>

                    {/* Highlights bullet points */}
                    <ul className="space-y-2.5 mb-8">
                      {cap.highlights.map((item, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-[#9780FF] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-zinc-500">
                      SPECS: NEXT.JS / NODE / GSAP
                    </span>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 group-hover:text-white transition-colors"
                    >
                      <span>DEPLOY THIS</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </FluidScrollReveal>
      </div>
    </section>
  );
}
