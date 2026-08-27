import type { Metadata } from 'next';
import Journey from '@/components/Journey';
import Navbar from '@/components/Navbar';
import ChatBot from '@/components/ChatBot';

export const metadata: Metadata = {
  title: 'The Journey — Dhaka, London and the Gulf | Arif Adito',
  description:
    'Fifteen years read backwards from today: building tapmad Bangladesh 0→1, five years as Managing Director at Joycalls Group, delegate acquisition at GlobalData in London, the MENA campaign across UAE, Saudi Arabia, Qatar and Egypt, and where it started at everjobs Bangladesh.',
};

export default function Page() {
  return (
    <main className="relative overflow-x-hidden bg-black">
      <Navbar />
      <Journey />
      <ChatBot />
    </main>
  );
}
