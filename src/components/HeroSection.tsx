"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, ShieldCheck, Zap, Terminal } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-20 px-4 sm:px-8 md:px-12 overflow-hidden">
      {/* Background Chromatic Video Loop like Superconscious */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-25 scale-105"
        >
          <source src="/video/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Dark Vignette Overlay & Radial Blur */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#09080A]/60 via-[#09080A]/90 to-[#09080A]" />
        <div className="absolute inset-0 pixel-grid-bg opacity-30" />
      </div>

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#9780FF]/15 via-[#FF7410]/10 to-transparent blur-[120px] pointer-events-none rounded-full" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center mt-6">
        {/* Eyebrow HUD Tag */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-8 group hover:border-[#9780FF]/40 transition-colors">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9780FF] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9780FF]"></span>
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-300">
            0→1 COMMERCE ENGINEERING // CHENNAI STUDIO
          </span>
          <span className="text-zinc-600">|</span>
          <span className="font-mono text-[11px] text-[#FF7410]">PROTOTYPE TO SCALE</span>
        </div>

        {/* Master Headline with Superconscious Typography (Clean Sans + Editorial Italic Serif) */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-white leading-[1.08] mb-8">
          ARCHITECTING <br />
          <span className="font-editorial text-[#9780FF] font-normal">Autonomous</span> COMMERCE <br />
          &amp; PRODUCT REALITY.
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-10">
          Commerce Agents is a boutique product design &amp; full-stack engineering studio.
          Founded by <span className="text-white font-medium">Santhosh A</span>, we build high-converting commerce engines,
          IoT telemetry interfaces, and custom digital retail experiences.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <a
            href="#work"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black hover:bg-zinc-200 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]"
          >
            <span>EXPLORE CLIENT WORK</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/15 hover:border-[#9780FF]/50 bg-white/[0.02] hover:bg-[#9780FF]/10 text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>COMMISSION A BUILD</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Floating Rotating-Border Feature Card (Signature Superconscious Element) */}
        <div className="relative w-full max-w-4xl p-[1px] rounded-3xl overflow-hidden group shadow-2xl">
          {/* 360 Rotating Border Gradient */}
          <div className="absolute -inset-[200%] animate-border-rotate opacity-75 group-hover:opacity-100 transition-opacity">
            <div className="w-full h-full bg-[conic-gradient(from_0deg,#9780FF_0deg,#FF7410_120deg,#00F0FF_240deg,#9780FF_360deg)]" />
          </div>

          {/* Inner Card Content */}
          <div className="relative bg-[#0E0D11]/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 md:p-10 border border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left divide-y md:divide-y-0 md:divide-x divide-white/10">
              {/* Stat 1: Retail Conversion */}
              <div className="pt-4 md:pt-0 md:px-4 first:px-0">
                <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs uppercase mb-2">
                  <Zap className="w-3.5 h-3.5 text-[#FF7410]" />
                  <span>RETAIL CONVERSION</span>
                </div>
                <div className="text-3xl sm:text-4xl font-light text-white tracking-tight mb-1">
                  +31% LIFT
                </div>
                <p className="text-xs text-zinc-400 leading-normal">
                  Proprietary in-store kiosk checkout &amp; digital furniture booking for Nebraska Furniture Mart &amp; Parla.
                </p>
              </div>

              {/* Stat 2: 0→1 Commerce Platform */}
              <div className="pt-4 md:pt-0 md:px-6">
                <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs uppercase mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#9780FF]" />
                  <span>0→1 FOOD &amp; PET ENGINES</span>
                </div>
                <div className="text-3xl sm:text-4xl font-light text-white tracking-tight mb-1">
                  100% CUSTOM
                </div>
                <p className="text-xs text-zinc-400 leading-normal">
                  End-to-end PWAs: Vidya's Kitchen WhatsApp dispatch board and We Two Pets curated subscription system.
                </p>
              </div>

              {/* Stat 3: EV Telemetry & Hardware */}
              <div className="pt-4 md:pt-0 md:px-6">
                <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs uppercase mb-2">
                  <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span>EV &amp; CASH TELEMETRY</span>
                </div>
                <div className="text-3xl sm:text-4xl font-light text-white tracking-tight mb-1">
                  3-TIER TRIAGE
                </div>
                <p className="text-xs text-zinc-400 leading-normal">
                  Hardware telemetry platforms for iRasus battery fleets and IndiaOne ATM franchise cash dispatchers.
                </p>
              </div>
            </div>

            {/* Bottom Status bar of Card */}
            <div className="mt-8 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between text-xs font-mono text-zinc-500 gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>PRODUCTION PIPELINE ACTIVE</span>
              </div>
              <div>STUDIO ADDRESS: 143/1 UTHAMAR GANDHI RD, CHENNAI 600006</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
