'use client';

import { useState, useEffect, useCallback } from 'react';

const STATS_URL = 'https://arifadito-api.netlify.app/.netlify/functions/stats';

type Stats = {
  totalViews: number;
  daily: { date: string; views: number }[];
  topPaths: [string, number][];
  topReferrers: [string, number][];
  topCountries: [string, number][];
  conversationCount: number;
  conversations: { id: string; updated: string; turns: { role: string; content: string }[] }[];
};

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openChat, setOpenChat] = useState<string | null>(null);

  const load = useCallback(async (t: string) => {
    setLoading(true); setError('');
    try {
      const r = await fetch(`${STATS_URL}?days=30`, { headers: { 'x-admin-token': t } });
      if (r.status === 401) throw new Error('Wrong token.');
      if (!r.ok) throw new Error(`Server returned ${r.status}`);
      setStats(await r.json());
      localStorage.setItem('admin-token', t);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('admin-token');
    if (saved) { setToken(saved); load(saved); }
  }, [load]);

  const peak = Math.max(1, ...(stats?.daily.map(d => d.views) ?? [1]));

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-light">Site admin</h1>
            <p className="text-[#A19E95] text-sm font-light mt-1">Visitors and assistant conversations, last 30 days.</p>
          </div>
          <div className="flex gap-2">
            <input
              type="password"
              value={token}
              onChange={e => setToken(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && load(token)}
              placeholder="Admin token"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#F27D26]/50"
            />
            <button
              onClick={() => load(token)}
              disabled={loading || !token}
              className="px-5 py-2.5 bg-[#F27D26] text-black text-sm font-bold rounded-xl disabled:opacity-40"
            >
              {loading ? '…' : 'Load'}
            </button>
          </div>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        {stats && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                ['Page views', stats.totalViews.toLocaleString()],
                ['Conversations', stats.conversationCount.toLocaleString()],
                ['Top page', stats.topPaths[0]?.[0] ?? '—'],
                ['Top source', stats.topReferrers[0]?.[0] ?? 'direct'],
              ].map(([label, value]) => (
                <div key={label} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">{label}</p>
                  <p className="text-xl font-serif mt-2 truncate">{value}</p>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#F27D26] mb-4">Daily views</p>
              <div className="flex items-end gap-[3px] h-32">
                {stats.daily.map(d => (
                  <div key={d.date} className="flex-1 bg-[#F27D26]/70 hover:bg-[#F27D26] rounded-t transition-colors"
                       style={{ height: `${(d.views / peak) * 100}%`, minHeight: d.views ? '2px' : '1px' }}
                       title={`${d.date}: ${d.views}`} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {([['Pages', stats.topPaths], ['Referrers', stats.topReferrers], ['Countries', stats.topCountries]] as const).map(([label, rows]) => (
                <div key={label} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#F27D26] mb-3">{label}</p>
                  {rows.length ? rows.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-3 text-sm py-1 border-b border-white/5 last:border-0">
                      <span className="text-[#A19E95] truncate">{k}</span>
                      <span className="font-mono text-white/60 shrink-0">{v}</span>
                    </div>
                  )) : <p className="text-sm text-white/30">No data yet.</p>}
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#F27D26]">
                Assistant conversations ({stats.conversations.length} most recent)
              </p>
              {stats.conversations.length === 0 && (
                <p className="text-sm text-white/30">No conversations recorded yet.</p>
              )}
              {stats.conversations.map(c => {
                const firstUser = c.turns.find(t => t.role === 'user')?.content ?? '(empty)';
                return (
                  <div key={c.id} className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                    <button
                      onClick={() => setOpenChat(openChat === c.id ? null : c.id)}
                      className="w-full text-left p-4 flex justify-between gap-4"
                    >
                      <span className="text-sm text-white truncate">{firstUser}</span>
                      <span className="font-mono text-[10px] text-white/30 shrink-0">
                        {c.turns.length} turns · {c.updated.slice(0, 10)}
                      </span>
                    </button>
                    {openChat === c.id && (
                      <div className="px-4 pb-4 space-y-3">
                        {c.turns.map((t, i) => (
                          <div key={i} className={t.role === 'user' ? 'text-white' : 'text-[#A19E95]'}>
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[#F27D26]">{t.role}</span>
                            <p className="text-sm font-light leading-relaxed whitespace-pre-wrap">{t.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
