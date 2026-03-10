"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../SectionHeader";

const experiences = [
    {
        period: "2025 — Present",
        role: "Head of Business, Bangladesh",
        company: "Tapmad",
        desc: "Leading Tapmad's entire Bangladesh operation — GTM strategy, telecom partnerships (Grameenphone, Robi Axiata), revenue, payments enablement, and team building. Took the market from 0→1.",
        tags: ["OTT/Streaming", "GTM", "Partnerships", "B2B/B2C"],
    },
    {
        period: "2022 — 2025",
        role: "CEO & Director of Photography",
        company: "Studio By Adi Ltd",
        desc: "Founded a creative agency in London specializing in commercial photography, cinematic video production, and brand storytelling. Increased audience engagement by 250%.",
        tags: ["Entrepreneurship", "Creative Direction", "Brand Strategy"],
    },
    {
        period: "2024 — 2025",
        role: "Business Development Manager",
        company: "VBites Foods",
        desc: "Led market expansion for one of the UK's largest plant-based food companies. Built international sales channels and franchise partnerships.",
        tags: ["FMCG", "International Sales", "Franchise"],
    },
    {
        period: "2022 — 2024",
        role: "Delegate Acquisition Manager",
        company: "GlobalData Plc",
        desc: "Drove delegate engagement strategies across 15+ international events. Improved conversion rates by 25% and expanded into untapped markets.",
        tags: ["Events", "B2B Sales", "Market Expansion"],
    },
];

export const Experience = () => {
    return (
        <section id="experience" className="py-32 px-6">
            <div className="container max-w-6xl mx-auto">
                <SectionHeader
                    label="Career"
                    title="15+ years of strategic impact."
                    subtitle="A track record of scaling businesses from zero to market leaders across diverse industries."
                />

                <div className="relative mt-20">
                    {/* Vertical Line Accent */}
                    <div className="absolute left-0 md:left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent/40 via-accent/5 to-transparent hidden md:block" />

                    <div className="space-y-4">
                        {experiences.map((exp, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="group relative pl-0 md:pl-16 py-12"
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-[13px] top-[54px] w-1.5 h-1.5 rounded-full bg-accent ring-8 ring-accent/10 hidden md:block group-hover:scale-150 transition-transform duration-500" />

                                <div className="glass-morphism p-10 md:p-12 rounded-2xl border-white/[0.03] hover:border-accent/20 hover:bg-accent/[0.02] transition-all duration-700 relative overflow-hidden">
                                    {/* Subtle background role number */}
                                    <div className="absolute -right-4 -bottom-10 text-[10rem] font-serif font-black text-white/[0.02] select-none group-hover:text-accent/[0.03] transition-colors duration-700">
                                        0{experiences.length - i}
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-10 relative z-10">
                                        <div className="space-y-2">
                                            <div className="text-[10px] uppercase tracking-[4px] text-accent font-bold">
                                                {exp.period}
                                            </div>
                                            <div className="text-foreground/40 font-medium tracking-[1px] text-xs italic group-hover:text-accent/60 transition-colors duration-500">
                                                {exp.company}
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <h3 className="text-3xl md:text-4xl font-serif text-foreground group-hover:text-accent transition-colors duration-500">
                                                {exp.role}
                                            </h3>
                                            <p className="text-xl font-light leading-relaxed text-foreground/60 max-w-3xl">
                                                {exp.desc}
                                            </p>
                                            <div className="flex flex-wrap gap-3 pt-4">
                                                {exp.tags.map(tag => (
                                                    <span key={tag} className="text-[9px] uppercase tracking-[2px] px-4 py-2 bg-white/[0.03] border border-white/[0.05] rounded-full text-foreground/40 group-hover:border-accent/20 group-hover:text-accent/60 transition-all duration-500">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
