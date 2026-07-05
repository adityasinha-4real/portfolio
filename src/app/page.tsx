import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Tech } from "@/components/sections/Tech";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <Projects />
      <Tech />
      <Experience />
      <Contact />
    </main>
  );
}
