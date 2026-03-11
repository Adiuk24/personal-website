'use client';

import { motion } from 'motion/react';
import { ExternalLink, Code, Camera, Brain, Sparkles, Cpu } from 'lucide-react';

const ventures = [
  {
    title: 'Adioris Tech Ltd',
    description: 'A global technology powerhouse specializing in AI-driven solutions, digital transformation, and strategic consultancy. Bridging international expertise with local innovation.',
    link: 'https://adioris.com',
    icon: <Cpu className="text-[#F27D26]" />,
    type: 'Venture',
    highlights: ['AI Solutions', 'Digital Transformation', 'Strategic Consulting']
  },
  {
    title: 'Studio By Adi',
    description: 'London-based creative agency delivering high-end commercial photography and cinematic storytelling for luxury brands globally.',
    link: 'https://studiobyadi.com',
    icon: <Camera className="text-[#F27D26]" />,
    type: 'Venture',
    highlights: ['Cinematic Production', 'Brand Storytelling', 'Luxury F&B']
  },
  {
    title: 'Eyla — LLM Research',
    description: 'Identity-anchored LLM architecture with integrated biological priors — exploring the frontier of cognitive modeling and AI development.',
    link: '/research',
    icon: <Brain className="text-[#F27D26]" />,
    type: 'Research',
    highlights: ['Cognitive Modeling', 'Biological Priors', 'LLM Architecture']
  }
];

export default function Innovation() {
  return (
    <section id="ventures" className="py-32 px-6 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-6 max-w-2xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs uppercase tracking-[0.5em] text-[#F27D26] font-semibold"
            >
              Innovation & Ventures
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif font-light tracking-tight text-white"
            >
              Building the future<span className="text-[#F27D26]">.</span>
            </motion.h2>
          </div>
          <p className="text-[#A19E95] text-lg max-w-md font-light leading-relaxed">
            Forging paths in technology and creative excellence through founded entities and deep research.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {ventures.map((venture, i) => (
            <motion.div
              key={venture.title}
              id={venture.type === 'Research' ? 'research' : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group relative p-10 glass rounded-[48px] border border-white/5 hover:border-[#F27D26]/20 transition-all duration-700 flex flex-col justify-between min-h-[500px]"
            >
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center group-hover:bg-[#F27D26]/10 transition-all duration-700">
                    {venture.icon}
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#A19E95] font-bold border border-white/10 px-4 py-2 rounded-full">
                    {venture.type}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-3xl font-serif font-bold text-white group-hover:text-[#F27D26] transition-colors duration-500">{venture.title}</h3>
                  <p className="text-[#A19E95] font-light leading-relaxed text-lg">
                    {venture.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {venture.highlights.map(h => (
                    <span key={h} className="text-[9px] uppercase tracking-widest text-white/40 bg-white/5 px-3 py-1.5 rounded-lg">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="pt-8">
                <a 
                  href={venture.link}
                  target={venture.type === 'Research' ? '_self' : '_blank'}
                  rel={venture.type === 'Research' ? undefined : 'noopener noreferrer'}
                  className="inline-flex items-center gap-3 text-white font-bold group/link"
                >
                  <span className="border-b border-white/20 group-hover/link:border-[#F27D26] transition-colors">
                    {venture.type === 'Research' ? 'View Research Page' : 'Visit Venture'}
                  </span>
                  <ExternalLink size={16} className="text-[#F27D26] group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                </a>
              </div>

              {/* Decorative Gradient */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#F27D26]/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
