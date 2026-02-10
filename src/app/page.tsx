import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import AgenticCommerce from "@/components/AgenticCommerce";
import HowItWorks from "@/components/HowItWorks";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <WhatWeDo />
      <AgenticCommerce />
      <HowItWorks />
      <Contact />
      <Footer />
    </div>
  );
}
