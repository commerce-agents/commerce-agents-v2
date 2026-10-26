"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Compass, Shield, Terminal, Award, Mail } from "lucide-react";

export default function CoFounderDossier() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="cofounder" className="relative py-28 px-4 sm:px-8 md:px-12 bg-[#080709] overflow-hidden">
      {/* Background Pixel Dots & Glow */}
      <div className="absolute inset-0 pixel-grid-bg opacity-25 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#9780FF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-xs font-mono text-[#9780FF] mb-6">
          <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>[03] STUDIO LEADERSHIP &amp; PHILOSOPHY</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Pixelated HUD Portrait Frame with B&W to Color Hover Transition (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-full max-w-md p-1 rounded-3xl bg-gradient-to-b from-white/15 via-white/5 to-transparent transition-all duration-500 hover:shadow-[0_0_50px_rgba(151,128,255,0.25)]"
            >
              {/* Corner Reticle Markers */}
              <div className="absolute top-3 left-3 text-xs font-mono text-[#9780FF] select-none z-20">
                ┌ [ID: SANTHOSH-A]
              </div>
              <div className="absolute top-3 right-3 text-xs font-mono text-[#FF7410] select-none z-20">
                [LIVE // HQ] ┐
              </div>
              <div className="absolute bottom-3 left-3 text-xs font-mono text-zinc-500 select-none z-20">
                └ [13.0604° N]
              </div>
              <div className="absolute bottom-3 right-3 text-xs font-mono text-zinc-500 select-none z-20">
                [CHENNAI_NODE] ┘
              </div>

              {/* Portrait Container */}
              <div className="relative rounded-[22px] bg-[#0E0D11] border border-white/10 overflow-hidden group">
                {/* Image: Black & White by default, Full Colors on Hover */}
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#0A090C]">
                  <Image
                    src="/cofounder/santhosh-suit.png"
                    alt="Santhosh A - Co-Founder & Lead Design Engineer"
                    fill
                    className={`object-cover object-top transition-all duration-700 ease-out group-hover:scale-105 ${
                      isHovered
                        ? "filter-none brightness-105 contrast-105"
                        : "grayscale contrast-125 brightness-95"
                    }`}
                    priority
                  />
                  {/* Subtle Scanline Shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#9780FF]/10 to-transparent opacity-30 pointer-events-none scanline-effect" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D11] via-transparent to-transparent opacity-90" />
                </div>

                {/* Bottom HUD readout */}
                <div className="p-6 relative z-10 -mt-16 bg-[#0E0D11]/90 backdrop-blur-md border-t border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-[#9780FF] uppercase tracking-wider">
                      CO-FOUNDER &amp; LEAD DESIGN ENGINEER
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      ACTIVE
                    </span>
                  </div>
                  <h3 className="text-2xl font-light text-white tracking-tight mb-1">
                    Santhosh A
                  </h3>
                  <p className="text-xs text-zinc-400 font-light mb-4">
                    Architecting high-converting digital commerce platforms, interactive hardware telemetry, and zero-compromise product systems.
                  </p>

                  <div className="space-y-2 pt-3 border-t border-white/5 text-[11px] font-mono">
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>DIRECT EMAIL:</span>
                      <a
                        href="mailto:hello.commerceagents@gmail.com"
                        className="text-[#9780FF] hover:underline"
                      >
                        hello.commerceagents@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>PORTFOLIO:</span>
                      <a
                        href="https://designbysanthosh.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#9780FF] flex items-center gap-1"
                      >
                        <span>designbysanthosh.com</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Studio Philosophy & Manifesto (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-6 leading-tight">
              "WE DON'T ENGINEER GENERIC TEMPLATES. <br />
              WE BUILD SYSTEMS WITH <br />
              <span className="font-editorial text-[#9780FF]">Absolute</span> CRAFT &amp; VELOCITY."
            </h2>

            <p className="text-base text-zinc-300 font-light leading-relaxed mb-8">
              At Commerce Agents, we believe the handoff gap between designers and engineers is where
              products lose their soul. We eliminate that divide: every interface is designed by
              engineers who write production-grade code, and architected with obsessive attention
              to 60fps micro-animations, tactile feedback, and friction-free purchase flows.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-[#9780FF]/10 text-[#9780FF] flex items-center justify-center mb-3">
                  <Shield className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-medium text-white mb-1">Zero-Handoff Craft</h4>
                <p className="text-xs text-zinc-400 font-light">
                  Smooth scroll physics, custom dark palettes, and responsive precision on all viewports.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-[#FF7410]/10 text-[#FF7410] flex items-center justify-center mb-3">
                  <Compass className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-medium text-white mb-1">Commerce-First ROI</h4>
                <p className="text-xs text-zinc-400 font-light">
                  Built to convert. Every button click, cart drawer, and checkout trigger is tested for revenue lift.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 text-[#00F0FF] flex items-center justify-center mb-3">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-medium text-white mb-1">Verified Delivery</h4>
                <p className="text-xs text-zinc-400 font-light">
                  Real client outcomes: +31% retail lift, 100% bespoke food and pet commerce engines.
                </p>
              </div>
            </div>

            {/* Direct Connect Action */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="px-6 py-3 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors flex items-center gap-2"
              >
                <span>CONSULT WITH SANTHOSH</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="mailto:hello.commerceagents@gmail.com"
                className="px-6 py-3 rounded-full border border-white/10 hover:border-[#9780FF]/40 bg-white/[0.02] text-xs font-mono text-zinc-300 transition-colors flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5 text-[#9780FF]" />
                <span>hello.commerceagents@gmail.com</span>
              </a>

              <a
                href="https://linkedin.com/in/santhosh-a-designer"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full border border-white/10 hover:border-white/20 bg-white/[0.02] text-xs font-mono text-zinc-400 transition-colors"
              >
                LINKEDIN ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
