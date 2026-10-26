"use client";

import React, { useEffect, useState, useRef } from "react";
import lottie from "lottie-web";
import gsap from "gsap";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const lottieContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const animInstance = useRef<any>(null);

  // ─── Load Lottie ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!lottieContainerRef.current) return;
    animInstance.current = lottie.loadAnimation({
      container: lottieContainerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/lottie/preloader.json",
    });
    return () => { if (animInstance.current) animInstance.current.destroy(); };
  }, []);

  // ─── Animate "COMMERCE AGENTS" text: blur → sharp ─────────────────────────
  useEffect(() => {
    if (!textRef.current) return;
    gsap.fromTo(
      textRef.current,
      { filter: "blur(40px)", letterSpacing: "0.5em", opacity: 0.4 },
      { filter: "blur(0px)", letterSpacing: "0.18em", opacity: 1, duration: 2.8, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  // ─── Progress counter ──────────────────────────────────────────────────────
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 5) + 3;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setTimeout(finishIntro, 500);
      } else {
        setProgress(current);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const finishIntro = () => {
    if (isFinished) return;
    setIsFinished(true);
    gsap.timeline({
      onComplete: () => {
        if (preloaderRef.current) preloaderRef.current.style.display = "none";
        if (onComplete) onComplete();
      },
    })
      .to(lottieContainerRef.current, { scale: 1.1, opacity: 0, duration: 0.5, ease: "power2.inOut" })
      .to(textRef.current, { opacity: 0, y: -20, duration: 0.4, ease: "power2.out" }, "-=0.4")
      .to(bottomRef.current, { opacity: 0, duration: 0.3 }, "-=0.3")
      .to(preloaderRef.current, { yPercent: -100, duration: 0.85, ease: "expo.inOut" }, "-=0.1");
  };

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#080709] px-6 py-8 md:px-12 md:py-10 select-none"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between text-xs tracking-wider uppercase font-mono text-zinc-400">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9780FF] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9780FF]" />
          </span>
          <span>COMMERCE AGENTS // STUDIO BOOT</span>
        </div>
        <button
          onClick={finishIntro}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-[#9780FF]/40 bg-white/[0.02] hover:bg-[#9780FF]/10 text-zinc-400 hover:text-white transition-all duration-300 text-[11px]"
        >
          <span>SKIP INTRO</span>
          <span className="text-[9px]">[ESC]</span>
        </button>
      </div>

      {/* Center: Lottie above, then big blurred→clear wordmark below */}
      <div className="flex flex-col items-center justify-center gap-10 my-auto">
        {/* Ambient glow */}
        <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-[#9780FF]/25 via-[#FF7410]/15 to-transparent blur-[100px] pointer-events-none" />

        {/* Lottie animation */}
        <div
          ref={lottieContainerRef}
          className="relative w-28 h-28 sm:w-40 sm:h-40 flex items-center justify-center"
        />

        {/* Big "COMMERCE AGENTS" blur-to-sharp */}
        <div ref={textRef} className="flex flex-col items-center gap-1 text-center">
          <h1
            className="font-bold text-white uppercase leading-none"
            style={{ fontSize: "clamp(36px, 9vw, 110px)", letterSpacing: "0.18em" }}
          >
            COMMERCE AGENTS
          </h1>
          <p className="font-mono text-xs text-zinc-400 tracking-widest uppercase mt-3">
            0→1 PRODUCT &amp; COMMERCE STUDIO
          </p>
        </div>

        {/* Progress bar */}
        <div className="flex flex-col items-center gap-3 mt-2">
          <div className="font-mono text-3xl font-light text-white flex items-baseline gap-1">
            <span>{String(progress).padStart(2, "0")}</span>
            <span className="text-base text-[#9780FF]">%</span>
          </div>
          <div className="w-56 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#9780FF] via-[#FF7410] to-[#00F0FF] transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom telemetry */}
      <div
        ref={bottomRef}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] font-mono text-zinc-400 border-t border-white/5 pt-4 gap-2"
      >
        <div className="flex items-center gap-4">
          <span className="text-[#9780FF]">NODE_ID: CHN-143</span>
          <span className="hidden sm:inline text-zinc-600">|</span>
          <span>COORDS: 13.0604° N, 80.2496° E</span>
          <span className="hidden md:inline text-zinc-600">|</span>
          <span className="hidden md:inline">NUNGAMBAKKAM, CHENNAI</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          <span>SYS_READY: COMMERCE_ENGINE_v2</span>
        </div>
      </div>
    </div>
  );
}
