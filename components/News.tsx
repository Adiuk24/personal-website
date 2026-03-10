'use client';

import { motion } from 'motion/react';
import { ExternalLink, Newspaper } from 'lucide-react';

const news = [
  {
    title: "Pakistan's Tapmad enters Bangladesh market with Grameenphone",
    source: "The Express Tribune",
    link: "https://tribune.com.pk/story/2572159/pakistans-tapmad-enters-bangladesh-market-with-grameenphone",
    description: "Coverage of Tapmad's strategic entry into the Bangladesh market through a major telecom partnership."
  },
  {
    title: "Tapmad strengthens regional presence through partnership with Robi Axiata",
    source: "PhoneWorld",
    link: "https://www.phoneworld.com.pk/tapmad-strengthens-regional-presence-through-partnership-with-robi-axiata-in-bangladesh/",
    description: "Highlighting the expansion of Tapmad's footprint in South Asia."
  },
  {
    title: "Pakistan's Tapmad expands to Bangladesh in partnership with Grameenphone",
    source: "SAMENA Council",
    link: "https://www.samenacouncil.org/samena_daily_news?news=107842",
    description: "Industry recognition of the cross-border strategic collaboration."
  }
];

export default function News() {
  return (
    <section id="news" className="py-32 px-6 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-6 max-w-2xl">
            <span className="text-sm uppercase tracking-[0.4em] text-[#F27D26] font-medium">
              Media & Recognition
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-light leading-tight tracking-tight">
              Making headlines<span className="text-[#F27D26]">.</span>
            </h2>
          </div>
          <p className="text-[#A19E95] text-lg max-w-md font-light">
            Recognition and coverage of market expansion milestones and strategic partnerships globally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="p-10 glass rounded-[40px] space-y-8 flex flex-col justify-between hover:border-white/20 transition-all group"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#F27D26]/10 transition-colors">
                    <Newspaper className="text-[#F27D26]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[#F27D26] font-medium tracking-wide uppercase text-xs">{item.source}</p>
                  <h3 className="text-2xl font-serif font-medium leading-tight">{item.title}</h3>
                </div>
                <p className="text-[#A19E95] font-light leading-relaxed text-base">
                  {item.description}
                </p>
              </div>
              
              <a 
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#F5F2ED] font-medium group/link text-sm"
              >
                Read Article
                <ExternalLink size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
