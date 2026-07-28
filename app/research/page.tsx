import type { Metadata } from 'next';
import ResearchPage from '@/components/Research';
import Navbar from '@/components/Navbar';
import ChatBot from '@/components/ChatBot';

export const metadata: Metadata = {
  title: 'Research & Publications — Pure Rust LM Pretraining & Eyla Architecture | Arif Adito',
  description:
    'Published research by Arif Adito: "Training a Language Model End-to-End in Rust: An Experience Report" (Zenodo DOI: 10.5281/zenodo.21621066) and "Eyla: Toward an Identity-Anchored LLM Architecture" (arXiv: 2604.00009).',
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
