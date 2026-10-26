"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

// Living, autonomous randomly-drifting volumetric gradient blob
function MovingGradientBlob({
  baseX,
  baseY,
  width,
  height,
  gradient,
  blur,
  opacity,
  speed,
}: {
  baseX: number;
  baseY: number;
  width: number;
  height: number;
  gradient: string;
  blur: number;
  opacity: number;
  speed: number;
}) {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!blobRef.current) return;
    const el = blobRef.current;
    let currentX = baseX;
    let currentY = baseY;
    let targetX = baseX + (Math.random() - 0.5) * 25;
    let targetY = baseY + (Math.random() - 0.5) * 15;
    let raf: number;

    const pickNewTarget = () => {
      targetX = baseX + (Math.random() - 0.5) * 35;
      targetY = baseY + (Math.random() - 0.5) * 20;
      setTimeout(pickNewTarget, 2000 + Math.random() * 2000);
    };
    pickNewTarget();

    const loop = () => {
      currentX += (targetX - currentX) * speed;
      currentY += (targetY - currentY) * speed;
      el.style.left = `${currentX}%`;
      el.style.top = `${currentY}%`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => cancelAnimationFrame(raf);
  }, [baseX, baseY, speed]);

  return (
    <div
      ref={blobRef}
      className="pointer-events-none absolute"
      style={{
        width,
        height,
        borderRadius: "50%",
        background: gradient,
        filter: `blur(${blur}px)`,
        opacity,
        transform: "translate(-50%, -50%)",
        willChange: "left, top",
      }}
    />
  );
}

export default function Footer() {
  return (
    <footer
      id="contacts"
      className="relative bg-[#07060A] pt-32 pb-12 overflow-hidden border-t border-white/[0.06]"
    >
      {/* ── 1. Living, Moving Bright Volumetric Gradient Blobs ───────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep ambient horizon base */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: 480,
            background:
              "radial-gradient(ellipse 130% 90% at 50% 100%, rgba(115, 34, 242, 0.75) 0%, rgba(151, 128, 255, 0.4) 35%, rgba(0, 240, 255, 0.2) 65%, transparent 90%)",
            filter: "blur(70px)",
          }}
        />

        {/* 4 Independently moving vivid color blobs */}
        <MovingGradientBlob
          baseX={50}
          baseY={80}
          width={800}
          height={380}
          gradient="radial-gradient(ellipse, #7322F2 0%, #4F46E5 50%, transparent 80%)"
          blur={80}
          opacity={0.85}
          speed={0.009}
        />
        <MovingGradientBlob
          baseX={30}
          baseY={72}
          width={600}
          height={340}
          gradient="radial-gradient(ellipse, #00F0FF 0%, #2563EB 55%, transparent 80%)"
          blur={75}
          opacity={0.65}
          speed={0.012}
        />
        <MovingGradientBlob
          baseX={70}
          baseY={75}
          width={580}
          height={320}
          gradient="radial-gradient(ellipse, #FF7410 0%, #F43F5E 50%, transparent 80%)"
          blur={70}
          opacity={0.55}
          speed={0.01}
        />
        <MovingGradientBlob
          baseX={50}
          baseY={65}
          width={500}
          height={300}
          gradient="radial-gradient(ellipse, #C084FC 0%, #9333EA 50%, transparent 80%)"
          blur={65}
          opacity={0.7}
          speed={0.014}
        />
      </div>

      {/* ── 2. TOP SECTION: Direct Inquiries & Sprint Commission ─────────────── */}
      <div className="relative z-10 max-w-[1560px] mx-auto px-6 sm:px-12 md:px-20 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-16 lg:gap-36 mb-36 sm:mb-44">
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
              fontSize: "clamp(22px, 2.7vw, 44px)",
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

      {/* ── 3. Brand Wordmark: 100% Fully Visible, Centered, Never Clipped ─────── */}
      <div className="relative z-10 w-full px-4 sm:px-8 text-center select-none pb-14 overflow-hidden">
        <h2
          className="font-bold text-white uppercase leading-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] inline-block max-w-full"
          style={{
            fontSize: "clamp(26px, 6.7vw, 116px)",
            letterSpacing: "0.12em",
            whiteSpace: "nowrap",
          }}
        >
          COMMERCE AGENTS
        </h2>
      </div>

      {/* ── 4. FOOTER DOWN INFO: Copyright & Policy Links ─────────────────────── */}
      <div className="relative z-10 max-w-[1560px] mx-auto px-6 sm:px-12 md:px-20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400 border-t border-white/[0.08]">
        <div className="flex items-center gap-3">
          <span>© 2026 COMMERCE AGENTS STUDIO. ALL RIGHTS RESERVED.</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-white transition-colors cursor-pointer">PRIVACY POLICY</span>
          <span className="text-zinc-600">|</span>
          <span className="hover:text-white transition-colors cursor-pointer">TERMS OF SERVICE</span>
        </div>
      </div>
    </footer>
  );
}
