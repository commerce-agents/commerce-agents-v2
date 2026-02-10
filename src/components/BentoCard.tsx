"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function BentoCard({ children, className, delay = 0 }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "glass group relative overflow-hidden rounded-[radius-bento] p-8 transition-all hover:-translate-y-2 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_30px_60px_-10px_rgba(0,0,0,0.5),0_0_20px_rgba(0,242,255,0.1)]",
        className
      )}
    >
      <div className="relative z-10 h-full">{children}</div>
      <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-primary/10 blur-[60px] transition-all group-hover:bg-primary/20" />
    </motion.div>
  );
}
