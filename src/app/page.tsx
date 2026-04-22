import Header from "@/components/Header";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import Masters from "@/sections/Masters";
import Portfolio from "@/sections/Portfolio";
import Contact from "@/sections/Contact";
import Booking from "@/sections/Booking";

export default function Home() {
  return (
    <main className="h-screen overflow-y-scroll scroll-smooth bg-black">
      <Header />
      <Hero />
      <Services />
      <Masters />
      <Portfolio />
      <Booking />
      <Contact />
    </main>
  );
}