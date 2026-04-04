import type { Metadata } from 'next';
import { buildPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'About',
  description:
    'Learn about AI Insider — the team building AI automation, chatbots and voice agents for businesses in Switzerland and globally.',
  canonical: '/about',
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}

