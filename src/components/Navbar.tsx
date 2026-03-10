"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Ventures", href: "#ventures" },
    { name: "Research", href: "#research" },
    { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4 mb-20",
                isScrolled ? "py-4" : "py-8"
            )}
        >
            <div className="container max-w-7xl mx-auto flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-serif font-bold tracking-tighter text-accent cursor-pointer"
                >
                    AA
                </motion.div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8 glass-morphism rounded-full px-8 py-3">
                    {navItems.map((item, i) => (
                        <motion.a
                            key={item.name}
                            href={item.href}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="text-[11px] uppercase tracking-[3px] font-medium text-foreground/60 hover:text-accent transition-colors"
                        >
                            {item.name}
                        </motion.a>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden md:block"
                >
                    <a
                        href="https://linkedin.com/in/arifadito-025088b4"
                        target="_blank"
                        className="text-[11px] uppercase tracking-[2px] font-semibold border-b border-accent/30 hover:border-accent text-accent transition-all pb-1"
                    >
                        LinkedIn ↗
                    </a>
                </motion.div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-foreground/80 hover:text-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[90] glass-morphism pt-32 px-12 md:hidden"
                    >
                        <div className="flex flex-col gap-8 items-center">
                            {navItems.map((item, i) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-3xl font-serif text-foreground/80 hover:text-accent"
                                >
                                    {item.name}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
