'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { Award, ChevronDown } from 'lucide-react';

// Synced from LinkedIn (linkedin.com/in/arif-adito-025088b4) — Aug 2026.
// Google PM specialization course certificates are folded into the specialization entry.

const featured: { title: string; issuer: string; date: string; note?: string; isNew?: boolean }[] = [
  { title: "Claude Code 101", issuer: "Anthropic", date: "Aug 2026", note: "Agentic coding with Claude Code — Anthropic Academy", isNew: true },
  { title: "Google Project Management: Specialization", issuer: "Google", date: "Dec 2024", note: "6 course certificates incl. Agile PM & Capstone" },
  { title: "Google Digital Marketing & E-commerce", issuer: "Google", date: "Feb 2025" },
  { title: "Google Business Intelligence", issuer: "Google", date: "Feb 2025" },
  { title: "Meta Certified Digital Marketing Associate", issuer: "Meta", date: "Feb 2025" },
  { title: "Leading People and Teams", issuer: "University of Michigan", date: "Feb 2025" },
  { title: "Web3 & Blockchain Leadership for Transformation", issuer: "INSEAD", date: "Jan 2025" },
  { title: "Introduction to Generative AI", issuer: "Google", date: "Dec 2024" },
  { title: "Salesforce Sales Operations", issuer: "Pathstream", date: "2024" },
];

const groups: { label: string; certs: { title: string; issuer: string; date?: string }[] }[] = [
  {
    label: "Product & AI",
    certs: [
      { title: "Claude Code in Action", issuer: "Anthropic", date: "Aug 2026" },
      { title: "Building with the Claude API", issuer: "Anthropic", date: "Aug 2026" },
      { title: "Claude Platform 101", issuer: "Anthropic", date: "Aug 2026" },
      { title: "AI for Product Management", issuer: "Pendo.io", date: "Dec 2024" },
      { title: "Product Analytics Certification", issuer: "Pendo.io", date: "Dec 2024" },
      { title: "Product Management Basics Certification", issuer: "Pendo.io", date: "Dec 2024" },
      { title: "Agile Scrum Master", issuer: "Simplilearn", date: "Feb 2025" },
      { title: "Introduction to Modern Project Management", issuer: "Alison", date: "Feb 2025" },
    ],
  },
  {
    label: "Marketing & Growth",
    certs: [
      { title: "Meta Social Media Marketing", issuer: "Meta" },
      { title: "LinkedIn Marketing Strategy", issuer: "LinkedIn", date: "Feb 2025" },
      { title: "LinkedIn Marketing Solutions Fundamentals", issuer: "LinkedIn", date: "Feb 2025" },
      { title: "LinkedIn Content and Creative Design", issuer: "LinkedIn", date: "Feb 2025" },
      { title: "Social Media Marketing", issuer: "HubSpot Academy", date: "Feb 2025" },
      { title: "HubSpot Sales Hub Software", issuer: "HubSpot Academy", date: "Feb 2025" },
      { title: "Getting Started in Google Analytics", issuer: "Coursera Project Network", date: "Feb 2025" },
      { title: "Marketing on LinkedIn: The Sophisticated Marketer's Guide", issuer: "LinkedIn", date: "Jul 2020" },
      { title: "Sales: Analytics-Driven Storytelling", issuer: "LinkedIn", date: "Jun 2022" },
      { title: "Neil Blumenthal on Branding", issuer: "LinkedIn", date: "Oct 2016" },
    ],
  },
  {
    label: "Data & Web3",
    certs: [
      { title: "Foundations of Business Intelligence", issuer: "Google", date: "Jan 2025" },
      { title: "Excel Basics for Data Analysis", issuer: "IBM", date: "Feb 2025" },
      { title: "Web3 & Blockchain Transformations in Global Supply Chains", issuer: "INSEAD", date: "Jan 2025" },
      { title: "Introduction to Blockchain for Global Commerce", issuer: "INSEAD", date: "Jan 2025" },
      { title: "Introduction to Cybersecurity", issuer: "Cisco", date: "Feb 2025" },
    ],
  },
  {
    label: "Leadership & Coaching",
    certs: [
      { title: "Diploma in Leadership and Management Styles", issuer: "Alison", date: "Feb 2025" },
      { title: "Career Counselling Diploma (CPD Accredited)", issuer: "Centre of Excellence", date: "Feb 2025" },
      { title: "Professional Coaching Diploma (Level 1)", issuer: "The SPEAKup Challenge", date: "Jan 2025" },
      { title: "Foundations of Career Navigating and Coaching", issuer: "Goodwill Industries International", date: "Feb 2025" },
      { title: "Why Trust Matters with Rachel Botsman", issuer: "LinkedIn", date: "Jun 2022" },
      { title: "Personal Finance Nano Tips", issuer: "LinkedIn", date: "Jul 2022" },
    ],
  },
  {
    label: "Compliance & Safety",
    certs: [
      { title: "Anti-Bribery and Corruption Compliance Training", issuer: "Alison", date: "Sep 2025" },
      { title: "Action Counters Terrorism Security", issuer: "NaCTSO · CTP · SIA" },
      { title: "First Aid", issuer: "Steps Institute for Private Training" },
    ],
  },
];


