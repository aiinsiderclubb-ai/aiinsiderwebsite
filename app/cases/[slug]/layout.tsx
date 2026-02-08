import type { Metadata } from 'next';
import { getCaseBySlug, getLocalizedText } from '@/app/lib/casesData';
import { buildHreflang } from '@/app/lib/i18n';

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

  return {
    title,
    description,
    alternates: {
      canonical: `/uk/cases/${caseData.slug}`,
      languages: buildHreflang(`/cases/${caseData.slug}`),
    },
    openGraph: {
      title: `${title} | AI Insider`,
      description,
      url: `/uk/cases/${caseData.slug}`,
      type: 'article',
    },
    twitter: {
      title: `${title} | AI Insider`,
      description,
    },
  };
}

export default function CaseSlugLayout({ children }: { children: React.ReactNode }) {
  return children;
}
