import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import Navbar from '@/components/Navbar';
import ChatBot from '@/components/ChatBot';
import { RESEARCH_POSTS, getPost } from '@/lib/research-posts';

export function generateStaticParams() {
  return RESEARCH_POSTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: 'Not found' };
  return {
    title: `${post.title} | Arif Adito`,
    description: post.summary.slice(0, 200),
    alternates: { canonical: `https://arifadito.com/research/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.summary.slice(0, 200),
      type: 'article',
      url: `https://arifadito.com/research/${post.slug}`,
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary.slice(0, 200),
    },
  };
}

// Read at build time — the site is a static export, so this never runs in the browser.
function readPostHtml(slug: string): string | null {
  const file = path.join(process.cwd(), 'content', 'research', `${slug}.html`);
  try {
    return fs.readFileSync(file, 'utf-8');
  } catch {
    return null;
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const html = readPostHtml(slug);
  if (!html) notFound();

  return (
    <main className="relative overflow-x-hidden bg-black min-h-screen">
      <Navbar />

      <article className="max-w-3xl mx-auto px-6 pt-36 pb-32">
        <Link
          href="/research"
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#A19E95] hover:text-[#F27D26] transition-colors"
        >
          ← Research
        </Link>

        <header className="mt-8 space-y-6 border-b border-white/10 pb-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
            <time dateTime={post.date}>{post.displayDate}</time>
            <span>·</span>
            <span>{post.words.toLocaleString()} words</span>
            <span>·</span>
            <span className="text-[#F27D26]">{post.citations} sources</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-light text-white leading-tight tracking-tight">
            {post.title}
          </h1>
          <p className="text-lg text-[#A19E95] font-light leading-relaxed">{post.subtitle}</p>

          <div className="flex flex-wrap gap-2">
            {post.tags.map(t => (
              <span
                key={t}
                className="font-mono text-[9px] uppercase tracking-widest text-white/40 bg-white/5 px-3 py-1.5 rounded-lg"
              >
                {t}
              </span>
            ))}
          </div>

          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
            Published by Arif Adito
          </p>
        </header>

        <div className="research-post prose prose-invert max-w-none mt-12" dangerouslySetInnerHTML={{ __html: html }} />

        {post.unresolvedCitations?.length ? (
          <aside className="mt-16 p-6 border border-white/10 rounded-2xl bg-white/[0.02]">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#F27D26] mb-3">
              Note on sourcing
            </p>
            <p className="text-sm text-[#A19E95] font-light leading-relaxed">
              {post.citations} of {post.citations + post.unresolvedCitations.length} citations resolve to a public
              URL and are listed in the references. {post.unresolvedCitations.length} claims cite primary regulatory
              documents whose public link could not be verified at publication and are marked{' '}
              <sup className="text-[#F27D26]">[?]</sup> in the text rather than given a source that was not checked.
            </p>
          </aside>
        ) : null}
      </article>

      <ChatBot />
    </main>
  );
}
