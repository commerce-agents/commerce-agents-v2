"use client";

import React, { useState } from "react";
import {
  Bot,
  Zap,
  RefreshCw,
  Cpu,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Activity,
} from "lucide-react";
import FluidScrollReveal from "@/components/FluidScrollReveal";

interface AgentItem {
  id: string;
  name: string;
  badge: string;
  glowColor: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  tagline: string;
  points: string[];
  metric: { value: string; label: string };
  simulatedLogs: { time: string; text: string; status: "success" | "active" }[];
}

const AGENTS: AgentItem[] = [
  {
    id: "sales-agent",
    name: "24/7 Sales Agent",
    badge: "AUTOMATIC SALES",
    glowColor: "#9780FF",
    icon: Bot,
    tagline: "Talks to shoppers, answers doubts, and closes sales 24/7.",
    points: [
      "Sub-second replies so you never lose a customer at night",
      "Suggests the right products and handles pricing doubts",
      "Sends direct 1-tap checkout links right in the chat",
    ],
    metric: { value: "+42%", label: "MORE SALES" },
    simulatedLogs: [
      { time: "02:14 AM", text: "Customer: 'Will this fit my dog?' → Agent: 'Yes, Medium size.'", status: "active" },
      { time: "02:15 AM", text: "1-Tap Checkout link clicked → Paid ₹3,490", status: "success" },
    ],
  },
  {
    id: "ops-agent",
    name: "Operations & Dispatch",
    badge: "NO MANUAL WORK",
    glowColor: "#FF7410",
    icon: Cpu,
    tagline: "Routes orders, alerts suppliers, and updates stock automatically.",
    points: [
      "Sends new orders to your packing team on WhatsApp instantly",
      "Updates inventory and auto-alerts suppliers on low stock",
      "Generates invoices and sends tracking numbers to buyers",
    ],
    metric: { value: "25+ HRS", label: "SAVED WEEKLY" },
    simulatedLogs: [
      { time: "11:42 AM", text: "New order paid → Dispatch sent to warehouse WhatsApp", status: "active" },
      { time: "11:43 AM", text: "Stock updated: 4 items left → Supplier re-order triggered", status: "success" },
    ],
  },
  {
    id: "cart-agent",
    name: "Cart Recovery Agent",
    badge: "REVENUE RESCUE",
    glowColor: "#00F0FF",
    icon: RefreshCw,
    tagline: "Brings back shoppers who left their cart without buying.",
    points: [
      "Sends friendly WhatsApp follow-ups within 15 minutes",
      "Answers shipping and payment questions to remove hesitation",
      "Offers instant UPI / card checkout to complete the order",
    ],
    metric: { value: "28.4%", label: "CARTS RECOVERED" },
    simulatedLogs: [
      { time: "04:30 PM", text: "Cart abandoned → WhatsApp follow-up sent with 1-click UPI", status: "active" },
      { time: "04:34 PM", text: "Payment verified → Order moved to packing", status: "success" },
    ],
  },
  {
    id: "workflow-agent",
    name: "Custom Business Brain",
    badge: "CUSTOM FOR YOU",
    glowColor: "#10B981",
    icon: Terminal,
    tagline: "Bespoke AI built specifically for your exact business process.",
    points: [
      "Connects your website, WhatsApp, CRM, and bank payments",
      "Replaces multiple expensive paid monthly software tools",
      "Run a 10-person operation smoothly with a lean 2-person team",
    ],
    metric: { value: "10X LEAN", label: "OPERATIONS" },
    simulatedLogs: [
      { time: "09:00 AM", text: "Daily orders and payments reconciled with bank ledger", status: "active" },
      { time: "09:01 AM", text: "Summary report generated & sent to founder's phone", status: "success" },
    ],
  },
];

