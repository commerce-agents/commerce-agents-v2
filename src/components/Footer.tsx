"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contacts"
      className="relative bg-[#09080A] pt-28 pb-10 overflow-hidden"
    >
      {/* ── Natural Seamless Volumetric Glow across entire bottom (No Box / No Border) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 120% 70% at 50% 100%, rgba(115, 34, 242, 0.55) 0%, rgba(151, 128, 255, 0.25) 35%, rgba(9, 8, 10, 0) 75%)",
        }}
      />

      {/* ── TOP SECTION: Direct Inquiries & Sprint Commission ────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 lg:gap-24 mb-28">
        {/* Left: Email in one single clean line with generous breathing room */}
        <div className="min-w-0 flex-1">
          <p className="font-mono text-xs uppercase tracking-widest text-[#9780FF] mb-4">
            ● INITIATE COLLABORATION // DIRECT CHANNEL
          </p>
          <a
            href="mailto:hello.commerceagents@gmail.com"
            className="inline-block font-light text-white tracking-tight leading-none hover:text-[#9780FF] transition-colors duration-300"
            style={{
              fontSize: "clamp(20px, 2.5vw, 40px)",
              whiteSpace: "nowrap",
            }}
          >
            hello.commerceagents@gmail.com
          </a>
        </div>

        {/* Right: Upgrade / Commission Callout */}
        <div className="shrink-0 flex flex-col items-start lg:items-end">
          <h4 className="text-xl sm:text-2xl font-light text-white tracking-tight mb-2">
            Upgrade Your Commerce Reality
          </h4>
          <p className="text-xs text-zinc-400 font-light mb-6 lg:text-right max-w-sm leading-relaxed">
            Commission a dedicated 0→1 build sprint with Santhosh A. Bespoke design &amp; engineering.
          </p>
          <a
            href="#contact"
            className="px-7 py-3.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all duration-300 flex items-center gap-2 group shadow-[0_0_30px_rgba(255,255,255,0.25)]"
          >
            <span>COMMISSION SPRINT</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* ── Brand Wordmark: Reduced Size, Letter Spaced, Separated Words ─────── */}
      <div className="relative z-10 w-full px-6 text-center select-none pb-12">
        <h2
          className="font-light text-white uppercase leading-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
          style={{
            fontSize: "clamp(26px, 6.2vw, 96px)",
            letterSpacing: "0.16em",
            whiteSpace: "nowrap",
          }}
        >
          COMMERCE AGENTS
        </h2>
      </div>

      {/* ── FOOTER DOWN INFO: Copyright & Policy Links ────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
        <div className="flex items-center gap-3">
          <span>© 2026 COMMERCE AGENTS STUDIO. ALL RIGHTS RESERVED.</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-white transition-colors cursor-pointer">PRIVACY POLICY</span>
          <span className="text-zinc-700">|</span>
          <span className="hover:text-white transition-colors cursor-pointer">TERMS OF SERVICE</span>
        </div>
      </div>
    </footer>
  );
}
