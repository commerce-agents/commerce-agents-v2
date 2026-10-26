"use client";

import React, { useEffect, useRef, useState } from "react";

// Words/phrases that appear one-by-one, fully sharp at their scroll position
const WORDS = [
  { text: "WE", accent: false },
  { text: "BUILD", accent: false },
  { text: "PRODUCTS", accent: true },
  { text: "THAT", accent: false },
  { text: "ACTUALLY", accent: false },
  { text: "CONVERT.", accent: false },
  { text: "NO TEMPLATES.", accent: false },
  { text: "JUST CRAFT.", accent: true },
];

export default function ScrollRevealManifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const trackH = sectionRef.current.offsetHeight - window.innerHeight;
      if (trackH <= 0) return;
      const p = Math.max(0, Math.min(1, -rect.top / trackH));
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const n = WORDS.length;

  const getStyle = (i: number): React.CSSProperties => {
    // Each word's "sharp zone" is centered at i/(n-1) of scroll progress
    const center = i / (n - 1);
    const dist = Math.abs(progress - center);
    // Window of ±0.12 either side = fully sharp. Beyond = blurs out
    const window = 0.13;
    const t = Math.max(0, 1 - dist / window);

    const blur = (1 - t) * 24;
    const opacity = 0.08 + t * 0.92;
    const translateY = (1 - t) * 12;

    return {
      filter: `blur(${blur.toFixed(1)}px)`,
      opacity,
      transform: `translateY(${translateY.toFixed(1)}px)`,
      transition: "filter 0.15s ease-out, opacity 0.15s ease-out, transform 0.15s ease-out",
      willChange: "filter, opacity, transform",
    };
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#08070A]"
      style={{ height: `${(n + 2) * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 500, height: 300,
            background: "radial-gradient(ellipse, rgba(151,128,255,0.12) 0%, rgba(255,116,16,0.07) 50%, transparent 100%)",
            filter: "blur(80px)",
          }}
        />

        {/* Eyebrow */}
        <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 mb-14 z-10">
          ● MANIFESTO // HOW WE THINK
        </p>

        {/* Words stacked */}
        <div className="flex flex-col items-center gap-2 sm:gap-4 z-10 w-full max-w-4xl text-center select-none">
          {WORDS.map((w, i) => (
            <div key={i} style={getStyle(i)}>
              <span
                className="block leading-tight font-light"
                style={{
                  fontSize: "clamp(36px, 7vw, 90px)",
                  background: w.accent
                    ? "linear-gradient(90deg, #9780FF, #FF7410)"
                    : undefined,
                  WebkitBackgroundClip: w.accent ? "text" : undefined,
                  WebkitTextFillColor: w.accent ? "transparent" : "#F4F3F6",
                  color: w.accent ? "transparent" : "#F4F3F6",
                }}
              >
                {w.text}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll progress bar */}
        <div className="absolute bottom-10 flex items-center gap-3 font-mono text-[11px] text-zinc-600 uppercase tracking-widest">
          <div className="w-20 h-[1px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#9780FF]"
              style={{ width: `${Math.round(progress * 100)}%`, transition: "width 0.1s" }}
            />
          </div>
          <span>{Math.round(progress * 100)}%</span>
        </div>
      </div>
    </section>
  );
}
