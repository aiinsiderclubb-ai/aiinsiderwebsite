import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SupportBot 360',
  description:
    'SupportBot 360 — AI chatbot for customer support, FAQ automation, ticket triage and escalation with analytics dashboard.',
  alternates: { canonical: '/projects/supportbot-360' },
  openGraph: {
    title: 'SupportBot 360 | AI Insider',
    description:
      'AI chatbot for customer support, FAQ automation, ticket triage and escalation with analytics dashboard.',
    url: '/projects/supportbot-360',
    type: 'article',
  },
};

export default function SupportBot360Layout({ children }: { children: React.ReactNode }) {
  return children;
}

