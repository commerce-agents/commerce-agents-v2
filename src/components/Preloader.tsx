"use client";

import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const finishedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    if (!preloaderRef.current) {
      onCompleteRef.current?.();
      return;
    }

    gsap.to(preloaderRef.current, {
      opacity: 0,
      duration: 0.65,
      ease: "power2.inOut",
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
  }, []);

  useEffect(() => {
    // Press ESC or click anywhere to skip immediately
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [finish]);

  useEffect(() => {
    const text = textRef.current;
    const preloader = preloaderRef.current;
    if (!text || !preloader) return;

    // Check if seen before in this tab session
    const hasSeen =
      typeof window !== "undefined" &&
      sessionStorage.getItem("commerce_agents_intro_seen") === "true";

    if (hasSeen) {
      preloader.style.display = "none";
      onCompleteRef.current?.();
      return;
    }

    // Hardware-accelerate the text layer
    gsap.set(text, {
      opacity: 0,
      filter: "blur(32px)",
      letterSpacing: "0.45em",
      scale: 0.96,
      transform: "translateZ(0)",
    });

    const tl = gsap.timeline({
      delay: 0.15,
      onComplete: finish,
    });

    // 1. Smoothly unblur, gather letters, and come to 100% sharpness
    tl.to(text, {
      opacity: 1,
      filter: "blur(0px)",
      letterSpacing: "0.14em",
      scale: 1,
      duration: 1.6,
      ease: "power2.out",
    })
      // 2. Hold sharply in focus for clear visual impact
      .to({}, { duration: 0.5 });

    return () => {
      tl.kill();
    };
  }, [finish]);

  return (
    <div
      ref={preloaderRef}
      onClick={finish}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#09080A] cursor-pointer select-none overflow-hidden"
      style={{
        willChange: "opacity",
        transform: "translateZ(0)",
      }}
    >
      {/* Subtle atmospheric glow directly behind the text */}
      <div
        className="absolute w-[500px] h-[300px] rounded-full pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(151,128,255,0.25) 0%, rgba(255,116,16,0.1) 45%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Pure Center Wordmark – One Single Line */}
      <h1
        ref={textRef}
        className="font-light text-white uppercase leading-none select-none drop-shadow-[0_15px_45px_rgba(151,128,255,0.3)] max-w-full px-4 text-center"
        style={{
          fontSize: "clamp(22px, 6.5vw, 92px)",
          whiteSpace: "nowrap",
          willChange: "filter, opacity, transform, letter-spacing",
        }}
      >
        COMMERCE AGENTS
      </h1>
    </div>
  );
}
