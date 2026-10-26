"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, ExternalLink, Cpu, ShoppingBag, Utensils, Zap, Activity } from "lucide-react";

interface ClientItem {
  id: string;
  name: string;
  category: string;
  metric: string;
  logo: string;
  description: string;
  tag: string;
  gradient: string;
}

const clients: ClientItem[] = [
  {
    id: "irasus",
    name: "iRasus Technologies",
    category: "EV BATTERY TELEMETRY & IOT",
    metric: "3-TIER HEALTH TRIAGE",
    logo: "/clients/irasus-norm.webp",
    description:
      "Enterprise IoT telemetry dashboard for electric vehicle battery packs. Real-time CAN bus telemetry, thermal runaway early warning detection, and automated fleet warranty monitoring.",
    tag: "HARDWARE TELEMETRY",
    gradient: "from-[#00F0FF]/15 via-transparent to-transparent",
  },
  {
    id: "wetwopets",
    name: "We Two Pets",
    category: "0→1 D2C PET COMMERCE",
    metric: "ZERO-TO-ONE ARCHITECTURE",
    logo: "/clients/wetwopets-norm.webp",
    description:
      "Curated premium pet nutrition commerce platform. Built with intelligent breed/weight matching algorithms, automated recurring subscriptions, and seamless zero-latency cart checkout.",
    tag: "D2C COMMERCE",
    gradient: "from-[#FF7410]/15 via-transparent to-transparent",
  },
  {
    id: "makeon",
    name: "Makeon STEM",
    category: "MODULAR HARDWARE E-STORE",
    metric: "1,200+ PACKS SHIPPED",
    logo: "/clients/makeon-norm.webp",
    description:
      "E-commerce storefront and interactive project build loops for adhesive, wearable electronics and STEM circuit components shipped worldwide.",
    tag: "HARDWARE RETAIL",
    gradient: "from-[#9780FF]/15 via-transparent to-transparent",
  },
  {
    id: "vidyas-kitchen",
    name: "Vidya's Kitchen",
    category: "0→1 FOOD DELIVERY PWA & BOT",
    metric: "SUB-SECOND KITCHEN SYNC",
    logo: "/clients/vidyas-kitchen.webp",
    description:
      "Hyperlocal food ordering PWA paired with an automated WhatsApp dispatch bot and live kitchen order management board, eliminating food aggregator commission overhead.",
    tag: "FOOD ENGINE PWA",
    gradient: "from-[#10B981]/15 via-transparent to-transparent",
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
              <span>[01] VERIFIED CLIENT ENGAGEMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
              SYSTEMS WE'VE <br />
              <span className="font-editorial text-[#9780FF]">Architected</span> &amp; DEPLOYED.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              We focus on high-stakes platforms: 0→1 headless commerce engines, hardware telemetry streams,
              and custom food &amp; retail software engineered for direct operational efficiency.
            </p>
          </div>
        </div>

        {/* 4 Client Cards Grid with Full-Color Real Logos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {clients.map((client) => {
            const isHovered = hoveredClient === client.id;
            return (
              <div
                key={client.id}
                onMouseEnter={() => setHoveredClient(client.id)}
                onMouseLeave={() => setHoveredClient(null)}
                className={`relative group rounded-3xl p-8 transition-all duration-500 overflow-hidden border ${
                  isHovered
                    ? "border-[#9780FF]/40 bg-[#121016]/95 shadow-[0_0_50px_-15px_rgba(151,128,255,0.25)] -translate-y-1"
                    : "border-white/[0.08] bg-[#0E0D11]/80 hover:border-white/20"
                }`}
              >
                {/* Subtle gradient backdrop */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${client.gradient} pointer-events-none transition-opacity duration-500 ${
                    isHovered ? "opacity-100" : "opacity-40"
                  }`}
                />

                {/* Pixel grid highlight */}
                <div
                  className={`absolute inset-0 pixel-grid-dense transition-opacity duration-500 pointer-events-none ${
                    isHovered ? "opacity-30" : "opacity-0"
                  }`}
                />

                {/* Top Meta: Category + Live Ping */}
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-400">
                    {client.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{client.tag}</span>
                  </span>
                </div>

                {/* Real Full-Color Client Logo (High Visibility) */}
                <div className="relative h-24 w-full flex items-center justify-start mb-6 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="relative w-52 h-16 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain object-left drop-shadow-md"
                      priority
                    />
                  </div>
                </div>

                {/* Client Name & Metric */}
                <div className="relative z-10 mb-4">
                  <h3 className="text-2xl font-light text-white mb-2 group-hover:text-[#9780FF] transition-colors">
                    {client.name}
                  </h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-[#9780FF]/10 border border-[#9780FF]/25 text-xs font-mono text-[#00F0FF]">
                    {client.metric}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-300 leading-relaxed font-light relative z-10 mb-6">
                  {client.description}
                </p>

                {/* Bottom interactive edge */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-500 relative z-10">
                  <span>PRODUCTION ARCHITECTURE // DEPLOYED</span>
                  <Activity className="w-4 h-4 text-zinc-400 group-hover:text-[#FF7410] transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct Studio Launch Callout */}
        <div className="mt-12 rounded-2xl p-6 border border-white/[0.08] bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#9780FF] animate-ping" />
            <span className="text-xs font-mono text-zinc-300">
              FEATURED ZERO-COMMISSION STACK: VIDYA'S KITCHEN 0→1 WHATSAPP BOT &amp; PWA
            </span>
          </div>
          <a
            href="#contact"
            className="text-xs font-mono text-[#9780FF] hover:text-[#b09eff] flex items-center gap-1.5 transition-colors"
          >
            <span>COMMISSION A TAILORED ENGINE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
