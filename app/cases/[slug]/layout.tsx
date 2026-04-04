import type { Metadata } from 'next';
import { getCaseBySlug, getLocalizedText } from '@/app/lib/casesData';
import { buildHreflang } from '@/app/lib/i18n';
import { buildPageMetadata } from '@/app/lib/metadata';

type SegmentParams = { slug: string };

export async function generateMetadata({ params }: { params: Promise<SegmentParams> }): Promise<Metadata> {
  const { slug } = await params;
  const caseData = getCaseBySlug(slug);

  if (!caseData) {
    return {
      title: 'Case',
      alternates: { canonical: `/cases/${slug}` },
      robots: { index: false, follow: false },
    };
  }

  const title = getLocalizedText(caseData.title, 'uk');
  const description = getLocalizedText(caseData.shortDescription, 'uk');

  return buildPageMetadata({
    title: `${title} | AI Insider`,
    description,
    canonical: `/uk/cases/${caseData.slug}`,
    languages: buildHreflang(`/cases/${caseData.slug}`),
    lang: 'uk',
    type: 'article',
  });
}

export default function CaseSlugLayout({ children }: { children: React.ReactNode }) {
  return children;
}
