import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AutoScale CRM',
  description:
    'AutoScale CRM — end-to-end sales automation pipeline with CRM integrations, lead qualification and workflow orchestration.',
  alternates: { canonical: '/projects/autoscale-crm' },
  openGraph: {
    title: 'AutoScale CRM | AI Insider',
    description:
      'End-to-end sales automation pipeline with CRM integrations, lead qualification and workflow orchestration.',
    url: '/projects/autoscale-crm',
    type: 'article',
  },
};

export default function AutoScaleCrmLayout({ children }: { children: React.ReactNode }) {
  return children;
}

