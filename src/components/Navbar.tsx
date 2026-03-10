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
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out px-6",
                isScrolled ? "py-4 bg-background/80 backdrop-blur-xl border-b border-white/[0.05]" : "py-10 bg-transparent"
            )}
        >
            <div className="container max-w-7xl mx-auto flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-serif font-bold tracking-tighter text-accent cursor-pointer group"
                >
                    A<span className="group-hover:text-foreground transition-colors duration-500">A</span>
                </motion.div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-10">
                    <div className="flex items-center gap-8 glass-morphism rounded-full px-10 py-3.5 shadow-2xl">
                        {navItems.map((item, i) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 + 0.2 }}
                                className="text-[10px] uppercase tracking-[4px] font-semibold text-foreground/50 hover:text-accent transition-all duration-300 hover:scale-110"
                            >
                                {item.name}
                            </motion.a>
                        ))}
                    </div>

                    <motion.a
                        href="https://linkedin.com/in/arifadito-025088b4"
                        target="_blank"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                        className="group flex items-center gap-2 text-[10px] uppercase tracking-[3px] font-bold text-accent/80 hover:text-accent transition-all pl-4"
                    >
                        Connect
                        <span className="w-8 h-[1px] bg-accent/30 group-hover:w-12 transition-all duration-500" />
                    </motion.a>
                </div>

                {/* Mobile Toggle */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="md:hidden p-3 glass-morphism rounded-full text-foreground/80 hover:text-accent transition-all"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[90] bg-background/98 backdrop-blur-2xl pt-40 px-12 md:hidden"
                    >
                        <div className="flex flex-col gap-10 items-center justify-center">
                            {navItems.map((item, i) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-4xl font-serif text-foreground/80 hover:text-accent transition-all hover:scale-105"
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
