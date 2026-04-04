import type { Metadata } from 'next';
import { buildPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Sweezy | AI Insider',
  description:
    'Sweezy — a digital assistant app with practical guides, checklists and AI support for people in Switzerland. Case by AI Insider.',
  canonical: '/cases/sweezy',
  type: 'article',
});

export default function SweezyCaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}

