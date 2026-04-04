import type { Metadata } from 'next';
import { buildPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Projects',
  description:
    'Selected AI projects — voice agents, chatbots and automation systems built by AI Insider.',
  canonical: '/projects',
});

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

