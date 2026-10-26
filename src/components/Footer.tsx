"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#070609] pt-28 pb-12 px-6 sm:px-10 md:px-16 overflow-hidden border-t border-white/5">
      {/* Top Section: Email & CTA Box (Exact Superconscious Layout) */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-10 mb-20">
        {/* Left: Live Limitless + Massive Email */}
        <div className="flex flex-col">
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-3">
            Live Limitless // Chennai Studio
          </span>
          <a
            href="mailto:santhoshdesignstudio@gmail.com"
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight hover:text-[#9780FF] transition-colors duration-300"
          >
            santhoshdesignstudio@gmail.com
          </a>
        </div>

        {/* Right: Upgrade Your Reality + White Button */}
        <div className="flex flex-col items-start md:items-end text-left md:text-right shrink-0">
          <h4 className="text-xl sm:text-2xl font-light text-white tracking-tight mb-1">
            Upgrade Your Reality
          </h4>
          <p className="text-xs text-zinc-400 font-light mb-6">
            Commission a dedicated 0→1 build with Co-Founder Santhosh
          </p>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center gap-2 group"
          >
            <span>Commission Sprint</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Middle Section: Clean Horizontal Social Links (Exact Superconscious Row) */}
      <div className="max-w-7xl mx-auto border-b border-white/10 pb-8 mb-16">
        <div className="flex flex-wrap items-center justify-between gap-6 text-sm text-zinc-300 font-light">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Twitter X
          </a>
          <a
            href="https://linkedin.com/in/santhosh-a-designer"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://designbysanthosh.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9780FF] hover:text-[#b09eff] transition-colors flex items-center gap-1 font-mono text-xs"
          >
            <span>designbysanthosh.com</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Bottom Area: Massive Full-Width COMMERCE AGENTS Title with Volumetric Glowing Violet Blur */}
      <div className="relative max-w-7xl mx-auto flex flex-col items-center justify-center my-6 overflow-hidden">
        {/* Volumetric Purple/Violet Glowing Fog (Superconscious Signature) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[85vw] max-w-5xl h-48 sm:h-64 rounded-full bg-gradient-to-r from-[#582CFF] via-[#9780FF] to-[#3B82F6] opacity-80 blur-[90px] mix-blend-screen" />
        </div>

        {/* Massive Bold Edge-to-Edge Typography */}
        <h2 className="relative z-10 text-[10.5vw] font-bold tracking-tighter text-white uppercase text-center leading-none select-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
          COMMERCE AGENTS
        </h2>
      </div>

      {/* Bottom Copyright & Legal Links */}
      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-light">
        <div>
          © 2026 Commerce Agents. All Rights Reserved.
        </div>

        <div className="flex items-center gap-6">
          <a href="#studio" className="hover:text-zinc-300 transition-colors">
            Chennai Studio [13.0604° N]
          </a>
          <span className="text-zinc-700">|</span>
          <span className="text-zinc-500">Privacy policy</span>
          <span className="text-zinc-700">|</span>
          <span className="text-zinc-500">Terms and conditions</span>
        </div>
      </div>
    </footer>
  );
}
