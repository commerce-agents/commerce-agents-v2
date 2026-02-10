"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "What We Do", href: "#what-we-do" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Agentic Commerce", href: "#solution" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-[900] w-full transition-all duration-300",
        scrolled ? "glass-header h-16" : "h-20"
      )}
    >
      <div className="container mx-auto flex h-full items-center justify-between px-6 lg:px-12">
        <Link href="/" className="relative z-[1001] flex items-center">
          <Image
            src="/img/logo 1.png"
            alt="Commerce Agent Logo"
            width={160}
            height={40}
            className="h-10 w-auto transition-transform hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="font-inter text-[0.95rem] font-medium text-muted transition-colors hover:text-primary"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#contact"
            className="rounded-full bg-primary px-6 py-2.5 text-[0.9rem] font-bold text-black shadow-[0_0_20px_rgba(0,242,255,0.2)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,242,255,0.4)] active:scale-95"
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="relative z-[1001] text-white transition-colors hover:text-primary md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.5, ease: [0.86, 0, 0.07, 1] }}
              className="fixed inset-0 flex flex-col items-center justify-center bg-[#020202]/95 backdrop-blur-2xl md:hidden"
            >
              <ul className="flex flex-col items-center gap-10">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i + 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="font-grotesk text-4xl font-bold text-white transition-colors hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-16"
              >
                <Link
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-primary px-10 py-4 text-lg font-bold text-black"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
