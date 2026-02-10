import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import AgenticCommerce from "@/components/AgenticCommerce";
import HowItWorks from "@/components/HowItWorks";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <WhatWeDo />
      <AgenticCommerce />
      <HowItWorks />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}
