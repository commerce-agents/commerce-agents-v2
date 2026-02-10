"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const TEAM = [
  {
    name: "Santhosh",
    role: "HEAD OF AI PRODUCT",
    image: "/img/image 9.jpeg",
  },
  {
    name: "Jayakumar K",
    role: "AI PRODUCT TRAINEE",
    image: "/img/image 7.jpeg",
  },
  {
    name: "Aravind",
    role: "AI PRODUCT TRAINEE",
    image: "/img/image 5.jpeg",
  },
  {
    name: "Abram Culhane",
    role: "AI PRODUCT TRAINEE",
    image: "/img/image 6.jpeg",
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-bold tracking-widest text-primary uppercase">
              Expertise
            </div>
            <h2 className="font-grotesk text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              People who work here!
            </h2>
          </div>
        </div>

        <div className="relative">
          <div className="flex gap-8 overflow-x-auto pb-12 scrollbar-none">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group relative h-[420px] w-[300px] flex-shrink-0 overflow-hidden rounded-[24px] border border-white/5 bg-white/5"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-8 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="mb-2 font-grotesk text-2xl font-bold text-white">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold tracking-widest text-primary uppercase">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
