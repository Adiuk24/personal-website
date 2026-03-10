import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Ventures } from "@/components/sections/Ventures";
import { Press } from "@/components/sections/Press";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Ventures />
      <Press />
      <Contact />

      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-[10px] uppercase tracking-[3px] text-foreground/20 font-medium">
          © {new Date().getFullYear()} Arif Ahmed Adito. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}
