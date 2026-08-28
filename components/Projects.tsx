'use client';

import { motion } from 'motion/react';
import { ArrowUpRight, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';

type Status = 'development' | 'shipped' | 'research' | 'paper' | 'mvp';

type Project = {
  name: string;
  tagline: string;
  status: Status;
  statusNote?: string;
  metric?: string;
  metricLabel?: string;
  link?: string;
  linkLabel?: string;
  github?: string; // repo name under Adiuk24 → live "active X ago"
  hf?: string;     // model id under Adiuk → live "updated X ago · N downloads"
  fallbackActivity?: string;
  flagship?: boolean;
};

const PROJECTS: Project[] = [
  {
    name: 'Noor',
    tagline: 'From-scratch Bangla-first hybrid language model — linear attention + mixture-of-experts, trained end-to-end.',
    status: 'development',
    metric: '$104',
    metricLabel: 'pretrain + SFT',
    fallbackActivity: 'private repo · v2 in training',
    flagship: true,
  },
  {
    name: 'Eyla AIOS',
    tagline: 'Offline, Bangla-first agentic AI operating system that runs fully on consumer hardware.',
    status: 'development',
    metric: '16GB',
    metricLabel: 'runs on a laptop',
    hf: 'eyla-qwen3-8b-tools-v2',
    flagship: true,
  },
  {
    name: 'Gradient-Flow Arbiter',
    tagline: 'Verification harness that catches silent ML training bugs before compute is spent.',
    status: 'shipped',
    statusNote: 'MIT',
    github: 'gradient-flow-arbiter',
    link: 'https://github.com/Adiuk24/gradient-flow-arbiter',
    linkLabel: 'GitHub',
  },
  {
    name: 'Eyla Identity Paper',
    tagline: 'Identity-anchored LLM architecture with the Identity Consistency Score (ICS) benchmark.',
    status: 'paper',
    link: 'https://arxiv.org/abs/2604.00009',
    linkLabel: 'arXiv',
  },
  {
    name: 'AdiTurbo',
    tagline: 'Low-bit model quantization engine — sub-3-bit models that stay coherent.',
    status: 'research',
    hf: 'AdiTurbo-TQ-Models',
    link: 'https://huggingface.co/Adiuk/AdiTurbo-TQ-Models',
    linkLabel: 'Hugging Face',
  },
  {
    name: 'Eyla Tool-Calling Models',
    tagline: 'On-device English / Bangla / Banglish tool-calling fine-tunes.',
    status: 'shipped',
    hf: 'eyla-qwen3-8b-tools-v2',
    link: 'https://huggingface.co/Adiuk/eyla-qwen3-8b-tools-v2',
    linkLabel: 'Hugging Face',
  },
  {
    name: 'ADI',
    tagline: 'Predictive AI with a closed observe → predict → correct loop.',
    status: 'research',
    fallbackActivity: 'private beta',
  },
  {
    name: 'MeshGPU',
    tagline: 'Peer-to-peer GPU rental marketplace.',
    status: 'mvp',
    fallbackActivity: 'private repo',
  },
  {
    name: 'Tapmad Anti-Piracy',
    tagline: 'OTT content-protection platform running in production.',
    status: 'shipped',
    statusNote: 'production',
    github: 'tapmad-anti-piracy',
    link: 'https://github.com/Adiuk24/tapmad-anti-piracy',
    linkLabel: 'GitHub',
  },
];

const STATUS_STYLE: Record<Status, { label: string; color: string; border: string }> = {
  development: { label: 'In Development', color: 'text-[#F27D26]', border: 'border-[#F27D26]/40' },
  shipped:     { label: 'Shipped',        color: 'text-[#97C459]', border: 'border-[#97C459]/40' },
  research:    { label: 'Research',       color: 'text-[#85B7EB]', border: 'border-[#85B7EB]/40' },
  paper:       { label: 'Published Paper', color: 'text-white',    border: 'border-white/30' },
  mvp:         { label: 'MVP',            color: 'text-[#EF9F27]', border: 'border-[#EF9F27]/40' },
};

type Activity = { github: Record<string, string>; hf: Record<string, { updated: string; downloads: number }> };

function relTime(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  if (days < 365) return `${Math.floor(days / 30)} mo ago`;
  return `${Math.floor(days / 365)} yr ago`;
}

const CACHE_KEY = 'projects-activity-v1';
const CACHE_TTL = 3600000; // 1h — stays well under GitHub's 60 req/h anonymous limit

function useActivity(): Activity | null {
  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { at, data } = JSON.parse(cached);
        if (Date.now() - at < CACHE_TTL) {
          Promise.resolve(data).then(setActivity);
          return;
        }
      }
    } catch { /* ignore */ }

    const hfIds = [...new Set(PROJECTS.map(p => p.hf).filter(Boolean))] as string[];
    Promise.allSettled([
      fetch('https://api.github.com/users/Adiuk24/repos?per_page=100').then(r => r.json()),
      ...hfIds.map(id => fetch(`https://huggingface.co/api/models/Adiuk/${id}`).then(r => r.json())),
    ]).then(results => {
      const data: Activity = { github: {}, hf: {} };
      const [gh, ...hf] = results;
      if (gh.status === 'fulfilled' && Array.isArray(gh.value)) {
        for (const repo of gh.value) data.github[repo.name] = repo.pushed_at;
      }
      hf.forEach((res, i) => {
        if (res.status === 'fulfilled' && res.value?.lastModified) {
          data.hf[hfIds[i]] = { updated: res.value.lastModified, downloads: res.value.downloads ?? 0 };
        }
      });
      setActivity(data);
      try { localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data })); } catch { /* ignore */ }
    });
  }, []);

  return activity;
}

