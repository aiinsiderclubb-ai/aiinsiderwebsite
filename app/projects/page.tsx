'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ArrowRight, Bot, Mic, Workflow, Brain, MessageSquare, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const categories = ['All', 'Voice AI', 'Automation', 'Chatbots', 'Custom AI'];

const projects = [
  {
    title: 'VoiceFlow Pro',
    category: 'Voice AI',
    description: 'AI-powered voice agent handling 10,000+ daily customer calls for a major insurance company. Reduced call center costs by 60%.',
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=500&fit=crop',
    tags: ['Voice AI', 'NLP', 'Real-time'],
    gradient: 'from-cyan-500 to-blue-600',
    icon: Mic,
    metrics: [
      { label: 'Daily Calls', value: '10K+' },
      { label: 'Cost Reduction', value: '60%' },
      { label: 'Response Time', value: '<1s' },
    ],
    link: '#',
  },
  {
    title: 'AutoScale CRM',
    category: 'Automation',
    description: 'End-to-end sales automation pipeline integrating with HubSpot, Salesforce, and custom APIs. Automated 95% of lead qualification.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    tags: ['Automation', 'CRM', 'API'],
    gradient: 'from-violet-500 to-purple-600',
    icon: Workflow,
    metrics: [
      { label: 'Lead Qualification', value: '95%' },
      { label: 'Time Saved', value: '40h/week' },
      { label: 'Conversion', value: '+35%' },
    ],
    link: '#',
  },
  {
    title: 'SupportBot 360',
    category: 'Chatbots',
    description: 'Intelligent customer support chatbot with multi-language support and seamless human handoff. Handles 80% of inquiries autonomously.',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=500&fit=crop',
    tags: ['Chatbot', 'NLP', 'Multi-lang'],
    gradient: 'from-pink-500 to-rose-600',
    icon: MessageSquare,
    metrics: [
      { label: 'Autonomous', value: '80%' },
      { label: 'Languages', value: '12' },
      { label: 'Satisfaction', value: '4.8/5' },
    ],
    link: '#',
  },
  {
    title: 'PredictAI Analytics',
    category: 'Custom AI',
    description: 'Custom machine learning models for demand forecasting in retail. Improved inventory accuracy by 40% and reduced waste.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    tags: ['ML', 'Forecasting', 'Analytics'],
    gradient: 'from-yellow-500 to-orange-600',
    icon: Brain,
    metrics: [
      { label: 'Accuracy', value: '+40%' },
      { label: 'Waste Reduced', value: '25%' },
      { label: 'ROI', value: '5x' },
    ],
    link: '#',
  },
  {
    title: 'MeetingMaster AI',
    category: 'Voice AI',
    description: 'Voice agent that schedules, reschedules, and manages calendar appointments. Integrated with Google Calendar and Outlook.',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=500&fit=crop',
    tags: ['Voice AI', 'Scheduling', 'Integration'],
    gradient: 'from-emerald-500 to-teal-600',
    icon: Bot,
    metrics: [
      { label: 'Bookings/Day', value: '500+' },
      { label: 'No-shows', value: '-45%' },
      { label: 'Setup Time', value: '2 days' },
    ],
    link: '#',
  },
  {
    title: 'WorkflowX Engine',
    category: 'Automation',
    description: 'Enterprise workflow automation platform connecting 50+ tools. Reduced manual data entry by 90% for a logistics company.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop',
    tags: ['Automation', 'Enterprise', 'Integration'],
    gradient: 'from-indigo-500 to-blue-600',
    icon: Zap,
    metrics: [
      { label: 'Tools Connected', value: '50+' },
      { label: 'Manual Work', value: '-90%' },
      { label: 'Error Rate', value: '-95%' },
    ],
    link: '#',
  },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const projectsInView = useInView(projectsRef, { once: true, margin: '-100px' });

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full gpu-accelerated"
          style={{ 
            background: 'radial-gradient(circle, rgba(153, 69, 255, 0.12) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full gpu-accelerated"
          style={{ 
            background: 'radial-gradient(circle, rgba(0, 240, 255, 0.1) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 glass rounded-full mb-6">
              <span className="text-sm font-medium gradient-text">Our Portfolio</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 leading-tight">
              Projects That
              <span className="block gradient-text mt-2">Speak for Themselves</span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore our showcase of AI-powered solutions that have transformed businesses 
              across industries. Real projects, real results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="relative py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300
                  ${activeCategory === category 
                    ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg shadow-cyan-500/25' 
                    : 'glass border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={projectsRef} className="relative py-16 px-6 overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="glass-strong rounded-3xl overflow-hidden border border-white/10 
                    transition-all duration-300 hover:border-white/20 hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40`} />
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold 
                          bg-gradient-to-r ${project.gradient} text-white`}>
                          <Icon className="w-3.5 h-3.5" />
                          {project.category}
                        </span>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <a
                          href={project.link}
                          className="flex items-center gap-2 text-white font-semibold hover:gap-3 transition-all"
                        >
                          View Project <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 text-xs rounded-md bg-white/5 text-gray-400 border border-white/10">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10">
                        {project.metrics.map((metric, i) => (
                          <div key={i} className="text-center">
                            <div className={`text-lg font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                              {metric.value}
                            </div>
                            <div className="text-xs text-gray-500">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Want to Be Our Next <span className="gradient-text">Success Story</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Let's discuss your project and create something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#bookcall"
                className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full 
                  font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
              >
                Start Your Project
              </a>
              <a
                href="/#contact"
                className="inline-block px-10 py-4 glass-strong border border-white/20 rounded-full 
                  font-bold text-lg transition-all duration-300 hover:bg-white/10 hover:scale-105"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

