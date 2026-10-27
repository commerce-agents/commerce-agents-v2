"use client";

import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onGlideStart?: () => void;
  onComplete?: () => void;
}

export default function Preloader({ onGlideStart, onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef(false);

  const onGlideStartRef = useRef(onGlideStart);
  onGlideStartRef.current = onGlideStart;

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    if (!preloaderRef.current) {
      onGlideStartRef.current?.();
      onCompleteRef.current?.();
      return;
    }

    onGlideStartRef.current?.();

    // Instant cleanup if user clicks or hits Esc
    gsap.killTweensOf([textRef.current, preloaderRef.current, glowRef.current]);
    gsap.to(preloaderRef.current, {
      opacity: 0,
      duration: 0.35,
      ease: "power2.out",
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = "none";
        }
        onCompleteRef.current?.();
      },
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [finish]);

  useEffect(() => {
    const text = textRef.current;
    const preloader = preloaderRef.current;
    const glow = glowRef.current;
    if (!text || !preloader) return;

    gsap.set(preloader, { display: "flex", opacity: 1, backgroundColor: "#09080A" });

    // Initial state: centered, blurred, wide letter-spacing
    gsap.set(text, {
      opacity: 0,
      filter: "blur(35px)",
      letterSpacing: "0.45em",
      scale: 0.96,
      y: 0,
      transform: "translateZ(0)",
    });

    if (glow) {
      gsap.set(glow, { opacity: 0, scale: 0.8 });
    }

    const tl = gsap.timeline({
      delay: 0.15,
    });

    // 1. Center Unblur Phase: from blurred haze to crystal clear
    tl.to(
      text,
      {
        opacity: 1,
        filter: "blur(0px)",
        letterSpacing: "0.14em",
        scale: 1,
        duration: 1.4,
        ease: "power3.out",
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

    // 2. Pause so the viewer clearly reads COMMERCE AGENTS in sharp focus
    tl.to({}, { duration: 0.45 });

    // 3. The Glide: smoothly glide to the exact Hero heading coordinates
    tl.call(() => {
      if (finishedRef.current) return;

      // Notify page / HeroSection to start unblurring and sliding up other elements
      onGlideStartRef.current?.();

      const heroHeading = document.getElementById("hero-heading");
      let deltaY = -120; // fallback if element not yet measured

      if (heroHeading && textRef.current) {
        const targetRect = heroHeading.getBoundingClientRect();
        const currentRect = textRef.current.getBoundingClientRect();
        deltaY = targetRect.top + targetRect.height / 2 - (currentRect.top + currentRect.height / 2);
      }

      const glideTl = gsap.timeline({
        onComplete: () => {
          if (preloaderRef.current) {
            preloaderRef.current.style.display = "none";
          }
          onCompleteRef.current?.();
        },
      });

      // Text glides smoothly upward into the Hero heading position
      glideTl.to(
        textRef.current,
        {
          y: deltaY,
          duration: 0.95,
          ease: "power3.inOut",
        },
        0
      );

      // Fade out the glow
      if (glowRef.current) {
        glideTl.to(
          glowRef.current,
          {
            opacity: 0,
            y: deltaY * 0.6,
            duration: 0.7,
            ease: "power2.inOut",
          },
          0
        );
      }

      // Smoothly dissolve the dark preloader background to transparent
      glideTl.to(
        preloaderRef.current,
        {
          backgroundColor: "rgba(9, 8, 10, 0)",
          duration: 0.85,
          ease: "power2.inOut",
        },
        0.05
      );
    });

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
        willChange: "background-color, opacity",
      }}
    >
      {/* Volumetric glow directly behind the loader text */}
      <div
        ref={glowRef}
        className="absolute w-[500px] h-[300px] rounded-full pointer-events-none opacity-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(151,128,255,0.3) 0%, rgba(255,116,16,0.12) 45%, transparent 70%)",
          filter: "blur(80px)",
          willChange: "transform, opacity",
        }}
      />

      {/* Pure Center Wordmark – matching the exact Hero typography & styles */}
      <h1
        ref={textRef}
        className="font-light text-white uppercase leading-none select-none drop-shadow-[0_12px_40px_rgba(151,128,255,0.25)] max-w-full px-4 text-center"
        style={{
          fontSize: "clamp(20px, 6.2vw, 88px)",
          letterSpacing: "0.45em",
          whiteSpace: "nowrap",
          opacity: 0,
          filter: "blur(35px)",
          transform: "scale(0.96) translateZ(0)",
          willChange: "transform, filter, opacity, letter-spacing",
        }}
      >
        COMMERCE AGENTS
      </h1>
    </div>
  );
}
