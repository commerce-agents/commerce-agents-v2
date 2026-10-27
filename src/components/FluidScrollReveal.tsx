"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface FluidScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  blurAmount?: number;
  yOffset?: number;
  threshold?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

export default function FluidScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.95,
  blurAmount = 24,
  yOffset = 40,
  threshold = 0.12,
  staggerChildren = false,
  staggerDelay = 0.08,
}: FluidScrollRevealProps) {
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, filter: "none", y: 0 });
      return;
    }

    const childElements = staggerChildren
      ? el.querySelectorAll<HTMLElement>("[data-reveal-item]")
      : null;

    if (childElements && childElements.length > 0) {
      gsap.set(childElements, {
        opacity: 0,
        filter: `blur(${blurAmount}px)`,
        y: yOffset,
      });
      gsap.set(el, { opacity: 1, filter: "none" });
    } else {
      gsap.set(el, {
        opacity: 0,
        filter: `blur(${blurAmount}px)`,
        y: yOffset,
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (childElements && childElements.length > 0) {
              gsap.to(childElements, {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                duration,
                delay,
                stagger: staggerDelay,
                ease: "power3.out",
                clearProps: "filter,transform",
              });
            } else {
              gsap.to(el, {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                duration,
                delay,
                ease: "power3.out",
                clearProps: "filter,transform",
              });
            }
            observer.unobserve(el);
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [blurAmount, yOffset, duration, delay, threshold, staggerChildren, staggerDelay]);

  return (
    <div ref={domRef} className={className} style={{ willChange: "filter, transform, opacity" }}>
      {children}
    </div>
  );
}
