'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import Image from 'next/image';

const SYSTEM_INSTRUCTION = `
You are "Growth Intelligence", the advanced AI assistant for Arif Adito. 
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
Keep responses concise but high-value. If asked about "Arif", describe him as a catalyst for business evolution.
`;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Hi! I'm Arif\u0027s AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY! });
      const model = "gemini-3.1-flash-lite-preview";
      
      const chat = ai.chats.create({
        model: model,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
        history: messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        }))
      });

      const result = await chat.sendMessage({ message: userMessage });
      const botResponse = result.text || "I'm sorry, I couldn't process that. Please try again or contact Arif directly.";
      
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "I'm having some trouble connecting right now. Please try again later or reach out to Arif via email." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Dynamic Brand-Reflective AI Avatar Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-20 h-20 rounded-full shadow-[0_0_50px_rgba(242,125,38,0.5)] flex items-center justify-center cursor-pointer group overflow-hidden border-2 border-[#F27D26] bg-black"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Animated Background Rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-[#F27D26]/20 rounded-full scale-90"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-[#F27D26]/10 rounded-full scale-75"
          />

          {/* Stylized Brand Avatar (SVG) */}
          <svg viewBox="0 0 100 100" className="w-12 h-12 z-10">
            {/* The 'A' Peak from Logo */}
            <motion.path 
              d="M50 20L20 80H80L50 20Z" 
              fill="none" 
              stroke="#F27D26" 
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
            {/* Growth Pulse Node */}
            <motion.circle 
              cx="50" cy="50" r="6" 
              fill="#F27D26"
              animate={{ r: [6, 10, 6], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Orbiting Data Nodes */}
            <motion.circle 
              cx="50" cy="20" r="3" fill="#F27D26"
              animate={{ cx: [50, 80, 50, 20, 50], cy: [20, 50, 80, 50, 20] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </svg>

          {/* Scanning Line Effect */}
          <motion.div 
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 right-0 h-[1px] bg-[#F27D26] shadow-[0_0_15px_#F27D26] z-20 opacity-40"
          />

          {/* AI Badge */}
          <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-[#F27D26] text-white text-[7px] font-black rounded-full z-30 shadow-lg uppercase tracking-tighter">
            VLLM
          </div>
          
          {/* Status Indicator */}
          <div className="absolute bottom-2 right-2 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-black z-30 shadow-lg" />
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-28 right-8 z-50 w-[350px] md:w-[400px] h-[550px] bg-[#0A0A0A] border border-white/10 rounded-[40px] shadow-[0_20px_80px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-white/5 to-transparent">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#F27D26]/10 flex items-center justify-center border border-[#F27D26]/30 relative overflow-hidden">
                  <svg viewBox="0 0 100 100" className="w-8 h-8">
                    <path d="M50 20L20 80H80L50 20Z" fill="none" stroke="#F27D26" strokeWidth="4" />
                    <circle cx="50" cy="50" r="6" fill="#F27D26" />
                  </svg>
                  <motion.div 
                    animate={{ x: [-50, 100] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">Growth Intelligence</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
                    <span className="text-[10px] text-[#A19E95] uppercase tracking-[0.2em] font-bold">Active Node</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#A19E95] hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-5 rounded-3xl text-[15px] leading-relaxed shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-[#F27D26] text-white rounded-tr-none font-medium' 
                      : 'bg-white/5 text-[#E4E3E0] border border-white/10 rounded-tl-none font-light'
                  }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-5 rounded-3xl rounded-tl-none flex gap-1">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} className="w-1.5 h-1.5 bg-[#F27D26] rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#F27D26] rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#F27D26] rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-8 border-t border-white/10 bg-black">
              <div className="relative group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about strategic growth..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 pr-14 text-sm text-white placeholder:text-[#A19E95] focus:outline-none focus:border-[#F27D26] focus:bg-white/[0.08] transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#F27D26] text-white rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#F27D26]/20"
                >
                  <Send size={16} />
                </button>
              </div>
              <div className="flex justify-between items-center mt-6">
                <p className="text-[9px] text-[#A19E95] uppercase tracking-[0.3em] font-bold opacity-40">
                  Gemini 3.1 Flash Lite
                </p>
                <div className="flex gap-2">
                  <div className="w-1 h-1 bg-[#F27D26] rounded-full opacity-20" />
                  <div className="w-1 h-1 bg-[#F27D26] rounded-full opacity-20" />
                  <div className="w-1 h-1 bg-[#F27D26] rounded-full opacity-20" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
