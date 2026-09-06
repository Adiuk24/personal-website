// Registry of self-published research. To add a post:
//   1. python3 scripts/build-research-post.py <report.md> content/research/<slug>.html content/research/<slug>.meta.json
//   2. add an entry here
// The dynamic route and the index both read from this list.

export type ResearchPost = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;        // ISO, for <time> and sorting
  displayDate: string;
  words: number;
  citations: number;
  tags: string[];
  summary: string;
  /** Claims whose source could not be resolved to a public URL. Shown in the note. */
  unresolvedCitations?: string[];
};

export const RESEARCH_POSTS: ResearchPost[] = [
  {
    slug: 'cpu-frontier-ai',
    title: 'What Can Run Frontier-Competitive AI on a Low-Power CPU?',
    subtitle:
      'Eleven paradigms claim it. Held to one evidence bar — named hardware, named task, joules per token — three survive.',
    date: '2026-09-06',
    displayDate: 'September 2026',
    words: 5588,
    citations: 62,
    tags: ['Edge AI', 'Model Efficiency', 'Benchmarking', 'Survey'],
    summary:
      'Eleven non-mainstream paradigms are surveyed against a single admissibility rule: a measurement counts only if it names the hardware, names the task, and reports energy rather than latency. Three carry admissible CPU evidence — Tsetlin Machines, retrieval-dominant tiny models, and HDC/VSA via the Nyström kernel bridge. The other eight fail as hardware-conditional, rebranded, or simply unmeasured. The field-wide finding is an energy blind spot that hits the winners as hard as the traps.',
    unresolvedCitations: [
      '250900454-universal-properties-of-activation-sparsity-in-modern-large-language-models',
    ],
  },
  {
    slug: 'ai-privacy-gateway',
    title: 'Privacy Gateways and PII-Redaction Layers for AI Coding Agents',
    subtitle:
      'A market map of every product claiming to keep source code private from AI coding assistants — and the five-property intersection none of them occupy.',
    date: '2026-08-28',
    displayDate: 'August 2026',
    words: 10663,
    citations: 85,
    tags: ['AI Privacy', 'Coding Agents', 'Regulatory', 'Market Analysis'],
    summary:
      'Five independent implementations already solve redaction-and-restore for Claude Code’s wire format. None of them combine local-first operation, reversible tokenization, offset-exact restoration, agent-aware coverage and regulated-vertical compliance in one product. This maps the landscape, the regulatory forcing functions across Bangladesh, Pakistan, India and the EU, and the four conditions under which the gap is real.',
    unresolvedCitations: [
      'bangladesh-telecommunication',
      'national-artificial-intelligence-policy-2025',
      'ul-agreement-updated-up-to-31032024',
    ],
  },
];

export function getPost(slug: string) {
  return RESEARCH_POSTS.find(p => p.slug === slug);
}
