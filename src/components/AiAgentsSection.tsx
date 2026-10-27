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
    <section id="ai-agents" className="relative py-20 px-4 sm:px-6 md:px-12 bg-[#08070A] overflow-hidden">
      {/* Background Neon Atmosphere */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 600,
          height: 350,
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(ellipse, rgba(151,128,255,0.12) 0%, rgba(0,240,255,0.06) 50%, transparent 75%)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(151,128,255,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-zinc-300">
              AI AGENTS THAT WORK FOR YOU
            </span>
          </div>

          <h2
            className="font-light text-white uppercase tracking-tight w-full max-w-5xl text-center"
            style={{
              fontSize: "clamp(16px, 3.2vw, 42px)",
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
            }}
          >
            SOFTWARE THAT RUNS YOUR BUSINESS{" "}
            <span className="bg-gradient-to-r from-[#9780FF] via-[#00F0FF] to-[#FF7410] bg-clip-text text-transparent font-normal">
              24/7 ON AUTOPILOT
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-zinc-400 font-light max-w-xl">
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
                      ? "bg-white/[0.08] text-white border-white/30 shadow-[0_0_20px_rgba(151,128,255,0.25)] scale-105"
                      : "bg-white/[0.02] text-zinc-400 border-white/5 hover:border-white/15 hover:text-zinc-200"
                  }`}
                >
                  <Icon
                    className="w-3.5 h-3.5"
                    style={{
                      color: agent.glowColor,
                      filter: isActive ? `drop-shadow(0 0 6px ${agent.glowColor})` : "none",
                    }}
                  />
                  <span>{agent.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── ACTIVE AGENT CARD: SIMPLE, PUNCHY & EASY TO READ ───────────── */}
        <div
          className="relative rounded-[28px] bg-[#0C0B10]/95 backdrop-blur-2xl border p-6 sm:p-8 md:p-10 transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
          style={{ borderColor: `${currentAgent.glowColor}40` }}
        >
          {/* Subtle Corner Glow */}
          <div
            className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none transition-all duration-700"
            style={{
              background: `radial-gradient(circle, ${currentAgent.glowColor}20 0%, transparent 70%)`,
              filter: "blur(60px)",
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: What It Does & Benefits */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center border shadow-[0_0_15px_rgba(151,128,255,0.2)]"
                  style={{
                    background: `${currentAgent.glowColor}15`,
                    borderColor: `${currentAgent.glowColor}40`,
                  }}
                >
                  {React.createElement(currentAgent.icon, {
                    className: "w-5 h-5",
                    style: {
                      color: currentAgent.glowColor,
                      filter: `drop-shadow(0 0 8px ${currentAgent.glowColor})`,
                    },
                  })}
                </div>
                <div>
                  <span
                    className="font-mono text-[9px] px-2 py-0.5 rounded-full border"
                    style={{
                      color: currentAgent.glowColor,
                      borderColor: `${currentAgent.glowColor}30`,
                      background: `${currentAgent.glowColor}10`,
                    }}
                  >
                    {currentAgent.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-medium text-white mt-1">{currentAgent.name}</h3>
                </div>
              </div>

              <p className="text-base sm:text-lg text-zinc-200 font-light leading-snug">
                {currentAgent.tagline}
              </p>

              {/* 3 Quick Bullet Points */}
              <div className="space-y-2.5 pt-2">
                {currentAgent.points.map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 font-light">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{
                        color: currentAgent.glowColor,
                        filter: `drop-shadow(0 0 4px ${currentAgent.glowColor})`,
                      }}
                    />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:scale-105"
                  style={{
                    background: currentAgent.glowColor,
                    boxShadow: `0 0 20px ${currentAgent.glowColor}50`,
                  }}
                >
                  <span>DEPLOY THIS AGENT</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right: Clean Metric & 2-Line Execution Preview */}
            <div className="lg:col-span-5 space-y-4">
              {/* Metric Box */}
              <div
                className="p-5 rounded-2xl bg-white/[0.03] border backdrop-blur-xl"
                style={{ borderColor: `${currentAgent.glowColor}25` }}
              >
                <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                  MEASURABLE RESULT
                </div>
                <div
                  className="text-3xl sm:text-4xl font-semibold mt-0.5 tracking-tight"
                  style={{
                    color: currentAgent.glowColor,
                    filter: `drop-shadow(0 0 10px ${currentAgent.glowColor}70)`,
                  }}
                >
                  {currentAgent.metric.value}
                </div>
                <div className="font-mono text-[11px] text-zinc-400 mt-0.5">
                  {currentAgent.metric.label}
                </div>
              </div>

              {/* Live Preview */}
              <div className="rounded-2xl bg-[#070609] border border-white/10 p-3.5 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[9px] text-zinc-500">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-ping"
                      style={{ background: currentAgent.glowColor }}
                    />
                    LIVE EXECUTION
                  </span>
                  <span className="text-emerald-400">ACTIVE</span>
                </div>

                {currentAgent.simulatedLogs.map((log, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded-xl text-[10px] leading-relaxed border ${
                      log.status === "success"
                        ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-300"
                        : "bg-white/[0.03] border-white/10 text-zinc-300"
                    }`}
                  >
                    <span className="text-[9px] text-zinc-500 mr-2">{log.time}</span>
                    <span>{log.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── 4 QUICK SCAN SUMMARY CARDS ─────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
          {AGENTS.map((agent) => {
            const Icon = agent.icon;
            const isCurrent = activeTab === agent.id;
            return (
              <div
                key={agent.id}
                onClick={() => setActiveTab(agent.id)}
                className={`cursor-pointer p-4 rounded-2xl bg-[#0E0D12]/90 border transition-all duration-300 hover:scale-[1.02] ${
                  isCurrent
                    ? "border-white/30 shadow-[0_8px_25px_rgba(0,0,0,0.5)]"
                    : "border-white/5 hover:border-white/15"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center border"
                    style={{
                      background: `${agent.glowColor}15`,
                      borderColor: `${agent.glowColor}30`,
                    }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{
                        color: agent.glowColor,
                        filter: `drop-shadow(0 0 5px ${agent.glowColor})`,
                      }}
                    />
                  </div>
                  <span
                    className="font-mono text-[9px] font-semibold"
                    style={{ color: agent.glowColor }}
                  >
                    {agent.metric.value}
                  </span>
                </div>

                <h4 className="text-xs font-medium text-white mb-1">{agent.name}</h4>
                <p className="text-[11px] text-zinc-400 font-light line-clamp-2 leading-relaxed">
                  {agent.tagline}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
