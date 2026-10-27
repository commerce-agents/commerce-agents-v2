"use client";

import React, { useState } from "react";
import { MapPin, Mail, Clock, ArrowUpRight, Check, Send, Terminal, Building2, Loader2 } from "lucide-react";
import FluidScrollReveal from "@/components/FluidScrollReveal";

export default function StudioCoordinates() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const err = await res.json();
        setErrorMsg(err.error || "Failed to submit. Please email us directly.");
      }
    } catch (err) {
      console.warn("Contact submission error, falling back to mailto:", err);
      setSubmitted(true);
      window.location.href = `mailto:hello.commerceagents@gmail.com?subject=Commission Request from ${encodeURIComponent(formState.name)}&body=${encodeURIComponent(formState.message)}`;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-8 md:px-12 bg-[#09080A]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <FluidScrollReveal blurAmount={24} yOffset={35}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-xs font-mono text-[#00F0FF] mb-3">
                <MapPin className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>[04] STUDIO COORDINATES &amp; INQUIRY</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
                LET'S ARCHITECT YOUR <br />
                <span className="font-editorial text-[#9780FF]">Commerce</span> ENGINE.
              </h2>
            </div>

            <p className="max-w-md text-sm text-zinc-400 font-light leading-relaxed">
              Ready to deploy an autonomous commerce platform or hardware dashboard? Reach out directly
              to our Chennai studio. Co-Founder Santhosh A reviews and responds within 24 hours.
            </p>
          </div>
        </FluidScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Studio Physical Location & Telemetry (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <FluidScrollReveal blurAmount={26} yOffset={40}>
              {/* Physical Card */}
              <div className="p-8 rounded-3xl bg-[#0E0D11] border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Building2 className="w-24 h-24 text-white" />
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[#FF7410] uppercase mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#FF7410] animate-ping" />
                  <span>PHYSICAL STUDIO HQ</span>
                </div>

                <h3 className="text-xl font-medium text-white mb-2">Commerce Agents Studio</h3>
                <p className="text-xs text-[#9780FF] font-mono mb-6">[Inside Coworking Hub]</p>

                <div className="space-y-4 text-xs text-zinc-300 font-light border-t border-white/5 pt-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-normal text-white">No: 143/1, Uthamar Gandhi Road</p>
                      <p className="text-zinc-400">opp. The Park Hotel, Thousand Lights West</p>
                      <p className="text-zinc-400">Nungambakkam, Chennai, Tamil Nadu 600006</p>
                      <p className="text-zinc-500 font-mono mt-1">India</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span className="font-mono text-zinc-400">
                      IST TIMEZONE (UTC +5:30) // 10:00 - 19:00
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <Mail className="w-4 h-4 text-[#9780FF] shrink-0" />
                    <a
                      href="mailto:hello.commerceagents@gmail.com"
                      className="text-[#9780FF] hover:underline font-mono text-xs"
                    >
                      hello.commerceagents@gmail.com
                    </a>
                  </div>
                </div>

                {/* Coordinates Pill */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>LAT / LONG:</span>
                  <span className="text-zinc-300">13.0604° N, 80.2496° E</span>
                </div>
              </div>

              {/* Direct co-founder note */}
              <div className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-zinc-300 leading-relaxed font-light">
                <span className="text-white font-medium">Direct Founder Access:</span> All commissions are
                architected and designed directly by <span className="text-[#9780FF]">Santhosh A</span>. No agency middlemen or outsourced handoffs.
              </div>
            </FluidScrollReveal>
          </div>

          {/* Right: Commission Terminal Form (7 cols) */}
          <div className="lg:col-span-7">
            <FluidScrollReveal blurAmount={28} yOffset={45} delay={0.1}>
              <div className="p-8 sm:p-10 rounded-3xl bg-[#0E0D11]/90 backdrop-blur-2xl border border-white/10 relative">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#9780FF]" />
                    <span className="font-mono text-xs text-zinc-300">
                      TRANSMISSION // INITIATE_COMMISSION
                    </span>
                  </div>
                  <a
                    href="mailto:hello.commerceagents@gmail.com"
                    className="text-[11px] font-mono text-[#9780FF] hover:underline"
                  >
                    hello.commerceagents@gmail.com
                  </a>
                </div>

                {submitted ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <Check className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-light text-white tracking-tight">
                      TRANSMISSION RECEIVED
                    </h3>
                    <p className="text-sm text-zinc-400 font-light max-w-md mx-auto">
                      Thank you. Co-Founder Santhosh A has received your project briefing and will review the scope and reply within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-6 py-2 rounded-full border border-white/10 text-xs font-mono text-zinc-400 hover:text-white"
                    >
                      SEND ANOTHER TRANSMISSION
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {errorMsg && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
                        {errorMsg}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-2">
                          Your Name / Stakeholder *
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="Elena Vance"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-[#9780FF] focus:outline-none text-white text-xs placeholder:text-zinc-600 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="elena@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-[#9780FF] focus:outline-none text-white text-xs placeholder:text-zinc-600 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-2">
                        Project Vision &amp; Deliverables *
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Describe what you are building (0→1 commerce engine, hardware dashboard, custom PWA), timeline expectations, or links to references..."
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-[#9780FF] focus:outline-none text-white text-xs placeholder:text-zinc-600 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#9780FF] via-[#FF7410] to-[#00F0FF] text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-95 transition-opacity duration-300 shadow-[0_0_25px_rgba(151,128,255,0.3)] disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>DISPATCHING TRANSMISSION...</span>
                        </>
                      ) : (
                        <>
                          <span>TRANSMIT COMMISSION REQUEST</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </FluidScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
