"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../SectionHeader";
import { ArrowUpRight } from "lucide-react";

const ventures = [
    {
        title: "Adioris Ltd",
        label: "AI & Consulting",
        desc: "UK-registered software development, IT consultancy, and management advisory firm. Empowering businesses with AI-driven solutions and strategic technology consulting.",
        tags: ["AI", "SaaS", "IT Consultancy", "UK"],
        href: "https://adioris.com"
    },
    {
        title: "Studio By Adi",
        label: "Creative Agency",
        desc: "London-based creative agency delivering high-end commercial photography, cinematic video production, and brand storytelling for hospitality, luxury, and F&B brands.",
        tags: ["Photography", "Cinematography", "Brand Strategy", "London"],
        href: "https://studiobyadi.com"
    }
];

export const Ventures = () => {
    return (
        <section id="ventures" className="py-32 px-6 relative overflow-hidden bg-white/[0.01]">
            <div className="container max-w-6xl mx-auto">
                <SectionHeader
                    label="Ventures"
                    title="Building things that matter."
                    subtitle="Forging paths in technology and creative excellence through founded entities."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
                    {ventures.map((venture, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.98, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.8 }}
                            className="group p-12 glass-morphism rounded-3xl border-white/[0.03] hover:border-accent/30 hover:bg-accent/[0.02] transition-all duration-700 space-y-8 flex flex-col justify-between"
                        >
                            <div className="space-y-8">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <span className="text-[10px] uppercase tracking-[5px] text-accent/60 font-bold group-hover:text-accent transition-colors">
                                            {venture.label}
                                        </span>
                                        <h3 className="text-4xl font-serif group-hover:text-accent transition-colors duration-500 tracking-tight">
                                            {venture.title}
                                        </h3>
                                    </div>
                                    <a href={venture.href} target="_blank" className="p-3 bg-white/[0.03] border border-white/[0.05] rounded-full text-accent/40 group-hover:text-accent group-hover:rotate-45 transition-all duration-500">
                                        <ArrowUpRight size={24} />
                                    </a>
                                </div>

                                <p className="text-xl font-light leading-relaxed text-foreground/60">
                                    {venture.desc}
                                </p>

                                <div className="flex flex-wrap gap-3">
                                    {venture.tags.map(tag => (
                                        <span key={tag} className="text-[9px] uppercase tracking-[2px] px-4 py-2 bg-white/[0.03] border border-white/[0.05] rounded-full text-foreground/40 group-hover:border-accent/10 transition-all duration-500">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <motion.a
                                href={venture.href}
                                target="_blank"
                                className="inline-flex items-center gap-4 text-[11px] uppercase tracking-[4px] font-bold text-accent/60 group-hover:text-accent pt-10 group-hover:translate-x-4 transition-all duration-700"
                            >
                                Visit Venture
                                <span className="h-[1px] w-12 bg-accent/30 group-hover:w-24 transition-all duration-700" />
                            </motion.a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
