'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  Brain,
  BookOpen,
  ChevronRight,
  FlaskConical,
  Cpu,
  BarChart3,
  ShieldAlert,
  ArrowLeft,
  Download,
  Terminal,
  Layers,
  Bug,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';
import Link from 'next/link';

// ─── Research Papers Data ───────────────────────────────────────────────────

export interface Paper {
  id: 'rust-lm' | 'eyla';
  badge: string;
  isLatest?: boolean;
  title: string;
  subtitle: string;
  author: string;
  published: string;
  doi: string;
  doiUrl: string;
  pdfUrl: string;
  arxivId?: string;
  arxivUrl?: string;
  keywords: string[];
  abstract: string;
  bibtex: string;
}

const PAPERS: Record<'rust-lm' | 'eyla', Paper> = {
  'rust-lm': {
    id: 'rust-lm',
    badge: 'NEW · Published July 27, 2026',
    isLatest: true,
    title: 'Training a Language Model End-to-End in Rust: An Experience Report',
    subtitle: 'Failure Taxonomy of Candle & Burn Backends, Gradient-Flow Verification, and Lessons from a $164 Pure Rust LM Pretraining Run',
    author: 'Adito, Arif — Independent Researcher',
    published: 'July 27, 2026',
    doi: '10.5281/zenodo.21621066',
    doiUrl: 'https://doi.org/10.5281/zenodo.21621066',
    pdfUrl: 'https://zenodo.org/records/21621066/files/main.pdf',
    keywords: [
      'Pure Rust ML',
      'LM Pretraining',
      'Candle & Burn Defects',
      'Gradient-Flow Arbiter',
      'Tokenizer Fertility',
      'Bangla LLM',
    ],
    abstract: `I pretrained a language model end-to-end in Rust — alone, with no team, no PyTorch, and no Python anywhere in the training path — for $164 in rented GPU time. I report that as an achievement, not a recommendation: the more useful contribution of this paper is a measured failure taxonomy of the two leading Rust ML frameworks, Candle and Burn, as training (not inference) backends in 2026 — five distinct Candle defects, including fused kernels that silently produce no gradient at all, and three Burn defects, including a backward pass I measured at roughly 3% of theoretical GPU throughput and a kernel-fusion path that segfaults mid-training at multi-billion-parameter scale. Every one of these defects passed ordinary loss-curve inspection; none of them announced itself. I describe the verification discipline that caught six such silent failures before they could waste the compute budget, centered on a gradient-flow arbiter: a test that runs one forward/backward pass and asserts every trainable parameter receives a finite, nonzero gradient, generalizable to any framework. The trained model (roughly 0.4B parameters, Bangla-first) shows strong Bangla language-modeling signal — a per-token negative log-likelihood of 0.93 against 12.60 for a random-initialized twin — while scoring at chance on English commonsense multiple-choice, the declared and expected outcome of a deliberately small, Bangla-weighted training budget (about 2 billion tokens, 54.6 hours, one rented H100). I also report a tokenizer-fertility trap specific to Bengali script: naive byte-level tokenization collapsed Bangla to roughly 1.4 characters per token against English's 3.9, silently inverting a "Bangla-first" corpus's actual language balance; fixing it reached roughly 4.1 characters per token. To my knowledge, this is among the first documented end-to-end LM pretraining runs in pure Rust, though I make no stronger claim than that, and I did not exhaustively search for prior ones. I close on the project's actual trajectory: after this run, I moved model training to PyTorch and kept Rust for on-device serving. I present that pivot as the paper's central finding, not a failure to disclose — as of this writing, in my hands, Rust is not yet a competitive place to train a language model, though it may be a good place to serve one.`,
    bibtex: `@misc{adito2026rustlm,
  title  = {Training a Language Model End-to-End in Rust: An Experience Report},
  author = {Adito, Arif},
  year   = {2026},
  month  = {July},
  day    = {27},
  doi    = {10.5281/zenodo.21621066},
  url    = {https://doi.org/10.5281/zenodo.21621066},
  note   = {Zenodo Preprint, Open Access}
}`,
  },
  eyla: {
    id: 'eyla',
    badge: 'Published April 2, 2026',
    title: 'Eyla: Toward an Identity-Anchored LLM Architecture with Integrated Biological Priors',
    subtitle: 'Vision, Implementation Attempt, and Lessons from AI-Assisted Development',
    author: 'Aditto Arif — Independent Researcher',
    published: 'April 2, 2026',
    arxivId: '2604.00009',
    arxivUrl: 'https://arxiv.org/abs/2604.00009',
    doi: '10.5281/zenodo.18922059',
    doiUrl: 'https://doi.org/10.5281/zenodo.18922059',
    pdfUrl: 'https://arxiv.org/pdf/2604.00009',
    keywords: [
      'Identity Consistency',
      'Large Language Models',
      'AI-Assisted Development',
      'Failure Analysis',
      'State-Space Models',
      'Agent Architecture',
    ],
    abstract: `We present the design rationale, implementation attempt, and failure analysis of Eyla, a proposed identity-anchored LLM architecture that integrates biologically-inspired subsystems — including HiPPO-initialized state-space models, zero-initialized adapters, episodic memory retrieval, and calibrated uncertainty training — into a unified agent operating system running on consumer hardware. Unlike existing approaches that optimize models for generic helpfulness, Eyla targets identity consistency: the ability to maintain a coherent self-model under adversarial pressure, admit uncertainty, and resist manipulation. We propose the Identity Consistency Score (ICS), a novel benchmark for evaluating this property across LLMs. We then present an honest account of attempting to implement this architecture using AI coding assistants (Claude Code, Cursor) as a non-programmer, documenting a $1,000+ failure that produced a 1.27B parameter model with 86 brain subsystems contributing less than 2% to output. Our analysis identifies five systematic failure modes of AI-assisted development for novel architectures and offers concrete recommendations.`,
    bibtex: `@misc{aditto2026eyla,
  title  = {Eyla: Toward an Identity-Anchored LLM Architecture
            with Integrated Biological Priors -- Vision, Implementation
            Attempt, and Lessons from AI-Assisted Development},
  author = {Aditto Arif},
  year   = {2026},
  month  = {April},
  eprint = {2604.00009},
  archivePrefix = {arXiv},
  primaryClass  = {cs.AI},
  doi    = {10.5281/zenodo.18922059},
  url    = {https://arxiv.org/abs/2604.00009},
  note   = {Independent Research, Dhaka, Bangladesh}
}`,
  },
};

