import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Mail } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Commerce Agents Studio",
  description: "Terms of Service for Commerce Agents Studio. Effective October 15, 2025.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#08070A] text-zinc-300 antialiased selection:bg-[#9780FF]/30 selection:text-[#00F0FF] py-16 sm:py-24 px-6 sm:px-12 md:px-20">
      {/* Background Ambient Glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 pointer-events-none rounded-full"
        style={{
          width: 700,
          height: 350,
          background: "radial-gradient(ellipse, rgba(0,240,255,0.06) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>RETURN TO STUDIO</span>
        </Link>

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-12">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#00F0FF] uppercase tracking-widest mb-3">
            <FileText className="w-4 h-4" />
            <span>LEGAL TERMS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight uppercase">
            TERMS OF SERVICE
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 mt-4">
            <span>EFFECTIVE DATE: OCTOBER 15, 2025</span>
            <span>•</span>
            <span>COMMERCE AGENTS STUDIO</span>
            <span>•</span>
            <span>CHENNAI, INDIA</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-10 text-sm leading-relaxed text-zinc-300 font-light">
          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white uppercase font-mono tracking-wider">
              1. Acceptance of Terms
            </h2>
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your access to the Commerce Agents website and any design, engineering, or AI agent build sprints commissioned with Commerce Agents Studio (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;), led by Santhosh A in Chennai, India. By commissioning a sprint or accessing our website, you agree to be bound by these Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white uppercase font-mono tracking-wider">
              2. Scope of Studio Sprints
            </h2>
            <p>
              Commerce Agents provides specialized 0→1 engineering and bespoke product design. Our sprint engagements encompass:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-300">
              <li>High-velocity headless commerce platforms and bespoke progressive web applications.</li>
              <li>Autonomous AI agents engineered for 24/7 sales qualification, inventory routing, and cart recovery.</li>
              <li>Hardware telemetry dashboards, design systems, and multi-tenant cloud architectures.</li>
            </ul>
            <p className="text-xs text-zinc-400 mt-2 font-mono">
              Each sprint has a clearly agreed Statement of Work (SOW) defining sprint duration, functional milestones, and technical deliverables.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white uppercase font-mono tracking-wider">
              3. Intellectual Property &amp; Deliverables
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-zinc-300">
              <li>
                <strong className="text-white">Client Ownership:</strong> Upon receipt of full settlement for the commissioned sprint, all custom source code, bespoke design tokens, graphics, database schemas, and configuration scripts created specifically for the client belong exclusively to the client.
              </li>
              <li>
                <strong className="text-white">Portfolio Showcase:</strong> Unless an explicit non-disclosure agreement (NDA) is executed prior to sprint kick-off, Commerce Agents retains the non-exclusive right to display the design artifacts, case studies, and public metrics in our studio portfolio.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white uppercase font-mono tracking-wider">
              4. Third-Party APIs &amp; Operational Costs
            </h2>
            <p>
              Autonomous AI agents and custom commerce applications rely on third-party service providers (including but not limited to OpenAI, Anthropic, Vercel, Supabase, Stripe, Razorpay, and WhatsApp Business API).
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-300">
              <li>Clients maintain direct billing relationships with their chosen infrastructure and model providers.</li>
              <li>We engineer fault-tolerant retry handlers and rate-limit safeguards, but cannot guarantee uninterrupted service resulting from third-party provider downtime or upstream policy changes.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white uppercase font-mono tracking-wider">
              5. Sprint Fees &amp; Milestones
            </h2>
            <p>
              Engagements operate on fixed sprint pricing agreed in advance. Milestone payments are tied to tangible deliverables (e.g., prototype validation, staging deployment, production launch). Due to our dedicated resource allocation per sprint, deposits are non-refundable once sprint development begins.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white uppercase font-mono tracking-wider">
              6. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, Commerce Agents Studio shall not be liable for any indirect, incidental, or consequential damages resulting from lost profits, service downtime, or data corruption arising from client operational decisions or third-party outages. Our total aggregate liability under any sprint agreement shall not exceed the fees paid to the studio for that specific sprint.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white uppercase font-mono tracking-wider">
              7. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These Terms and any sprint agreements are governed by the laws of India. Any disputes arising out of or related to these Terms shall be subject to the exclusive jurisdiction of the courts located in Chennai, Tamil Nadu, India.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-white/10">
            <h2 className="text-lg font-medium text-white uppercase font-mono tracking-wider">
              8. Contact &amp; Legal Notices
            </h2>
            <p>
              For legal inquiries, sprint agreements, or contract execution notices, reach out directly:
            </p>
            <div className="flex items-center gap-2 font-mono text-sm text-zinc-200 mt-2">
              <Mail className="w-4 h-4 text-[#00F0FF]" />
              <a href="mailto:hello.commerceagents@gmail.com" className="text-white hover:text-[#00F0FF] underline">
                hello.commerceagents@gmail.com
              </a>
            </div>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              Commerce Agents Studio • Chennai, Tamil Nadu, India
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
