'use client';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Solutions from './components/Solutions';
import CaseStudies from './components/CaseStudies';
import TechStack from './components/TechStack';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import BookCall from './components/BookCall';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Solutions />
      <CaseStudies />
      <TechStack />
      <Testimonials />
      <Pricing />
      <BookCall />
      <Contact />
      <Footer />
    </main>
  );
}

