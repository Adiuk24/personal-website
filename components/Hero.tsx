'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section ref={containerRef} id="about" className="relative min-h-screen flex flex-col items-center justify-start pt-32 md:pt-48 px-6 overflow-hidden bg-black">
      {/* Dynamic Background */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#F27D26]/5 rounded-full blur-[180px]" />
      </motion.div>

      <div className="max-w-6xl mx-auto w-full text-center z-10 space-y-16 md:space-y-24">
        <motion.div
          style={{ scale, opacity }}
          className="space-y-8 max-w-3xl mx-auto"
        >
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-[12px] uppercase tracking-[0.6em] text-[#A19E95] font-semibold block"
            >
              Business Growth Leader
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl font-serif font-light leading-[1.1] tracking-tight text-white"
            >
              Arif <span className="text-gradient">Adito.</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-xl text-[#A19E95] max-w-2xl mx-auto font-light leading-relaxed"
          >
            Scaling startups into market leaders across SaaS, OTT, and Fintech with 15+ years of strategic impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 pt-4"
          >
            <a 
              href="mailto:adittoarif@gmail.com"
              className="text-white font-semibold flex items-center gap-2 hover:text-[#F27D26] transition-colors group"
            >
              Contact Me
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#experience"
              className="text-[#A19E95] font-semibold hover:text-white transition-colors"
            >
              View Impact
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[16/9] w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10"
        >
          <Image 
            src="https://picsum.photos/seed/global-leadership/1920/1080" 
            alt="Strategic Growth & Leadership"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#A19E95] flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.4em]">Explore</span>
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
}
