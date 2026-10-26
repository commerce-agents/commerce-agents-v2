"use client";

import React, { useEffect, useRef, useState } from "react";

// Each phrase unblurs as you scroll through it
const PHRASES = [
  { text: "WE BUILD", accent: false },
  { text: "PRODUCTS", accent: true },   // purple
  { text: "THAT ACTUALLY", accent: false },
  { text: "CONVERT.", accent: false },
  { text: "NO TEMPLATES.", accent: false },
  { text: "NO MIDDLEMEN.", accent: false },
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

  const total = PHRASES.length;

  // Each phrase occupies (1/total) of the scroll range
  // active center = i / (total - 1)
  const getStyle = (i: number) => {
    const center = i / (total - 1);
    const dist = Math.abs(progress - center);
    // Focus window: ±0.18 of scroll = crisp
    const t = Math.max(0, 1 - dist / 0.18);

    const blur = (1 - t) * 22;
    const opacity = 0.07 + t * 0.93;
    const scale = 0.88 + t * 0.12;
    return { filter: `blur(${blur.toFixed(1)}px)`, opacity, transform: `scale(${scale.toFixed(3)})`, transition: "all 0.12s ease-out" };
  };

  return (
    <section ref={sectionRef} className="relative bg-[#08070A]" style={{ height: "320vh" }}>
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute pointer-events-none w-[500px] h-[300px] rounded-full bg-gradient-to-tr from-[#9780FF]/12 via-[#FF7410]/8 to-transparent blur-[120px]" />

        {/* Eyebrow */}
        <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-16 z-10">
          ● MANIFESTO // HOW WE THINK
        </p>

        {/* Stacked phrases */}
        <div className="flex flex-col items-center gap-3 sm:gap-5 z-10 w-full max-w-4xl text-center select-none">
          {PHRASES.map((phrase, i) => (
            <div
              key={i}
              style={getStyle(i)}
              className="will-change-[filter,opacity,transform]"
            >
              <span
                className={`text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-none ${
                  phrase.accent
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-[#9780FF] to-[#FF7410]"
                    : "text-white"
                }`}
              >
                {phrase.text}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll progress indicator */}
        <div className="absolute bottom-10 flex items-center gap-2.5 font-mono text-[11px] text-zinc-600 uppercase tracking-widest">
          <div className="w-24 h-[1px] bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-[#9780FF] transition-all duration-150" style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>
          <span>{Math.round(progress * 100)}%</span>
        </div>
      </div>
    </section>
  );
}
