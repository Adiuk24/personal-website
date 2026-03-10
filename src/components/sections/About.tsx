"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../SectionHeader";

export const About = () => {
    return (
        <section id="about" className="py-32 px-6 relative overflow-hidden">
            {/* Ambient Background Element */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        {/* Decorative Frames */}
                        <div className="absolute -top-12 -left-12 w-32 h-32 border-l-2 border-t-2 border-accent/20 rounded-tl-3xl" />
                        <div className="absolute -bottom-12 -right-12 w-32 h-32 border-r-2 border-b-2 border-accent/20 rounded-br-3xl" />

                        <div className="space-y-10 relative z-10 glass-morphism p-12 rounded-2xl border-white/[0.03]">
                            <SectionHeader
                                label="The Vision"
                                title="Bridging markets, building empires."
                            />
                            <div className="space-y-8 text-xl font-light text-foreground/70 leading-relaxed">
                                <p>
                                    I am a business growth leader with <span className="text-accent font-medium">15+ years</span> of experience turning ambitious
                                    visions into operational reality. From launching Tapmad&apos;s Bangladesh operation
                                    from zero to directing creative productions in London, I thrive at the
                                    intersection of <span className="text-foreground font-medium">strategy, technology, and execution.</span>
                                </p>
                                <p>
                                    My career spans telecom VAS, OTT streaming, SaaS platforms, and data analytics
                                    — always with a focus on building repeatable revenue engines and forging
                                    partnerships that unlock new markets globally.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="space-y-10 pt-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="p-10 glass-morphism rounded-2xl space-y-6 border-white/[0.03] hover:border-accent/20 transition-all duration-500 group"
                        >
                            <h4 className="text-[10px] uppercase tracking-[5px] font-bold text-accent/60 group-hover:text-accent transition-colors">Education</h4>
                            <div className="space-y-8">
                                <div className="group/item">
                                    <div className="font-serif text-2xl group-hover/item:text-accent transition-colors">Executive MBA</div>
                                    <div className="text-sm text-foreground/40 mt-1 uppercase tracking-wider">North South University — Management</div>
                                </div>
                                <div className="group/item">
                                    <div className="font-serif text-2xl group-hover/item:text-accent transition-colors">BBA</div>
                                    <div className="text-sm text-foreground/40 mt-1 uppercase tracking-wider">Royal University of Dhaka — Administration</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="p-10 glass-morphism rounded-2xl space-y-8 border-white/[0.03] hover:border-accent/20 transition-all duration-500"
                        >
                            <h4 className="text-[10px] uppercase tracking-[5px] font-bold text-accent/60">Global Presence</h4>
                            <div className="flex flex-wrap gap-3">
                                {["UAE", "UK", "Bangladesh", "MENA", "APAC", "SEA"].map(market => (
                                    <span key={market} className="px-5 py-2.5 bg-white/[0.02] border border-white/[0.05] text-accent/70 text-[10px] font-bold tracking-[3px] rounded-lg hover:bg-accent hover:text-background hover:border-accent transition-all duration-300">
                                        {market}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
