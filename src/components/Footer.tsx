"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  // ─── 1. Floating & Evaporating Dots Canvas (Bottom to Top) ───────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf: number;

    const resize = () => {
      if (!canvas || !container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Floating dots that spawn near bottom and rise/evaporate upwards
    const DOT_COUNT = 65;
    const colors = [
      "#FFFFFF",
      "#9780FF",
      "#00F0FF",
      "#FF7410",
      "#C084FC",
      "#F43F5E",
    ];

    interface EvaporatingDot {
      x: number;
      y: number;
      startX: number;
      r: number;
      color: string;
      speedY: number;
      driftSpeed: number;
      driftAmplitude: number;
      phase: number;
      maxHeightRatio: number; // how high it rises before fully vanishing (e.g. 0.1 to 0.5 from bottom)
    }

    const createDot = (initialRandomY = false): EvaporatingDot => {
      const h = canvas.height || 600;
      const w = canvas.width || 1200;
      const startX = Math.random() * w;
      return {
        x: startX,
        startX,
        y: initialRandomY ? h - Math.random() * (h * 0.75) : h + Math.random() * 20,
        r: Math.random() * 1.8 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 0.9 + 0.45, // upward speed
        driftSpeed: Math.random() * 0.02 + 0.008,
        driftAmplitude: Math.random() * 25 + 10,
        phase: Math.random() * Math.PI * 2,
        maxHeightRatio: Math.random() * 0.65 + 0.15, // evaporate by 15% - 80% of height
      };
    };

    let dots: EvaporatingDot[] = Array.from({ length: DOT_COUNT }, () => createDot(true));

    let time = 0;
    const loop = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      time += 0.02;

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.y -= d.speedY;
        d.x = d.startX + Math.sin(time * d.driftSpeed + d.phase) * d.driftAmplitude;

        // Calculate progress from bottom (0) to top target (1)
        const progressFromBottom = (h - d.y) / h;
        const normalized = progressFromBottom / d.maxHeightRatio;

        if (normalized >= 1 || d.y < 0) {
          // Re-spawn dot at bottom
          dots[i] = createDot(false);
          continue;
        }

        // Fade in softly as it leaves the bottom, then evaporate as it rises
        let alpha = 0;
        if (normalized < 0.15) {
          alpha = normalized / 0.15; // fade in
        } else {
          alpha = 1 - (normalized - 0.15) / 0.85; // evaporate out
        }
        alpha = Math.max(0, Math.min(1, alpha)) * 0.75;

        ctx.save();
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = d.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <footer
      ref={containerRef}
      id="contacts"
      className="relative bg-[#07060A] pt-32 pb-14 border-t border-white/[0.06]"
    >
      {/* ── 2. Vivid Moving Volumetric Ambient Gradient Blobs (No Borders/Boxes) ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft volumetric base bloom */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: 480,
            background:
              "radial-gradient(ellipse 130% 90% at 50% 100%, rgba(115, 34, 242, 0.75) 0%, rgba(151, 128, 255, 0.4) 35%, rgba(0, 240, 255, 0.22) 65%, transparent 90%)",
            filter: "blur(70px)",
          }}
        />

        {/* Multi-color organic flares */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: 380,
            background:
              "radial-gradient(circle at 25% 100%, rgba(0, 240, 255, 0.35) 0%, transparent 60%), radial-gradient(circle at 75% 100%, rgba(255, 116, 16, 0.35) 0%, transparent 60%), radial-gradient(circle at 50% 100%, rgba(147, 51, 234, 0.5) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* ── 3. Floating & Evaporating Dots Canvas (Bottom to Top) ─────────────── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* ── 4. TOP SECTION: Direct Inquiries & Sprint Commission ─────────────── */}
      <div className="relative z-20 max-w-[1560px] mx-auto px-6 sm:px-12 md:px-20 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-16 lg:gap-36 mb-36 sm:mb-44">
        {/* Left: Email in one single clean line */}
        <div className="min-w-0 flex-1">
          <p className="font-mono text-xs uppercase tracking-widest text-[#9780FF] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span>INITIATE COLLABORATION // DIRECT CHANNEL</span>
          </p>
          <a
            href="mailto:hello.commerceagents@gmail.com"
            className="inline-block font-light text-white tracking-tight leading-none hover:text-[#9780FF] transition-colors duration-300 drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
            style={{
              fontSize: "clamp(16px, 3.8vw, 44px)",
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
            className="px-8 py-4 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all duration-300 flex items-center gap-2 group shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:scale-105"
          >
            <span>COMMISSION SPRINT</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* ── 5. Brand Wordmark: Pure Text, Completely Free of Glass Boxes ──────── */}
      <div className="relative z-20 w-full px-4 sm:px-8 text-center select-none pb-12">
        <h2
          className="font-bold text-white uppercase leading-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] inline-block"
          style={{
            fontSize: "clamp(20px, 6.5vw, 116px)",
            letterSpacing: "0.12em",
            whiteSpace: "nowrap",
          }}
        >
          COMMERCE AGENTS
        </h2>
      </div>

      {/* ── 6. FOOTER DOWN INFO: Copyright & Policy Links ─────────────────────── */}
      <div className="relative z-20 max-w-[1560px] mx-auto px-6 sm:px-12 md:px-20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400 border-t border-white/[0.08]">
        <div className="flex items-center gap-3">
          <span>© 2026 COMMERCE AGENTS STUDIO. ALL RIGHTS RESERVED.</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors cursor-pointer">
            PRIVACY POLICY
          </Link>
          <span className="text-zinc-600">|</span>
          <Link href="/terms" className="hover:text-white transition-colors cursor-pointer">
            TERMS OF SERVICE
          </Link>
        </div>
      </div>
    </footer>
  );
}
