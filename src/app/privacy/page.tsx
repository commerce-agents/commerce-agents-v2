import React from "react";
import Link from "next/link";
import ReturnToStudioButton from "@/components/ReturnToStudioButton";
import { ShieldCheck, Mail } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Commerce Agents Studio",
  description: "Privacy Policy for Commerce Agents Studio. Effective October 15, 2025.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#08070A] text-zinc-300 antialiased selection:bg-[#9780FF]/30 selection:text-[#00F0FF] py-16 sm:py-24 px-6 sm:px-12 md:px-20">
      {/* Background Ambient Glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 pointer-events-none rounded-full"
        style={{
          width: 700,
          height: 350,
          background: "radial-gradient(ellipse, rgba(151,128,255,0.08) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Back Button */}
        <ReturnToStudioButton />

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-12">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#9780FF] uppercase tracking-widest mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>LEGAL DOCUMENTATION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight uppercase">
            PRIVACY POLICY
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
              1. Overview &amp; Scope
            </h2>
            <p>
              Commerce Agents Studio (&quot;we&quot;, &quot;our&quot;, or &quot;the Studio&quot;), founded by Santhosh A and operating out of Chennai, Tamil Nadu, India, provides high-performance bespoke commerce platform engineering, product design, and custom autonomous AI agent development.
            </p>
            <p>
              This Privacy Policy explains how we collect, handle, store, and safeguard your personal information, commercial briefs, and technical telemetry when you visit our website (
              <a href="https://www.commerce-agents.design" className="text-[#9780FF] hover:underline">
                commerce-agents.design
              </a>
              ) or commission our engineering sprints.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white uppercase font-mono tracking-wider">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-zinc-300">
              <li>
                <strong className="text-white">Commission Inquiries:</strong> Name, work email address, company or project name, budget parameters, and project scope submitted through our contact forms or direct communications.
              </li>
              <li>
                <strong className="text-white">Client Project Assets:</strong> Brand guidelines, product catalogs, customer service transcripts, API keys, webhook URLs, and database schemas provided voluntarily to enable custom commerce or agent deployment.
              </li>
              <li>
                <strong className="text-white">Technical Telemetry:</strong> Standard non-identifying telemetry including browser type, operating system, approximate geographic location, and interaction events recorded via privacy-focused analytics to optimize page performance.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white uppercase font-mono tracking-wider">
              3. Autonomous AI Agents &amp; Model Data Processing
            </h2>
            <p>
              When we engineer custom autonomous AI agents (such as 24/7 sales assistants, dispatch workflows, or cart recovery bots):
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-300">
              <li>
                <strong className="text-white">No Public LLM Training:</strong> Client proprietary data, private product catalogs, pricing rules, and internal communications are strictly used solely for prompting, grounding, or fine-tuning your dedicated private pipeline. Your confidential data is never used to train public foundation models.
              </li>
              <li>
                <strong className="text-white">Encrypted Credential Handling:</strong> All third-party credentials (WhatsApp Business API tokens, payment gateways, Supabase/database keys) are stored using encrypted environment variables and secret managers.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white uppercase font-mono tracking-wider">
              4. Subprocessors &amp; Cloud Infrastructure
            </h2>
            <p>
              We deploy client systems and host our studio infrastructure using industry-standard platforms adhering to strict SOC-2 and ISO 27001 data protection protocols:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-300">
              <li><strong>Hosting &amp; Edge Runtime:</strong> Vercel Inc.</li>
              <li><strong>Code Repositories:</strong> GitHub Inc.</li>
              <li><strong>Model Providers:</strong> Anthropic PBC / OpenAI LLC (via zero-data-retention commercial API endpoints)</li>
              <li><strong>Communications:</strong> Google Workspace / Gmail</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white uppercase font-mono tracking-wider">
              5. Data Retention &amp; Asset Ownership
            </h2>
            <p>
              Upon final delivery and milestone settlement, all custom production codebases, design Figma files, and agent configuration scripts are transferred entirely to the client. We retain project inquiry records only as long as necessary to fulfill contractual studio obligations or comply with tax and commercial reporting requirements under Indian law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white uppercase font-mono tracking-wider">
              6. Your Privacy Rights
            </h2>
            <p>
              Depending on your jurisdiction (including GDPR, CCPA, and the Digital Personal Data Protection Act of India), you have the right to request access to, correction of, or permanent deletion of any personal contact data stored by our studio.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-white/10">
            <h2 className="text-lg font-medium text-white uppercase font-mono tracking-wider">
              7. Contact &amp; Studio Inquiries
            </h2>
            <p>
              For any questions regarding this Privacy Policy or your data, contact our lead engineer directly:
            </p>
            <div className="flex items-center gap-2 font-mono text-sm text-zinc-200 mt-2">
              <Mail className="w-4 h-4 text-[#9780FF]" />
              <a href="mailto:hello.commerceagents@gmail.com" className="text-white hover:text-[#9780FF] underline">
                hello.commerceagents@gmail.com
              </a>
            </div>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              Commerce Agents Studio • Chennai, Tamil Nadu [13.0604° N, 80.2496° E]
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
