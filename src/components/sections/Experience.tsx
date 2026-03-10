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
        <section id="experience" className="py-24 px-6">
            <div className="container max-w-6xl mx-auto">
                <SectionHeader
                    label="Career"
                    title="15+ years of strategic impact."
                    subtitle="A track record of scaling businesses from zero to market leaders across diverse industries."
                />

                <div className="space-y-0">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 py-12 border-b border-white/5 hover:bg-accent/[0.02] transition-colors px-4 -mx-4"
                        >
                            <div className="text-[12px] uppercase tracking-[2px] text-foreground/40 pt-1 font-medium">
                                {exp.period}
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-serif text-foreground group-hover:text-accent transition-colors">
                                        {exp.role}
                                    </h3>
                                    <div className="text-accent/60 font-medium tracking-[1px] text-sm italic">
                                        {exp.company}
                                    </div>
                                </div>
                                <p className="text-foreground/70 font-light leading-relaxed max-w-3xl">
                                    {exp.desc}
                                </p>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {exp.tags.map(tag => (
                                        <span key={tag} className="text-[10px] uppercase tracking-[1px] px-3 py-1 bg-white/5 border border-white/10 rounded-full text-foreground/50">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
