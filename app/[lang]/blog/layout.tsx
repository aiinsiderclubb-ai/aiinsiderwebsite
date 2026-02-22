import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const path = '/blog';

  const title = lang === 'en' ? 'AI Automation Blog' : 'Блог про AI автоматизацію';
  const titleWithBrand = `${title} | AI Insider`;
  const description =
    lang === 'en'
      ? 'Practical B2B playbooks on AI automation, chatbots, voice agents, and integrations — focused on measurable results.'
      : 'Практичні B2B‑матеріали про AI‑автоматизацію, чатботи, голосові агенти та інтеграції — з фокусом на вимірювані результати.';

  const keywords =
    lang === 'en'
      ? [
          'AI automation blog',
          'AI chatbots for business',
          'AI voice agents',
          'workflow automation',
          'lead generation automation',
          'CRM automation',
        ]
      : [
          'блог про AI автоматизацію',
          'AI чатботи для бізнесу',
          'AI голосові агенти',
          'workflow автоматизація',
          'автоматизація лідогенерації',
          'автоматизація CRM',
        ];

  return {
    title: titleWithBrand,
    description,
    keywords,
    alternates: {
      canonical: withLang(lang, path),
      languages: buildHreflang(path),
    },
    openGraph: {
      title: titleWithBrand,
      description,
      url: withLang(lang, path),
      type: 'website',
      locale: lang === 'en' ? 'en_US' : 'uk_UA',
      images: ['/opengraph-image'],
    },
    twitter: {
      card: 'summary_large_image',
      title: titleWithBrand,
      description,
      images: ['/twitter-image'],
    },
  };
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}

