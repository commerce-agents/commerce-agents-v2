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
  Layers,
  Sparkles,
  MessageSquare,
} from "lucide-react";

interface AgentFeature {
  id: string;
  name: string;
  badge: string;
  category: string;
  glowColor: string;
  accentBorder: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  headline: string;
  description: string;
  benefits: string[];
  metrics: { label: string; value: string };
  simulatedLogs: { time: string; text: string; status: "success" | "active" | "neutral" }[];
}

const AGENTS: AgentFeature[] = [
  {
    id: "sales-agent",
    name: "24/7 Autonomous Sales Agent",
    category: "REVENUE ACCELERATION",
    badge: "CONVERSION ENGINE",
    glowColor: "#9780FF",
    accentBorder: "rgba(151,128,255,0.35)",
    icon: Bot,
    headline: "Turns midnight visitors into paying customers on autopilot.",
    description:
      "Trained on your exact product catalog, inventory, and brand voice. It answers complex questions, handles pricing objections, recommends bundles, and guides shoppers straight through checkout with zero human delay.",
    benefits: [
      "Sub-second response time — never lose a buyer who is ready to checkout",
      "Dynamic product recommendations that boost Average Order Value (AOV)",
      "Handles 100+ concurrent buyer conversations simultaneously with zero lag",
      "Direct 1-tap checkout links sent right inside the conversation stream",
    ],
    metrics: { label: "CHECKOUT CONVERSION", value: "+42%" },
    simulatedLogs: [
      { time: "02:14 AM", text: "Shopper asks: 'Will this fit a 15kg French Bulldog?'", status: "neutral" },
      { time: "02:14 AM", text: "Sales Agent: 'Yes, Medium harness recommended + 2-day delivery.'", status: "active" },
      { time: "02:15 AM", text: "Cart link generated → Payment completed ₹3,490", status: "success" },
    ],
  },
  {
    id: "operations-agent",
    name: "Autonomous Operations & Dispatch Agent",
    category: "WORKFLOW AUTOMATION",
    badge: "ZERO MANUAL WORK",
    glowColor: "#FF7410",
    accentBorder: "rgba(255,116,16,0.35)",
    icon: Cpu,
    headline: "Automates order routing, inventory alerts, and dispatch.",
    description:
      "Eliminates hours of tedious data entry between your website, WhatsApp, delivery partners, and inventory spreadsheets. The agent coordinates dispatch and vendor updates instantly.",
    benefits: [
      "Auto-routes incoming orders straight to warehouse staff via WhatsApp/SMS",
      "Real-time inventory deduction and automated low-stock supplier reorders",
      "Instant GST invoice generation and customer tracking notification",
      "Zero human errors or missed orders during high-volume flash sales",
    ],
    metrics: { label: "TIME SAVED WEEKLY", value: "25+ HRS" },
    simulatedLogs: [
      { time: "11:42 AM", text: "New paid order #8492 captured across multi-channel cart", status: "neutral" },
      { time: "11:42 AM", text: "Dispatch ticket sent to warehouse packing line via WhatsApp", status: "active" },
      { time: "11:43 AM", text: "Inventory decremented: 4 items remaining → Reorder alert sent", status: "success" },
    ],
  },
  {
    id: "retention-agent",
    name: "Cart Recovery & Retention Agent",
    category: "CUSTOMER LIFECYCLE",
    badge: "LOST REVENUE RESCUE",
    glowColor: "#00F0FF",
    accentBorder: "rgba(0,240,255,0.35)",
    icon: RefreshCw,
    headline: "Recovers abandoned carts and builds loyal repeat customers.",
    description:
      "Most cart recovery emails go to spam. Our agent triggers intelligent, context-aware WhatsApp & SMS prompts that solve why the user left, offering timed incentives and instant answers.",
    benefits: [
      "Smart follow-ups sent within 15 minutes of cart abandonment",
      "Answers hesitation questions regarding shipping times and return policies",
      "Proactive automated delivery updates and post-purchase feedback loops",
      "Re-engages inactive customers with personalized replenishment reminders",
    ],
    metrics: { label: "ABANDONED CARTS SAVED", value: "28.4%" },
    simulatedLogs: [
      { time: "04:30 PM", text: "Checkout abandoned on payment screen (Address verified)", status: "neutral" },
      { time: "04:45 PM", text: "Context-aware WhatsApp prompt triggered with 1-click UPI link", status: "active" },
      { time: "04:48 PM", text: "Payment verified via webhook → Order moved to fulfillment", status: "success" },
    ],
  },
  {
    id: "custom-brain",
    name: "Custom Enterprise Workflow Agent",
    category: "BESPOKE AI BRAIN",
    badge: "10X LEAN TEAM",
    glowColor: "#10B981",
    accentBorder: "rgba(16,185,129,0.35)",
    icon: Terminal,
    headline: "Engineered specifically around your exact business rules.",
    description:
      "Stop paying for 10 disconnected SaaS tools. We engineer a bespoke AI agent pipeline connected directly to your databases, APIs, ERP, and payment gateways so you can run a 10-person operation with a 2-person team.",
    benefits: [
      "Bespoke logic engineered from scratch for your specific business workflow",
      "Direct integration with custom databases, Stripe, Razorpay, and ERPs",
      "High-security encrypted execution with private API access tokens",
      "Scales infinitely without adding customer support or operational headcount",
    ],
    metrics: { label: "OPERATING OVERHEAD", value: "-65%" },
    simulatedLogs: [
      { time: "09:00 AM", text: "Telemetry stream synched with ERP database & payment ledger", status: "neutral" },
      { time: "09:01 AM", text: "Cross-platform reconciliation: 1,420 transactions verified", status: "active" },
      { time: "09:01 AM", text: "Daily executive summary compiled & dispatched to founder", status: "success" },
    ],
  },
];

