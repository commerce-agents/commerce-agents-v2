"use client";

import React, { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";

export default function PinnedTypographyScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const lottie1Ref = useRef<HTMLDivElement>(null);
  const lottie2Ref = useRef<HTMLDivElement>(null);
  const lottie3Ref = useRef<HTMLDivElement>(null);

  // Load geometric wireframe Lotties into the capsule pills
  useEffect(() => {
    let anim1: any, anim2: any, anim3: any;

    if (lottie1Ref.current) {
      anim1 = lottie.loadAnimation({
        container: lottie1Ref.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/lottie/icon1.json",
      });
    }

    if (lottie2Ref.current) {
      anim2 = lottie.loadAnimation({
        container: lottie2Ref.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/lottie/circles.json",
      });
    }

    if (lottie3Ref.current) {
      anim3 = lottie.loadAnimation({
        container: lottie3Ref.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/lottie/icon2.json",
      });
    }

    return () => {
      if (anim1) anim1.destroy();
      if (anim2) anim2.destroy();
      if (anim3) anim3.destroy();
    };
  }, []);

  // Track scroll position through pinned container
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
      if (totalHeight <= 0) return;

      const current = -rect.top;
      const progress = Math.max(0, Math.min(1, current / totalHeight));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate blur and opacity for each line based on scroll progress
  // Line 1: Active 0.0 -> 0.35, then blurs away
  const getLine1Style = () => {
    if (scrollProgress < 0.25) {
      return { filter: "blur(0px)", opacity: 1, transform: "scale(1)" };
    }
    const t = (scrollProgress - 0.25) / 0.25; // 0 to 1
    const blur = Math.min(18, t * 18);
    const opacity = Math.max(0.12, 1 - t * 0.88);
    const scale = 1 - t * 0.05;
    return { filter: `blur(${blur}px)`, opacity, transform: `scale(${scale})` };
  };

  // Line 2: Starts slightly blurred, peaks sharp at 0.35 -> 0.65, then blurs away
  const getLine2Style = () => {
    if (scrollProgress < 0.2) {
      const t = scrollProgress / 0.2;
      const blur = Math.max(0, (1 - t) * 12);
      const opacity = Math.min(1, 0.2 + t * 0.8);
      return { filter: `blur(${blur}px)`, opacity, transform: "scale(0.96)" };
    } else if (scrollProgress >= 0.2 && scrollProgress <= 0.6) {
      return { filter: "blur(0px)", opacity: 1, transform: "scale(1)" };
    } else {
      const t = (scrollProgress - 0.6) / 0.25;
      const blur = Math.min(18, t * 18);
      const opacity = Math.max(0.12, 1 - t * 0.88);
      const scale = 1 - t * 0.05;
      return { filter: `blur(${blur}px)`, opacity, transform: `scale(${scale})` };
    }
  };

  // Line 3: Starts blurred, sharpens at 0.55 -> 1.0
  const getLine3Style = () => {
    if (scrollProgress < 0.5) {
      const t = scrollProgress / 0.5;
      const blur = Math.max(0, (1 - t) * 18);
      const opacity = Math.min(1, 0.15 + t * 0.85);
      return { filter: `blur(${blur}px)`, opacity, transform: "scale(0.94)" };
    }
    return { filter: "blur(0px)", opacity: 1, transform: "scale(1)" };
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[250vh] bg-[#09080A] text-[#F4F3F6]"
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-8">
        {/* Ambient background volumetric glow */}
        <div className="absolute w-[600px] h-[400px] rounded-full bg-gradient-to-tr from-[#9780FF]/15 via-[#FF7410]/10 to-transparent blur-[140px] pointer-events-none" />

        {/* Section Pill Badge like Superconscious */}
        <div className="absolute top-24 z-20 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-xs font-mono text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9780FF] animate-pulse" />
          <span>HOW WE THINK // CORE MANIFESTO</span>
        </div>

        {/* Massive Dynamic Pinned Typography Container */}
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-center gap-6 sm:gap-10 text-center select-none">
          {/* LINE 1 */}
          <div
            style={getLine1Style()}
            className="flex items-center justify-center flex-wrap gap-4 sm:gap-7 transition-all duration-300 ease-out"
          >
            <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white">
              Control
            </span>

            {/* Floating Capsule 1 with wireframe Lottie */}
            <div className="inline-flex items-center justify-center px-4 sm:px-6 py-2 rounded-full border border-[#9780FF]/30 bg-white/[0.03] backdrop-blur-lg shadow-[0_0_25px_rgba(151,128,255,0.15)]">
              <div ref={lottie1Ref} className="w-10 h-10 sm:w-14 sm:h-14" />
            </div>

            <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white">
              Your
            </span>
          </div>

          {/* LINE 2 */}
          <div
            style={getLine2Style()}
            className="flex items-center justify-center flex-wrap gap-4 sm:gap-7 transition-all duration-300 ease-out"
          >
            <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white">
              Platform
            </span>

            {/* Floating Capsule 2 with wireframe Lottie */}
            <div className="inline-flex items-center justify-center px-4 sm:px-6 py-2 rounded-full border border-white/20 bg-white/[0.03] backdrop-blur-lg shadow-[0_0_25px_rgba(255,255,255,0.1)]">
              <div ref={lottie2Ref} className="w-10 h-10 sm:w-14 sm:h-14" />
            </div>

            <span className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white">
              Engineer
            </span>
          </div>

          {/* LINE 3 */}
          <div
            style={getLine3Style()}
            className="flex items-center justify-center flex-wrap gap-4 sm:gap-7 transition-all duration-300 ease-out"
          >
            <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white">
              Your
            </span>

            {/* Floating Capsule 3 with wireframe Lottie */}
            <div className="inline-flex items-center justify-center px-4 sm:px-6 py-2 rounded-full border border-[#9780FF]/40 bg-white/[0.04] backdrop-blur-lg shadow-[0_0_35px_rgba(151,128,255,0.25)]">
              <div ref={lottie3Ref} className="w-10 h-10 sm:w-14 sm:h-14" />
            </div>

            <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white">
              Reality
            </span>
          </div>
        </div>

        {/* Scroll Indicator Prompt */}
        <div className="absolute bottom-10 z-20 flex items-center gap-2 font-mono text-[11px] text-zinc-500 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>SCROLL TO UNBLUR // {Math.round(scrollProgress * 100)}%</span>
        </div>
      </div>
    </section>
  );
}
