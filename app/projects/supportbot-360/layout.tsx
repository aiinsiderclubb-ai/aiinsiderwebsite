import type { Metadata } from 'next';
import { buildPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'SupportBot 360 | AI Insider',
  description:
    'SupportBot 360 — AI chatbot for customer support, FAQ automation, ticket triage and escalation with analytics dashboard.',
  canonical: '/projects/supportbot-360',
  type: 'article',
});

export default function SupportBot360Layout({ children }: { children: React.ReactNode }) {
  return children;
}