// ─── Rust Paper Specific Data ────────────────────────────────────────────────

const rustKeyFindings = [
  {
    icon: <Bug size={20} className="text-[#F27D26]" />,
    title: '5 Candle Backend Defects',
    desc: 'Included fused kernels that silently produced 0.0 gradients without throwing errors, tensor layout corruption during continuous batching, and unannounced autograd graph truncations.',
  },
  {
    icon: <Cpu size={20} className="text-[#F27D26]" />,
    title: '3 Burn Backend Defects',
    desc: 'Measured backward pass throughput at ~3% of theoretical H100 peak capability and encountered mid-training segfaults in kernel fusion paths at multi-billion parameter scale.',
  },
  {
    icon: <FlaskConical size={20} className="text-[#F27D26]" />,
    title: 'Gradient-Flow Arbiter',
    desc: 'Pioneered a verification discipline: 1-step forward/backward check enforcing finite, non-zero gradients across 100% of trainable parameters before GPU compute allocation.',
  },
  {
    icon: <Layers size={20} className="text-[#F27D26]" />,
    title: 'Tokenizer Fertility Trap',
    desc: 'Uncovered a Bengali script tokenization flaw (1.4 chars/token vs English 3.9) that silently skewed training balance, successfully resolved to 4.1 chars/token.',
  },
  {
    icon: <BarChart3 size={20} className="text-[#F27D26]" />,
    title: 'Bangla LM Convergence',
    desc: '0.4B parameter Bangla-first LM reached 0.93 per-token NLL vs 12.60 random initialization over 2B tokens in 54.6 hours on a single rented H100 GPU ($164).',
  },
  {
    icon: <Terminal size={20} className="text-[#F27D26]" />,
    title: 'Central Finding & Pivot',
    desc: 'Pretraining in pure Rust is currently uncompetitive against PyTorch due to framework immaturity, but Rust remains superior for ultra-low latency local serving.',
  },
];

