import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Innovation from '@/components/Innovation';
import FeaturedResearch from '@/components/FeaturedResearch';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import News from '@/components/News';
import Contact from '@/components/Contact';
import ChatBot from '@/components/ChatBot';

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-black">
      <Navbar />
      <Hero />
      <Experience />
      <Innovation />
      <Projects />
      <FeaturedResearch />
      <Certifications />
      <News />
      <Contact />
      <ChatBot />
    </main>
  );
}
