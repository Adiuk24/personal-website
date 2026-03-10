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
        <section id="ventures" className="py-24 px-6 bg-white/[0.01]">
            <div className="container max-w-6xl mx-auto">
                <SectionHeader
                    label="Ventures"
                    title="Building things that matter."
                    subtitle="Forging paths in technology and creative excellence through founded entities."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {ventures.map((venture, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-10 glass-morphism border-accent/10 hover:border-accent/30 transition-all space-y-6 flex flex-col justify-between"
                        >
                            <div className="space-y-6">
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] uppercase tracking-[3px] text-accent font-semibold">
                                        {venture.label}
                                    </span>
                                    <a href={venture.href} target="_blank" className="text-accent/40 group-hover:text-accent transition-colors">
                                        <ArrowUpRight size={24} />
                                    </a>
                                </div>
                                <h3 className="text-3xl font-serif group-hover:text-accent transition-colors tracking-tight">
                                    {venture.title}
                                </h3>
                                <p className="text-foreground/60 font-light leading-relaxed">
                                    {venture.desc}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {venture.tags.map(tag => (
                                        <span key={tag} className="text-[10px] uppercase tracking-[1px] px-3 py-1 bg-white/5 border border-white/10 rounded-full text-foreground/40">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <motion.a
                                href={venture.href}
                                target="_blank"
                                whileHover={{ x: 5 }}
                                className="inline-flex items-center gap-2 text-xs uppercase tracking-[3px] font-bold text-accent pt-6"
                            >
                                Visit Venture
                                <span className="h-px w-8 bg-accent/30 group-hover:w-16 transition-all duration-500" />
                            </motion.a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
