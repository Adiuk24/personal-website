'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Briefcase, TrendingUp, Users, Zap } from 'lucide-react';

// Roles, dates and figures as stated on Arif's CV.
const experiences = [
  {
    title: 'Head of Business Development',
    company: 'tapmad · Dhaka',
    period: 'Jun 2025 — Present',
    description: "Building tapmad's Bangladesh business from 0→1: go-to-market for subscription and ad-supported tiers, distribution and billing partnerships with MNOs, ISPs and device OEMs, payments across bKash, Nagad and Rocket, and BTRC compliance.",
    icon: <TrendingUp className="text-white" />,
    tags: ['GTM Strategy', 'Telecom & OTT', 'Payments']
  },
  {
    title: 'Managing Director',
    company: 'Joycalls Group · Dhaka',
    period: 'Oct 2017 — Mar 2022',
    description: 'Five years running the Bangladesh office of a telecom and ad-tech group. Negotiated twelve platform contracts across five categories of telecom software, carried a portfolio of twelve projects, grew sales 50%, and took offshore software sales into three countries.',
    icon: <Briefcase className="text-white" />,
    tags: ['P&L Ownership', 'Telecom VAS', 'Team Building']
  },
  {
    title: 'Delegate Acquisition Manager',
    company: 'GlobalData Plc · London',
    period: 'Jun 2022 — May 2024',
    description: 'Drove delegate engagement up 30% across 15+ high-profile international events, improved conversion rates by 25% with marketing, sales and production working off one funnel, and attracted 20% new participants from untapped markets.',
    icon: <Users className="text-white" />,
    tags: ['Event Strategy', 'Conversion Optimization', 'Global Markets']
  },
  {
    title: 'Head of Corporate Sales',
    company: 'everjobs Bangladesh · Dhaka',
    period: 'Oct 2015 — Oct 2017',
    description: 'Rose from business development to Deputy Manager to Head of Corporate Sales in barely two years. Introduced lead automation that lifted lead generation 80%, ran incentive programmes across 15 sales teams in three time zones, and drove a 48% increase in referral business.',
    icon: <Zap className="text-white" />,
    tags: ['Sales Leadership', 'Lead Automation', 'APAC Expansion']
  }
];


type Experience = (typeof experiences)[number];

// Mobile showed every card fully expanded, which made the page enormous to
// scroll. Collapsed by default under md; desktop is unchanged.
function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className="bg-[#111] border border-white/5 rounded-[32px] md:rounded-[40px] hover:border-white/20 transition-all group overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full text-left p-7 md:p-10 md:cursor-default"
      >
        <div className="flex justify-between items-start gap-4">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors shrink-0">
            {exp.icon}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#A19E95] border border-white/10 px-3 py-1 rounded-full whitespace-nowrap">
              {exp.period}
            </span>
            <ChevronDown
              size={18}
              className={`md:hidden text-[#A19E95] transition-transform ${open ? 'rotate-180' : ''}`}
            />
          </div>
        </div>

        <div className="space-y-1.5 mt-6">
          <h3 className="text-2xl md:text-3xl font-serif font-medium leading-tight text-white">{exp.title}</h3>
          <p className="text-sm md:text-base text-[#A19E95] font-medium tracking-wide">{exp.company}</p>
        </div>
      </button>

      <div className={`px-7 md:px-10 pb-7 md:pb-10 space-y-6 ${open ? 'block' : 'hidden md:block'}`}>
        <p className="text-[#A19E95] font-light leading-relaxed text-base md:text-lg">{exp.description}</p>
        <div className="flex flex-wrap gap-2">
          {exp.tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-widest text-[#A19E95] bg-white/5 px-3 py-1.5 rounded-lg">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6 bg-black">
      <div className="max-w-5xl mx-auto space-y-24">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-6 max-w-2xl">
            <span className="text-sm uppercase tracking-[0.4em] text-[#A19E95] font-medium">
              Track Record
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-light leading-tight tracking-tight text-white">
              15+ years of strategic impact<span className="text-[#A19E95]">.</span>
            </h2>
          </div>
          <p className="text-[#A19E95] text-lg max-w-md font-light">
            A track record of scaling businesses from zero to market leaders across diverse industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.title} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
