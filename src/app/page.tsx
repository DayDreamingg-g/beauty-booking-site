import Header from "@/components/Header";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import Masters from "@/sections/Masters";
import Portfolio from "@/sections/Portfolio";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <Masters />
      <Portfolio />
    </main>
  );
}