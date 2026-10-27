"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";

export default function ReturnToStudioButton() {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/#footer";
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors mb-12 group cursor-pointer bg-transparent border-none p-0"
    >
      <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
      <span>RETURN TO STUDIO</span>
    </button>
  );
}
