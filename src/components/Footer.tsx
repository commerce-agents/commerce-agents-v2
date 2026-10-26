"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

// Each blob has its own random animation path
function AnimatedBlob({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    let x = 0, y = 0;
    let tx = (Math.random() - 0.5) * 120;
    let ty = (Math.random() - 0.5) * 80;
    let vx = (Math.random() - 0.5) * 0.4;
    let vy = (Math.random() - 0.5) * 0.4;
    let raf: number;

    const speed = 0.008 + Math.random() * 0.012;

    const tick = () => {
      tx += vx;
      ty += vy;
      // bounce softly within bounds
      if (Math.abs(tx) > 120) vx *= -1;
      if (Math.abs(ty) > 80) vy *= -1;

      x += (tx - x) * speed;
      y += (ty - y) * speed;

      el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => cancelAnimationFrame(raf);
  }, []);

  return <div ref={ref} className={className} style={{ position: "absolute", willChange: "transform", ...style }} />;
}

export default function Footer() {
  return (
    <footer className="relative bg-[#060509] pt-20 pb-10 px-6 sm:px-10 md:px-16 overflow-hidden border-t border-white/[0.06]">

      {/* ── TOP ROW: Email (left) + CTA (right) ───────────────────── */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-10 mb-16">
        {/* Left */}
        <div>
          <p className="font-light text-zinc-400 text-sm mb-3 tracking-wide">Let's Build Something Radical</p>
          <a
            href="mailto:santhoshdesignstudio@gmail.com"
            className="block text-3xl sm:text-5xl md:text-[56px] font-light text-white tracking-tight leading-none hover:text-[#9780FF] transition-colors duration-300 break-all"
          >
            santhoshdesignstudio<span className="text-[#9780FF]">@</span>gmail.com
          </a>
        </div>

        {/* Right – CTA box */}
        <div className="shrink-0 flex flex-col items-start md:items-end">
          <h4 className="text-xl sm:text-2xl font-light text-white tracking-tight mb-1">
            Engineer Your Reality
          </h4>
          <p className="text-xs text-zinc-400 font-light mb-6 md:text-right">
            Commission a dedicated 0→1 build sprint with Santhosh A
          </p>
          <a
            href="#contact"
            className="px-7 py-3 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-100 transition-all duration-300 flex items-center gap-2 group shadow-[0_0_25px_rgba(255,255,255,0.2)]"
          >
            <span>Commission Sprint</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* ── LINKS ROW: Portfolio + LinkedIn only ──────────────────── */}
      <div className="max-w-7xl mx-auto border-b border-white/10 pb-8 mb-0">
        <div className="flex flex-wrap items-center justify-between gap-6 text-sm text-zinc-300 font-light">
          <a href="https://designbysanthosh.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
            Portfolio
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
          </a>
          <a href="https://linkedin.com/in/santhosh-a-designer" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            LinkedIn
          </a>
          <a href="mailto:santhoshdesignstudio@gmail.com" className="text-zinc-400 hover:text-white transition-colors">
            santhoshdesignstudio@gmail.com
          </a>
          <span className="font-mono text-xs text-zinc-500">CHENNAI, INDIA // 13.0604° N</span>
        </div>
      </div>

      {/* ── MASSIVE WORDMARK + VOLUMETRIC ANIMATED BLOBS ─────────── */}
      <div className="relative max-w-7xl mx-auto mt-0 pt-12 pb-6 flex flex-col items-center overflow-hidden">
        {/* Moving animated blobs – pure random drift */}
        <AnimatedBlob
          className="w-[55vw] max-w-[700px] h-[240px] rounded-full"
          style={{
            left: "50%", top: "55%",
            background: "radial-gradient(ellipse at center, #7C3AED 0%, #4F46E5 45%, #1E1B4B 100%)",
            filter: "blur(72px)",
            opacity: 0.92,
            mixBlendMode: "screen",
          }}
        />
        <AnimatedBlob
          className="w-[30vw] max-w-[360px] h-[180px] rounded-full"
          style={{
            left: "35%", top: "40%",
            background: "radial-gradient(ellipse at center, #9780FF 0%, #6D28D9 60%, transparent 100%)",
            filter: "blur(55px)",
            opacity: 0.75,
            mixBlendMode: "screen",
          }}
        />
        <AnimatedBlob
          className="w-[20vw] max-w-[260px] h-[140px] rounded-full"
          style={{
            left: "65%", top: "45%",
            background: "radial-gradient(ellipse at center, #2563EB 0%, #1D4ED8 60%, transparent 100%)",
            filter: "blur(50px)",
            opacity: 0.6,
            mixBlendMode: "screen",
          }}
        />

        {/* Big wordmark */}
        <h2
          className="relative z-10 font-bold tracking-tighter text-white uppercase text-center leading-none select-none"
          style={{ fontSize: "clamp(60px, 12vw, 160px)" }}
        >
          COMMERCE AGENTS
        </h2>
      </div>

      {/* ── BOTTOM BAR ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-600 font-mono">
        <span>© 2026 Commerce Agents Studio. All Rights Reserved.</span>
        <div className="flex items-center gap-5">
          <span>Privacy policy</span>
          <span className="text-zinc-700">|</span>
          <span>Terms and conditions</span>
        </div>
      </div>
    </footer>
  );
}
