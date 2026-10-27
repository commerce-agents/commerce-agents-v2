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
  const [introState, setIntroState] = useState<"loading" | "gliding" | "complete">("loading");

  return (
    <>
      <Preloader
        onGlideStart={() => setIntroState("gliding")}
        onComplete={() => setIntroState("complete")}
      />
      <SmoothScroll>
        <main className="relative min-h-screen bg-[#09080A] text-[#F4F3F6] selection:bg-[#9780FF]/30 selection:text-[#00F0FF]">
          <Navbar isVisible={introState === "complete"} />
          <HeroSection introState={introState} />
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
