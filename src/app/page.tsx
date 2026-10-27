"use client";

import React, { useState } from "react";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollRevealManifesto from "@/components/ScrollRevealManifesto";
import AiAgentsSection from "@/components/AiAgentsSection";
import ClientConstellation from "@/components/ClientConstellation";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import CoFounderDossier from "@/components/CoFounderDossier";
import StudioCoordinates from "@/components/StudioCoordinates";
import Footer from "@/components/Footer";

export default function Home() {
  const [isGliding, setIsGliding] = useState(false);
  const [isReady, setIsReady] = useState(false);

  return (
    <>
      <Preloader
        onGlideStart={() => setIsGliding(true)}
        onComplete={() => setIsReady(true)}
      />
      <SmoothScroll>
        <main className="relative min-h-screen bg-[#09080A] text-[#F4F3F6] selection:bg-[#9780FF]/30 selection:text-[#00F0FF]">
          <Navbar isVisible={isGliding || isReady} />
          <HeroSection isGliding={isGliding} isReady={isReady} />
          <ScrollRevealManifesto />
          <AiAgentsSection />
          <ClientConstellation />
          <CapabilitiesSection />
          <CoFounderDossier />
          <StudioCoordinates />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
