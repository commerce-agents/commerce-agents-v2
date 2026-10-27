"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onReveal?: () => void;
  onComplete?: () => void;
}

export default function Preloader({ onReveal, onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isDone, setIsDone] = useState(false);

  // Store callbacks in mutable refs so re-renders never re-trigger the animation
  const onRevealRef = useRef(onReveal);
  const onCompleteRef = useRef(onComplete);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    onRevealRef.current = onReveal;
    onCompleteRef.current = onComplete;
  }, [onReveal, onComplete]);

  useEffect(() => {
    // Strictly execute only once across the entire lifecycle
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const container = containerRef.current;
    const text = textRef.current;
    const glow = glowRef.current;
    if (!container || !text) return;

    // Prevent background scrolling while preloader is active
    document.body.style.overflow = "hidden";

    // Initial state: Pure pitch black screen
    gsap.set(container, { opacity: 1, display: "flex", backgroundColor: "#09080A" });
    gsap.set(text, {
      opacity: 0,
      filter: "blur(32px)",
      letterSpacing: "0.42em",
      scale: 0.98,
    });
    if (glow) {
      gsap.set(glow, { opacity: 0, scale: 0.8 });
    }

    const tl = gsap.timeline({
      delay: 0.15,
    });

    // ── STAGE 1: Blurred text to clear vision (1.3s) ──────────────────────────
    tl.to(
      text,
      {
        opacity: 1,
        filter: "blur(0px)",
        letterSpacing: "0.14em",
        scale: 1,
        duration: 1.3,
        ease: "power2.out",
      },
      0
    );

    if (glow) {
      tl.to(
        glow,
        {
          opacity: 0.45,
          scale: 1,
          duration: 1.3,
          ease: "power2.out",
        },
        0
      );
    }

    // ── STAGE 2: Sharp Hold (0.65s) ───────────────────────────────────────────
    tl.to({}, { duration: 0.65 });

    // ── STAGE 3: Fade Out into Complete Black (0.55s) ─────────────────────────
    tl.to(
      text,
      {
        opacity: 0,
        filter: "blur(12px)",
        duration: 0.55,
        ease: "power2.in",
      }
    );

    if (glow) {
      tl.to(
        glow,
        {
          opacity: 0,
          duration: 0.45,
          ease: "power2.in",
        },
        "<"
      );
    }

    // ── STAGE 4: Complete Pitch Black Pause (0.4s) ────────────────────────────
    tl.to({}, { duration: 0.4 });

    // ── STAGE 5: Black Curtain Dissolves & Content Reveals Smoothly (0.85s) ───
    tl.call(() => {
      onRevealRef.current?.();
    });

    tl.to(container, {
      opacity: 0,
      duration: 0.85,
      ease: "power2.inOut",
    });

    // ── STAGE 6: Clean Up & Unlock ───────────────────────────────────────────
    tl.call(() => {
      document.body.style.overflow = "";
      onCompleteRef.current?.();
      setTimeout(() => {
        setIsDone(true);
      }, 50);
    });

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, []); // Run strictly ONCE on mount

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#09080A] select-none overflow-hidden"
      style={{
        pointerEvents: "none",
        willChange: "opacity",
      }}
    >
      {/* Soft volumetric organic glow behind centered wordmark */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none rounded-full"
        style={{
          width: "clamp(300px, 50vw, 650px)",
          height: "clamp(180px, 30vw, 380px)",
          background:
            "radial-gradient(ellipse at center, rgba(151,128,255,0.35) 0%, rgba(115,34,242,0.2) 45%, rgba(255,116,16,0.1) 70%, transparent 80%)",
          filter: "blur(80px)",
          willChange: "opacity",
        }}
      />

      {/* Center Wordmark with Letter Spacing */}
      <h1
        ref={textRef}
        className="relative z-10 font-light text-white uppercase leading-none select-none drop-shadow-[0_12px_40px_rgba(151,128,255,0.25)] max-w-full px-4 text-center"
        style={{
          fontSize: "clamp(20px, 6.2vw, 88px)",
          letterSpacing: "0.42em",
          whiteSpace: "nowrap",
          filter: "blur(32px)",
          opacity: 0,
          willChange: "filter, opacity, letter-spacing",
        }}
      >
        COMMERCE AGENTS
      </h1>
    </div>
  );
}
