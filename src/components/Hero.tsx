"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const Hero = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative min-h-[110vh] flex items-center justify-center overflow-hidden px-4 pt-20">
            {/* Background Ambient Glows */}
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-accent/20 blur-[150px] rounded-full mix-blend-screen opacity-30" />
            <div className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] bg-accent/10 blur-[130px] rounded-full mix-blend-screen opacity-20" />

            {/* Parallax Background Text */}
            <motion.div
                style={{ y: y1 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] z-0"
            >
                <h2 className="text-[40vw] font-serif font-black leading-none uppercase tracking-tighter">
                    STRATEGY
                </h2>
            </motion.div>

            <div className="container relative z-10 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-10"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-morphism border-accent/20"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                        </span>
                        <span className="text-[10px] uppercase tracking-[4px] font-bold text-accent/90">
                            Head of Business — Tapmad Bangladesh
                        </span>
                    </motion.div>

                    <h1 className="text-6xl md:text-[10rem] font-serif leading-[0.85] tracking-tighter">
                        <motion.span
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                            className="block text-foreground filter drop-shadow-2xl"
                        >
                            Arif
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                            className="block text-accent italic relative"
                        >
                            Adito.
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 1.5, duration: 1 }}
                                className="absolute bottom-4 left-0 h-[2px] bg-accent/30 hidden md:block"
                            />
                        </motion.span>
                    </h1>

                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start justify-between">
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.7 }}
                            transition={{ delay: 0.8, duration: 1.5 }}
                            className="max-w-xl text-lg md:text-2xl font-light leading-relaxed text-foreground/80 tracking-wide"
                        >
                            A high-impact growth leader with <span className="text-accent font-medium">15+ years</span> of experience transitioning
                            ambitious startups into market leaders across <span className="text-foreground font-semibold">SaaS, OTT, and Fintech</span>.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="flex flex-wrap gap-5 md:gap-6"
                        >
                            <a
                                href="mailto:adittoarif@gmail.com"
                                className="group relative px-8 md:px-10 py-4 md:py-5 bg-accent text-background font-bold uppercase tracking-[2px] text-[10px] md:text-xs overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-accent/20"
                            >
                                <span className="relative z-10">Get In Touch</span>
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            </a>

                            <a
                                href="#experience"
                                className="px-8 md:px-10 py-4 md:py-5 border border-white/10 glass-morphism hover:border-accent hover:bg-accent/5 transition-all text-foreground/60 hover:text-accent font-bold uppercase tracking-[2px] text-[10px] md:text-xs"
                            >
                                Strategic Impact
                            </a>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Refined Stats Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-32 pt-16 border-t border-white/5"
                >
                    {[
                        { label: "Experience", value: "15+" },
                        { label: "Markets", value: "6+" },
                        { label: "Teams", value: "100+" },
                        { label: "Growth", value: "4000%" },
                    ].map((stat, i) => (
                        <div key={i} className="space-y-2 group cursor-default">
                            <div className="text-4xl md:text-6xl font-serif text-accent flex items-baseline gap-1 group-hover:translate-x-2 transition-transform duration-500">
                                {stat.value}
                            </div>
                            <div className="text-[10px] uppercase tracking-[4px] text-foreground/30 font-bold group-hover:text-accent/50 transition-colors">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
