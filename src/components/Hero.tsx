"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Parallax Layer */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-40 grayscale"
        >
          <source src="/img/bg globe 1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020202]/50 to-[#020202]" />
      </motion.div>

      {/* Content Layer */}
      <motion.div
        style={{ y: yText, opacity }}
        className="container relative z-10 mx-auto px-6 text-center lg:px-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-6 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-primary uppercase"
        >
          Intelligence Redefined
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-8 font-grotesk text-[clamp(3.5rem,10vw,8rem)] font-bold leading-[0.9] tracking-tighter text-white"
        >
          Autonomous <br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Commerce.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mx-auto mb-12 max-w-2xl text-lg text-muted md:text-xl lg:text-2xl"
        >
          Empower your brand with AI agents that monitor sales, analyze trends, and
          auto-generate high-converting marketing content 24/7.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col items-center justify-center gap-6 sm:flex-row"
        >
          <Link
            href="#what-we-do"
            className="group relative flex h-14 items-center justify-center overflow-hidden rounded-full bg-primary px-10 text-lg font-bold text-black transition-all hover:scale-105 active:scale-95"
          >
            Explore Agents
            <div className="absolute inset-0 translate-y-full bg-white transition-transform group-hover:translate-y-0" />
          </Link>
          <Link
            href="#contact"
            className="flex h-14 items-center justify-center rounded-full border border-white/20 bg-white/5 px-10 text-lg font-bold text-white transition-all hover:bg-white/10"
          >
            Book a Demo
          </Link>
        </motion.div>
      </motion.div>

      {/* Decorative Orbs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-1/4 -left-1/4 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[150px]" />
        <div className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[150px]" />
      </div>
    </section>
  );
}
