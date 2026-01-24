import type { Metadata } from 'next';
import { Language } from '@/app/lib/translations';
import { withLang, buildHreflang } from '@/app/lib/i18n';

type SegmentParams = { lang: Language };

const path = '/solutions/real-estate';

const meta = {
  uk: {
    title: 'AI рішення для нерухомості',
    description:
      'Готові AI-рішення для агенцій нерухомості: автоматизація операцій, аналітика для власника, голосові агенти та CRM-інтеграції.',
  },
  en: {
    title: 'AI Solutions for Real Estate',
    description:
      'Ready-to-deploy AI solutions for real estate agencies: operations automation, owner analytics, voice agents, and CRM integrations.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<SegmentParams>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { title, description } = meta[lang] || meta.en;

  return {
    title,
    description,
    keywords: [
      'AI real estate',
      'real estate automation',
      'AI voice agent real estate',
      'CRM automation',
      'realtor productivity',
      'real estate analytics',
      'ШІ нерухомість',
      'автоматизація нерухомості',
    ],
    alternates: {
      canonical: withLang(lang, path),
      languages: buildHreflang(path),
    },
    openGraph: {
      title,
      description,
      url: withLang(lang, path),
      type: 'website',
    },
    twitter: {
      title,
      description,
    },
  };
}

export default function RealEstateSolutionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
