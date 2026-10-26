"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

// One blob that drifts randomly forever
function DriftBlob({ initX, initY, color, size, blur, opacity, speed }:
  { initX: number; initY: number; color: string; size: number; blur: number; opacity: number; speed: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    let cx = initX, cy = initY;
    let tx = initX + (Math.random() - 0.5) * 140;
    let ty = initY + (Math.random() - 0.5) * 100;
    let raf: number;

    const changeTarget = () => {
      tx = initX + (Math.random() - 0.5) * 180;
      ty = initY + (Math.random() - 0.5) * 120;
      setTimeout(changeTarget, 2500 + Math.random() * 3000);
    };
    changeTarget();

    const tick = () => {
      cx += (tx - cx) * speed;
      cy += (ty - cy) * speed;
      el.style.left = `${cx}%`;
      el.style.top = `${cy}%`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        width: size,
        height: size * 0.55,
        borderRadius: "50%",
        background: color,
        filter: `blur(${blur}px)`,
        opacity,
        transform: "translate(-50%, -50%)",
        mixBlendMode: "screen" as const,
        willChange: "left, top",
        pointerEvents: "none",
      }}
    />
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-[#060509] pt-20 overflow-hidden border-t border-white/[0.06]">

      {/* ── TOP ROW ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-10 mb-16">
        <div>
          <p className="text-zinc-400 text-sm font-light mb-3">Let's Build Something Radical</p>
          <a
            href="mailto:hello.commerceagents@gmail.com"
            className="block font-light text-white tracking-tight leading-none hover:text-[#9780FF] transition-colors duration-300 break-all"
            style={{ fontSize: "clamp(22px, 3.8vw, 56px)" }}
          >
            hello.commerceagents@gmail.com
          </a>
        </div>

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

      {/* ── LINKS ROW ───────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 border-b border-white/10 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-6 text-sm text-zinc-300 font-light">
          <a href="https://designbysanthosh.com" target="_blank" rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5">
            Portfolio <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
          </a>
          <a href="https://linkedin.com/in/santhosh-a-designer" target="_blank" rel="noopener noreferrer"
            className="hover:text-white transition-colors">
            LinkedIn
          </a>
          <a href="mailto:hello.commerceagents@gmail.com"
            className="text-zinc-400 hover:text-white transition-colors">
            hello.commerceagents@gmail.com
          </a>
          <span className="font-mono text-xs text-zinc-500">CHENNAI, INDIA // 13.0604° N</span>
        </div>
      </div>

      {/* ── WORDMARK + FULL-BLEED ANIMATED GRADIENT BLOBS ──────────── */}
      {/* This div must NOT have overflow:hidden — blobs bleed to edges */}
      <div
        className="relative"
        style={{ paddingTop: 56, paddingBottom: 0 }}
      >
        {/* Blobs live behind the text, positioned relative to this container */}
        {/* They are positioned as % of container width/height so they span naturally */}
        <DriftBlob initX={50} initY={65} size={900} blur={88} opacity={0.88}
          color="radial-gradient(ellipse, #6D28D9 0%, #4338CA 40%, #1e1040 100%)" speed={0.007} />
        <DriftBlob initX={38} initY={55} size={500} blur={65} opacity={0.7}
          color="radial-gradient(ellipse, #9780FF 0%, #7C3AED 55%, transparent 100%)" speed={0.009} />
        <DriftBlob initX={62} initY={70} size={380} blur={55} opacity={0.55}
          color="radial-gradient(ellipse, #2563EB 0%, #1D4ED8 55%, transparent 100%)" speed={0.011} />

        {/* Wordmark — one line, edge-to-edge with fluid font size */}
        <h2
          className="relative z-10 font-bold tracking-tighter text-white uppercase text-center leading-none select-none"
          style={{
            fontSize: "clamp(48px, 13.5vw, 200px)",
            paddingBottom: "clamp(20px, 4vw, 60px)",
            // Ensure it stays on one line
            whiteSpace: "nowrap",
          }}
        >
          COMMERCE AGENTS
        </h2>
      </div>

      {/* ── BOTTOM COPYRIGHT BAR ────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-600 font-mono border-t border-white/[0.04]">
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
