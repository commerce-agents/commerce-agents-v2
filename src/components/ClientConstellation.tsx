"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, ExternalLink, Cpu, Layers, Activity } from "lucide-react";

interface ClientItem {
  id: string;
  name: string;
  category: string;
  metric: string;
  logo: string;
  description: string;
  tag: string;
}

const clients: ClientItem[] = [
  {
    id: "parla",
    name: "Parla Retail / NFM",
    category: "ENTERPRISE RETAIL & KIOSK",
    metric: "+31% CONVERSION LIFT",
    logo: "/clients/parla-norm.webp",
    description: "In-store digital kiosk checkout, personalized product configurator, and multi-store inventory sync for Nebraska Furniture Mart.",
    tag: "KIOSK COMMERCE",
  },
  {
    id: "wetwopets",
    name: "We Two Pets",
    category: "0→1 E-COMMERCE ENGINE",
    metric: "ZERO-TO-ONE ARCHITECTURE",
    logo: "/clients/wetwopets-norm.webp",
    description: "Curated pet commerce, nutrition matching algorithm, automated recurring subscriptions, and seamless checkout experience.",
    tag: "D2C COMMERCE",
  },
  {
    id: "irasus",
    name: "iRasus Technologies",
    category: "EV BATTERY TELEMETRY",
    metric: "3-TIER HEALTH TRIAGE",
    logo: "/clients/irasus-norm.webp",
    description: "Real-time battery pack diagnostics, thermal runaway early warning system, and automated fleet warranty monitoring.",
    tag: "HARDWARE IOT",
  },
  {
    id: "makeon",
    name: "Makeon STEM",
    category: "MODULAR HARDWARE E-STORE",
    metric: "1,200+ PACKS SHIPPED",
    logo: "/clients/makeon-norm.webp",
    description: "Wearable and adhesive circuit components e-commerce platform with interactive assembly guides for STEM learners worldwide.",
    tag: "HARDWARE RETAIL",
  },
  {
    id: "intellemo",
    name: "Intellemo AI",
    category: "SaaS CAMPAIGN PLATFORM",
    metric: "3X AD VELOCITY",
    logo: "/clients/intellemo-norm.png",
    description: "AI-driven automated marketing launchpad with instant design generation and multi-channel campaign dispatch.",
    tag: "AI PLATFORM",
  },
  {
    id: "nfm",
    name: "Nebraska Furniture Mart",
    category: "OMNICHANNEL COMMERCE",
    metric: "-26% CART ABANDONMENT",
    logo: "/clients/nfm-norm.webp",
    description: "Enterprise consultation scheduling and augmented reality spatial planner for America's largest home furnishing showrooms.",
    tag: "ENTERPRISE",
  },
];

export default function ClientConstellation() {
  const [hoveredClient, setHoveredClient] = useState<string | null>(null);

  return (
    <section id="work" className="relative py-28 px-4 sm:px-8 md:px-12 bg-[#09080A]">
      {/* Background Pixel Grid Pattern */}
      <div className="absolute inset-0 pixel-grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-xs font-mono text-[#9780FF] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#FF7410]" />
              <span>[01] SELECTED ENGAGEMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
              ENGINEERED FOR <br />
              <span className="font-editorial text-[#9780FF]">Pioneering</span> ENTERPRISES &amp; BRANDS.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              From hardware IoT telemetry to custom D2C commerce pipelines, we partner with
              founders and enterprise leaders to deliver high-converting, resilient digital systems.
            </p>
          </div>
        </div>

        {/* Client Constellation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => {
            const isHovered = hoveredClient === client.id;
            return (
              <div
                key={client.id}
                onMouseEnter={() => setHoveredClient(client.id)}
                onMouseLeave={() => setHoveredClient(null)}
                className={`relative group rounded-2xl p-6 transition-all duration-500 overflow-hidden border ${
                  isHovered
                    ? "border-[#9780FF]/40 bg-[#121016]/90 shadow-[0_0_40px_-10px_rgba(151,128,255,0.2)] -translate-y-1"
                    : "border-white/[0.08] bg-[#0E0D11]/60 hover:border-white/20"
                }`}
              >
                {/* Pixel shimmer backdrop */}
                <div
                  className={`absolute inset-0 pixel-grid-dense transition-opacity duration-500 pointer-events-none ${
                    isHovered ? "opacity-40" : "opacity-0"
                  }`}
                />

                {/* Top Card Meta: Category + Live Ping */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-500">
                    {client.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/5 text-[9px] font-mono text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{client.tag}</span>
                  </span>
                </div>

                {/* Client Logo Showcase with Pixel Accent */}
                <div className="relative h-20 w-full flex items-center justify-start mb-6">
                  <div className="relative w-44 h-14 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 brightness-125"
                    />
                  </div>
                </div>

                {/* Client Name & Metric */}
                <div className="relative z-10 mb-3">
                  <h3 className="text-xl font-medium text-white mb-1 group-hover:text-[#9780FF] transition-colors">
                    {client.name}
                  </h3>
                  <div className="inline-block px-2.5 py-1 rounded bg-[#9780FF]/10 border border-[#9780FF]/20 text-xs font-mono text-[#00F0FF]">
                    {client.metric}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-400 leading-relaxed font-light relative z-10">
                  {client.description}
                </p>

                {/* Bottom interactive edge */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500 relative z-10">
                  <span>COMMERCE_AGENTS // PRODUCTION</span>
                  <Activity className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#FF7410] transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Studio Note Banner */}
        <div className="mt-12 rounded-2xl p-6 border border-white/[0.08] bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF7410] animate-ping" />
            <span className="text-xs font-mono text-zinc-300">
              FEATURED COMMERCE LAUNCH: VIDYA'S KITCHEN 0→1 FOOD ENGINE &amp; WHATSAPP BOARD
            </span>
          </div>
          <a
            href="#contact"
            className="text-xs font-mono text-[#9780FF] hover:text-[#b09eff] flex items-center gap-1.5 transition-colors"
          >
            <span>INQUIRE ABOUT CUSTOM COMMERCE ARCHITECTURE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
