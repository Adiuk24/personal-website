"use client";

import { motion } from "framer-motion";

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
            {/* Background Ambient Glow */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full" />

            <div className="container relative z-10 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                        <span className="text-[10px] uppercase tracking-[3px] font-medium text-accent">
                            Head of Business — Tapmad Bangladesh
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-9xl font-serif leading-[0.9] tracking-tighter">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="block text-foreground"
                        >
                            Arif
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="block text-accent"
                        >
                            Adito.
                        </motion.span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="max-w-xl text-lg md:text-xl font-light leading-relaxed text-foreground/80 tracking-wide"
                    >
                        A high-impact growth leader with 15+ years of experience transitioning
                        ambitious startups into market leaders across <span className="text-foreground font-medium">SaaS, OTT, and Fintech</span>.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="flex flex-wrap gap-4 pt-4"
                    >
                        <a
                            href="mailto:adittoarif@gmail.com"
                            className="group relative px-8 py-4 bg-accent text-background font-semibold overflow-hidden transition-all hover:scale-105 active:scale-95"
                        >
                            <span className="relative z-10">Connect With Me</span>
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                        </a>

                        <button
                            className="px-8 py-4 border border-accent/30 hover:border-accent hover:bg-accent/5 transition-all text-accent/80 hover:text-accent font-medium"
                        >
                            View Strategic Impact
                        </button>
                    </motion.div>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-white/5"
                >
                    {[
                        { label: "Experience", value: "15+" },
                        { label: "Markets", value: "6+" },
                        { label: "Teams", value: "100+" },
                        { label: "Growth", value: "4000%" },
                    ].map((stat, i) => (
                        <div key={i} className="group cursor-default">
                            <div className="text-3xl md:text-4xl font-serif text-accent group-hover:scale-110 transition-transform duration-300">
                                {stat.value}
                            </div>
                            <div className="text-[10px] uppercase tracking-[2px] text-foreground/40 mt-1">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Hero Visual Element */}
            <div className="absolute right-0 bottom-0 opacity-10 select-none pointer-events-none translate-x-[20%] translate-y-[20%]">
                <h2 className="text-[30vw] font-serif leading-none">STRATEGY</h2>
            </div>
        </section>
    );
};
