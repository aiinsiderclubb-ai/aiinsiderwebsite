import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected AI projects — voice agents, chatbots and automation systems built by AI Insider.',
  alternates: {
    canonical: '/projects',
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

