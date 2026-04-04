import type { Metadata } from 'next';
import { buildPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'VoiceFlow Pro | AI Insider',
  description:
    'VoiceFlow Pro — AI voice agent for handling incoming calls with natural speech, CRM logging and analytics.',
  canonical: '/projects/voiceflow-pro',
  type: 'article',
});

export default function VoiceflowProLayout({ children }: { children: React.ReactNode }) {
  return children;
}

