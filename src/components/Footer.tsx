"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

// Independent randomly-drifting organic gradient blob
function RandomDriftBlob({
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
    let targetX = baseX + (Math.random() - 0.5) * 20;
    let targetY = baseY + (Math.random() - 0.5) * 15;
    let raf: number;

    const pickNewTarget = () => {
      targetX = baseX + (Math.random() - 0.5) * 35;
      targetY = baseY + (Math.random() - 0.5) * 25;
      setTimeout(pickNewTarget, 2000 + Math.random() * 2500);
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
      className="pointer-events-none"
      style={{
        position: "absolute",
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
      className="relative bg-[#060509] pt-24 pb-8 overflow-hidden border-t border-white/[0.08]"
      style={{
        backgroundImage: "url('/images/footer-bg.webp')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 100%",
        backgroundSize: "140% auto",
      }}
    >
      {/* ── TOP SECTION: Direct Inquiries & Sprint Commission ────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-10 mb-20">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-[#9780FF] mb-3">
            ● INITIATE COLLABORATION // DIRECT CHANNEL
          </p>
          <a
            href="mailto:hello.commerceagents@gmail.com"
            className="block font-light text-white tracking-tight leading-none hover:text-[#9780FF] transition-colors duration-300 break-all"
            style={{ fontSize: "clamp(24px, 4.2vw, 58px)" }}
          >
            hello.commerceagents@gmail.com
          </a>
        </div>

        <div className="shrink-0 flex flex-col items-start md:items-end">
          <h4 className="text-xl sm:text-2xl font-light text-white tracking-tight mb-1">
            Upgrade Your Commerce Reality
          </h4>
          <p className="text-xs text-zinc-400 font-light mb-6 md:text-right max-w-xs">
            Commission a dedicated 0→1 build sprint with Santhosh A. Bespoke design &amp; engineering.
          </p>
          <a
            href="#contact"
            className="px-7 py-3.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all duration-300 flex items-center gap-2 group shadow-[0_0_30px_rgba(255,255,255,0.25)]"
          >
            <span>COMMISSION SPRINT</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* ── FULL-BLEED BOTTOM HORIZON GRADIENT & ANIMATED RANDOM BLOBS ─────── */}
      {/* Spans naturally edge-to-edge across the full viewport bottom */}
      <div className="relative w-full overflow-hidden pt-12">
        {/* Layered natural gradient bloom along the entire bottom edge */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: 380,
            background: "radial-gradient(ellipse 130% 90% at 50% 100%, rgba(115, 34, 242, 0.7) 0%, rgba(151, 128, 255, 0.45) 30%, rgba(255, 116, 16, 0.2) 60%, transparent 100%)",
          }}
        />

        {/* 3 Independently animated random-drift blobs floating organically */}
        <RandomDriftBlob
          baseX={50}
          baseY={75}
          width={800}
          height={380}
          gradient="radial-gradient(ellipse, #7322F2 0%, #4F46E5 50%, transparent 80%)"
          blur={85}
          opacity={0.8}
          speed={0.008}
        />
        <RandomDriftBlob
          baseX={32}
          baseY={65}
          width={520}
          height={320}
          gradient="radial-gradient(ellipse, #9780FF 0%, #7C3AED 55%, transparent 80%)"
          blur={70}
          opacity={0.7}
          speed={0.012}
        />
        <RandomDriftBlob
          baseX={68}
          baseY={70}
          width={450}
          height={280}
          gradient="radial-gradient(ellipse, #FF7410 0%, #EA580C 45%, transparent 75%)"
          blur={65}
          opacity={0.45}
          speed={0.01}
        />

        {/* Single-line Wordmark naturally centered over the bottom volumetric gradient */}
        <div className="relative z-10 w-full px-4 text-center select-none pb-6">
          <h2
            className="font-bold tracking-tighter text-white uppercase leading-none drop-shadow-[0_15px_40px_rgba(0,0,0,0.7)]"
            style={{
              fontSize: "clamp(34px, 11vw, 175px)",
              whiteSpace: "nowrap",
            }}
          >
            COMMERCE AGENTS
          </h2>
        </div>

        {/* ── FOOTER DOWN INFO: Copyright & Policy Links ────────────────────────── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 pt-6 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400 border-t border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span>© 2026 COMMERCE AGENTS STUDIO. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">PRIVACY POLICY</span>
            <span className="text-zinc-600">|</span>
            <span className="hover:text-white transition-colors cursor-pointer">TERMS OF SERVICE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
