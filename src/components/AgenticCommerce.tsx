"use client";

import BentoCard from "./BentoCard";
import Image from "next/image";
import { TrendingUp, AlertCircle, FileText, Smartphone, CheckCircle } from "lucide-react";

export default function AgenticCommerce() {
  return (
    <section id="solution" className="relative bg-gradient-to-b from-[#020202] to-[#001a33] py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <h2 className="font-grotesk text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Agentic Commerce
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Large Card: Real-Time Sales */}
          <BentoCard className="md:col-span-2 md:row-span-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary">
              <TrendingUp size={28} />
            </div>
            <h3 className="mt-6 mb-4 font-grotesk text-3xl font-bold text-white">
              Live Sales Intelligence
            </h3>
            <p className="mb-8 text-lg text-muted">
              Our agents track every sale and visit, identifying which products are moving
              fast and which need a boost.
            </p>
            <div className="relative mt-auto h-64 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              <Image
                src="/img/live image.jpeg"
                alt="Sales Intelligence"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
          </BentoCard>

          {/* Medium Card: Price Drop */}
          <BentoCard className="md:col-span-2" delay={0.1}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary">
              <AlertCircle size={24} />
            </div>
            <h3 className="mt-4 mb-2 font-grotesk text-2xl font-bold text-white">
              Drop Price Alerts
            </h3>
            <p className="text-muted">
              Detect price changes instantly and launch high-converting marketing content
              the second a discount goes live.
            </p>
          </BentoCard>

          {/* Small Card: Blog Engine */}
          <BentoCard delay={0.2}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary">
              <FileText size={24} />
            </div>
            <h3 className="mt-4 mb-2 font-grotesk text-xl font-bold text-white">
              Blog Engine
            </h3>
            <p className="text-sm text-muted">SEO blogs from data.</p>
          </BentoCard>

          {/* Small Card: Social Sync */}
          <BentoCard delay={0.3}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary">
              <Smartphone size={24} />
            </div>
            <h3 className="mt-4 mb-2 font-grotesk text-xl font-bold text-white">
              Social Sync
            </h3>
            <p className="text-sm text-muted">Auto-post captions.</p>
          </BentoCard>

          {/* Medium Card: Human Hub */}
          <BentoCard className="md:col-span-2" delay={0.4}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary">
              <CheckCircle size={24} />
            </div>
            <h3 className="mt-4 mb-2 font-grotesk text-2xl font-bold text-white">
              Trust Approval Loop
            </h3>
            <p className="text-muted">
              Full human control. Review every AI-generated post before it goes live with
              a single click in your dashboard.
            </p>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
