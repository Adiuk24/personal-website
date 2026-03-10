import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Ventures } from "@/components/sections/Ventures";
import { Research } from "@/components/sections/Research";
import { Press } from "@/components/sections/Press";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Ventures />
      <Research />
      <Press />
      <Contact />
      <Footer />
    </main>
  );
}
