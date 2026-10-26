"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Sparkle } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chennaiTime, setChennaiTime] = useState("");
  const [scrolled, setScrolled] = useState(false);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-4 sm:px-8 md:px-12 ${
          scrolled ? "bg-[#09080A]/70 backdrop-blur-xl border-b border-white/5 py-3" : ""
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
                PRODUCT & COMMERCE STUDIO
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] px-4 py-1.5 rounded-full backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative px-4 py-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors duration-200"
              >
                <span className="font-mono text-[9px] text-zinc-400 group-hover:text-[#9780FF] mr-1.5 transition-colors">
                  {link.index}
                </span>
                <span>{link.label}</span>
                <span className="absolute bottom-1 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#9780FF] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </a>
            ))}
          </nav>

          {/* Right Area: Live Time + CTA */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Chennai Time Telemetry */}
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
