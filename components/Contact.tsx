'use client';

import { motion } from 'motion/react';
import { Mail, Phone, Linkedin, Github, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 bg-[#050505] relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#F27D26]/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="text-sm uppercase tracking-[0.4em] text-[#F27D26] font-medium">
                Get In Touch
              </span>
              <h2 className="text-6xl md:text-8xl font-serif font-light leading-tight tracking-tight">
                Ready to build the future<span className="text-[#F27D26]">.</span>
              </h2>
              <p className="text-[#A19E95] text-xl max-w-md font-light leading-relaxed">
                Currently exploring high-impact leadership roles in UAE, MENA, and global markets. Let&apos;s catalyze your next phase of growth together.
              </p>
            </div>

            <div className="space-y-6">
              <ContactItem 
                icon={<Mail size={20} />} 
                label="Direct Email" 
                value="adittoarif@gmail.com" 
                href="mailto:adittoarif@gmail.com" 
              />
              <ContactItem 
                icon={<Phone size={20} />} 
                label="Call Directly" 
                value="+880 170 712 2201" 
                href="tel:8801707122201" 
              />
            </div>
          </div>

          <div className="space-y-12">
            <div className="p-12 glass rounded-[60px] space-y-8">
              <h3 className="text-3xl font-serif">Connect with me</h3>
              <div className="grid grid-cols-1 gap-4">
                <SocialLink 
                  icon={<Linkedin />} 
                  name="LinkedIn" 
                  href="https://www.linkedin.com/in/arif-adito-025088b4" 
                />
                <SocialLink 
                  icon={<Github />} 
                  name="GitHub" 
                  href="https://github.com/Adiuk24" 
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center px-6">
              <div className="text-2xl font-serif font-bold tracking-tighter">
                ArifAdito<span className="text-[#F27D26]">.</span>
              </div>
              <p className="text-[#A19E95] text-xs uppercase tracking-widest">
                © 2026 All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href: string }) {
  return (
    <a href={href} className="flex items-center gap-6 group">
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#F27D26] group-hover:text-white transition-all">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-[#A19E95]">{label}</p>
        <p className="text-xl font-medium">{value}</p>
      </div>
    </a>
  );
}

function SocialLink({ icon, name, href }: { icon: React.ReactNode, name: string, href: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center justify-between p-6 rounded-3xl bg-white/5 hover:bg-white/10 transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className="text-[#A19E95] group-hover:text-[#F27D26] transition-colors">
          {icon}
        </div>
        <span className="text-lg font-medium">{name}</span>
      </div>
      <ArrowUpRight size={20} className="text-[#A19E95] group-hover:text-white transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
    </a>
  );
}
