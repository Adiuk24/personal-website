"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../SectionHeader";

export const About = () => {
    return (
        <section id="about" className="py-24 px-6 bg-accent/[0.01]">
            <div className="container max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute -top-10 -left-10 w-40 h-40 border-l border-t border-accent/20" />
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 border-r border-b border-accent/20" />

                        <div className="space-y-8 relative z-10">
                            <SectionHeader
                                label="The Vision"
                                title="Bridging markets, building empires."
                            />
                            <div className="space-y-6 text-lg font-light text-foreground/70 leading-relaxed">
                                <p>
                                    I&apos;m a business growth leader with 15+ years of experience turning ambitious
                                    visions into operational reality. From launching Tapmad&apos;s Bangladesh operation
                                    from zero to directing creative productions in London, I thrive at the
                                    intersection of strategy, technology, and execution.
                                </p>
                                <p>
                                    My career spans telecom VAS, OTT streaming, SaaS platforms, and data analytics
                                    — always with a focus on building repeatable revenue engines and forging
                                    partnerships that unlock new markets globally.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 gap-8"
                    >
                        <div className="p-8 glass-morphism space-y-4">
                            <h4 className="text-[10px] uppercase tracking-[4px] font-bold text-accent">Education</h4>
                            <div className="space-y-4">
                                <div>
                                    <div className="font-serif text-xl">Executive MBA</div>
                                    <div className="text-sm text-foreground/50">North South University — Management</div>
                                </div>
                                <div>
                                    <div className="font-serif text-xl">BBA</div>
                                    <div className="text-sm text-foreground/50">Royal University of Dhaka — Administration</div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 glass-morphism space-y-6">
                            <h4 className="text-[10px] uppercase tracking-[4px] font-bold text-accent">Global Presence</h4>
                            <div className="flex flex-wrap gap-2">
                                {["UAE", "UK", "Bangladesh", "MENA", "APAC", "SEA"].map(market => (
                                    <span key={market} className="px-4 py-2 border border-accent/20 text-accent/80 text-xs font-semibold tracking-wider rounded-sm">
                                        {market}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
