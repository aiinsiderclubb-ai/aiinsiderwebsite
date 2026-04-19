'use client';

import dynamic from 'next/dynamic';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

const About = dynamic(() => import('./components/About'), { ssr: true });
const Solutions = dynamic(() => import('./components/Solutions'), { ssr: true });
const ProductsShowcase = dynamic(() => import('./components/ProductsShowcase'), { ssr: true });
const AIContentStudio = dynamic(() => import('./components/AIContentStudio'), { ssr: true });
const CaseStudies = dynamic(() => import('./components/CaseStudies'), { ssr: true });
const LatestInsights = dynamic(() => import('./components/LatestInsights'), { ssr: true });
const TechStack = dynamic(() => import('./components/TechStack'), { ssr: true });
const Testimonials = dynamic(() => import('./components/Testimonials'), { ssr: true });
const Pricing = dynamic(() => import('./components/Pricing'), { ssr: true });
const PartnersTeaser = dynamic(() => import('./components/PartnersTeaser'), { ssr: true });
const BookCall = dynamic(() => import('./components/BookCall'), { ssr: true });
const Contact = dynamic(() => import('./components/Contact'), { ssr: true });

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Solutions />
      <ProductsShowcase />
      <AIContentStudio />
      <CaseStudies />
      <LatestInsights />
      <TechStack />
      <Testimonials />
      <Pricing />
      <PartnersTeaser />
      <BookCall />
      <Contact />
      <Footer />
    </main>
  );
}

