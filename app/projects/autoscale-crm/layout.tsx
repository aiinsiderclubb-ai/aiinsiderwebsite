import type { Metadata } from 'next';
import { buildPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'AutoScale CRM | AI Insider',
  description:
    'AutoScale CRM — end-to-end sales automation pipeline with CRM integrations, lead qualification and workflow orchestration.',
  canonical: '/projects/autoscale-crm',
  type: 'article',
});

export default function AutoScaleCrmLayout({ children }: { children: React.ReactNode }) {
  return children;
}

