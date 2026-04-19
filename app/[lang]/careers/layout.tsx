import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';
import { buildPageMetadata } from '@/app/lib/metadata';
import { getSiteUrl, SITE_NAME } from '@/app/lib/site';

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const path = '/careers';
  const isEn = lang === 'en';

  const title = isEn
    ? 'Careers — AI Creator & n8n Developer | AI Insider'
    : 'Вакансії — AI Creator та n8n Developer | AI Insider';

  const description = isEn
    ? 'Join AI Insider: open positions for AI Creator and n8n Developer. Remote, fast team, competitive pay in USD/EUR/crypto, bonuses for results.'
    : 'Приєднуйся до AI Insider: відкриті вакансії AI Creator і n8n Developer. Віддалено, швидка команда, конкурентна оплата в USD/EUR/крипті, бонуси за результат.';

  return buildPageMetadata({
    title,
    description,
    keywords: isEn
      ? ['careers', 'AI jobs', 'n8n developer', 'AI creator', 'remote AI jobs', 'content creator']
      : ['вакансії', 'AI робота', 'n8n розробник', 'AI креатор', 'віддалена робота', 'контент креатор'],
    canonical: withLang(lang, path),
    languages: buildHreflang(path),
    lang,
  });
}

export default async function CareersLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<Params>;
}) {
  const { lang } = await params;
  if (!isSupportedLang(lang)) return children;

  const siteUrl = getSiteUrl();
  const isEn = lang === 'en';

  const postings = [
    {
      title: isEn ? 'AI Creator' : 'AI Creator',
      description: isEn
        ? 'Create content with AI — videos, posts, visuals, scripts. Turn boring briefs into viral creatives.'
        : 'Створюй контент за допомогою AI — відео, пости, візуали, сценарії. Перетворюй нудні брифи на вірусні креативи.',
      employmentType: 'FULL_TIME',
      url: new URL(withLang(lang, '/careers#ai-creator'), siteUrl).toString(),
    },
    {
      title: isEn ? 'n8n Developer (AI Automation)' : 'n8n Developer (AI Automation)',
      description: isEn
        ? 'Build n8n workflow automations for clients: CRM, messengers, AI agents, voice. Code when needed.'
        : 'Будуй workflow‑автоматизації на n8n для клієнтів: CRM, месенджери, AI‑агенти, voice.',
      employmentType: 'FULL_TIME',
      url: new URL(withLang(lang, '/careers#n8n-developer'), siteUrl).toString(),
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': postings.map((p) => ({
      '@type': 'JobPosting',
      title: p.title,
      description: p.description,
      employmentType: p.employmentType,
      datePosted: new Date().toISOString().slice(0, 10),
      validThrough: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      url: p.url,
      hiringOrganization: {
        '@type': 'Organization',
        name: SITE_NAME,
        sameAs: siteUrl.origin,
      },
      jobLocationType: 'TELECOMMUTE',
      applicantLocationRequirements: { '@type': 'Country', name: 'Anywhere' },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
