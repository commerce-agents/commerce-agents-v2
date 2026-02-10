"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch("https://formspree.io/f/xreabqzy", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setIsSuccess(true);
        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      console.error("Submission error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-6 font-grotesk text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Get in Touch
            </h2>
            <p className="mb-12 max-w-md text-lg text-muted">
              Ready to transform your commerce operations? Let&apos;s discuss how our
              agents can work for you.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-muted uppercase">Phone</h4>
                  <p className="text-xl font-medium text-white">+91 99412 92729</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-muted uppercase">Email</h4>
                  <p className="text-xl font-medium text-white">hello.commerceagents@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-muted uppercase">Location</h4>
                  <p className="text-xl font-medium text-white">Anna Nagar, Chennai, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass relative rounded-[30px] p-8 lg:p-12"
          >
            {isSuccess && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-[30px] bg-[#020202]/90 text-center backdrop-blur-md">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-black">
                  <Send size={40} />
                </div>
                <h3 className="mb-2 text-3xl font-bold text-white">Message Sent!</h3>
                <p className="text-muted text-lg">We&apos;ll get back to you shortly.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-8 font-bold text-primary underline"
                >
                  Send another message
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-muted uppercase">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none focus:border-primary/50"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-muted uppercase">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="john@company.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none focus:border-primary/50"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-muted uppercase">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none focus:border-primary/50"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-primary py-5 text-lg font-bold text-black transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
