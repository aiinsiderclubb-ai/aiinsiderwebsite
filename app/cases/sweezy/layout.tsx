import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sweezy',
  description:
    'Sweezy — a digital assistant app with practical guides, checklists and AI support for people in Switzerland. Case by AI Insider.',
  alternates: {
    canonical: '/cases/sweezy',
  },
  openGraph: {
    title: 'Sweezy | AI Insider',
    description:
      'Sweezy — a digital assistant app with practical guides, checklists and AI support for people in Switzerland.',
    url: '/cases/sweezy',
    type: 'article',
  },
};

export default function SweezyCaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}

