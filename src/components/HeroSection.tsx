"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Zap, Sparkles, Terminal } from "lucide-react";
import gsap from "gsap";

export default function HeroSection() {
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const blobXRef = useRef(0);
  const blobYRef = useRef(0);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);

  // ─── 1. Text unblur intro ───────────────────────────────────────────────────
  useEffect(() => {
    if (!heroTextRef.current) return;
    gsap.fromTo(
      heroTextRef.current,
      { filter: "blur(32px)", opacity: 0, letterSpacing: "0.35em" },
      { filter: "blur(0px)", opacity: 1, letterSpacing: "0.14em", duration: 2.4, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  // ─── 2. Canvas star-field particles (full page, z-0, pointer-events none) ──
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 110;
    const colors = ["#9780FF", "#C4B5FD", "#FF7410", "#00F0FF", "#FFFFFF", "#6366F1"];
    const pts = Array.from({ length: N }, () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      return {
        x, y,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.5,
        a: Math.random() * 0.7 + 0.2,
        c: colors[Math.floor(Math.random() * colors.length)],
      };
    });

    const onMove = (e: MouseEvent) => { mousePosRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const mx = mousePosRef.current.x;
      const my = mousePosRef.current.y;

      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // repel from mouse
        const dx = mx - p.x, dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160 && dist > 0) {
          const force = (1 - dist / 160) * 2.2;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.globalAlpha = p.a;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.c;
        ctx.fillStyle = p.c;
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      canvas.remove();
    };
  }, []);

  // ─── 3. Mouse-tracked iridescent blob & 3D device tilt ──────────────────────
  useEffect(() => {
    let raf: number;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = (e.clientX - cx) / cx;  // -1 to 1
      targetY = (e.clientY - cy) / cy;
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translate(calc(-50% + ${currentX * 60}px), calc(-50% + ${currentY * 40}px))`;
      }
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translate(calc(-50% + ${-currentX * 40}px), calc(-50% + ${-currentY * 30}px))`;
      }
      if (deviceRef.current) {
        deviceRef.current.style.transform = `perspective(1000px) rotateY(${currentX * 10}deg) rotateX(${-currentY * 10}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-32 pb-24 px-4 sm:px-8 md:px-12 bg-[#09080A]" style={{ zIndex: 2 }}>
      {/* Background Chromatic Video Loop */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-20 scale-105">
          <source src="/video/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#09080A]/60 via-[#09080A]/85 to-[#09080A]" />
        <div className="absolute inset-0 pixel-grid-bg opacity-25" />
      </div>

      {/* Main container – z-index above canvas */}
      <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center" style={{ zIndex: 3 }}>
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9780FF] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9780FF]" />
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-300">0→1 COMMERCE STUDIO // CHENNAI NODE</span>
          <span className="text-zinc-600">|</span>
          <span className="font-mono text-[11px] text-[#FF7410]">PROTOTYPE TO SCALE</span>
        </div>

        {/* Headline – one line, blur-to-sharp on load */}
        <h1
          ref={heroTextRef}
          style={{ opacity: 0 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[88px] font-extralight text-white tracking-[0.14em] uppercase leading-none select-none drop-shadow-[0_10px_35px_rgba(151,128,255,0.2)]"
        >
          commerce agents
        </h1>
        <p className="font-editorial text-xl sm:text-2xl text-zinc-300 font-light tracking-wide mt-5 mb-14">
          The 0→1 Product Design &amp; Autonomous Commerce Studio
        </p>

        {/* Center 3D Blob + Device Card */}
        <div className="relative w-full max-w-3xl flex items-center justify-center mb-14" style={{ height: 420 }}>

          {/* Iridescent primary blob */}
          <div
            ref={blob1Ref}
            style={{ position: "absolute", left: "50%", top: "50%", width: 420, height: 420, borderRadius: "50%", filter: "blur(80px)", willChange: "transform", mixBlendMode: "screen" }}
            className="bg-gradient-to-tr from-[#6020FF] via-[#9780FF] to-[#FF7410] opacity-80"
          />

          {/* Secondary complementary blob */}
          <div
            ref={blob2Ref}
            style={{ position: "absolute", left: "50%", top: "50%", width: 300, height: 300, borderRadius: "50%", filter: "blur(70px)", willChange: "transform", mixBlendMode: "screen" }}
            className="bg-gradient-to-bl from-[#00F0FF]/60 via-[#3B82F6]/50 to-transparent opacity-70"
          />

          {/* 3D tilting Device Card */}
          <div
            ref={deviceRef}
            style={{ willChange: "transform", transition: "transform 0.05s linear", position: "relative", zIndex: 4 }}
            className="w-full max-w-sm sm:max-w-md p-1.5 rounded-[36px] bg-gradient-to-b from-white/20 via-white/5 to-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_60px_rgba(151,128,255,0.35)] backdrop-blur-xl border border-white/20"
          >
            <div className="relative rounded-[30px] bg-[#0E0D12] overflow-hidden border border-white/10 p-5 text-left">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[11px] text-zinc-300 uppercase tracking-wider">COMMERCE ENGINE LIVE</span>
                </div>
                <div className="font-mono text-[10px] text-zinc-500">LATENCY: 12ms</div>
              </div>

              <div className="space-y-3">
                {[
                  { icon: Zap, label: "We Two Pets Engine", sub: "0→1 Subscription & Cart", color: "#9780FF", badge: "+100% Bespoke", badgeClr: "emerald" },
                  { icon: Sparkles, label: "Vidya's Kitchen PWA", sub: "WhatsApp Dispatch Board", color: "#FF7410", badge: "Sub-second Sync", badgeClr: "orange" },
                  { icon: Terminal, label: "iRasus EV Telemetry", sub: "3-Tier Battery Triage", color: "#00F0FF", badge: "CAN Stream", badgeClr: "cyan" },
                ].map(({ icon: Icon, label, sub, color, badge, badgeClr }) => (
                  <div key={label} className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.04] border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}22`, color }}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">{label}</div>
                        <div className="text-[11px] text-zinc-400 font-mono">{sub}</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono" style={{ color }}>{badge}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>PARLA / NFM RETAIL</span>
                <span className="text-[#9780FF] font-medium">+31% CONVERSION LIFT</span>
              </div>
            </div>
          </div>
        </div>

        <p className="max-w-2xl text-base sm:text-lg text-zinc-400 font-light leading-relaxed mb-10">
          Founded by <span className="text-white font-medium">Santhosh A</span> in Chennai. We architect high-converting headless commerce engines, proprietary kiosk software, and hardware telemetry dashboards.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a href="#work" className="px-8 py-3.5 rounded-full bg-white text-black hover:bg-zinc-200 font-semibold text-sm transition-all duration-300 flex items-center gap-2 group shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]">
            <span>EXPLORE WORK</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>
          <a href="#contact" className="px-8 py-3.5 rounded-full border border-white/15 hover:border-[#9780FF]/50 bg-white/[0.02] hover:bg-[#9780FF]/10 text-white font-semibold text-sm transition-all duration-300 flex items-center gap-2 group">
            <span>COMMISSION SPRINT</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
