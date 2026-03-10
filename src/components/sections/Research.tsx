"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../SectionHeader";
import { BookOpen, ArrowUpRight } from "lucide-react";

const researchItems = [
    {
        title: "Eyla — LLM Architecture Research",
        date: "2024",
        desc: "Identity-anchored LLM architecture with integrated biological priors — exploring the frontier of AI development and cognitive modeling.",
        doi: "10.5281/zenodo.18922059",
        url: "https://doi.org/10.5281/zenodo.18922059",
        tags: ["AI Research", "LLM", "Cognitive Science"]
    }
];

export const Research = () => {
    return (
        <section id="research" className="py-24 px-6 bg-accent/[0.01]">
            <div className="container max-w-6xl mx-auto">
                <SectionHeader
                    label="Publications"
                    title="Where business meets engineering."
                    subtitle="Exploring the frontier of artificial intelligence and identity-anchored architectures."
                />

                <div className="grid grid-cols-1 gap-8">
                    {researchItems.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group glass-morphism p-10 flex flex-col md:flex-row gap-10 items-start hover:border-accent/40 transition-all"
                        >
                            <div className="p-5 bg-accent/10 rounded-xs text-accent group-hover:bg-accent group-hover:text-background transition-all duration-500">
                                <BookOpen size={32} />
                            </div>

                            <div className="flex-1 space-y-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <h3 className="text-3xl font-serif tracking-tight group-hover:text-accent transition-colors">
                                        {item.title}
                                    </h3>
                                    <span className="text-xs uppercase tracking-[2px] font-bold text-accent/40">
                                        Published {item.date}
                                    </span>
                                </div>

                                <p className="text-foreground/70 font-light leading-relaxed max-w-3xl text-lg">
                                    {item.desc}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="text-[10px] uppercase tracking-[1px] px-3 py-1 bg-white/5 border border-white/10 rounded-full text-foreground/40">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="pt-4 flex flex-col md:flex-row gap-6 items-start md:items-center">
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-[3px] group/link"
                                    >
                                        View Publication
                                        <ArrowUpRight size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                                    </a>
                                    <div className="text-[10px] font-mono text-foreground/30 py-1 px-3 border border-white/5 rounded-full">
                                        DOI: {item.doi}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
