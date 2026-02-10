"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Data Pulse",
    description:
      "Connect your storefront data. Our agents begin monitoring live product performance, price shifts, and sales trends in real-time.",
  },
  {
    number: "02",
    title: "Content Engine",
    description:
      "The AI analyzes market gaps and automatically drafts blog posts, social captions, and hashtags optimized for reach.",
  },
  {
    number: "03",
    title: "Human Hub",
    description:
      "Review every drafted post in your central hub. One-click editing and approval ensures your brand voice is always perfect.",
  },
  {
    number: "04",
    title: "Market Blast",
    description:
      "Approved content is instantly published across your social ecosystem, turning real-time data into immediate commerce growth.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-20 text-center">
          <h2 className="font-grotesk text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="group relative"
            >
              <div className="mb-8 font-grotesk text-6xl font-black text-white/5 transition-colors group-hover:text-primary/20">
                {step.number}
              </div>
              <h3 className="mb-4 font-grotesk text-2xl font-bold text-white">
                {step.title}
              </h3>
              <p className="text-muted leading-relaxed">
                {step.description}
              </p>
              <div className="mt-8 h-[1px] w-full bg-white/10 transition-colors group-hover:bg-primary/30" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
