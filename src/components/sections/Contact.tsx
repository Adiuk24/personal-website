"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Twitter, Github } from "lucide-react";

export const Contact = () => {
    return (
        <section id="contact" className="py-40 px-6 relative overflow-hidden bg-accent/[0.01]">
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="container max-w-5xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-6"
                >
                    <span className="text-[10px] uppercase tracking-[10px] font-bold text-accent/60">
                        Available for Strategic Partnerships
                    </span>
                    <h2 className="text-6xl md:text-8xl font-serif leading-[1.1] tracking-tight">
                        Ready to build <br />
                        <span className="text-accent italic font-medium">the future.</span>
                    </h2>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.6 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 1.5 }}
                    className="text-2xl font-light text-foreground/80 max-w-3xl mx-auto leading-relaxed mt-12"
                >
                    Currently exploring high-impact leadership roles in UAE, MENA, and global markets.
                    Let&apos;s catalyze your next phase of growth together.
                </motion.p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-20">
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="mailto:adittoarif@gmail.com"
                        className="flex items-center gap-6 group glass-morphism px-12 py-7 rounded-2xl hover:border-accent hover:bg-accent/[0.02] transition-all duration-500 shadow-2xl"
                    >
                        <div className="p-4 bg-accent/10 rounded-xl group-hover:bg-accent group-hover:text-background transition-all duration-500">
                            <Mail size={24} />
                        </div>
                        <div className="text-left">
                            <div className="text-[10px] uppercase tracking-[2px] text-foreground/40 font-bold group-hover:text-accent/60 transition-colors">Direct Email</div>
                            <div className="text-xl md:text-2xl font-medium tracking-tight">adittoarif@gmail.com</div>
                        </div>
                    </motion.a>

                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="tel:8801707122201"
                        className="flex items-center gap-6 group glass-morphism px-12 py-7 rounded-2xl hover:border-accent hover:bg-accent/[0.02] transition-all duration-500 shadow-2xl"
                    >
                        <div className="p-4 bg-accent/10 rounded-xl group-hover:bg-accent group-hover:text-background transition-all duration-500">
                            <Phone size={24} />
                        </div>
                        <div className="text-left">
                            <div className="text-[10px] uppercase tracking-[2px] text-foreground/40 font-bold group-hover:text-accent/60 transition-colors">Call Directly</div>
                            <div className="text-xl md:text-2xl font-medium tracking-tight">+880 170 712 2201</div>
                        </div>
                    </motion.a>
                </div>

                <div className="flex items-center justify-center gap-12 mt-32 pt-16 border-t border-white/5">
                    {[
                        { name: "LinkedIn", url: "https://linkedin.com/in/arifadito-025088b4", icon: <Linkedin size={18} /> },
                        { name: "GitHub", url: "https://github.com/Adiuk24", icon: <Github size={18} /> }
                    ].map((item) => (
                        <a
                            key={item.name}
                            href={item.url}
                            target="_blank"
                            className="flex items-center gap-3 text-[10px] uppercase tracking-[4px] font-bold text-foreground/30 hover:text-accent transition-all duration-500 group"
                        >
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};
