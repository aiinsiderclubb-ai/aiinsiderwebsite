import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PredictAI Analytics',
  description:
    'PredictAI Analytics — predictive insights and AI analytics dashboards to understand trends and drive better decisions.',
  alternates: { canonical: '/projects/predictai-analytics' },
  openGraph: {
    title: 'PredictAI Analytics | AI Insider',
    description:
      'Predictive insights and AI analytics dashboards to understand trends and drive better decisions.',
    url: '/projects/predictai-analytics',
    type: 'article',
  },
};

export default function PredictAiAnalyticsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