function activityLine(p: Project, activity: Activity | null): string | null {
  if (activity) {
    if (p.github && activity.github[p.github]) return `active ${relTime(activity.github[p.github])}`;
    if (p.hf && activity.hf[p.hf]) {
      const { updated, downloads } = activity.hf[p.hf];
      return `updated ${relTime(updated)}${downloads ? ` · ${downloads.toLocaleString()} downloads` : ''}`;
    }
  }
  return p.fallbackActivity ?? null;
}

function StatusChip({ status, note }: { status: Status; note?: string }) {
  const s = STATUS_STYLE[status];
  return (
    <span className={`inline-flex items-center w-fit text-[10px] uppercase tracking-[0.2em] font-mono ${s.color} border ${s.border} px-3 py-1.5 rounded-full`}>
      ● {s.label}{note ? ` · ${note}` : ''}
    </span>
  );
}

function ActivityLine({ project, activity }: { project: Project; activity: Activity | null }) {
  const line = activityLine(project, activity);
  if (!line) return <span />;
  return (
    <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-white/30">
      <RefreshCw size={10} /> {line}
    </span>
  );
}

export default function Projects() {
  const activity = useActivity();
  const flagships = PROJECTS.filter(p => p.flagship);
  const rest = PROJECTS.filter(p => !p.flagship);

  return (
    <section id="projects" className="py-20 md:py-32 px-6 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#F27D26]/5 rounded-full blur-[140px] -z-10" />

      <div className="max-w-7xl mx-auto space-y-10 md:space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-6 max-w-2xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs uppercase tracking-[0.5em] text-[#F27D26] font-semibold"
            >
              Portfolio
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-serif font-light tracking-tight text-white"
            >
              What I&apos;m building<span className="text-[#F27D26]">.</span>
            </motion.h2>
          </div>
          <p className="text-[#A19E95] text-base md:text-lg max-w-md font-light leading-relaxed">
            Everything I&apos;m building — status pulled live from GitHub and Hugging Face.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {flagships.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group p-7 md:p-10 glass rounded-[32px] md:rounded-[48px] border border-white/5 hover:border-[#F27D26]/20 transition-all duration-700 space-y-5 md:space-y-6"
            >
              <div className="flex justify-between items-center">
                <StatusChip status={p.status} note={p.statusNote} />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">Flagship</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-white group-hover:text-[#F27D26] transition-colors duration-500">{p.name}</h3>
              <p className="text-[#A19E95] font-light leading-relaxed text-base md:text-lg">{p.tagline}</p>
              {p.metric && (
                <div className="font-mono text-xl text-white">
                  {p.metric} <span className="text-xs uppercase tracking-widest text-white/30">{p.metricLabel}</span>
                </div>
              )}
              <div className="flex justify-between items-center border-t border-white/10 pt-5">
                <ActivityLine project={p} activity={activity} />
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-[#F27D26] hover:text-white transition-colors">
                    {p.linkLabel} <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              className="group p-6 md:p-8 glass rounded-[28px] md:rounded-[32px] border border-white/5 hover:border-[#F27D26]/20 transition-all duration-500 flex flex-col justify-between gap-4 md:gap-6 md:min-h-[240px]"
            >
              <div className="space-y-4">
                <StatusChip status={p.status} note={p.statusNote} />
                <h3 className="text-2xl font-serif font-bold text-white group-hover:text-[#F27D26] transition-colors duration-500">{p.name}</h3>
                <p className="text-[#A19E95] font-light leading-relaxed text-sm line-clamp-3 md:line-clamp-none">{p.tagline}</p>
              </div>
              <div className="flex justify-between items-center border-t border-white/10 pt-4">
                <ActivityLine project={p} activity={activity} />
                {p.link ? (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#F27D26] hover:text-white transition-colors">
                    {p.linkLabel} <ArrowUpRight size={12} />
                  </a>
                ) : (
                  <span className="text-xs font-mono uppercase tracking-widest text-white/20">—</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
