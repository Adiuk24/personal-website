'use client';

import { motion } from 'motion/react';
import { 
  FileText, 
  ExternalLink, 
  ArrowRight, 
  FlaskConical
} from 'lucide-react';
import Link from 'next/link';

export default function FeaturedResearch() {
  return (
    <section id="featured-research" className="py-24 px-6 bg-black relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#F27D26]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 md:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-4 max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F27D26]/10 border border-[#F27D26]/30 text-[#F27D26] text-xs font-semibold uppercase tracking-wider"
            >
              <FlaskConical size={14} />
              <span>Independent AI & Systems Research</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif font-light text-white tracking-tight"
            >
              Latest Research & <span className="text-gradient">Publications.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 flex-wrap"
          >
            <a
              href="https://huggingface.co/Adiuk"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all flex items-center gap-2 group"
            >
              <span>🤗</span>
              <span>Hugging Face Profile</span>
              <ExternalLink size={14} className="text-[#A19E95] group-hover:text-white transition-colors" />
            </a>

            <Link
              href="/research"
              className="px-5 py-2.5 rounded-full bg-[#F27D26] hover:bg-[#F27D26]/90 text-white text-sm font-semibold transition-all flex items-center gap-2 group shadow-lg shadow-[#F27D26]/20"
            >
              <span>Explore All Papers</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Featured Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Featured Paper Card (July 2026 - Pure Rust LM) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 glass rounded-3xl p-8 md:p-10 border border-white/10 relative overflow-hidden flex flex-col justify-between group hover:border-[#F27D26]/40 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F27D26]/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#F27D26]/20 transition-all duration-500" />
            
            <div className="space-y-6 relative z-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#F27D26] text-black font-bold text-[11px] uppercase tracking-wider">
                  NEW · July 27, 2026
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-[#A19E95] text-[11px] font-medium uppercase tracking-wider">
                  DOI: 10.5281/zenodo.21621066
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-serif text-white font-normal leading-snug group-hover:text-[#F27D26] transition-colors duration-300">
                  Training a Language Model End-to-End in Rust: An Experience Report
                </h3>
                <p className="text-sm md:text-base text-[#A19E95] font-light leading-relaxed">
                  Failure Taxonomy of Candle & Burn Backends, Gradient-Flow Verification, and Lessons from a $164 Pure Rust LM Pretraining Run.
                </p>
              </div>

              {/* Key Metrics / Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-xs text-[#A19E95]">GPU Budget</div>
                  <div className="text-lg font-bold text-white">$164 <span className="text-xs font-normal text-[#A19E95]">(1x H100)</span></div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-xs text-[#A19E95]">Model Scale</div>
                  <div className="text-lg font-bold text-white">0.4B <span className="text-xs font-normal text-[#A19E95]">Params</span></div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 col-span-2 sm:col-span-1">
                  <div className="text-xs text-[#A19E95]">Frameworks</div>
                  <div className="text-sm font-semibold text-[#F27D26]">Candle & Burn</div>
                </div>
              </div>

              <p className="text-xs text-[#A19E95]/80 line-clamp-3 font-light leading-relaxed pt-1">
                An honest evaluation of pure Rust ML frameworks without PyTorch or Python in the training loop. Documents 5 Candle defects, 3 Burn defects, silent gradient failure modes, and gradient-flow verification discipline.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-8 flex flex-wrap items-center gap-4 relative z-10 border-t border-white/10 mt-6">
              <a
                href="https://zenodo.org/records/21621066/files/main.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-white/90 text-xs font-bold transition-all flex items-center gap-2"
              >
                <FileText size={15} />
                <span>Download PDF</span>
              </a>
              <a
                href="https://doi.org/10.5281/zenodo.21621066"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-all flex items-center gap-2 border border-white/10"
              >
                <ExternalLink size={14} />
                <span>Zenodo Preprint</span>
              </a>
              <Link
                href="/research?paper=rust-lm"
                className="text-xs text-[#A19E95] hover:text-white transition-colors ml-auto flex items-center gap-1"
              >
                <span>Read Full Abstract & BibTeX</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </motion.div>

          {/* Secondary Featured Paper Card (April 2026 - Eyla) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 glass rounded-3xl p-8 md:p-10 border border-white/10 flex flex-col justify-between group hover:border-[#F27D26]/40 transition-all duration-500"
          >
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold uppercase tracking-wider">
                  April 2, 2026
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[11px] font-medium uppercase tracking-wider">
                  arXiv: 2604.00009
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl md:text-2xl font-serif text-white font-normal leading-snug group-hover:text-[#F27D26] transition-colors duration-300">
                  Eyla: Toward an Identity-Anchored LLM Architecture
                </h3>
                <p className="text-sm text-[#A19E95] font-light leading-relaxed">
                  Vision, Implementation Attempt, and Lessons from AI-Assisted Development with Integrated Biological Priors.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <div className="text-xs text-[#F27D26] font-semibold">Identity Consistency Benchmark</div>
                  <p className="text-xs text-[#A19E95] font-light">Proposes Identity Consistency Score (ICS) for evaluating coherent self-models under adversarial prompt pressure.</p>
                </div>
              </div>

              <p className="text-xs text-[#A19E95]/80 line-clamp-3 font-light leading-relaxed">
                Integrated biologically-inspired HiPPO state-space models and zero-initialized adapters. Includes honest analysis of AI-assisted development failure modes.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-8 flex flex-wrap items-center gap-3 border-t border-white/10 mt-6">
              <a
                href="https://arxiv.org/pdf/2604.00009"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all flex items-center gap-2"
              >
                <FileText size={14} />
                <span>arXiv PDF</span>
              </a>
              <a
                href="https://doi.org/10.5281/zenodo.18922059"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-[#A19E95] hover:text-white text-xs font-medium transition-all flex items-center gap-1.5 border border-white/10"
              >
                <ExternalLink size={13} />
                <span>DOI</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
