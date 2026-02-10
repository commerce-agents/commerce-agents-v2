"use client";

import Image from "next/image";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/5 bg-[#020202] py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center">
            <Image
              src="/img/logo 1.png"
              alt="Commerce Agent Logo"
              width={140}
              height={35}
              className="h-8 w-auto grayscale opacity-50 transition-all hover:grayscale-0 hover:opacity-100"
            />
          </div>

          <button
            onClick={scrollToTop}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-primary hover:text-black"
            aria-label="Back to top"
          >
            <ArrowUp size={24} className="transition-transform group-hover:-translate-y-1" />
          </button>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-white/5 pt-8 md:flex-row">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Commerce Agent Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
