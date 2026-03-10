"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export const Contact = () => {
    return (
        <section id="contact" className="py-32 px-6 border-t border-white/5 bg-accent/[0.02]">
            <div className="container max-w-4xl mx-auto text-center space-y-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                >
                    <span className="text-[10px] uppercase tracking-[5px] font-bold text-accent">
                        Get in touch
                    </span>
                    <h2 className="text-5xl md:text-7xl font-serif leading-tight">
                        Ready to build <br />
                        <em className="text-accent italic">something great?</em>
                    </h2>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.6 }}
                    viewport={{ once: true }}
                    className="text-lg md:text-xl font-light text-foreground/80 max-w-2xl mx-auto leading-relaxed"
                >
                    Currently exploring strategic leadership opportunities in UAE, MENA, and global markets.
                    Let&apos;s discuss how we can drive your next phase of growth.
                </motion.p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8">
                    <a
                        href="mailto:adittoarif@gmail.com"
                        className="flex items-center gap-4 group glass-morphism px-8 py-5 rounded-full hover:border-accent transition-all"
                    >
                        <div className="p-3 bg-accent/10 rounded-full group-hover:bg-accent group-hover:text-background transition-all">
                            <Mail size={20} />
                        </div>
                        <span className="text-lg font-medium tracking-tight">adittoarif@gmail.com</span>
                    </a>

                    <a
                        href="tel:+8801707122201"
                        className="flex items-center gap-4 group glass-morphism px-8 py-5 rounded-full hover:border-accent transition-all"
                    >
                        <div className="p-3 bg-accent/10 rounded-full group-hover:bg-accent group-hover:text-background transition-all">
                            <Phone size={20} />
                        </div>
                        <span className="text-lg font-medium tracking-tight">+880 170 712 2201</span>
                    </a>
                </div>

                <div className="flex items-center justify-center gap-8 pt-12 border-t border-white/5 opacity-40">
                    {["LinkedIn", "GitHub", "Twitter"].map(item => (
                        <a key={item} href="#" className="text-[10px] uppercase tracking-[3px] font-bold hover:text-accent transition-colors">
                            {item}
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};
