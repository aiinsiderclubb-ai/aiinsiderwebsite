import type { Metadata } from 'next';
import { buildPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'WorkflowX Engine | AI Insider',
  description:
    'WorkflowX Engine — workflow automation engine connecting tools and removing manual work with AI-powered steps.',
  canonical: '/projects/workflowx-engine',
  type: 'article',
});

export default function WorkflowXEngineLayout({ children }: { children: React.ReactNode }) {
  return children;
}

