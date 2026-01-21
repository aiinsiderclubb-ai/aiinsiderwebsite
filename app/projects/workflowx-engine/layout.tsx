import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WorkflowX Engine',
  description:
    'WorkflowX Engine — workflow automation engine connecting tools and removing manual work with AI-powered steps.',
  alternates: { canonical: '/projects/workflowx-engine' },
  openGraph: {
    title: 'WorkflowX Engine | AI Insider',
    description:
      'Workflow automation engine connecting tools and removing manual work with AI-powered steps.',
    url: '/projects/workflowx-engine',
    type: 'article',
  },
};

export default function WorkflowXEngineLayout({ children }: { children: React.ReactNode }) {
  return children;
}

