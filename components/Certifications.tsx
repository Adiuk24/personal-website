'use client';

import { motion } from 'motion/react';
import { Award, CheckCircle2 } from 'lucide-react';

const certifications = [
  {
    title: "Strategic Leadership",
    issuer: "Harvard Business School Online",
    date: "2023",
  },
  {
    title: "Advanced Growth Strategy",
    issuer: "Reforge",
    date: "2022",
  },
  {
    title: "Digital Marketing Analytics",
    issuer: "MIT Sloan Executive Education",
    date: "2021",
  },
  {
    title: "AI for Business Strategy",
    issuer: "University of Pennsylvania (Wharton)",
    date: "2023",
  },
  {
    title: "Google Data Analytics Professional",
    issuer: "Google",
    date: "2022",
  },
  {
    title: "HubSpot Growth Suite Certified",
    issuer: "HubSpot Academy",
    date: "2021",
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.5em] text-[#F27D26] font-semibold"
          >
            Continuous Learning
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-light tracking-tight text-white"
          >
            Professional Certifications<span className="text-[#F27D26]">.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 glass rounded-[32px] border border-white/5 hover:border-[#F27D26]/30 transition-all duration-500 group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#F27D26]/10 flex items-center justify-center group-hover:bg-[#F27D26] transition-all duration-500">
                  <Award className="text-[#F27D26] group-hover:text-white" size={24} />
                </div>
                <span className="text-[10px] font-bold text-[#A19E95] uppercase tracking-widest">{cert.date}</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#F27D26] transition-colors">{cert.title}</h3>
                <div className="flex items-center gap-2 text-[#A19E95]">
                  <CheckCircle2 size={14} className="text-[#F27D26]" />
                  <p className="text-sm font-light">{cert.issuer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
