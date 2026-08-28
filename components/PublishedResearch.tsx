'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowUpRight, FileText } from 'lucide-react';
import { RESEARCH_POSTS } from '@/lib/research-posts';

export default function PublishedResearch() {
  if (!RESEARCH_POSTS.length) return null;

  return (
    <section id="published" className="py-20 md:py-32 px-6 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-5xl mx-auto space-y-10 md:space-y-16">
        <div className="space-y-6 max-w-2xl">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.5em] text-[#F27D26] font-semibold block"
          >
            Published Research
          </motion.span>
          <motion.h2
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-serif font-light tracking-tight text-white"
          >
            Written here, not gatekept<span className="text-[#F27D26]">.</span>
          </motion.h2>
          <p className="text-[#A19E95] text-lg font-light leading-relaxed">
            Long-form research published directly, with every source listed and every unverified claim marked as
            such. No preprint queue, no paywall.
          </p>
        </div>

        <div className="space-y-6">
          {RESEARCH_POSTS.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
            >
              <Link
                href={`/research/${post.slug}`}
                className="group block p-6 md:p-10 glass rounded-[32px] border border-white/5 hover:border-[#F27D26]/25 transition-all duration-500"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="space-y-4 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                      <span>{post.displayDate}</span>
                      <span>·</span>
                      <span className="text-[#F27D26]">{post.citations} sources</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-serif font-light text-white group-hover:text-[#F27D26] transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-[#A19E95] font-light leading-relaxed">{post.summary}</p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {post.tags.map(t => (
                        <span
                          key={t}
                          className="font-mono text-[9px] uppercase tracking-widest text-white/40 bg-white/5 px-3 py-1.5 rounded-lg"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="shrink-0 flex flex-col items-end gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F27D26]/10 flex items-center justify-center text-[#F27D26] group-hover:bg-[#F27D26] group-hover:text-black transition-all duration-500">
                      <FileText size={20} />
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-white/30 group-hover:text-[#F27D26] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
