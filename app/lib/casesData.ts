// Cases data structure for AI Insider Cases Page
import { Industry } from './chatPrompts';

export type CaseCategory = 'ecommerce' | 'beauty' | 'realestate' | 'voice' | 'automation';

export interface CaseResult {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  category: CaseCategory;
  industry?: Industry; // For linking to chat demo
  icon: string;
  industryName: string;
  title: string;
  shortDescription: string;
  problem: {
    title: string;
    points: string[];
  };
  solution: {
    title: string;
    points: string[];
  };
  results: CaseResult[];
  technologies: string[];
  ctas: CaseCTA[];
  featured?: boolean;
}

export interface CaseCTA {
  id: string;
  label: string;
  icon: string;
  action: 'demo' | 'voice' | 'flow' | 'contact' | 'book';
  primary?: boolean;
}

export const categoryLabels: Record<CaseCategory, string> = {
  ecommerce: '🛒 E-commerce',
  beauty: '💄 Beauty',
  realestate: '🏠 Real Estate',
  voice: '🎧 Voice Agents',
  automation: '⚙️ Automation',
};

export const categoryFilters: { id: CaseCategory | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'All Cases', icon: '✨' },
  { id: 'ecommerce', label: 'E-commerce', icon: '🛒' },
  { id: 'beauty', label: 'Beauty', icon: '💄' },
  { id: 'realestate', label: 'Real Estate', icon: '🏠' },
  { id: 'voice', label: 'Voice Agents', icon: '🎧' },
  { id: 'automation', label: 'Automation', icon: '⚙️' },
];

