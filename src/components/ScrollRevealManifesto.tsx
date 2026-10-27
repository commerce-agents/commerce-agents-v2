"use client";

import React, { useEffect, useRef, useState } from "react";

// Words that form the studio's manifesto statement
interface ManifestoToken {
  text: string;
  isHighlight?: boolean;
}

const MANIFESTO_TOKENS: ManifestoToken[] = [
  { text: "Most" },
  { text: "businesses" },
  { text: "lose" },
  { text: "sales" },
  { text: "to" },
  { text: "slow" },
  { text: "websites" },
  { text: "and" },
  { text: "burn" },
  { text: "hours" },
  { text: "on" },
  { text: "manual" },
  { text: "work." },
  { text: "We" },
  { text: "do" },
  { text: "the" },
  { text: "opposite." },
  { text: "We" },
  { text: "build" },
  { text: "custom", isHighlight: true },
  { text: "commerce", isHighlight: true },
  { text: "platforms", isHighlight: true },
  { text: "and" },
  { text: "deploy" },
  { text: "intelligent", isHighlight: true },
  { text: "AI", isHighlight: true },
  { text: "agents", isHighlight: true },
  { text: "that" },
  { text: "handle", isHighlight: true },
  { text: "your", isHighlight: true },
  { text: "sales,", isHighlight: true },
  { text: "qualify", isHighlight: true },
  { text: "leads,", isHighlight: true },
  { text: "and" },
  { text: "run" },
  { text: "your" },
  { text: "daily" },
  { text: "operations", isHighlight: true },
  { text: "24/7.", isHighlight: true },
  { text: "No", isHighlight: false },
  { text: "bloat.", isHighlight: true },
  { text: "No", isHighlight: false },
  { text: "complex", isHighlight: true },
  { text: "setups.", isHighlight: true },
  { text: "Just" },
  { text: "software" },
  { text: "that" },
  { text: "works", isHighlight: true },
  { text: "for", isHighlight: true },
  { text: "you.", isHighlight: true },
];

export default function ScrollRevealManifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      // Progress from 0 (entry into view) to 1 (exit)
      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScrollable;
      const clamped = Math.max(0, Math.min(1, rawProgress));
      setScrollProgress(clamped);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalTokens = MANIFESTO_TOKENS.length;

  return (
    <section
      ref={containerRef}
      className="relative bg-[#08070A]"
      style={{ height: "260vh" }}
    >
      {/* Sticky Fullscreen Frame */}
      <div className="sticky top-0 h-screen flex flex-col justify-between items-center px-6 sm:px-12 md:px-20 py-16 overflow-hidden">
        {/* Ambient atmospheric glow */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 650,
            height: 380,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(ellipse, rgba(151,128,255,0.14) 0%, rgba(255,116,16,0.08) 45%, transparent 75%)",
            filter: "blur(90px)",
          }}
        />

        {/* Section Header */}
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-zinc-400 z-10">
          <span className="w-2 h-2 rounded-full bg-[#9780FF] animate-pulse" />
          <span>MANIFESTO // PHILOSOPHY &amp; MISSION</span>
        </div>

        {/* The Manifesto Statement – Fluid word-by-word unblur reveal */}
        <div className="relative z-10 max-w-5xl text-center flex flex-wrap justify-center items-center gap-x-3.5 gap-y-2 sm:gap-x-5 sm:gap-y-3 select-none my-auto">
          {MANIFESTO_TOKENS.map((token, index) => {
            // Each token reveals sequentially across the scroll progress (0.05 to 0.90)
            const revealPoint = 0.05 + (index / totalTokens) * 0.85;
            // Token transition window
            const diff = scrollProgress - revealPoint;

            // t goes from 0 (blurred) to 1 (fully sharp and stays sharp)
            const transitionSpread = 0.08;
            const t = Math.max(0, Math.min(1, (diff + transitionSpread) / transitionSpread));

            const blurAmount = (1 - t) * 16;
            const opacity = 0.12 + t * 0.88;
            const translateY = (1 - t) * 14;

            return (
              <span
                key={index}
                style={{
                  filter: `blur(${blurAmount.toFixed(1)}px)`,
                  opacity,
                  transform: `translateY(${translateY.toFixed(1)}px)`,
                  transition: "filter 0.08s ease-out, opacity 0.08s ease-out, transform 0.08s ease-out",
                  willChange: "filter, opacity, transform",
                }}
                className={`inline-block font-light text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.25] tracking-tight ${
                  token.isHighlight
                    ? "font-normal bg-gradient-to-r from-[#9780FF] via-[#FF7410] to-[#00F0FF] bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(151,128,255,0.35)]"
                    : "text-[#F5F5F7]"
                }`}
              >
                {token.text}
              </span>
            );
          })}
        </div>

        {/* Scroll Progress Indicator & Telemetry */}
        <div className="flex items-center gap-4 font-mono text-[11px] text-zinc-500 uppercase tracking-widest z-10">
          <span>SCROLL PROGRESS</span>
          <div className="w-24 sm:w-36 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#9780FF] to-[#FF7410]"
              style={{ width: `${Math.round(scrollProgress * 100)}%`, transition: "width 0.1s linear" }}
            />
          </div>
          <span className="text-[#9780FF] font-medium">{Math.round(scrollProgress * 100)}%</span>
        </div>
      </div>
    </section>
  );
}
