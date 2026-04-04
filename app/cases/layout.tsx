import type { Metadata } from 'next';
import { buildPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Cases',
  description:
    'Real AI automation cases with measurable business results — chatbots, voice agents and workflow automation.',
  canonical: '/cases',
});

export default function CasesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

