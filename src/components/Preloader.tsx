"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
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
  const titleTextRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const animInstance = useRef<any>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const finishIntro = useCallback(() => {
    if (isFinished) return;
    setIsFinished(true);

    const tl = gsap.timeline({
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = "none";
        }
        if (typeof window !== "undefined") {
          sessionStorage.setItem("commerce_agents_intro_seen", "true");
        }
        onCompleteRef.current?.();
      },
    });

    tl.to(lottieContainerRef.current, { scale: 0.9, opacity: 0, duration: 0.3, ease: "power2.inOut" })
      .to(titleTextRef.current, { opacity: 0, y: -20, filter: "blur(12px)", duration: 0.35, ease: "power2.in" }, "-=0.2")
      .to(bottomRef.current, { opacity: 0, duration: 0.25 }, "-=0.2")
      .to(preloaderRef.current, { yPercent: -100, duration: 0.7, ease: "expo.inOut" }, "-=0.1");
  }, [isFinished]);

  // 1. ESC Key to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        finishIntro();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [finishIntro]);

  // 2. Load Lottie Animation
  useEffect(() => {
    if (!lottieContainerRef.current) return;
    try {
      animInstance.current = lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/lottie/preloader.json",
      });
    } catch (e) {
      console.warn("Lottie error:", e);
    }
    return () => {
      if (animInstance.current) animInstance.current.destroy();
    };
  }, []);

  // 3. Center wordmark blur-to-clear + letter spacing
  useEffect(() => {
    if (!titleTextRef.current) return;
    gsap.fromTo(
      titleTextRef.current,
      {
        filter: "blur(32px)",
        letterSpacing: "0.45em",
        opacity: 0,
        scale: 0.95,
      },
      {
        filter: "blur(0px)",
        letterSpacing: "0.14em",
        opacity: 1,
        scale: 1,
        duration: 2.0,
        ease: "power3.out",
        delay: 0.1,
      }
    );

    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 12, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.4, ease: "power2.out", delay: 0.5 }
      );
    }
  }, []);

  // 4. Progress counter
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 6) + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          finishIntro();
        }, 300);
      } else {
        setProgress(current);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [finishIntro]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#080709] px-6 py-8 md:px-12 md:py-10 select-none overflow-hidden"
    >
      {/* Top Telemetry Bar */}
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
          <span className="text-[9px] text-zinc-500">[ESC]</span>
        </button>
      </div>

      {/* Dead Center: Lottie + Big Blur-to-Clear "COMMERCE AGENTS" */}
      <div className="flex flex-col items-center justify-center my-auto relative w-full text-center">
        {/* Ambient atmospheric glow */}
        <div
          className="absolute w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(151,128,255,0.22) 0%, rgba(255,116,16,0.12) 50%, transparent 75%)",
            filter: "blur(90px)",
          }}
        />

        {/* Lottie Animation */}
        <div
          ref={lottieContainerRef}
          className="relative w-28 h-28 sm:w-36 sm:h-36 mb-6 flex items-center justify-center"
        />

        {/* Big "COMMERCE AGENTS" Wordmark with Blur-to-Clear & Letter Spacing */}
        <h1
          ref={titleTextRef}
          className="font-bold text-white uppercase leading-none select-none drop-shadow-[0_15px_40px_rgba(151,128,255,0.3)]"
          style={{
            fontSize: "clamp(20px, 7.5vw, 108px)",
            whiteSpace: "nowrap",
          }}
        >
          COMMERCE AGENTS
        </h1>

        <p
          ref={subtitleRef}
          className="font-mono text-xs sm:text-sm text-zinc-400 tracking-[0.25em] uppercase mt-4"
        >
          0→1 PRODUCT DESIGN &amp; AUTONOMOUS COMMERCE
        </p>

        {/* Progress Counter & Line */}
        <div className="flex flex-col items-center gap-3 mt-10">
          <div className="font-mono text-3xl font-light text-white flex items-baseline gap-1">
            <span>{String(progress).padStart(2, "0")}</span>
            <span className="text-base text-[#9780FF]">%</span>
          </div>
          <div className="w-56 sm:w-72 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#9780FF] via-[#FF7410] to-[#00F0FF] transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div
        ref={bottomRef}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] font-mono text-zinc-400 border-t border-white/5 pt-4 gap-2"
      >
        <div className="flex items-center gap-4">
          <span className="text-[#9780FF]">NODE_ID: CHN-143</span>
          <span className="hidden sm:inline text-zinc-600">|</span>
          <span>COORDS: 13.0604° N, 80.2496° E</span>
          <span className="hidden md:inline text-zinc-600">|</span>
          <span className="hidden md:inline">CHENNAI, INDIA</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          <span>SYS_READY: COMMERCE_ENGINE_v2</span>
        </div>
      </div>
    </div>
  );
}
