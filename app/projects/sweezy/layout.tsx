import type { Metadata } from 'next';
import { buildPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Sweezy | AI Insider',
  description:
    'Sweezy — App Store-style mobile app case with guides, checklists, multilingual content and AI assistant.',
  canonical: '/projects/sweezy',
  type: 'article',
});

export default function SweezyProjectLayout({ children }: { children: React.ReactNode }) {
  return children;
}

