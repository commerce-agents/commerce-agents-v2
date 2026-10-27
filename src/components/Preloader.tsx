"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    const glow = glowRef.current;
    if (!container || !text) return;

    // Prevent background scrolling while preloader is active
    document.body.style.overflow = "hidden";

    // Initial state: Pure black screen, dead-center text heavily blurred with wide letter spacing
    gsap.set(container, { opacity: 1, display: "flex", backgroundColor: "#09080A" });
    gsap.set(text, {
      opacity: 0,
      filter: "blur(32px)",
      letterSpacing: "0.45em",
      scale: 0.95,
      y: 0,
    });
    if (glow) {
      gsap.set(glow, { opacity: 0, scale: 0.75 });
    }

    const tl = gsap.timeline({
      delay: 0.1,
    });

    // ── STAGE 1: Center Focus (1.4s) ───────────────────────────────────────────
    // Text unblurs smoothly in exact vertical & horizontal center of pure black screen
    tl.to(
      text,
      {
        opacity: 1,
        filter: "blur(0px)",
        letterSpacing: "0.14em",
        scale: 1,
        duration: 1.4,
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
          duration: 1.4,
          ease: "power2.out",
        },
        0
      );
    }

    // ── STAGE 2: Sharp Hold (0.8s) ─────────────────────────────────────────────
    // Stays perfectly sharp in the center so the brand name cleanly registers
    tl.to({}, { duration: 0.8 });

    // ── STAGE 3: Smooth Exit (0.7s) ────────────────────────────────────────────
    // Preloader curtain dissolves smoothly to reveal the hero section underneath
    tl.to(
      text,
      {
        opacity: 0,
        filter: "blur(12px)",
        letterSpacing: "0.18em",
        y: -15,
        duration: 0.55,
        ease: "power2.in",
      },
      ">"
    );

    if (glow) {
      tl.to(
        glow,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        },
        "<"
      );
    }

    tl.to(
      container,
      {
        opacity: 0,
        duration: 0.7,
        ease: "power2.inOut",
        onComplete: () => {
          document.body.style.overflow = "";
          setIsDone(true);
          onComplete?.();
        },
      },
      "<0.1"
    );

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#09080A] select-none overflow-hidden"
      style={{
        pointerEvents: "auto",
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
          willChange: "transform, opacity",
        }}
      />

      {/* Center Wordmark with Letter Spacing */}
      <h1
        ref={textRef}
        className="relative z-10 font-light text-white uppercase leading-none select-none drop-shadow-[0_12px_40px_rgba(151,128,255,0.3)] max-w-full px-6 text-center"
        style={{
          fontSize: "clamp(24px, 6.5vw, 92px)",
          letterSpacing: "0.45em",
          whiteSpace: "nowrap",
          filter: "blur(32px)",
          opacity: 0,
          willChange: "transform, filter, opacity, letter-spacing",
        }}
      >
        COMMERCE AGENTS
      </h1>
    </div>
  );
}
