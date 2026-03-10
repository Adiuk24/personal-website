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
        <section id="research" className="py-32 px-6">
            <div className="container max-w-6xl mx-auto">
                <SectionHeader
                    label="Publications"
                    title="Where business meets engineering."
                    subtitle="Exploring the frontier of artificial intelligence and identity-anchored architectures."
                />

                <div className="grid grid-cols-1 gap-12 mt-20">
                    {researchItems.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="group glass-morphism p-12 md:p-16 rounded-3xl border-white/[0.03] hover:border-accent/30 transition-all duration-700 flex flex-col md:flex-row gap-16 items-start"
                        >
                            <div className="p-8 bg-accent/10 rounded-2xl text-accent group-hover:bg-accent group-hover:text-background transition-all duration-700 shadow-2xl shadow-accent/10">
                                <BookOpen size={40} />
                            </div>

                            <div className="flex-1 space-y-8">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <h3 className="text-4xl md:text-5xl font-serif tracking-tight group-hover:text-accent transition-colors duration-500">
                                        {item.title}
                                    </h3>
                                    <div className="text-[10px] uppercase tracking-[3px] font-bold text-accent/60 bg-accent/5 px-4 py-2 rounded-full border border-accent/10">
                                        Published {item.date}
                                    </div>
                                </div>

                                <p className="text-2xl font-light leading-relaxed text-foreground/60 max-w-4xl">
                                    {item.desc}
                                </p>

                                <div className="flex flex-wrap gap-3">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="text-[9px] uppercase tracking-[3px] px-4 py-2 bg-white/[0.03] border border-white/[0.05] rounded-full text-foreground/40 group-hover:text-accent/60 transition-all duration-500">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="pt-8 flex flex-col md:flex-row gap-10 items-start md:items-center border-t border-white/5">
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        className="flex items-center gap-4 text-accent font-bold text-[11px] uppercase tracking-[4px] group/link hover:translate-x-4 transition-transform duration-700"
                                    >
                                        View Publication
                                        <span className="w-12 h-[1px] bg-accent/30 group-hover/link:w-20 transition-all duration-700" />
                                    </a>
                                    <div className="text-[9px] font-mono text-foreground/20 py-2 px-5 border border-white/5 rounded-full tracking-widest">
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
