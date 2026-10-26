"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, ShieldCheck, Zap, Terminal, Sparkles } from "lucide-react";
import gsap from "gsap";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  // Mouse reaction for celestial dots & 3D tilt
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Unblur animation for "commerce agents"
    if (heroTextRef.current) {
      gsap.fromTo(
        heroTextRef.current,
        {
          filter: "blur(24px)",
          opacity: 0,
          scale: 0.95,
          letterSpacing: "0.28em",
        },
        {
          filter: "blur(0px)",
          opacity: 1,
          scale: 1,
          letterSpacing: "0.16em",
          duration: 2.2,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }
  }, []);

  // Interactive Particle Canvas with Mouse Drift
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle definition
    const particleCount = 85;
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
    }> = [];

    const colors = ["#9780FF", "#FF7410", "#00F0FF", "#FFFFFF", "#C4B5FD"];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        radius: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      setMousePos({
        x: (e.clientX - width / 2) / (width / 2),
        y: (e.clientY - height / 2) / (height / 2),
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Subtle drift
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse displacement
        const dx = targetMouseX - p.x;
        const dy = targetMouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 180;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 1.2;
          p.x -= (dx / dist) * force * 2.5;
          p.y -= (dy / dist) * force * 2.5;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-32 pb-24 px-4 sm:px-8 md:px-12 overflow-hidden bg-[#09080A]">
      {/* Interactive Celestial Particle Dots Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-80"
      />

      {/* Background Chromatic Video Loop */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-20 scale-105"
        >
          <source src="/video/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#09080A]/60 via-[#09080A]/85 to-[#09080A]" />
        <div className="absolute inset-0 pixel-grid-bg opacity-25" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow Tag */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-8 group hover:border-[#9780FF]/40 transition-colors">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9780FF] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9780FF]"></span>
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-300">
            0→1 COMMERCE STUDIO // CHENNAI NODE
          </span>
          <span className="text-zinc-600">|</span>
          <span className="font-mono text-[11px] text-[#FF7410]">PROTOTYPE TO SCALE</span>
        </div>

        {/* Master One-Line Headline with Letter Spacing & Forming Unblur */}
        <div className="relative w-full max-w-5xl my-2 flex flex-col items-center">
          <h1
            ref={heroTextRef}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[88px] font-extralight text-white tracking-[0.16em] uppercase leading-none select-none drop-shadow-[0_10px_35px_rgba(151,128,255,0.25)]"
          >
            commerce agents
          </h1>
          <p className="font-editorial text-xl sm:text-2xl md:text-3xl text-zinc-300 font-light tracking-wide mt-4">
            The 0→1 Product Design &amp; Autonomous Commerce Studio
          </p>
        </div>

        {/* Center Iridescent 3D Morphing Blob + Device Showcase (Superconscious Style) */}
        <div className="relative w-full max-w-3xl my-12 flex items-center justify-center">
          {/* Iridescent Organic 3D Center Blob */}
          <div
            ref={blobRef}
            style={{
              transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
              transition: "transform 0.2s ease-out",
            }}
            className="absolute w-80 h-80 sm:w-[480px] sm:h-[480px] rounded-full pointer-events-none filter blur-[50px] opacity-75 animate-pulse"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#582CFF] via-[#9780FF] to-[#FF7410] opacity-90 mix-blend-screen" />
          </div>

          {/* Secondary ambient flare */}
          <div
            style={{
              transform: `translate(${-mousePos.x * 15}px, ${-mousePos.y * 15}px)`,
              transition: "transform 0.25s ease-out",
            }}
            className="absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gradient-to-bl from-[#00F0FF]/30 via-[#9780FF]/40 to-transparent blur-3xl pointer-events-none"
          />

          {/* Floating Device / Interface Showcase */}
          <div
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 8}deg) rotateX(${-mousePos.y * 8}deg)`,
              transition: "transform 0.15s ease-out",
            }}
            className="relative z-10 w-full max-w-md sm:max-w-lg p-1.5 rounded-[36px] bg-gradient-to-b from-white/20 via-white/5 to-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_50px_rgba(151,128,255,0.3)] backdrop-blur-xl border border-white/20 group"
          >
            <div className="relative rounded-[30px] bg-[#0E0D12] overflow-hidden border border-white/10 p-5 text-left">
              {/* Device Notch & Status bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[11px] text-zinc-300 uppercase tracking-wider">
                    COMMERCE ENGINE LIVE
                  </span>
                </div>
                <div className="font-mono text-[10px] text-zinc-500">
                  LATENCY: 12ms // 60 FPS
                </div>
              </div>

              {/* Showcase Screen Mockup Content */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.04] border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#9780FF]/20 flex items-center justify-center text-[#9780FF]">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">We Two Pets Engine</div>
                      <div className="text-[11px] text-zinc-400 font-mono">0→1 Subscription &amp; Cart</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    +100% Bespoke
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.04] border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FF7410]/20 flex items-center justify-center text-[#FF7410]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Vidya's Kitchen PWA</div>
                      <div className="text-[11px] text-zinc-400 font-mono">WhatsApp Dispatch Board</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#FF7410] px-2 py-0.5 rounded bg-[#FF7410]/10 border border-[#FF7410]/20">
                    Sub-second Sync
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.04] border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF]">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">iRasus EV Telemetry</div>
                      <div className="text-[11px] text-zinc-400 font-mono">3-Tier Battery Triage</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#00F0FF] px-2 py-0.5 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/20">
                    CAN Stream
                  </span>
                </div>
              </div>

              {/* Bottom Quick Metric */}
              <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>PARLA / NFM RETAIL</span>
                <span className="text-[#9780FF] font-medium">+31% CONVERSION LIFT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subtitle & Studio Manifesto */}
        <p className="max-w-2xl text-base sm:text-lg text-zinc-400 font-light leading-relaxed mb-10">
          Founded by <span className="text-white font-medium">Santhosh A</span> in Chennai.
          We architect high-converting headless commerce engines, proprietary kiosk software,
          and hardware telemetry dashboards.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="#work"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black hover:bg-zinc-200 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]"
          >
            <span>EXPLORE WORK</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/15 hover:border-[#9780FF]/50 bg-white/[0.02] hover:bg-[#9780FF]/10 text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>COMMISSION SPRINT</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