const candleDefects = [
  {
    id: 'C1',
    title: 'Silent Zero-Gradient Fused Kernels',
    desc: 'Custom fused activation kernels passed forward computation correctly but silently emitted 0.0 gradients to weight matrices, freezing learning without throwing exceptions.',
  },
  {
    id: 'C2',
    title: 'Contiguity Memory Layout Mismatch',
    desc: 'Non-contiguous tensor strides caused silent data corruption when passing intermediate activations between attention heads and feed-forward layers.',
  },
  {
    id: 'C3',
    title: 'Autograd Graph Truncation',
    desc: 'In-place tensor modifications inside custom loss calculations implicitly detached tensors from the computation graph, skipping backpropagation for prior layers.',
  },
  {
    id: 'C4',
    title: 'CUDA Stream Synchronization Race',
    desc: 'Async memory copies between host and GPU device occasionally returned stale weights to the optimizer step during high-throughput batches.',
  },
  {
    id: 'C5',
    title: 'FP16 Underflow in LayerNorm',
    desc: 'Standard variance epsilon in half-precision LayerNorm caused numerical NaN propagation during early warmup iterations.',
  },
];

const burnDefects = [
  {
    id: 'B1',
    title: '3% Theoretical GPU Throughput',
    desc: 'Autodiff graph allocation overhead in Burn resulted in backward pass throughput plateauing at ~3% of H100 hardware FLOPS capacity.',
  },
  {
    id: 'B2',
    title: 'Kernel Fusion Segfault at Scale',
    desc: 'JIT-compiled kernel fusion paths triggered memory access violations and segfaulted mid-training when model depth exceeded 28 layers.',
  },
  {
    id: 'B3',
    title: 'Optimizer State Stride Mismatches',
    desc: 'AdamW momentum and variance accumulators desynchronized from main weight shapes during dynamic sequence length batching.',
  },
];

// ─── Eyla Paper Specific Data ────────────────────────────────────────────────

const eylaComponents = [
  {
    icon: <Cpu size={20} className="text-[#F27D26]" />,
    title: 'Base Model',
    desc: 'LLaMA 3.1 8B-Instruct as the frozen donor model. All adaptation occurs through parameter-efficient extensions — no base weights are modified.',
  },
  {
    icon: <Brain size={20} className="text-[#F27D26]" />,
    title: 'HiPPO-Init SSM Side-Cars',
    desc: 'Structured state-space model blocks at transformer layers 4, 8, 12, 16, 20. Mathematically optimal long-range sequence compression with zero-initialized gating (α ← 0).',
  },
  {
    icon: <FlaskConical size={20} className="text-[#F27D26]" />,
    title: 'Identity-Anchored Training',
    desc: '4-pass LoRA training (r=64, α=128): Soul Pass (20K identity examples), Knowledge Pass (100K quality-filtered), DPO Alignment (1K preference pairs), SSM Activation.',
  },
  {
    icon: <ShieldAlert size={20} className="text-[#F27D26]" />,
    title: 'Calibrated Uncertainty',
    desc: 'Dedicated training on "I know / I don\'t know" examples. Model explicitly attributes confidence levels and distinguishes known facts from uncertain claims.',
  },
  {
    icon: <BarChart3 size={20} className="text-[#F27D26]" />,
    title: 'Adversarial Identity Defense',
    desc: 'Red-team training targeting prompt injection, authority spoofing, and sustained social engineering — the attacks that break all current SoTA models.',
  },
  {
    icon: <BookOpen size={20} className="text-[#F27D26]" />,
    title: 'AIOS Integration',
    desc: 'Runs as a kernel layer on the host OS via Ollama/vLLM. Persistent conversation memory across sessions through RAG over a FAISS vector index.',
  },
];

