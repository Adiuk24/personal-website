import type { Metadata } from 'next';
import ResearchPage from '@/components/Research';
import Navbar from '@/components/Navbar';
import ChatBot from '@/components/ChatBot';

export const metadata: Metadata = {
  title: 'Research — Eyla: Identity-Anchored LLM Architecture | Arif Adito',
  description:
    'Eyla: Toward an Identity-Anchored LLM Architecture with Integrated Biological Priors. Vision, implementation attempt, and lessons from AI-assisted development. Published on Zenodo, March 2026.',
};

export default function Page() {
  return (
    <main className="relative overflow-x-hidden bg-black">
      <Navbar />
      <ResearchPage />
      <ChatBot />
    </main>
  );
}
