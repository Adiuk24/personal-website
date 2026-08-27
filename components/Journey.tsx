'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';

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
    years: '2008 — 2021',
    place: 'Dhaka, Bangladesh',
    title: 'Origin',
    body:
      'A cadet in the Bangladesh National Cadet Corps at sixteen — still enrolled eighteen years later. Coordinating exam venues for the British Council. Then telecom: an IVR platform at Joycalls that reached users across twelve countries and put him on national television explaining why accessibility mattered more than scale.',
    facts: [
      { value: '12', label: 'countries reached' },
      { value: '18 yrs', label: 'BNCC service' },
    ],
    plate: '/journey/01-origin.jpg',
  },
  {
    no: '02',
    years: '2022 — 2025',
    place: 'London, United Kingdom',
    title: 'Proving Ground',
    body:
      'Two months at Nuffield Health delivering 45% month-on-month growth was enough to move to GlobalData, where he ran delegate acquisition across more than fifteen international events. Later, market expansion and franchise partnerships for VBITES, one of the UK’s largest plant-based food companies.',
    facts: [
      { value: '15+', label: 'international events' },
      { value: '+30%', label: 'delegate engagement' },
      { value: '+25%', label: 'conversion rate' },
    ],
    plate: '/journey/02-london.jpg',
  },
  {
    no: '03',
    years: '2022 — 2023',
    place: 'UAE · Saudi Arabia · Qatar · Egypt',
    title: 'The Gulf',
    body:
      'The campaign that defines the commercial track. Building B2B sales across MENA meant adapting to regional business culture rather than exporting a playbook — negotiating multi-million-dollar contracts with banks, telecoms and government clients, and rebuilding the funnel around how those deals actually close.',
    facts: [
      { value: '400%', label: 'revenue growth in 2 years' },
      { value: '12', label: 'partnerships established' },
      { value: '−35%', label: 'sales cycle length' },
    ],
    plate: '/journey/03-gulf.jpg',
  },
  {
    no: '04',
    years: '2022 — 2025',
    place: 'London, United Kingdom',
    title: 'Studio By Adi',
    body:
      'Founded and ran a creative agency alongside the commercial work — director of photography on cinematic shoots for hospitality, nightlife and luxury brands. Sony, RED, ARRI. The eye trained here is the reason this site looks the way it does.',
    facts: [
      { value: '+250%', label: 'audience engagement' },
      { value: '3 yrs', label: 'founder & DOP' },
    ],
    plate: '/journey/04-studio.jpg',
  },
  {
    no: '05',
    years: '2025 — now',
    place: 'Dhaka, Bangladesh',
    title: 'The Return',
    body:
      'Back home to build tapmad’s Bangladesh business from zero: go-to-market, MNO and ISP distribution, payments across bKash, Nagad and carrier billing, and BTRC compliance. The hard part was not acquisition — it was moving one of the world’s most price-sensitive markets from one-off event purchases to auto-renewing subscriptions, then raising price mid-growth without breaking the curve.',
    facts: [
      { value: '0 → 1', label: 'market built' },
      { value: 'MAU · ARPU · churn', label: 'owned end to end' },
    ],
    plate: '/journey/05-return.jpg',
  },
  {
    no: '06',
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
          Dhaka to London to the Gulf<span className="text-[#F27D26]">.</span> And back<span className="text-[#F27D26]">.</span>
        </motion.h2>
        <p className="text-[#A19E95] text-lg font-light max-w-xl">
          Fifteen years, four countries, and one throughline: build the thing where nobody had built it before.
        </p>
      </div>

      {CHAPTERS.map((c, i) => (
        <ChapterBlock key={c.no} chapter={c} index={i} />
      ))}
    </section>
  );
}
