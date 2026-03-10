"use client";

import { motion } from "framer-motion";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 px-6 border-t border-white/5 bg-background">
            <div className="container max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col items-center md:items-start gap-4">
                    <div className="text-xl font-serif font-bold text-accent tracking-tighter">
                        Arif Adito<span className="text-foreground/20">.</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-[4px] text-foreground/30 font-bold">
                        Strategic Business Growth Leader
                    </p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-2">
                    <div className="text-[10px] uppercase tracking-[3px] text-foreground/40 font-medium">
                        © {currentYear} — ALL RIGHTS RESERVED
                    </div>
                    <div className="text-[9px] uppercase tracking-[2px] text-foreground/20">
                        DESIGNED & BUILT BY ANTIGRAVITY
                    </div>
                </div>
            </div>
        </footer>
    );
};