export const casesData: CaseStudy[] = [
  // CASE 1: E-COMMERCE
  {
    id: 'case-ecommerce',
    slug: 'ecommerce-ai-chatbot',
    category: 'ecommerce',
    industry: 'ecommerce',
    icon: '🛒',
    industryName: 'E-commerce',
    title: 'AI Chatbot + Voice Agent for E-commerce',
    shortDescription: 'Automated customer support, product recommendations, and order tracking with AI',
    problem: {
      title: 'Before AI Implementation',
      points: [
        'Overloaded support team with repetitive questions',
        'High cart abandonment rate (68%)',
        'No 24/7 customer support availability',
        'Slow response times during peak hours',
        'Manual order status inquiries',
      ],
    },
    solution: {
      title: 'What We Automated',
      points: [
        'AI chatbot on website with instant responses',
        'Smart product recommendations based on preferences',
        'Automated order status and tracking updates',
        'Voice agent for incoming call handling',
        'Seamless handoff to human when needed',
      ],
    },
    results: [
      { value: '35', label: 'Support load reduction', prefix: '-', suffix: '%' },
      { value: '18', label: 'Conversion increase', prefix: '+', suffix: '%' },
      { value: '12', label: 'Average order value', prefix: '+', suffix: '%' },
      { value: '24/7', label: 'Availability', prefix: '', suffix: '' },
    ],
    technologies: ['GPT-4', 'Voice AI', 'Shopify', 'WhatsApp', 'CRM Integration'],
    ctas: [
      { id: 'demo', label: 'Try E-commerce AI Demo', icon: '🤖', action: 'demo', primary: true },
      { id: 'contact', label: 'Get this for my store', icon: '💬', action: 'contact' },
    ],
    featured: true,
  },

  // CASE 2: BEAUTY SALON
  {
    id: 'case-beauty',
    slug: 'beauty-salon-ai-admin',
    category: 'beauty',
    industry: 'beauty',
    icon: '💄',
    industryName: 'Beauty Salon',
    title: 'AI Admin for Beauty Salon (WhatsApp + Chat)',
    shortDescription: 'Automated booking, reminders, and client engagement for beauty businesses',
    problem: {
      title: 'Before AI Implementation',
      points: [
        'Missed messages from potential clients',
        'Manual booking process eating admin time',
        'Lost clients due to slow responses',
        'No systematic follow-ups or reminders',
        'Inconsistent service recommendations',
      ],
    },
    solution: {
      title: 'What We Automated',
      points: [
        'AI booking assistant available 24/7',
        'Automated FAQ responses (prices, services, availability)',
        'Smart appointment reminders via WhatsApp',
        'Personalized service upsells and recommendations',
        'Client history and preferences tracking',
      ],
    },
    results: [
      { value: '40', label: 'Bookings increase', prefix: '+', suffix: '%' },
      { value: '70', label: 'Admin work reduction', prefix: '-', suffix: '%' },
      { value: '0', label: 'Missed messages', prefix: '', suffix: '' },
      { value: '3x', label: 'Faster response time', prefix: '', suffix: '' },
    ],
    technologies: ['GPT-4', 'WhatsApp API', 'Booking System', 'CRM', 'SMS Notifications'],
    ctas: [
      { id: 'demo', label: 'Try Beauty AI Demo', icon: '💄', action: 'demo', primary: true },
      { id: 'contact', label: 'Get this for my salon', icon: '💬', action: 'contact' },
    ],
    featured: true,
  },

  // CASE 3: REAL ESTATE
  {
    id: 'case-realestate',
    slug: 'real-estate-lead-qualification',
    category: 'realestate',
    industry: 'general', // Maps to general for now
    icon: '🏠',
    industryName: 'Real Estate',
    title: 'AI Lead Qualification for Real Estate',
    shortDescription: 'Intelligent lead filtering and qualification before agent involvement',
    problem: {
      title: 'Before AI Implementation',
      points: [
        'Low quality leads wasting agent time',
        'Hours spent on unqualified prospects',
        'No systematic qualification process',
        'Inconsistent follow-up with leads',
        'Missing hot leads during off-hours',
      ],
    },
    solution: {
      title: 'What We Automated',
      points: [
        'AI qualification chatbot on property listings',
        'Budget and timeline filter before human contact',
        'Automatic CRM handoff with lead scores',
        'Personalized property recommendations',
        '24/7 lead capture and initial engagement',
      ],
    },
    results: [
      { value: '50', label: 'Bad leads filtered out', prefix: '-', suffix: '%' },
      { value: '2x', label: 'Higher close rate', prefix: '', suffix: '' },
      { value: '10+', label: 'Hours saved weekly', prefix: '', suffix: 'hrs' },
      { value: '95', label: 'Lead response rate', prefix: '', suffix: '%' },
    ],
    technologies: ['GPT-4', 'CRM Integration', 'Lead Scoring', 'WhatsApp', 'Email Automation'],
    ctas: [
      { id: 'demo', label: 'Try Real Estate AI Demo', icon: '🏠', action: 'demo', primary: true },
      { id: 'contact', label: 'Qualify my leads', icon: '💬', action: 'contact' },
    ],
  },

  // CASE 4: VOICE AGENT
  {
    id: 'case-voice',
    slug: 'ai-voice-agent-calls',
    category: 'voice',
    industry: 'general',
    icon: '🎧',
    industryName: 'Voice Agent',
    title: 'AI Voice Agent for Incoming Calls',
    shortDescription: 'Never miss a call again with intelligent voice AI handling',
    problem: {
      title: 'Before AI Implementation',
      points: [
        'Missed calls during busy hours and off-time',
        'Limited working hours for phone support',
        'Staff overwhelmed with repetitive call inquiries',
        'No call logging or CRM integration',
        'Long hold times frustrating customers',
      ],
    },
    solution: {
      title: 'What We Automated',
      points: [
        'AI voice agent answering every call',
        'Intelligent appointment booking via voice',
        'FAQ handling with natural conversation',
        'Seamless transfer to human when needed',
        'Full call transcription and CRM logging',
      ],
    },
    results: [
      { value: '0', label: 'Missed calls', prefix: '', suffix: '' },
      { value: '<3s', label: 'Response time', prefix: '', suffix: '' },
      { value: '85', label: 'Calls handled by AI', prefix: '', suffix: '%' },
      { value: '↑', label: 'Customer trust', prefix: '', suffix: '' },
    ],
    technologies: ['Voice AI', 'Telephony API', 'Speech-to-Text', 'CRM', 'Call Analytics'],
    ctas: [
      { id: 'voice', label: 'Hear Voice Demo', icon: '🎧', action: 'voice', primary: true },
      { id: 'book', label: 'Book a Demo Call', icon: '📞', action: 'book' },
    ],
    featured: true,
  },

  // CASE 5: AUTOMATION - WORKFLOW
  {
    id: 'case-automation',
    slug: 'workflow-automation',
    category: 'automation',
    industry: 'general',
    icon: '⚙️',
    industryName: 'Workflow Automation',
    title: 'End-to-End Business Process Automation',
    shortDescription: 'Connect your tools and automate repetitive tasks with AI',
    problem: {
      title: 'Before AI Implementation',
      points: [
        'Manual data entry across multiple systems',
        'Human errors in repetitive processes',
        'Slow handoffs between departments',
        'No visibility into bottlenecks',
        'Time wasted on routine tasks',
      ],
    },
    solution: {
      title: 'What We Automated',
      points: [
        'AI-powered data extraction and entry',
        'Automatic task routing based on rules',
        'Integration between CRM, email, and tools',
        'Real-time notifications and alerts',
        'Custom AI logic for decision making',
      ],
    },
    results: [
      { value: '80', label: 'Manual work reduction', prefix: '-', suffix: '%' },
      { value: '0', label: 'Human errors', prefix: '', suffix: '' },
      { value: '5x', label: 'Faster processing', prefix: '', suffix: '' },
      { value: '24/7', label: 'Automated operation', prefix: '', suffix: '' },
    ],
    technologies: ['AI Agents', 'Zapier', 'Make', 'CRM', 'Custom Integrations'],
    ctas: [
      { id: 'flow', label: 'View Automation Flow', icon: '📊', action: 'flow', primary: true },
      { id: 'contact', label: 'Automate my business', icon: '💬', action: 'contact' },
    ],
  },

  // CASE 6: FLOWERS (bonus case)
  {
    id: 'case-flowers',
    slug: 'flower-shop-ai-sales',
    category: 'ecommerce',
    industry: 'flowers',
    icon: '🌸',
    industryName: 'Flower Shop',
    title: 'AI Sales Assistant for Flower Delivery',
    shortDescription: 'Personalized bouquet recommendations and seamless ordering experience',
    problem: {
      title: 'Before AI Implementation',
      points: [
        'Customers unsure which bouquet to choose',
        'Long decision process without guidance',
        'Missed upsell opportunities',
        'Manual order taking via calls/messages',
        'No personalized recommendations',
      ],
    },
    solution: {
      title: 'What We Automated',
      points: [
        'AI assistant asks about occasion and preferences',
        'Smart bouquet recommendations with photos',
        'Automatic upsells (cards, chocolates, vases)',
        'Instant delivery scheduling',
        'Follow-up for repeat occasions',
      ],
    },
    results: [
      { value: '35', label: 'Average order value', prefix: '+', suffix: '%' },
      { value: '50', label: 'Faster ordering', prefix: '', suffix: '%' },
      { value: '2x', label: 'Repeat customers', prefix: '', suffix: '' },
      { value: '90', label: 'Customer satisfaction', prefix: '', suffix: '%' },
    ],
    technologies: ['GPT-4', 'E-commerce Integration', 'WhatsApp', 'Delivery API'],
    ctas: [
      { id: 'demo', label: 'Try Flower AI Demo', icon: '🌸', action: 'demo', primary: true },
      { id: 'contact', label: 'Get this for my shop', icon: '💬', action: 'contact' },
    ],
  },
];

// Helper to get case by slug
export const getCaseBySlug = (slug: string): CaseStudy | undefined => {
  return casesData.find(c => c.slug === slug);
};

// Helper to get cases by category
export const getCasesByCategory = (category: CaseCategory | 'all'): CaseStudy[] => {
  if (category === 'all') return casesData;
  return casesData.filter(c => c.category === category);
};

// Helper to get featured cases
export const getFeaturedCases = (): CaseStudy[] => {
  return casesData.filter(c => c.featured);
};

