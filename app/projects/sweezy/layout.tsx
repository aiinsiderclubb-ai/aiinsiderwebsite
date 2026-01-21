import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sweezy',
  description:
    'Sweezy — App Store-style mobile app case with guides, checklists, multilingual content and AI assistant.',
  alternates: { canonical: '/projects/sweezy' },
  openGraph: {
    title: 'Sweezy | AI Insider',
    description:
      'App Store-style mobile app case with guides, checklists, multilingual content and AI assistant.',
    url: '/projects/sweezy',
    type: 'article',
  },
};

export default function SweezyProjectLayout({ children }: { children: React.ReactNode }) {
  return children;
}

