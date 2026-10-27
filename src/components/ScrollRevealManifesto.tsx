"use client";

import React, { useEffect, useRef, useState } from "react";

interface ManifestoToken {
  text: string;
  isHighlight?: boolean;
}

const MANIFESTO_TOKENS: ManifestoToken[] = [
  { text: "We" },
  { text: "engineer", isHighlight: true },
  { text: "custom", isHighlight: true },
  { text: "commerce", isHighlight: true },
  { text: "platforms" },
  { text: "and" },
  { text: "deploy", isHighlight: true },
  { text: "autonomous", isHighlight: true },
  { text: "AI", isHighlight: true },
  { text: "agents", isHighlight: true },
  { text: "that" },
  { text: "run" },
  { text: "your" },
  { text: "sales", isHighlight: true },
  { text: "and" },
  { text: "operations", isHighlight: true },
  { text: "24/7.", isHighlight: true },
  { text: "No", isHighlight: false },
  { text: "slow", isHighlight: true },
  { text: "templates.", isHighlight: true },
  { text: "No", isHighlight: false },
  { text: "manual", isHighlight: true },
  { text: "work.", isHighlight: true },
  { text: "Just" },
  { text: "software" },
  { text: "that" },
  { text: "scales", isHighlight: true },
  { text: "your" },
  { text: "revenue.", isHighlight: true },
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
      style={{ height: "230vh" }}
    >
      {/* Sticky Fullscreen Frame */}
      <div className="sticky top-0 h-screen flex flex-col justify-between items-center px-6 sm:px-12 md:px-16 py-14 overflow-hidden">
        {/* Ambient atmospheric glow */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 600,
            height: 340,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(ellipse, rgba(151,128,255,0.14) 0%, rgba(255,116,16,0.08) 45%, transparent 75%)",
            filter: "blur(90px)",
          }}
        />

        {/* Section Header */}
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-zinc-400 z-10">
          <span className="w-2 h-2 rounded-full bg-[#9780FF] animate-pulse" />
          <span>WHAT WE ENGINEER &amp; WHAT WE DEPLOY</span>
        </div>

        {/* The Manifesto Statement – Sized cleanly so it never crowds the screen */}
        <div className="relative z-10 max-w-4xl text-center flex flex-wrap justify-center items-center gap-x-3 gap-y-2 sm:gap-x-4 sm:gap-y-2.5 select-none my-auto px-4">
          {MANIFESTO_TOKENS.map((token, index) => {
            const revealPoint = 0.05 + (index / totalTokens) * 0.85;
            const diff = scrollProgress - revealPoint;
            const transitionSpread = 0.08;
            const t = Math.max(0, Math.min(1, (diff + transitionSpread) / transitionSpread));

            const blurAmount = (1 - t) * 14;
            const opacity = 0.12 + t * 0.88;
            const translateY = (1 - t) * 12;

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
                className={`inline-block font-light text-xl sm:text-3xl md:text-4xl lg:text-[42px] leading-[1.3] tracking-tight ${
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


      </div>
    </section>
  );
}
