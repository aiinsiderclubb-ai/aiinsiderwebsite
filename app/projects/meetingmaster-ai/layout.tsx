import type { Metadata } from 'next';
import { buildPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'MeetingMaster AI | AI Insider',
  description:
    'MeetingMaster AI — meeting automation with summaries, action items, follow-ups and CRM sync.',
  canonical: '/projects/meetingmaster-ai',
  type: 'article',
});

export default function MeetingMasterAiLayout({ children }: { children: React.ReactNode }) {
  return children;
}

