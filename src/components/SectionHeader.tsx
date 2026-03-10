"use client";

import { motion } from "framer-motion";

export const SectionHeader = ({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) => {
    return (
        <div className="mb-16 space-y-4">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-[10px] uppercase tracking-[4px] font-semibold text-accent"
            >
                {label}
            </motion.div>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-serif max-w-2xl leading-tight"
            >
                {title}
            </motion.h2>
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.6 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg font-light max-w-xl"
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
};
