"use client";

import React, { useState } from "react";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClientConstellation from "@/components/ClientConstellation";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import CoFounderDossier from "@/components/CoFounderDossier";
import StudioCoordinates from "@/components/StudioCoordinates";
import Footer from "@/components/Footer";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <SmoothScroll>
      {/* Superconscious Geometric Intro Preloader */}
      <Preloader onComplete={() => setIntroFinished(true)} />

      {/* Main Studio Experience */}
      <main className="relative min-h-screen bg-[#09080A] text-[#F4F3F6] selection:bg-[#9780FF]/30 selection:text-[#00F0FF] overflow-hidden">
        <Navbar />
        <HeroSection />
        <ClientConstellation />
        <CapabilitiesSection />
        <CoFounderDossier />
        <StudioCoordinates />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
