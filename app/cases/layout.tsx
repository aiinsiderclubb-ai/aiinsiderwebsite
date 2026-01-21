import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cases',
  description:
    'Real AI automation cases with measurable business results — chatbots, voice agents and workflow automation.',
  alternates: {
    canonical: '/cases',
  },
};

export default function CasesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