export default function AiAgentsSection() {
  const [activeTab, setActiveTab] = useState(AGENTS[0].id);
  const currentAgent = AGENTS.find((a) => a.id === activeTab) || AGENTS[0];

  return (
    <section id="ai-agents" className="relative py-28 px-4 sm:px-6 md:px-12 bg-[#08070A] overflow-hidden">
      {/* Background Neon Atmosphere */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 700,
          height: 400,
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(ellipse, rgba(151,128,255,0.12) 0%, rgba(0,240,255,0.06) 50%, transparent 75%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-5 shadow-[0_0_20px_rgba(151,128,255,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-zinc-300">
              AUTONOMOUS COMMERCE &amp; WORK AGENTS
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light text-white uppercase tracking-tight max-w-4xl">
            AI AGENTS ENGINEERED TO{" "}
            <span className="bg-gradient-to-r from-[#9780FF] via-[#00F0FF] to-[#FF7410] bg-clip-text text-transparent font-normal">
              RUN YOUR BUSINESS
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-zinc-400 font-light max-w-2xl">
            Stop losing sales when you sleep and wasting hours on manual coordination. We build custom autonomous AI
            agents that sell products, route orders, and automate workflows 24/7.
          </p>

          {/* Interactive Agent Selectors */}
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mt-10">
            {AGENTS.map((agent) => {
              const Icon = agent.icon;
              const isActive = activeTab === agent.id;
              return (
                <button
                  key={agent.id}
                  onClick={() => setActiveTab(agent.id)}
                  className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 border ${
                    isActive
                      ? "bg-white/[0.08] text-white border-white/30 shadow-[0_0_25px_rgba(151,128,255,0.25)] scale-105"
                      : "bg-white/[0.02] text-zinc-400 border-white/5 hover:border-white/15 hover:text-zinc-200"
                  }`}
                >
                  <Icon
                    className="w-4 h-4 transition-transform duration-300"
                    style={{
                      color: agent.glowColor,
                      filter: isActive ? `drop-shadow(0 0 8px ${agent.glowColor})` : "none",
                    }}
                  />
                  <span>{agent.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── ACTIVE AGENT DEEP-DIVE SPOTLIGHT CARD ──────────────────────────── */}
        <div
          className="relative rounded-[32px] sm:rounded-[36px] bg-[#0C0B10]/90 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 md:p-12 transition-all duration-500 shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden"
          style={{ borderColor: currentAgent.accentBorder }}
        >
          {/* Neon Corner Glow Accent */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none transition-all duration-700"
            style={{
              background: `radial-gradient(circle, ${currentAgent.glowColor}25 0%, transparent 70%)`,
              filter: "blur(60px)",
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
            {/* Left Column: Details & Benefits */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(151,128,255,0.2)]"
                  style={{
                    background: `${currentAgent.glowColor}15`,
                    borderColor: `${currentAgent.glowColor}40`,
                  }}
                >
                  {React.createElement(currentAgent.icon, {
                    className: "w-6 h-6",
                    style: {
                      color: currentAgent.glowColor,
                      filter: `drop-shadow(0 0 8px ${currentAgent.glowColor})`,
                    },
                  })}
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                    {currentAgent.category}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-medium text-white">{currentAgent.name}</h3>
                </div>
              </div>

              <p className="text-lg text-zinc-200 font-light leading-relaxed">{currentAgent.headline}</p>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">{currentAgent.description}</p>

              {/* Core Concrete Benefits List */}
              <div className="space-y-3 pt-3 border-t border-white/10">
                <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                  REAL BUSINESS ADVANTAGES:
                </div>
                {currentAgent.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 font-light">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{
                        color: currentAgent.glowColor,
                        filter: `drop-shadow(0 0 5px ${currentAgent.glowColor})`,
                      }}
                    />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:scale-105"
                  style={{
                    background: currentAgent.glowColor,
                    boxShadow: `0 0 25px ${currentAgent.glowColor}60`,
                  }}
                >
                  <span>DEPLOY THIS AGENT</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <span className="font-mono text-[11px] text-zinc-500">
                  Turnaround: 5-7 business days from scope to live
                </span>
              </div>
            </div>

            {/* Right Column: Live Simulated Telemetry & Metrics Display */}
            <div className="lg:col-span-5 space-y-5">
              {/* Stat Metric Card */}
              <div
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden"
                style={{ borderColor: `${currentAgent.glowColor}30` }}
              >
                <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                  {currentAgent.metrics.label}
                </div>
                <div
                  className="text-3xl sm:text-4xl font-semibold mt-1 tracking-tight"
                  style={{
                    color: currentAgent.glowColor,
                    filter: `drop-shadow(0 0 12px ${currentAgent.glowColor}80)`,
                  }}
                >
                  {currentAgent.metrics.value}
                </div>
                <div className="font-mono text-[10px] text-zinc-500 mt-1">Verified across client production stores</div>
              </div>

              {/* Terminal Simulation Stream */}
              <div className="rounded-2xl bg-[#070609] border border-white/10 p-4 font-mono text-xs overflow-hidden shadow-inner">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-[10px] text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full animate-ping"
                      style={{ background: currentAgent.glowColor }}
                    />
                    <span className="text-zinc-300 uppercase tracking-wider">LIVE EXECUTION STREAM</span>
                  </div>
                  <span className="text-zinc-500">LATENCY: 8ms</span>
                </div>

                <div className="space-y-2.5">
                  {currentAgent.simulatedLogs.map((log, i) => (
                    <div
                      key={i}
                      className={`p-2.5 rounded-xl border text-[11px] leading-relaxed transition-all ${
                        log.status === "success"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                          : log.status === "active"
                          ? "bg-white/[0.04] border-white/15 text-zinc-200"
                          : "bg-white/[0.02] border-white/5 text-zinc-400"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[9px] text-zinc-500 mb-1">
                        <span>{log.time}</span>
                        {log.status === "success" && (
                          <span className="flex items-center gap-1 text-emerald-400">
                            <ShieldCheck className="w-3 h-3" /> VERIFIED
                          </span>
                        )}
                        {log.status === "active" && (
                          <span
                            className="flex items-center gap-1"
                            style={{ color: currentAgent.glowColor }}
                          >
                            <Activity className="w-3 h-3 animate-pulse" /> EXECUTING
                          </span>
                        )}
                      </div>
                      <div>{log.text}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-500">
                  <span>AGENT PIPELINE: ACTIVE</span>
                  <span className="text-emerald-400">100% UPTIME</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── 4-GRID SUMMARY CARDS FOR COMPREHENSIVE OVERVIEW ───────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
          {AGENTS.map((agent) => {
            const Icon = agent.icon;
            const isCurrent = activeTab === agent.id;
            return (
              <div
                key={agent.id}
                onClick={() => setActiveTab(agent.id)}
                className={`cursor-pointer p-5 sm:p-6 rounded-[24px] bg-[#0E0D12]/90 border transition-all duration-300 backdrop-blur-xl group hover:scale-[1.02] ${
                  isCurrent
                    ? "border-white/30 shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
                    : "border-white/5 hover:border-white/15"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${agent.glowColor}15`,
                      borderColor: `${agent.glowColor}30`,
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{
                        color: agent.glowColor,
                        filter: `drop-shadow(0 0 6px ${agent.glowColor})`,
                      }}
                    />
                  </div>
                  <span
                    className="font-mono text-[9px] px-2 py-0.5 rounded-full border"
                    style={{
                      color: agent.glowColor,
                      borderColor: `${agent.glowColor}30`,
                      background: `${agent.glowColor}08`,
                    }}
                  >
                    {agent.badge}
                  </span>
                </div>

                <h4 className="text-sm font-medium text-white mb-1.5 group-hover:text-zinc-100">{agent.name}</h4>
                <p className="text-xs text-zinc-400 font-light line-clamp-2 leading-relaxed mb-4">
                  {agent.headline}
                </p>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[10px]">
                  <span className="text-zinc-500">{agent.metrics.label}</span>
                  <span
                    className="font-semibold"
                    style={{
                      color: agent.glowColor,
                      filter: `drop-shadow(0 0 6px ${agent.glowColor})`,
                    }}
                  >
                    {agent.metrics.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
