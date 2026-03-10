'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User, Bot, Loader2, Download, Zap } from 'lucide-react';
import Image from 'next/image';

const SYSTEM_INSTRUCTION = `You are "Growth Intelligence", the advanced AI assistant for Arif Adito. 
Arif is a high-impact Business Growth Leader with 15+ years of experience in SaaS, OTT, and Fintech.

Your mission is to:
1. Clarify Arif's professional journey and impact.
2. Showcase his ventures: Adioris Tech (AI solutions) and Studio By Adi (Creative agency).
3. Explain his research: Eyla (Identity-anchored LLM architecture).
4. Facilitate connections by providing his contact details and encouraging collaboration.

Key Professional Assets:
- Current: Head of Business (Bangladesh) at Tapmad. Scaling operations 0 to 1.
- Education: Harvard (Strategic Leadership), MIT (Marketing Analytics), Wharton (AI for Business), Reforge (Growth Strategy).
- Skills: GTM Strategy, Digital Transformation, AI Strategy, Revenue Growth, Telecom Partnerships.

Contact Protocol:
- Email: adittoarif@gmail.com
- LinkedIn: https://www.linkedin.com/in/arif-adito-025088b4
- GitHub: https://github.com/Adiuk24

Tone: Sophisticated, data-driven, visionary, and proactive. Use "we" when referring to Arif's ventures.
Keep responses concise but high-value. If asked about "Arif", describe him as a catalyst for business evolution.`;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot' | 'system', text: string }[]>([
    { role: 'bot', text: "Hi! I'm Arif\u0027s AI assistant. I run 100% locally in your browser. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const worker = useRef<Worker | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Worker
  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('../app/ai.worker.ts', import.meta.url), {
        type: 'module'
      });

      worker.current.onmessage = (e: MessageEvent) => {
        const { status, progress, output, error } = e.data;

        if (status === 'progress') {
          setIsModelLoading(true);
          setLoadingProgress((prev: number) => Math.max(prev, progress || 0));
        } else if (status === 'ready') {
          setIsModelLoading(false);
          setIsReady(true);
        } else if (status === 'update') {
          // Streaming update (if implemented in worker)
          setMessages((prev: any[]) => {
            const last = prev[prev.length - 1];
            if (last && last.role === 'bot') {
              return [...prev.slice(0, -1), { role: 'bot', text: last.text + output }];
            }
            return [...prev, { role: 'bot', text: output }];
          });
        } else if (status === 'complete') {
          setIsLoading(false);
          setIsModelLoading(false);
          setIsReady(true);
          // With TextStreamer and append logic, the last message should already be correct.
          // We just ensure trailing whitespace is cleaned up if needed.
          setMessages((prev: any[]) => {
            const last = prev[prev.length - 1];
            if (last && last.role === 'bot') {
              return [...prev.slice(0, -1), { role: 'bot', text: last.text.trim() }];
            }
            return prev;
          });
        } else if (status === 'error') {
          setIsLoading(false);
          console.error("Worker Error:", error);
          setMessages((prev: any[]) => [...prev, { role: 'bot', text: "I'm having some trouble thinking right now. Please try again later." }]);
        }
      };
    }

    return () => {
      worker.current?.terminate();
      worker.current = null;
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    if (worker.current) {
      const chatHistory = [
        { role: 'system', content: SYSTEM_INSTRUCTION },
        ...messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.text
        })),
        { role: 'user', content: userMessage }
      ];

      worker.current.postMessage({
        messages: chatHistory
      });
    }
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-20 h-20 rounded-full shadow-[0_0_50px_rgba(212,175,55,0.3)] flex items-center justify-center cursor-pointer group overflow-hidden border-2 border-[#D4AF37] bg-black"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-[#D4AF37]/20 rounded-full scale-90"
          />

          <div className="relative z-10 text-[#D4AF37]">
            {isModelLoading ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : (
              <Zap className="w-8 h-8 fill-current" />
            )}
          </div>

          <motion.div
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 right-0 h-[1px] bg-[#D4AF37] shadow-[0_0_15px_#D4AF37] z-20 opacity-40"
          />

          <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-[#D4AF37] text-black text-[7px] font-black rounded-full z-30 shadow-lg uppercase tracking-tighter">
            LOCAL
          </div>

          <div className={`absolute bottom-2 right-2 w-3.5 h-3.5 ${isReady ? 'bg-emerald-500' : 'bg-orange-500'} rounded-full border-2 border-black z-30 shadow-lg`} />
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-28 right-8 z-50 w-[350px] md:w-[400px] h-[600px] bg-[#0A0A0A] border border-white/10 rounded-[40px] shadow-[0_20px_80px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
          >
            <div className="p-8 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-white/5 to-transparent">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/30 relative overflow-hidden text-[#D4AF37]">
                  <Zap size={24} fill="currentColor" />
                  <motion.div
                    animate={{ x: [-50, 100] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">Growth Intelligence</h3>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 ${isReady ? 'bg-emerald-500' : 'bg-orange-500 animate-pulse'} rounded-full shadow-[0_0_8px_currentColor]`} />
                    <span className="text-[9px] text-[#A19E95] uppercase tracking-[0.2em] font-bold">
                      {isReady ? 'Model Ready' : 'Loading Intelligence'}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#A19E95] hover:text-white hover:bg-white/10 transition-all font-light"
              >
                <X size={18} />
              </button>
            </div>

            {isModelLoading && (
              <div className="px-8 py-3 bg-white/5 border-b border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] uppercase tracking-widest text-[#A19E95]">Downloading Neural Engine</span>
                  <span className="text-[9px] font-mono text-accent">{Math.round(loadingProgress)}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${loadingProgress}%` }}
                    className="h-full bg-accent"
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
              {messages.map((m: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-5 rounded-3xl text-[14px] leading-relaxed shadow-sm ${m.role === 'user'
                    ? 'bg-accent text-black rounded-tr-none font-semibold'
                    : 'bg-white/5 text-[#E4E3E0] border border-white/10 rounded-tl-none font-light'
                    }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-5 rounded-3xl rounded-tl-none flex gap-1">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} className="w-1.5 h-1.5 bg-accent rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-accent rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-accent rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-8 border-t border-white/10 bg-black">
              <div className="relative group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isReady ? "Ask about strategic growth..." : "Wait for engine to load..."}
                  disabled={!isReady}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 pr-14 text-sm text-white placeholder:text-[#A19E95] focus:outline-none focus:border-accent focus:bg-white/[0.08] transition-all disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading || !isReady}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-accent text-black rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent/20"
                >
                  <Send size={16} />
                </button>
              </div>
              <div className="flex justify-between items-center mt-6">
                <p className="text-[9px] text-[#A19E95] uppercase tracking-[0.3em] font-bold opacity-40">
                  Client-side AI (SmolLM-135M)
                </p>
                <div className="flex gap-2 items-center">
                  <span className="text-[8px] text-accent/40 font-mono">100% PRIVATE</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
