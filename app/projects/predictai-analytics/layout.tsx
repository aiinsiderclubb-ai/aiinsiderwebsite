import type { Metadata } from 'next';
import { buildPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'PredictAI Analytics | AI Insider',
  description:
    'PredictAI Analytics — predictive insights and AI analytics dashboards to understand trends and drive better decisions.',
  canonical: '/projects/predictai-analytics',
  type: 'article',
});

export default function PredictAiAnalyticsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