export default function AiAgentsSection() {
  const [activeTab, setActiveTab] = useState(AGENTS[0].id);
  const currentAgent = AGENTS.find((a) => a.id === activeTab) || AGENTS[0];

  return (
    <section id="ai-agents" className="relative py-24 px-4 sm:px-6 md:px-12 bg-[#08070A] overflow-hidden">
      {/* Background Neon Atmosphere */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 700,
          height: 400,
          top: "25%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(ellipse, rgba(151,128,255,0.14) 0%, rgba(0,240,255,0.06) 50%, transparent 75%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header with Fluid Scroll Reveal */}
        <FluidScrollReveal blurAmount={24} yOffset={35} duration={0.9}>
          <div className="flex flex-col items-center text-center mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-5 shadow-[0_0_20px_rgba(151,128,255,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-zinc-300">
                AI AGENTS THAT WORK FOR YOU
              </span>
            </div>

            {/* Bolder, Bigger, Perfectly Centered Title */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-light text-white uppercase tracking-tight max-w-4xl mx-auto text-center leading-[1.12]">
              SOFTWARE THAT SELLS{" "}
              <span className="bg-gradient-to-r from-[#9780FF] via-[#00F0FF] to-[#FF7410] bg-clip-text text-transparent font-normal inline-block">
                WHILE YOU SLEEP
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-zinc-400 font-light max-w-xl mx-auto text-center">
              We build and deploy intelligent AI agents that make your sales easier and eliminate manual daily work.
            </p>

            {/* Clean Agent Selector Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {AGENTS.map((agent) => {
                const Icon = agent.icon;
                const isActive = activeTab === agent.id;
                return (
                  <button
                    key={agent.id}
                    onClick={() => setActiveTab(agent.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 border ${
                      isActive
                        ? "bg-white/10 border-white/30 text-white shadow-[0_0_20px_rgba(151,128,255,0.3)]"
                        : "bg-white/[0.02] border-white/5 text-zinc-400 hover:text-white hover:border-white/15"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: agent.glowColor }} />
                    <span>{agent.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </FluidScrollReveal>

        {/* Live Interactive Agent Display Card with Fluid Reveal */}
        <FluidScrollReveal blurAmount={28} yOffset={45} duration={1} delay={0.1}>
          <div
            className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#14121A]/80 to-[#0A090D]/90 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-2xl transition-all duration-500 overflow-hidden"
            style={{
              boxShadow: `0 20px 80px -20px ${currentAgent.glowColor}25, 0 0 1px 1px ${currentAgent.glowColor}30 inset`,
            }}
          >
            {/* Ambient inner glow */}
            <div
              className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none opacity-20"
              style={{
                background: `radial-gradient(circle, ${currentAgent.glowColor} 0%, transparent 70%)`,
                filter: "blur(60px)",
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
              {/* Left Column: Details & Value Proposition */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10"
                    style={{
                      background: `radial-gradient(circle, ${currentAgent.glowColor}20 0%, transparent 80%)`,
                    }}
                  >
                    {React.createElement(currentAgent.icon, {
                      className: "w-6 h-6",
                      style: { color: currentAgent.glowColor },
                    })}
                  </div>
                  <div>
                    <span
                      className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-white/10"
                      style={{
                        color: currentAgent.glowColor,
                        background: `${currentAgent.glowColor}10`,
                      }}
                    >
                      {currentAgent.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight mt-1">
                      {currentAgent.name}
                    </h3>
                  </div>
                </div>

                <p className="text-base text-zinc-300 font-light leading-relaxed">
                  {currentAgent.tagline}
                </p>

                {/* Key Benefits List */}
                <div className="space-y-3 pt-2">
                  {currentAgent.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-zinc-300 font-light">
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: currentAgent.glowColor }}
                      />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Link to Contact */}
                <div className="pt-4">
                  <a
                    href="#studio"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-medium hover:bg-zinc-200 transition-all hover:scale-[1.02]"
                  >
                    <span>DEPLOY THIS AGENT</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Right Column: Measurable Result Metric + Live Execution Log */}
              <div className="lg:col-span-5 space-y-6">
                {/* Metric Card */}
                <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 block mb-1">
                    MEASURABLE RESULT
                  </span>
                  <div
                    className="text-4xl sm:text-5xl font-light tracking-tight"
                    style={{
                      background: `linear-gradient(135deg, #ffffff 0%, ${currentAgent.glowColor} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {currentAgent.metric.value}
                  </div>
                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest mt-1 block">
                    {currentAgent.metric.label}
                  </span>
                </div>

                {/* Real-time execution monitor */}
                <div className="p-5 rounded-xl border border-white/5 bg-[#050406]/90 font-mono text-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5 text-[10px] text-zinc-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                      <span>LIVE EXECUTION</span>
                    </div>
                    <span>ACTIVE</span>
                  </div>

                  <div className="space-y-2 pt-1">
                    {currentAgent.simulatedLogs.map((log, i) => (
                      <div key={i} className="text-zinc-400 leading-relaxed flex items-start gap-2">
                        <span className="text-zinc-600 shrink-0 text-[10px] pt-0.5">{log.time}</span>
                        <span className={log.status === "success" ? "text-zinc-200" : "text-zinc-400"}>
                          {log.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FluidScrollReveal>
      </div>
    </section>
  );
}
