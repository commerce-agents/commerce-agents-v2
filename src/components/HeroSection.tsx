"use client";

import React, { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, Zap, Sparkles, Terminal } from "lucide-react";
import gsap from "gsap";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: -1000, y: -1000, targetX: 0, targetY: 0, currentX: 0, currentY: 0 });
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);

  // ─── 1. White Dot Stars Canvas inside Hero Section ─────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      canvas.width = containerRef.current.clientWidth;
      canvas.height = containerRef.current.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create 130 crisp white & soft tint stars
    const N = 130;
    const colors = ["#FFFFFF", "#FFFFFF", "#F8FAFC", "#E0E7FF", "#C4B5FD", "#9780FF"];
    const pts = Array.from({ length: N }, () => {
      const x = Math.random() * (canvas.width || window.innerWidth);
      const y = Math.random() * (canvas.height || window.innerHeight);
      return {
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.5 + 0.6,
        alpha: Math.random() * 0.65 + 0.35,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });

    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      mousePosRef.current.x = mx;
      mousePosRef.current.y = my;

      // Normalized coordinates (-1 to 1) for 3D tilt & blob drift
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      mousePosRef.current.targetX = (mx - cx) / cx;
      mousePosRef.current.targetY = (my - cy) / cy;
    };

    window.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const mx = mousePosRef.current.x;
      const my = mousePosRef.current.y;

      for (const p of pts) {
        // Natural drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around borders
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Mouse repulsion & interaction
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 160;

        if (dist < repelRadius && dist > 0) {
          const force = (1 - dist / repelRadius) * 2.4;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        }

        // Star twinkle
        p.alpha += Math.sin(Date.now() * p.twinkleSpeed) * 0.01;
        const curAlpha = Math.max(0.2, Math.min(1, p.alpha));

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.globalAlpha = curAlpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // ─── 2. Smooth Mouse-Tracked Iridescent Blob & Device Tilt ───────────────────
  useEffect(() => {
    let raf: number;

    const tick = () => {
      const m = mousePosRef.current;
      m.currentX += (m.targetX - m.currentX) * 0.06;
      m.currentY += (m.targetY - m.currentY) * 0.06;

      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translate(calc(-50% + ${m.currentX * 70}px), calc(-50% + ${m.currentY * 50}px)) scale(${1 + Math.abs(m.currentX) * 0.05})`;
      }
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translate(calc(-50% + ${-m.currentX * 50}px), calc(-50% + ${-m.currentY * 35}px))`;
      }
      if (deviceRef.current) {
        deviceRef.current.style.transform = `perspective(1000px) rotateY(${m.currentX * 10}deg) rotateX(${-m.currentY * 10}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center pt-32 pb-24 px-4 sm:px-8 md:px-12 bg-[#09080A] overflow-hidden"
    >
      {/* Background Chromatic Video Loop */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-20 scale-105">
          <source src="/video/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#09080A]/60 via-[#09080A]/85 to-[#09080A]" />
        <div className="absolute inset-0 pixel-grid-bg opacity-25" />
      </div>

      {/* Interactive White Dot Stars Canvas – Mounted directly inside Hero */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Hero Foreground Content */}
      <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center z-20">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(151,128,255,0.1)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9780FF] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9780FF]" />
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-300">
            0→1 COMMERCE STUDIO // CHENNAI NODE
          </span>
          <span className="text-zinc-600">|</span>
          <span className="font-mono text-[11px] text-[#FF7410]">PROTOTYPE TO SCALE</span>
        </div>

        {/* Hero Title – Solid, crisp, sharp in one single line (No preloader blur effect here) */}
        <h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[88px] font-extralight text-white tracking-[0.14em] uppercase leading-none select-none drop-shadow-[0_12px_40px_rgba(151,128,255,0.25)]"
        >
          COMMERCE AGENTS
        </h1>

        <p className="font-editorial text-xl sm:text-2xl text-zinc-300 font-light tracking-wide mt-5 mb-14 max-w-2xl">
          The 0→1 Product Design &amp; Autonomous Commerce Studio
        </p>

        {/* Center 3D Iridescent Moving Blob + Interactive Device Card */}
        <div className="relative w-full max-w-3xl flex items-center justify-center mb-14" style={{ height: 440 }}>
          {/* Prominent Iridescent Primary Center Blob (Visible & Organically Moving) */}
          <div
            ref={blob1Ref}
            className="pointer-events-none transition-transform duration-75 ease-out"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 540,
              height: 540,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(151,128,255,0.6) 0%, rgba(115,34,242,0.45) 40%, rgba(255,116,16,0.25) 70%, transparent 80%)",
              filter: "blur(75px)",
              willChange: "transform",
            }}
          />

          {/* Secondary Cyan/Blue Ambient Flare Blob */}
          <div
            ref={blob2Ref}
            className="pointer-events-none transition-transform duration-75 ease-out"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 380,
              height: 380,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,240,255,0.35) 0%, rgba(59,130,246,0.25) 50%, transparent 75%)",
              filter: "blur(65px)",
              willChange: "transform",
            }}
          />

          {/* 3D Tilting Glass Device Card */}
          <div
            ref={deviceRef}
            style={{ willChange: "transform", position: "relative", zIndex: 10 }}
            className="w-full max-w-sm sm:max-w-md p-1.5 rounded-[36px] bg-gradient-to-b from-white/20 via-white/5 to-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_60px_rgba(151,128,255,0.35)] backdrop-blur-xl border border-white/20"
          >
            <div className="relative rounded-[30px] bg-[#0E0D12]/90 backdrop-blur-2xl overflow-hidden border border-white/10 p-5 text-left">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[11px] text-zinc-300 uppercase tracking-wider">
                    COMMERCE ENGINE LIVE
                  </span>
                </div>
                <div className="font-mono text-[10px] text-zinc-500">LATENCY: 12ms</div>
              </div>

              <div className="space-y-3">
                {[
                  { icon: Zap, label: "We Two Pets Engine", sub: "0→1 Subscription & Cart", color: "#9780FF", badge: "+100% Bespoke" },
                  { icon: Sparkles, label: "Vidya's Kitchen PWA", sub: "WhatsApp Dispatch Board", color: "#FF7410", badge: "Sub-second Sync" },
                  { icon: Terminal, label: "iRasus EV Telemetry", sub: "3-Tier Battery Triage", color: "#00F0FF", badge: "CAN Stream" },
                ].map(({ icon: Icon, label, sub, color, badge }) => (
                  <div key={label} className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.04] border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}22`, color }}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white">{label}</div>
                        <div className="text-[10px] text-zinc-400 font-mono">{sub}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-zinc-300 border border-white/5">
                      {badge}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9780FF]" />
                  AUTONOMOUS DISPATCH
                </span>
                <span className="text-zinc-500">NODE #01</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#9780FF] via-[#a892ff] to-[#FF7410] text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(151,128,255,0.4)] hover:scale-105 flex items-center justify-center gap-2"
          >
            <span>COMMISSION SPRINT</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="#work"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/10 font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>EXPLORE WORK</span>
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
