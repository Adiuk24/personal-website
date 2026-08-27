'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

// WebGL is client-only and heavy; keep it out of the static export and the
// initial bundle, and let it stream in when the section is reached.
const CareerGlobe = dynamic(() => import('./CareerGlobe'), {
  ssr: false,
  loading: () => <div className="w-full h-[420px] md:h-[560px]" />,
});

// Every figure below is Arif's own, as published on his LinkedIn profile.
// Nothing here is estimated or invented.
type Chapter = {
  no: string;
  years: string;
  place: string;
  title: string;
  body: string;
  facts: { value: string; label: string }[];
  plate: string;
};

const CHAPTERS: Chapter[] = [
  {
    no: '01',
    years: '2026',
    place: 'Nights and weekends',
    title: 'The Build',
    body:
      'Not a trained engineer. Pretrained a Bangla-focused language model end-to-end in Rust on a $164 GPU budget, found eight silent defects across two ML frameworks, and published the experience report rather than the highlight reel. Published Eyla on arXiv — an identity-anchored architecture with a new benchmark — including an honest account of the attempt that failed.',
    facts: [
      { value: '$164', label: 'to train a language model' },
      { value: '8', label: 'framework defects found' },
      { value: '2', label: 'papers published' },
    ],
    plate: '/journey/06-build.jpg',
  },
  {
    no: '02',
    years: '2025 — now',
    place: 'tapmad · Dhaka, Bangladesh',
    title: 'The Return',
    body:
      'Back home to build tapmad’s Bangladesh business from zero: go-to-market, MNO and ISP distribution, payments across bKash, Nagad and carrier billing, and BTRC compliance. The hard part was never acquisition — it was moving one of the world’s most price-sensitive markets from one-off event purchases to auto-renewing subscriptions, then raising price mid-growth without breaking the curve.',
    facts: [
      { value: '0 → 1', label: 'market built' },
      { value: 'MAU · ARPU · churn', label: 'owned end to end' },
    ],
    plate: '/journey/05-return.jpg',
  },
  {
    no: '03',
    years: '2022 — 2024',
    place: 'London, United Kingdom',
    title: 'Starting Over Abroad',
    body:
      'Leaving a managing directorship to start again in a new market. Two months at Nuffield Health delivering 45% month-on-month growth, then GlobalData, running delegate acquisition across more than fifteen high-profile international events and rebuilding the funnel with marketing, sales and production working off the same numbers.',
    facts: [
      { value: '15+', label: 'international events' },
      { value: '+30%', label: 'delegate engagement' },
      { value: '+25%', label: 'conversion rate' },
    ],
    plate: '/journey/03-london.jpg',
  },
  {
    no: '04',
    years: '2022 — 2023',
    place: 'UAE · Saudi Arabia · Qatar · Egypt',
    title: 'The Gulf',
    body:
      'The campaign that defines the commercial track. Scaling B2B sales across MENA meant adapting to regional business culture rather than exporting a playbook — building alliances with local banks, telecoms and enterprises, and rebuilding the funnel around how those deals actually close.',
    facts: [
      { value: '400%', label: 'revenue growth in 2 years' },
      { value: '12', label: 'partnerships established' },
      { value: '−35%', label: 'sales cycle length' },
    ],
    plate: '/journey/04-gulf.jpg',
  },
  {
    no: '05',
    years: '2017 — 2022',
    place: 'Joycalls Group · Dhaka',
    title: 'Managing Director',
    body:
      'Five years running the Bangladesh office of a telecom and ad-tech group — the role that turned a salesman into an operator. Negotiated twelve platform contracts across five categories of telecom software, carried a portfolio of twelve projects to completion, built and trained the team that delivered them, and took offshore software sales into three countries.',
    facts: [
      { value: '5 yrs', label: 'as Managing Director' },
      { value: '+50%', label: 'sales growth' },
      { value: '12', label: 'platform contracts' },
    ],
    plate: '/journey/02-joycalls.jpg',
  },
  {
    no: '06',
    years: '2010 — 2017',
    place: 'Dhaka, Bangladesh',
    title: 'Learning the Trade',
    body:
      'Event coordination and brand activations first — ATN, GMS, then marketing for a textile manufacturer. The commercial career proper starts at everjobs Bangladesh, moving from business development to Deputy Manager to Manager of Corporate Sales to Head of Corporate Sales in barely two years, running fifteen sales teams across three time zones and pushing the company into APAC markets.',
    facts: [
      { value: '+80%', label: 'lead generation' },
      { value: '15', label: 'sales teams, 3 time zones' },
      { value: '+48%', label: 'referral business' },
    ],
    plate: '/journey/01-origin.jpg',
  },
];

function ChapterBlock({ chapter, index }: { chapter: Chapter; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Plate drifts slower than the type — parallax without a scroll-jacking library.
  // ponytail: opacity is fixed rather than scroll-linked; a second scroll transform
  // added a failure mode (plates stuck dim) for no visible gain over the gradients.
  const plateY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <div ref={ref} className="relative min-h-screen flex items-center py-24 md:py-32">
      {/* Plate */}
      <motion.div style={{ y: plateY }} className="absolute inset-0 overflow-hidden opacity-60">
        <Image
          src={chapter.plate}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover"
          loading={index === 0 ? 'eager' : 'lazy'}
          unoptimized
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-6xl mx-auto px-6 w-full"
      >
        <div className="max-w-2xl space-y-7">
          <div className="flex items-baseline gap-5 font-mono text-[10px] uppercase tracking-[0.35em]">
            <span className="text-[#F27D26] text-2xl font-serif tracking-normal">{chapter.no}</span>
            <span className="text-white/50">{chapter.years}</span>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">{chapter.place}</p>
            <h3 className="text-5xl md:text-7xl font-serif font-light text-white tracking-tight">
              {chapter.title}
            </h3>
          </div>

          <p className="text-[#A19E95] text-base md:text-lg font-light leading-relaxed">{chapter.body}</p>

          <div className="flex flex-wrap gap-x-10 gap-y-5 pt-4 border-t border-white/10">
            {chapter.facts.map(f => (
              <div key={f.label}>
                <p className="text-2xl md:text-3xl font-serif text-white">{f.value}</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40 mt-1">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Journey() {
  return (
    <section id="journey" className="relative bg-black">
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-16 space-y-6">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.5em] text-[#F27D26] font-semibold block"
        >
          The Journey
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-serif font-light tracking-tight text-white max-w-3xl"
        >
          Where he is now<span className="text-[#F27D26]">.</span> And how he got here<span className="text-[#F27D26]">.</span>
        </motion.h2>
        <p className="text-[#A19E95] text-lg font-light max-w-xl">
          Read backwards from today: Dhaka, the Gulf, London, and the fifteen years in Bangladesh
          that came before any of it.
        </p>
      </div>

      {CHAPTERS.map((c, i) => (
        <ChapterBlock key={c.no} chapter={c} index={i} />
      ))}

      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-2xl space-y-5 mb-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#F27D26]">
            Where the work landed
          </span>
          <h3 className="text-4xl md:text-6xl font-serif font-light text-white tracking-tight">
            Four countries, one route<span className="text-[#F27D26]">.</span>
          </h3>
          <p className="text-[#A19E95] font-light leading-relaxed">
            Dhaka to London, out across the Gulf, and home again — every marker is a market he
            actually sold into or ran a business in.
          </p>
        </div>
        <CareerGlobe />
      </div>
    </section>
  );
}
