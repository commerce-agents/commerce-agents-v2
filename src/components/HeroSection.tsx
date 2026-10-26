"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Zap, Sparkles, Terminal, Activity, Cpu, ShieldCheck } from "lucide-react";
import gsap from "gsap";

interface HeroSectionProps {
  onIntroComplete?: () => void;
}

export default function HeroSection({ onIntroComplete }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const titleTargetRef = useRef<HTMLHeadingElement>(null);

  // Overlay intro refs
  const introOverlayRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLHeadingElement>(null);
  const hasIntroRunRef = useRef(false);

  // 3D Tilt Card container ref
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  const [showIntroOverlay, setShowIntroOverlay] = useState(true);
  const mousePosRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });

  // ─── 1. Glitch-Free, Single-Execution Intro Transition ───────────────────────
  useEffect(() => {
    // Prevent React Strict Mode double-run
    if (hasIntroRunRef.current) return;
    hasIntroRunRef.current = true;

    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    const introText = introTextRef.current;
    const overlay = introOverlayRef.current;
    const heroContent = heroContentRef.current;
    const heroTitle = titleTargetRef.current;

    if (!introText || !overlay || !heroContent || !heroTitle) return;

    // Initially hide the hero content completely
    gsap.set(heroContent, { opacity: 0, y: 25 });
    gsap.set(heroTitle, { opacity: 0 });

    // Initial state for centered text in intro overlay
    gsap.set(introText, {
      opacity: 0,
      filter: "blur(40px)",
      letterSpacing: "0.45em",
      scale: 0.94,
    });

    const tl = gsap.timeline();

    // 1. Text unblurs smoothly at the dead center of the screen
    tl.to(introText, {
      opacity: 1,
      filter: "blur(0px)",
      letterSpacing: "0.14em",
      scale: 1,
      duration: 1.6,
      ease: "power3.out",
      delay: 0.2,
    })
      // 2. Hold momentarily so user sees crystal clear text in pure black
      .to({}, { duration: 0.35 })
      // 3. Glide smoothly up towards Hero position while hero elements fade in
      .call(() => {
        // Compute delta to target title
        const targetRect = heroTitle.getBoundingClientRect();
        const introRect = introText.getBoundingClientRect();
        const deltaY = targetRect.top - introRect.top;

        gsap.to(introText, {
          y: deltaY,
          duration: 1.15,
          ease: "power3.inOut",
        });
      })
      // 4. Fade in hero content underneath smoothly
      .to(
        heroContent,
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: "power2.out",
        },
        "+=0.4"
      )
      // 5. Cross-fade from intro overlay text to real hero title
      .to(
        heroTitle,
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        overlay,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            setShowIntroOverlay(false);
            document.body.style.overflow = "";
            onIntroComplete?.();
          },
        },
        "-=0.3"
      );

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, [onIntroComplete]);

  // ─── 2. Interactive White Star Canvas inside Hero ───────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;
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

    const N = 120;
    const colors = ["#FFFFFF", "#FFFFFF", "#F8FAFC", "#E0E7FF", "#C4B5FD", "#9780FF"];
    const pts = Array.from({ length: N }, () => {
      const x = Math.random() * (canvas.width || window.innerWidth);
      const y = Math.random() * (canvas.height || window.innerHeight);
      return {
        x,
        y,
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

      const cx = rect.width / 2;
      const cy = rect.height / 2;
      mousePosRef.current.targetX = (mx - cx) / cx;
      mousePosRef.current.targetY = (my - cy) / cy;

      const repelRadius = 160;
      for (const p of pts) {
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < repelRadius && dist > 0) {
          const force = (1 - dist / repelRadius) * 2.4;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

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

  // ─── 3. Dynamic 3-Card Parallax & Tilting ───────────────────────────────────
  useEffect(() => {
    let raf: number;

    const tick = () => {
      const m = mousePosRef.current;
      m.currentX += (m.targetX - m.currentX) * 0.06;
      m.currentY += (m.targetY - m.currentY) * 0.06;

      const tx = m.currentX;
      const ty = m.currentY;

      // Blob moves with organic lag behind cards
      if (blobRef.current) {
        blobRef.current.style.transform = `translate(calc(-50% + ${tx * 60}px), calc(-50% + ${ty * 40}px)) scale(${1 + Math.abs(tx) * 0.05})`;
      }

      // Center card tilts subtly directly with mouse
      if (centerCardRef.current) {
        centerCardRef.current.style.transform = `perspective(1000px) rotateY(${tx * 8}deg) rotateX(${-ty * 8}deg) translateZ(20px)`;
      }

      // Left card has base inward tilt (-14deg rotateY) + mouse parallax
      if (leftCardRef.current) {
        leftCardRef.current.style.transform = `perspective(1000px) rotateY(${14 + tx * 6}deg) rotateX(${-ty * 6}deg) rotateZ(-3deg) translateZ(-10px)`;
      }

      // Right card has base inward tilt (+14deg rotateY) + mouse parallax
      if (rightCardRef.current) {
        rightCardRef.current.style.transform = `perspective(1000px) rotateY(${-14 + tx * 6}deg) rotateX(${-ty * 6}deg) rotateZ(3deg) translateZ(-10px)`;
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center pt-32 pb-24 px-4 sm:px-6 md:px-12 bg-[#09080A] overflow-hidden"
    >
      {/* ─── PURE BLACK INTRO OVERLAY (Runs once, no loader, pure centered text) ─── */}
      {showIntroOverlay && (
        <div
          ref={introOverlayRef}
          className="fixed inset-0 z-[100] bg-[#09080A] flex items-center justify-center pointer-events-none select-none px-4"
        >
          <h1
            ref={introTextRef}
            className="font-light text-white uppercase text-center drop-shadow-[0_15px_40px_rgba(151,128,255,0.35)]"
            style={{
              fontSize: "clamp(30px, 6.8vw, 88px)",
              whiteSpace: "nowrap",
            }}
          >
            COMMERCE AGENTS
          </h1>
        </div>
      )}

      {/* Background Chromatic Video Loop */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-20 scale-105">
          <source src="/video/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#09080A]/60 via-[#09080A]/85 to-[#09080A]" />
        <div className="absolute inset-0 pixel-grid-bg opacity-25" />
      </div>

      {/* Interactive White Dot Stars Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* ─── HERO CONTENT ──────────────────────────────────────────────────────── */}
      <div
        ref={heroContentRef}
        className="relative max-w-7xl mx-auto flex flex-col items-center text-center z-20 w-full"
      >
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

        {/* Real Hero Headline – strictly single line, elegant letter spacing */}
        <h1
          ref={titleTargetRef}
          className="font-light text-white uppercase leading-none select-none drop-shadow-[0_12px_40px_rgba(151,128,255,0.25)]"
          style={{
            fontSize: "clamp(30px, 6.8vw, 88px)",
            letterSpacing: "0.14em",
            whiteSpace: "nowrap",
          }}
        >
          COMMERCE AGENTS
        </h1>

        {/* Subtitle */}
        <p className="font-editorial text-xl sm:text-2xl text-zinc-300 font-light tracking-wide mt-5 mb-14 max-w-2xl">
          The 0→1 Product Design &amp; Autonomous Commerce Studio
        </p>

        {/* ─── 3 CONNECTED 3D STATS CARDS WITH NEON CONDUITS ────────────────────── */}
        <div
          ref={cardsContainerRef}
          className="relative w-full max-w-6xl flex items-center justify-center my-6"
          style={{ minHeight: 460 }}
        >
          {/* Volumetric Organic Iridescent Glow behind cards */}
          <div
            ref={blobRef}
            className="pointer-events-none transition-transform duration-100 ease-out absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: 720,
              height: 480,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(151,128,255,0.55) 0%, rgba(115,34,242,0.35) 45%, rgba(255,116,16,0.18) 70%, transparent 80%)",
              filter: "blur(90px)",
              willChange: "transform",
            }}
          />

          {/* SVG Glowing Neon Circuit Lines connecting Center Card to Left and Right */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-15 hidden lg:block"
            viewBox="0 0 1150 460"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="neonPurple" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="neonCyan" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="leftNeonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9780FF" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#00F0FF" stopOpacity="1" />
                <stop offset="100%" stopColor="#9780FF" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="rightNeonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#FF7410" stopOpacity="1" />
                <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Left Conduit (From Left Card to Center Card) */}
            <path
              d="M 330 230 L 370 230 L 400 200 L 430 200"
              stroke="url(#leftNeonGrad)"
              strokeWidth="2"
              strokeDasharray="6 4"
              filter="url(#neonPurple)"
              className="animate-pulse"
            />
            {/* Left Terminal Nodes */}
            <circle cx="330" cy="230" r="4.5" fill="#9780FF" filter="url(#neonPurple)" />
            <circle cx="430" cy="200" r="4.5" fill="#00F0FF" filter="url(#neonPurple)" />

            {/* Right Conduit (From Center Card to Right Card) */}
            <path
              d="M 720 200 L 750 200 L 780 230 L 820 230"
              stroke="url(#rightNeonGrad)"
              strokeWidth="2"
              strokeDasharray="6 4"
              filter="url(#neonCyan)"
              className="animate-pulse"
            />
            {/* Right Terminal Nodes */}
            <circle cx="720" cy="200" r="4.5" fill="#00F0FF" filter="url(#neonCyan)" />
            <circle cx="820" cy="230" r="4.5" fill="#FF7410" filter="url(#neonCyan)" />
          </svg>

          {/* ── CARD 1: Left Card (Tilted Inward) – WE TWO PETS D2C STATS ───────── */}
          <div
            ref={leftCardRef}
            style={{ willChange: "transform", zIndex: 12 }}
            className="hidden lg:block w-72 shrink-0 p-1 rounded-[28px] bg-gradient-to-b from-white/15 via-white/5 to-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_40px_rgba(151,128,255,0.2)] backdrop-blur-xl border border-white/15 transition-all duration-300 hover:border-[#9780FF]/50"
          >
            <div className="rounded-[24px] bg-[#0C0B10]/95 p-4 text-left border border-white/5 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#9780FF] animate-pulse" />
                  <span className="font-mono text-[10px] text-zinc-300 uppercase tracking-wider">
                    WE TWO PETS D2C
                  </span>
                </div>
                <span className="font-mono text-[9px] text-[#9780FF] bg-[#9780FF]/10 px-2 py-0.5 rounded-full border border-[#9780FF]/20">
                  NODE #02
                </span>
              </div>

              {/* Stat Rows */}
              <div className="space-y-2 text-[11px] font-mono">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-zinc-500 uppercase">RECURRING REVENUE</div>
                  <div className="text-sm font-semibold text-white mt-0.5">+142% MoM</div>
                  <div className="text-[9px] text-emerald-400 mt-0.5">● Auto-subscription cart</div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-zinc-500 uppercase">CHECKOUT LATENCY</div>
                  <div className="text-sm font-semibold text-[#00F0FF] mt-0.5">88ms Fast Path</div>
                  <div className="text-[9px] text-zinc-400 mt-0.5">Zero-bounce funnel</div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span className="flex items-center gap-1 text-[#9780FF]">
                  <Activity className="w-3 h-3" /> STREAM LIVE
                </span>
                <span>SYNC: 100%</span>
              </div>
            </div>
          </div>

          {/* ── CARD 2: Center Card (Main Device) – COMMERCE ENGINE TERMINAL ───── */}
          <div
            ref={centerCardRef}
            style={{ willChange: "transform", zIndex: 20 }}
            className="w-full max-w-sm sm:max-w-md p-1.5 rounded-[36px] bg-gradient-to-b from-white/20 via-white/5 to-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_60px_rgba(151,128,255,0.35)] backdrop-blur-2xl border border-white/20 mx-2 lg:mx-6"
          >
            <div className="rounded-[30px] bg-[#0E0D12]/95 backdrop-blur-2xl overflow-hidden border border-white/10 p-5 text-left">
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[11px] text-zinc-300 uppercase tracking-wider">
                    COMMERCE ENGINE LIVE
                  </span>
                </div>
                <div className="font-mono text-[10px] text-zinc-500">LATENCY: 12ms</div>
              </div>

              {/* Rows */}
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

              {/* Bottom Telemetry Bar */}
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9780FF]" />
                  AUTONOMOUS DISPATCH
                </span>
                <span className="text-zinc-500">NODE #01</span>
              </div>
            </div>
          </div>

          {/* ── CARD 3: Right Card (Tilted Inward) – IRASUS EV TELEMETRY STATS ───── */}
          <div
            ref={rightCardRef}
            style={{ willChange: "transform", zIndex: 12 }}
            className="hidden lg:block w-72 shrink-0 p-1 rounded-[28px] bg-gradient-to-b from-white/15 via-white/5 to-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_40px_rgba(0,240,255,0.2)] backdrop-blur-xl border border-white/15 transition-all duration-300 hover:border-[#00F0FF]/50"
          >
            <div className="rounded-[24px] bg-[#0C0B10]/95 p-4 text-left border border-white/5 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                  <span className="font-mono text-[10px] text-zinc-300 uppercase tracking-wider">
                    IRASUS IOT CLOUD
                  </span>
                </div>
                <span className="font-mono text-[9px] text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 rounded-full border border-[#00F0FF]/20">
                  NODE #03
                </span>
              </div>

              {/* Stat Rows */}
              <div className="space-y-2 text-[11px] font-mono">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-zinc-500 uppercase">CAN BUS STREAM</div>
                  <div className="text-sm font-semibold text-white mt-0.5">10,000 pkt/sec</div>
                  <div className="text-[9px] text-cyan-400 mt-0.5">● Sub-second telemetry</div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-zinc-500 uppercase">THERMAL RUNAWAY TRIAGE</div>
                  <div className="text-sm font-semibold text-[#FF7410] mt-0.5">0.00s Zero Delay</div>
                  <div className="text-[9px] text-zinc-400 mt-0.5">Neural pack monitoring</div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span className="flex items-center gap-1 text-[#00F0FF]">
                  <Cpu className="w-3 h-3" /> CAN ONLINE
                </span>
                <span>PACKS: 1,420+</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
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
