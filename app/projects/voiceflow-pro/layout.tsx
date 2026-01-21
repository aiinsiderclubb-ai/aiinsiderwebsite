import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VoiceFlow Pro',
  description:
    'VoiceFlow Pro — AI voice agent for handling incoming calls with natural speech, CRM logging and analytics.',
  alternates: { canonical: '/projects/voiceflow-pro' },
  openGraph: {
    title: 'VoiceFlow Pro | AI Insider',
    description:
      'AI voice agent for handling incoming calls with natural speech, CRM logging and analytics.',
    url: '/projects/voiceflow-pro',
    type: 'article',
  },
};

export default function VoiceflowProLayout({ children }: { children: React.ReactNode }) {
  return children;
}

