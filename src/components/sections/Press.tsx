"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../SectionHeader";

const pressItems = [
    {
        outlet: "The Express Tribune",
        title: "Pakistan's Tapmad enters Bangladesh market with Grameenphone",
        url: "https://tribune.com.pk/story/2572159/pakistans-tapmad-enters-bangladesh-market-with-grameenphone",
    },
    {
        outlet: "PhoneWorld",
        title: "Tapmad strengthens regional presence through partnership with Robi Axiata",
        url: "https://www.phoneworld.com.pk/tapmad-strengthens-regional-presence-through-partnership-with-robi-axiata-in-bangladesh/",
    },
    {
        outlet: "SAMENA Council",
        title: "Pakistan's Tapmad expands to Bangladesh in partnership with Grameenphone",
        url: "https://www.samenacouncil.org/samena_daily_news?news=107842",
    },
];

export const Press = () => {
    return (
        <section id="press" className="py-24 px-6">
            <div className="container max-w-6xl mx-auto">
                <SectionHeader
                    label="In the Press"
                    title="Making headlines."
                    subtitle="Recognition and coverage of market expansion milestones and strategic partnerships."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {pressItems.map((item, i) => (
                        <motion.a
                            key={i}
                            href={item.url}
                            target="_blank"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-8 border border-white/5 bg-white/[0.02] hover:bg-accent/[0.03] hover:border-accent/20 transition-all rounded-xs flex flex-col justify-between h-[280px]"
                        >
                            <div className="space-y-4">
                                <span className="text-[10px] uppercase tracking-[3px] text-accent font-semibold block">
                                    {item.outlet}
                                </span>
                                <p className="text-xl font-serif text-foreground/80 group-hover:text-foreground transition-colors leading-snug">
                                    {item.title}
                                </p>
                            </div>
                            <div className="text-[10px] uppercase tracking-[3px] font-bold text-accent/40 group-hover:text-accent transform group-hover:translate-x-2 transition-all">
                                Read Article ↗
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};
