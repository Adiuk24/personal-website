'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Zap } from 'lucide-react';

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

const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || '';
const GROQ_MODEL = 'llama-3.1-8b-instant';

type Message = { role: 'user' | 'bot'; text: string };

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hi! I'm Arif's AI assistant, powered by Groq. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: 'system', content: SYSTEM_INSTRUCTION },
            ...history,
            { role: 'user', content: userMessage },
          ],
          max_tokens: 512,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response. Please try again.";
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { role: 'bot', text: "I'm having some trouble right now. Please reach out to Arif directly at adittoarif@gmail.com." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-20 h-20 rounded-full shadow-[0_0_50px_rgba(212,175,55,0.3)] flex items-center justify-center cursor-pointer overflow-hidden border-2 border-[#D4AF37] bg-black"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 border border-[#D4AF37]/20 rounded-full scale-90"
          />
          <Zap className="w-8 h-8 text-[#D4AF37] fill-current z-10" />
          <motion.div
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-0 right-0 h-[1px] bg-[#D4AF37] shadow-[0_0_15px_#D4AF37] z-20 opacity-40"
          />
          <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-[#D4AF37] text-black text-[7px] font-black rounded-full z-30 uppercase tracking-tighter">
            AI
          </div>
          <div className="absolute bottom-2 right-2 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-black z-30" />
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-28 right-8 z-50 w-[350px] md:w-[400px] h-[560px] bg-[#0A0A0A] border border-white/10 rounded-[40px] shadow-[0_20px_80px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-7 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-white/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/30 text-[#D4AF37] relative overflow-hidden">
                  <Zap size={20} fill="currentColor" />
                  <motion.div
                    animate={{ x: [-50, 100] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">Growth Intelligence</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[9px] text-[#A19E95] uppercase tracking-[0.2em] font-bold">Groq · Llama 3.1</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#A19E95] hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-7 space-y-5 scrollbar-hide">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] px-5 py-4 rounded-3xl text-[13px] leading-relaxed ${m.role === 'user'
                    ? 'bg-[#D4AF37] text-black rounded-tr-none font-semibold'
                    : 'bg-white/5 text-[#E4E3E0] border border-white/10 rounded-tl-none font-light'
                    }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 px-5 py-4 rounded-3xl rounded-tl-none flex gap-1.5">
                    {[0, 0.2, 0.4].map((delay, i) => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay }}
                        className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-7 border-t border-white/10 bg-black">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about strategic growth..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 pr-14 text-sm text-white placeholder:text-[#A19E95] focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/[0.08] transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#D4AF37] text-black rounded-xl flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all"
                >
                  <Send size={14} />
                </button>
              </div>
              <p className="text-[8px] text-[#A19E95]/40 uppercase tracking-[0.3em] font-bold mt-4 text-center">
                Powered by Groq · Instant Inference
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
