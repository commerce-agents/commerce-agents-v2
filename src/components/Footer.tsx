"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#060507] border-t border-white/5 pt-20 pb-12 px-4 sm:px-8 md:px-12 overflow-hidden text-zinc-400">
      {/* Background Pixel Grid Pattern */}
      <div className="absolute inset-0 pixel-grid-bg opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Massive Brand Watermark */}
        <div className="border-b border-white/5 pb-12 mb-12">
          <h2 className="text-[12vw] font-extralight text-white/[0.08] tracking-tighter leading-none select-none text-center">
            COMMERCE AGENTS
          </h2>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16 text-xs">
          {/* Col 1: Studio Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#9780FF]" />
              <span className="font-bold tracking-tight text-white font-mono text-sm">
                COMMERCE AGENTS
              </span>
            </div>
            <p className="text-zinc-500 font-light leading-relaxed">
              Proprietary product engineering &amp; 0→1 digital commerce studio.
              Designed and built in Chennai, India.
            </p>
            <div className="text-[11px] font-mono text-zinc-600">
              SYS_VERSION: v2.4.0_PRODUCTION
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <div className="font-mono text-zinc-300 uppercase tracking-widest text-[11px]">
              ARCHITECTURE
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#work" className="hover:text-white transition-colors">
                  01 // Client Engagements
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-white transition-colors">
                  02 // Studio Capabilities
                </a>
              </li>
              <li>
                <a href="#cofounder" className="hover:text-white transition-colors">
                  03 // Co-Founder Dossier
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  04 // Commission Studio
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Studio Coordinates */}
          <div className="space-y-3">
            <div className="font-mono text-zinc-300 uppercase tracking-widest text-[11px]">
              CHENNAI HEADQUARTERS
            </div>
            <div className="text-zinc-500 space-y-1 font-light">
              <p className="text-zinc-300">No: 143/1, Uthamar Gandhi Road</p>
              <p>opp. The Park Hotel, Thousand Lights West</p>
              <p>Nungambakkam, Chennai 600006</p>
              <p className="text-[#FF7410] font-mono pt-1">[Inside Coworking Hub]</p>
            </div>
          </div>

          {/* Col 4: Network & Portfolio */}
          <div className="space-y-3">
            <div className="font-mono text-zinc-300 uppercase tracking-widest text-[11px]">
              FOUNDER NETWORK
            </div>
            <ul className="space-y-2 font-mono">
              <li>
                <a
                  href="https://designbysanthosh.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 hover:text-[#9780FF] transition-colors flex items-center gap-1"
                >
                  <span>designbysanthosh.com</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/santhosh-a-designer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 hover:text-[#9780FF] transition-colors flex items-center gap-1"
                >
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:santhoshdesignstudio@gmail.com"
                  className="text-zinc-300 hover:text-[#9780FF] transition-colors flex items-center gap-1"
                >
                  <span>santhoshdesignstudio@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-600">
          <div>
            © 2026 COMMERCE AGENTS STUDIO. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <span>NODE [13.0604° N, 80.2496° E]</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
            >
              <span>TOP OF PAGE</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
