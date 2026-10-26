"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar({ isVisible = true }: { isVisible?: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chennaiTime, setChennaiTime] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setChennaiTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { label: "WORK", href: "#work", index: "01" },
    { label: "CAPABILITIES", href: "#capabilities", index: "02" },
    { label: "CO-FOUNDER", href: "#cofounder", index: "03" },
    { label: "STUDIO", href: "#studio", index: "04" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out py-4 px-4 sm:px-8 md:px-12 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6 pointer-events-none"
        } ${
          scrolled ? "bg-[#09080A]/80 backdrop-blur-xl border-b border-white/5 py-3" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 text-sm tracking-wider font-semibold"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#9780FF] via-[#FF7410] to-[#00F0FF] p-[1px] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#09080A] rounded-[7px] flex items-center justify-center font-mono text-[11px] font-bold text-white">
                CA
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-white group-hover:text-[#9780FF] transition-colors">
                COMMERCE AGENTS
              </span>
              <span className="font-mono text-[10px] text-zinc-500 tracking-wider">
                PRODUCT &amp; COMMERCE STUDIO
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links with Magnetic Sliding Hover Capsule */}
          <nav
            onMouseLeave={() => setHoveredIdx(null)}
            className="hidden lg:flex items-center relative bg-white/[0.03] border border-white/[0.08] p-1 rounded-full backdrop-blur-md"
          >
            {navLinks.map((link, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className="relative px-5 py-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors duration-200 z-10 flex items-center gap-1.5 group"
                >
                  <span className="font-mono text-[10px] text-zinc-500 group-hover:text-[#9780FF] transition-colors">
                    {link.index}
                  </span>
                  <span className="relative overflow-hidden inline-block">
                    <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                      {link.label}
                    </span>
                    <span className="absolute top-0 left-0 inline-block text-white transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                      {link.label}
                    </span>
                  </span>

                  {/* Sliding pill background */}
                  {isHovered && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/[0.08] to-white/[0.04] border border-white/10 -z-10 shadow-[0_0_20px_rgba(151,128,255,0.15)] animate-in fade-in zoom-in-95 duration-200" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Area: Live Time + CTA */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Chennai Time */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-[11px] font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>CHENNAI</span>
              <span className="text-white font-medium">{chennaiTime || "11:45 PM"}</span>
            </div>

            {/* Glowing CTA Button */}
            <a
              href="#contact"
              className="relative inline-flex items-center justify-center p-[1px] overflow-hidden rounded-full font-medium transition-all group"
            >
              <span className="w-full h-full bg-gradient-to-br from-[#9780FF] to-[#FF7410] group-hover:from-[#b09eff] group-hover:to-[#ff8d3b] absolute"></span>
              <span className="relative px-5 py-2 transition-all ease-out bg-[#09080A] rounded-full group-hover:bg-opacity-0 duration-300 flex items-center gap-2 text-xs font-semibold text-white">
                <span>INITIATE TALK</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#09080A]/95 backdrop-blur-2xl pt-24 px-6 flex flex-col justify-between pb-10 sm:hidden">
          <div className="flex flex-col gap-6">
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
              NAVIGATION
            </span>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-2xl font-light py-2 border-b border-white/5 text-zinc-200 hover:text-white"
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9780FF]">{link.index}</span>
                  <span>{link.label}</span>
                </span>
                <ArrowUpRight className="w-5 h-5 text-zinc-500" />
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 py-2 border-t border-white/5">
              <span>LOCATION: CHENNAI [13.0604° N]</span>
              <span className="text-zinc-300">{chennaiTime}</span>
            </div>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-full bg-gradient-to-r from-[#9780FF] to-[#FF7410] font-semibold text-sm text-white"
            >
              INITIATE TALK
            </a>
          </div>
        </div>
      )}
    </>
  );
}