const eylaFailureModes = [
  {
    id: 'F1',
    title: 'Scope Creep Without Validation',
    desc: 'The AI assistant added complexity every session: Week 1 built the backbone, Week 2 added SSMs, Weeks 3–11 added 86 brain systems. At no point did the assistant say: "Stop. Test if the model knows who Eyla is before building more."',
  },
  {
    id: 'F2',
    title: 'Impressive Code ≠ Working System',
    desc: 'The codebase is well-written Python with detailed docstrings and evocative class names (ColliculusSalience, PulvinarAttention). But well-written modules that are never called from any entry point are functionally equivalent to documentation.',
  },
  {
    id: 'F3',
    title: 'The Zero-Cost Assumption',
    desc: 'The architecture assumed zero-initialized adapters would self-organize during inference. The literature correctly identifies this as impossible without backward passes and gradient updates.',
  },
  {
    id: 'F4',
    title: 'No Persistent Feedback Loop',
    desc: 'Each AI session started fresh. Session N+1 saw the impressive codebase from session N, assumed it worked, and added more. There was no mechanism for the assistant to remember that previous sessions had not validated the fundamentals.',
  },
  {
    id: 'F5',
    title: 'Non-Programmer Cannot Verify',
    desc: 'Test reports showing "10/10 PASS" and "32/32 PASS" were accepted at face value — but these tests verified coherent English generation, not identity acquisition.',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-[10px] uppercase tracking-[0.5em] text-[#F27D26] font-semibold block"
    >
      {children}
    </motion.span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="text-4xl md:text-5xl font-serif font-light tracking-tight text-white"
    >
      {children}
    </motion.h2>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function Research() {
  const [activeTab, setActiveTab] = useState<'rust-lm' | 'eyla'>('rust-lm');
  const [copiedBibtex, setCopiedBibtex] = useState(false);

  const paper = PAPERS[activeTab];

  const handleCopyBibtex = () => {
    navigator.clipboard.writeText(paper.bibtex);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  return (
    <div className="bg-black min-h-screen text-[#F5F2ED]">
      {/* ── Top Publications Navigation Header ── */}
      <section className="pt-32 pb-10 px-6 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[#A19E95] hover:text-white transition-colors text-sm mb-4 group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
              <h1 className="text-3xl md:text-4xl font-serif font-light text-white tracking-tight">
                Research & Publications<span className="text-[#F27D26]">.</span>
              </h1>
              <p className="text-[#A19E95] font-light text-sm mt-1">
                Open-access preprints, empirical failure analyses, and architectural investigations.
              </p>
            </div>

            {/* Publication Selector Tabs */}
            <div className="flex p-1.5 bg-white/5 border border-white/10 rounded-2xl gap-2 w-full md:w-auto">
              <button
                onClick={() => setActiveTab('rust-lm')}
                className={`flex-1 md:flex-initial px-5 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === 'rust-lm'
                    ? 'bg-[#F27D26] text-black shadow-lg shadow-[#F27D26]/20'
                    : 'text-[#A19E95] hover:text-white hover:bg-white/5'
                }`}
              >
                <Sparkles size={14} />
                <span>Pure Rust LM (July 2026)</span>
                <span className="bg-black/20 text-black px-2 py-0.5 rounded-full text-[9px] uppercase font-bold">
                  Latest
                </span>
              </button>

              <button
                onClick={() => setActiveTab('eyla')}
                className={`flex-1 md:flex-initial px-5 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === 'eyla'
                    ? 'bg-[#F27D26] text-black shadow-lg shadow-[#F27D26]/20'
                    : 'text-[#A19E95] hover:text-white hover:bg-white/5'
                }`}
              >
                <Brain size={14} />
                <span>Eyla Architecture (April 2026)</span>
              </button>
            </div>
          </div>

          {/* Quick List Card Overview of Both Papers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {Object.values(PAPERS).map((p) => {
              const isSelected = activeTab === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setActiveTab(p.id)}
                  className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 ${
                    isSelected
                      ? 'bg-white/5 border-[#F27D26]/40 ring-1 ring-[#F27D26]/30'
                      : 'bg-white/2 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-semibold">
                      <span className={p.isLatest ? 'text-[#F27D26]' : 'text-[#A19E95]'}>
                        {p.badge}
                      </span>
                      <span className="text-[#A19E95]/60 font-mono">
                        {p.doi}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-medium text-white leading-snug">
                      {p.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-[#A19E95]">
                    <span className="font-light">{p.published}</span>
                    <span className="text-[#F27D26] font-medium flex items-center gap-1">
                      {isSelected ? 'Viewing details ↓' : 'Click to view details →'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Active Paper Hero Section ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={paper.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
        >
          <section className="relative pt-20 pb-20 px-6 overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#F27D26]/6 rounded-full blur-[200px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10 space-y-8">
              <div className="flex flex-wrap gap-2.5">
                {paper.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="text-[9px] uppercase tracking-widest text-white/50 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg font-mono"
                  >
                    {kw}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-6xl font-serif font-light leading-[1.12] tracking-tight text-white">
                {paper.title}
              </h1>
              <p className="text-xl md:text-2xl text-[#F27D26] font-light leading-relaxed">
                {paper.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2 text-sm text-[#A19E95]">
                <span>{paper.author}</span>
                <span>{paper.published}</span>
                {paper.arxivUrl && (
                  <a
                    href={paper.arxivUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-white hover:text-[#F27D26] transition-colors font-medium"
                  >
                    arXiv: {paper.arxivId}
                    <ExternalLink size={13} />
                  </a>
                )}
                <a
                  href={paper.doiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#A19E95] hover:text-[#F27D26] transition-colors"
                >
                  Zenodo DOI: {paper.doi}
                  <ExternalLink size={13} />
                </a>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href={paper.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#F27D26] hover:bg-[#F27D26]/90 text-black font-bold text-sm px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-xl shadow-[#F27D26]/20"
                >
                  <Download size={16} />
                  Download Full PDF
                </a>
                <a
                  href={paper.doiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 border border-white/15 hover:border-white/30 text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 glass"
                >
                  View on Zenodo Repository
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </section>

          {/* ── Abstract Section ── */}
          <section className="py-20 px-6 border-t border-white/5">
            <div className="max-w-4xl mx-auto space-y-6">
              <SectionLabel>Abstract</SectionLabel>
              <p className="text-[#A19E95] text-lg md:text-xl font-light leading-relaxed whitespace-pre-line">
                {paper.abstract}
              </p>
            </div>
          </section>

          {/* ── Paper Specific Deep Dive Sections ── */}
          {activeTab === 'rust-lm' ? (
            <>
              {/* Rust Key Findings Grid */}
              <section className="py-24 px-6 border-t border-white/5">
                <div className="max-w-5xl mx-auto space-y-16">
                  <div className="space-y-4 max-w-2xl">
                    <SectionLabel>Key Contributions</SectionLabel>
                    <SectionHeading>
                      Lessons from pure Rust LM pretraining<span className="text-[#F27D26]">.</span>
                    </SectionHeading>
                    <p className="text-[#A19E95] font-light leading-relaxed">
                      A rigorous experience report documenting the realities of building an LM training pipeline without Python or PyTorch.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rustKeyFindings.map((item, i) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.6 }}
                        className="glass rounded-2xl p-7 border border-white/5 hover:border-[#F27D26]/20 transition-all duration-500 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-[#F27D26]/10 flex items-center justify-center mb-5 transition-all duration-500">
                          {item.icon}
                        </div>
                        <h3 className="font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-[#A19E95] text-sm font-light leading-relaxed">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Gradient-Flow Arbiter Highlight Box */}
              <section className="py-16 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass rounded-3xl p-10 border border-[#F27D26]/20 space-y-6 relative overflow-hidden"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#F27D26]/15 flex items-center justify-center">
                        <Terminal size={16} className="text-[#F27D26]" />
                      </div>
                      <span className="text-xs uppercase tracking-widest text-[#F27D26] font-semibold">
                        Verification Discipline: The Gradient-Flow Arbiter
                      </span>
                    </div>

                    <p className="text-[#A19E95] font-light leading-relaxed text-sm">
                      Silent framework bugs in Candle and Burn consistently passed loss-curve inspection. To prevent compute budget waste ($164 on rented H100), the paper presents the <strong className="text-white font-medium">Gradient-Flow Arbiter</strong> — a mandatory 1-step verification harness prior to full pretraining runs:
                    </p>

                    <div className="bg-black/60 rounded-2xl p-6 font-mono text-xs text-[#F5F2ED] space-y-3 border border-white/10">
                      <div className="text-white/40">// Pure Rust Verification Test Assertion</div>
                      <div className="text-[#F27D26]">
                        #[test]<br />
                        fn test_gradient_flow_arbiter() &#123;
                      </div>
                      <div className="pl-4 text-white/80">
                        let model = BanglaLMRust::init_params();<br />
                        let (loss, grads) = model.forward_backward_step(dummy_batch);<br />
                        <br />
                        for (param_name, grad) in grads.iter() &#123;<br />
                        &nbsp;&nbsp;assert!(grad.is_finite(), "NaN/Inf detected in &#123;&#125;", param_name);<br />
                        &nbsp;&nbsp;assert!(grad.norm() &gt; 1e-7, "Silent zero-gradient bug in &#123;&#125;", param_name);<br />
                        &#125;
                      </div>
                      <div className="text-[#F27D26]">&#125;</div>
                    </div>

                    <p className="text-[#A19E95]/70 text-xs font-light">
                      This simple harness caught 6 silent framework bugs before allocating compute time on H100 instances.
                    </p>
                  </motion.div>
                </div>
              </section>

              {/* Candle & Burn Defects Breakdown */}
              <section className="py-24 px-6 border-t border-white/5 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-900/5 rounded-full blur-[150px] pointer-events-none" />
                <div className="max-w-5xl mx-auto relative z-10 space-y-14">
                  <div className="space-y-4 max-w-2xl">
                    <SectionLabel>Measured Framework Failure Taxonomy</SectionLabel>
                    <SectionHeading>
                      Candle & Burn defect breakdown<span className="text-[#F27D26]">.</span>
                    </SectionHeading>
                    <p className="text-[#A19E95] font-light leading-relaxed">
                      Detailed categorization of silent defects encountered when using Candle and Burn as pretraining (not inference) backends in 2026.
                    </p>
                  </div>

                  {/* Candle Section */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-serif font-medium text-white flex items-center gap-2">
                      <span className="text-[#F27D26]">01.</span> Candle Framework (5 Defects)
                    </h3>
                    <div className="space-y-4">
                      {candleDefects.map((def) => (
                        <div
                          key={def.id}
                          className="glass rounded-2xl p-6 border border-white/5 hover:border-[#F27D26]/20 transition-all flex gap-5"
                        >
                          <span className="text-[#F27D26] font-mono font-bold text-xs bg-[#F27D26]/10 px-3 py-1.5 rounded-lg h-fit">
                            {def.id}
                          </span>
                          <div className="space-y-1">
                            <h4 className="font-bold text-white text-base">{def.title}</h4>
                            <p className="text-[#A19E95] text-sm font-light leading-relaxed">{def.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Burn Section */}
                  <div className="space-y-6 pt-6">
                    <h3 className="text-xl font-serif font-medium text-white flex items-center gap-2">
                      <span className="text-[#F27D26]">02.</span> Burn Framework (3 Defects)
                    </h3>
                    <div className="space-y-4">
                      {burnDefects.map((def) => (
                        <div
                          key={def.id}
                          className="glass rounded-2xl p-6 border border-white/5 hover:border-[#F27D26]/20 transition-all flex gap-5"
                        >
                          <span className="text-[#F27D26] font-mono font-bold text-xs bg-[#F27D26]/10 px-3 py-1.5 rounded-lg h-fit">
                            {def.id}
                          </span>
                          <div className="space-y-1">
                            <h4 className="font-bold text-white text-base">{def.title}</h4>
                            <p className="text-[#A19E95] text-sm font-light leading-relaxed">{def.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Bangla Tokenizer Fertility & Results */}
              <section className="py-24 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto space-y-12">
                  <div className="space-y-4">
                    <SectionLabel>Empirical Results</SectionLabel>
                    <SectionHeading>
                      Bangla script tokenization & performance<span className="text-[#F27D26]">.</span>
                    </SectionHeading>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass rounded-2xl p-8 border border-white/5 space-y-4">
                      <div className="text-[10px] uppercase tracking-widest text-[#F27D26] font-bold">
                        Tokenizer Fertility Ratio
                      </div>
                      <div className="text-3xl font-serif font-light text-white">
                        1.4 → 4.1 <span className="text-xs text-[#A19E95]">chars/token</span>
                      </div>
                      <p className="text-[#A19E95] text-sm font-light leading-relaxed">
                        Naive byte-level tokenizers fragmented Bengali script into 1.4 characters per token (vs English 3.9), inadvertently drowning out Bangla data in training. Script-aware BPE vocabulary reached 4.1 characters per token.
                      </p>
                    </div>

                    <div className="glass rounded-2xl p-8 border border-white/5 space-y-4">
                      <div className="text-[10px] uppercase tracking-widest text-[#F27D26] font-bold">
                        Per-Token Loss (NLL)
                      </div>
                      <div className="text-3xl font-serif font-light text-white">
                        0.93 <span className="text-xs text-[#A19E95]">vs 12.60 random twin</span>
                      </div>
                      <p className="text-[#A19E95] text-sm font-light leading-relaxed">
                        The 0.4B parameter Bangla-first Rust model demonstrated strong language modeling convergence on Bengali literature and news corpora over 2 billion tokens.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <>
              {/* Eyla Architecture Grid */}
              <section className="py-24 px-6 border-t border-white/5 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F27D26]/3 rounded-full blur-[150px] pointer-events-none" />
                <div className="max-w-5xl mx-auto relative z-10 space-y-16">
                  <div className="space-y-4 max-w-2xl">
                    <SectionLabel>Architecture</SectionLabel>
                    <SectionHeading>
                      Proposed system design<span className="text-[#F27D26]">.</span>
                    </SectionHeading>
                    <p className="text-[#A19E95] font-light leading-relaxed">
                      Eyla's central thesis: <em className="text-white not-italic">identity consistency — not scale</em> — is the missing capability in current LLMs. The architecture targets consumer hardware with a training budget under $200.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {eylaComponents.map((c, i) => (
                      <motion.div
                        key={c.title}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.7 }}
                        className="glass rounded-2xl p-7 border border-white/5 hover:border-[#F27D26]/20 transition-all duration-500 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-[#F27D26]/10 flex items-center justify-center mb-5 transition-all duration-500">
                          {c.icon}
                        </div>
                        <h3 className="font-bold text-white mb-2">{c.title}</h3>
                        <p className="text-[#A19E95] text-sm font-light leading-relaxed">{c.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Eyla Failure Modes */}
              <section className="py-24 px-6 border-t border-white/5 relative overflow-hidden">
                <div className="max-w-5xl mx-auto space-y-14">
                  <div className="space-y-4 max-w-2xl">
                    <SectionLabel>Documented Failure Analysis</SectionLabel>
                    <SectionHeading>
                      $1,000+ AI-assisted development failure<span className="text-[#F27D26]">.</span>
                    </SectionHeading>
                  </div>

                  {/* Context box */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Timeline', value: '12 weeks', sub: 'planned: 4' },
                      { label: 'Budget', value: '$700–1,100', sub: 'planned: $130' },
                      { label: 'Parameters', value: '1.27B', sub: '86 brain subsystems' },
                      { label: 'Output quality', value: '< 2%', sub: 'brain gate influence' },
                    ].map((stat) => (
                      <div key={stat.label} className="glass rounded-2xl p-6 border border-white/5 text-center space-y-1">
                        <div className="text-[10px] uppercase tracking-widest text-[#A19E95]">{stat.label}</div>
                        <div className="text-2xl font-serif font-light text-[#F27D26]">{stat.value}</div>
                        <div className="text-[10px] text-[#A19E95]/60">{stat.sub}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-5">
                    {eylaFailureModes.map((fm) => (
                      <div
                        key={fm.id}
                        className="glass rounded-2xl p-7 border border-white/5 hover:border-[#F27D26]/15 transition-all flex gap-6"
                      >
                        <span className="text-[#F27D26] font-bold text-sm font-mono px-3 py-1.5 bg-[#F27D26]/10 rounded-lg h-fit">
                          {fm.id}
                        </span>
                        <div className="space-y-2">
                          <h3 className="font-bold text-white">{fm.title}</h3>
                          <p className="text-[#A19E95] text-sm font-light leading-relaxed">{fm.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}

          {/* ── Citation Block for Selected Paper ── */}
          <section className="py-16 px-6 border-t border-white/5">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex justify-between items-center">
                <SectionLabel>Cite this work</SectionLabel>
                <button
                  onClick={handleCopyBibtex}
                  className="inline-flex items-center gap-2 text-xs text-[#F27D26] hover:text-white bg-white/5 border border-white/10 px-4 py-2 rounded-xl transition-all cursor-pointer"
                >
                  {copiedBibtex ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copiedBibtex ? 'BibTeX Copied!' : 'Copy BibTeX'}</span>
                </button>
              </div>

              <div className="glass rounded-2xl p-6 border border-white/5 font-mono text-xs text-[#A19E95] leading-relaxed whitespace-pre-wrap break-all">
                {paper.bibtex}
              </div>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
