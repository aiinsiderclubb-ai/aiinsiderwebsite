import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MeetingMaster AI',
  description:
    'MeetingMaster AI — meeting automation with summaries, action items, follow-ups and CRM sync.',
  alternates: { canonical: '/projects/meetingmaster-ai' },
  openGraph: {
    title: 'MeetingMaster AI | AI Insider',
    description:
      'Meeting automation with summaries, action items, follow-ups and CRM sync.',
    url: '/projects/meetingmaster-ai',
    type: 'article',
  },
};

export default function MeetingMasterAiLayout({ children }: { children: React.ReactNode }) {
  return children;
}

