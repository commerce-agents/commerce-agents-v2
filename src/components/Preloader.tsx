"use client";

import React, { useEffect, useState, useRef } from "react";
import lottie from "lottie-web";
import gsap from "gsap";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const lottieContainerRef = useRef<HTMLDivElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const animInstance = useRef<any>(null);

  // Initialize Lottie with lottie-web directly
  useEffect(() => {
    if (!lottieContainerRef.current) return;

    animInstance.current = lottie.loadAnimation({
      container: lottieContainerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/lottie/preloader.json",
    });

    return () => {
      if (animInstance.current) {
        animInstance.current.destroy();
      }
    };
  }, []);

  // Progress counter simulation & timeline
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 5) + 3;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          finishIntro();
        }, 400);
      } else {
        setProgress(current);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const finishIntro = () => {
    if (isLoaded) return;
    setIsLoaded(true);

    const tl = gsap.timeline({
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = "none";
        }
        if (onComplete) onComplete();
      },
    });

    tl.to(lottieContainerRef.current, {
      scale: 1.15,
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    })
      .to(
        [telemetryRef.current, percentRef.current],
        {
          opacity: 0,
          y: -10,
          duration: 0.35,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(
        preloaderRef.current,
        {
          yPercent: -100,
          duration: 0.8,
          ease: "expo.inOut",
        },
        "-=0.1"
      );
  };

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#080709] px-6 py-8 md:px-12 md:py-10 text-[#F4F3F6] select-none"
    >
      {/* Top Header telemetry */}
      <div className="flex items-center justify-between text-xs tracking-wider uppercase font-mono text-zinc-400">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9780FF] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9780FF]"></span>
          </span>
          <span>COMMERCE AGENTS // STUDIO BOOT</span>
        </div>

        <button
          onClick={finishIntro}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-[#9780FF]/40 bg-white/[0.02] hover:bg-[#9780FF]/10 text-zinc-400 hover:text-white transition-all duration-300 text-[11px]"
        >
          <span>SKIP INTRO</span>
          <span className="text-[9px] text-zinc-400 group-hover:text-zinc-300">[ESC]</span>
        </button>
      </div>

      {/* Center Lottie animation + ambient glow */}
      <div className="relative flex flex-col items-center justify-center my-auto">
        {/* Ambient radial blur behind Lottie */}
        <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-[#9780FF]/25 via-[#FF7410]/15 to-transparent blur-3xl pointer-events-none" />

        {/* Lottie SVG container */}
        <div
          ref={lottieContainerRef}
          className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 flex items-center justify-center"
        />

        {/* Counter Percentage with pixelated mono styling */}
        <div
          ref={percentRef}
          className="mt-6 flex flex-col items-center justify-center font-mono"
        >
          <div className="text-4xl md:text-5xl font-light tracking-tight text-white flex items-baseline gap-1">
            <span>{String(progress).padStart(2, "0")}</span>
            <span className="text-xl text-[#9780FF]">%</span>
          </div>
          <div className="w-48 md:w-64 h-[2px] bg-white/10 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#9780FF] via-[#FF7410] to-[#00F0FF] transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Telemetry HUD */}
      <div
        ref={telemetryRef}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] font-mono text-zinc-400 border-t border-white/5 pt-4 gap-2"
      >
        <div className="flex items-center gap-4">
          <span className="text-[#9780FF]">NODE_ID: CHN-143</span>
          <span className="hidden sm:inline text-zinc-600">|</span>
          <span>COORDS: 13.0604° N, 80.2496° E</span>
          <span className="hidden md:inline text-zinc-600">|</span>
          <span className="hidden md:inline">NUNGAMBAKKAM, CHENNAI</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
          <span>SYS_READY: COMMERCE_ENGINE_v2</span>
        </div>
      </div>
    </div>
  );
}