// The full directory ran to ~5,000px on a phone. Groups collapse under md.
function CertGroup({ group }: { group: { label: string; certs: { title: string; issuer: string; date?: string }[] } }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 border-b border-white/10 pb-4 md:cursor-default"
      >
        <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#F27D26] font-mono text-left">
          {group.label}
        </h3>
        <span className="flex items-center gap-2 md:hidden">
          <span className="text-[10px] font-mono text-white/30">{group.certs.length}</span>
          <ChevronDown size={16} className={`text-[#A19E95] transition-transform ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>
      <ul className={`space-y-4 ${open ? 'block' : 'hidden md:block'}`}>
        {group.certs.map((cert) => (
          <li key={cert.title} className="flex items-baseline justify-between gap-4">
            <div>
              <p className="text-sm text-white font-light leading-snug">{cert.title}</p>
              <p className="text-xs text-[#A19E95] font-light">{cert.issuer}</p>
            </div>
            {cert.date && (
              <span className="text-[10px] font-mono text-white/30 whitespace-nowrap">{cert.date}</span>
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 md:py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-24">
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
            className="text-4xl md:text-7xl font-serif font-light tracking-tight text-white"
          >
            Professional Certifications<span className="text-[#F27D26]">.</span>
          </motion.h2>
          <p className="text-[#A19E95] text-base md:text-lg font-light">
            40+ credentials across product, marketing, AI, data, and leadership —{' '}
            <a
              href="https://www.linkedin.com/in/arif-adito-025088b4/details/certifications/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F27D26] hover:text-white transition-colors border-b border-[#F27D26]/30"
            >
              verified on LinkedIn
            </a>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {featured.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`relative p-4 md:p-6 glass rounded-2xl border transition-all duration-500 group ${cert.isNew ? 'border-[#F27D26]/40 hover:border-[#F27D26]/70' : 'border-white/5 hover:border-[#F27D26]/30'}`}
            >
              {/* A 48px icon tile per certificate turned a list into full-screen
                  cards. The award mark is now a 14px inline glyph. */}
              <div className="flex items-start gap-3">
                <Award size={14} className="text-[#F27D26] mt-1 shrink-0" />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-sm md:text-base font-serif text-white group-hover:text-[#F27D26] transition-colors leading-snug">
                      {cert.title}
                    </h3>
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest whitespace-nowrap shrink-0">
                      {cert.date}
                    </span>
                  </div>
                  <p className="text-xs text-[#A19E95] font-light">{cert.issuer}</p>
                  {cert.note && <p className="text-[11px] text-white/25 font-light leading-snug">{cert.note}</p>}
                  {cert.isNew && (
                    <span className="inline-block mt-1 text-[8px] font-mono font-bold uppercase tracking-widest text-[#F27D26] border border-[#F27D26]/40 px-2 py-0.5 rounded-full">
                      New
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {groups.map((group) => (
            <CertGroup key={group.label} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
