"use client";

import BentoCard from "./BentoCard";
import { Search, PenTool, Share2 } from "lucide-react";

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-16 text-center">
          <h2 className="font-grotesk text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            What We Do
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <BentoCard className="md:col-span-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-primary group-hover:bg-primary group-hover:text-black">
              <Search size={32} />
            </div>
            <h3 className="mt-8 mb-4 font-grotesk text-3xl font-bold text-white">
              Analyze Market Liquidity
            </h3>
            <p className="max-w-md text-lg text-muted">
              Our agents crawl public storefront data in real-time. We scout for price
              drops, spikes in demand, and emerging trends to find your next marketing
              opportunity.
            </p>
          </BentoCard>

          <BentoCard delay={0.2}>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-primary group-hover:bg-primary group-hover:text-black">
              <PenTool size={32} />
            </div>
            <h3 className="mt-8 mb-4 font-grotesk text-3xl font-bold text-white">
              Create Content
            </h3>
            <p className="text-lg text-muted">
              Automatically generate SEO-friendly blogs and engaging social captions that
              resonate with your target audience.
            </p>
          </BentoCard>

          <BentoCard delay={0.4} className="md:col-span-3">
            <div className="flex flex-col md:flex-row md:items-center md:gap-12">
              <div className="flex-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-primary group-hover:bg-primary group-hover:text-black">
                  <Share2 size={32} />
                </div>
                <h3 className="mt-8 mb-4 font-grotesk text-3xl font-bold text-white">
                  Distribute at Scale
                </h3>
                <p className="text-lg text-muted">
                  Sync your content across all social channels instantly. Reach your
                  customers where they are with precision timing and automated
                  scheduling.
                </p>
              </div>
              <div className="relative mt-8 h-48 w-full overflow-hidden rounded-2xl md:mt-0 md:h-64 md:w-1/2">
                <img
                  src="/img/distribute_visual.png"
                  alt="Distribute at Scale Visual"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-40" />
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
