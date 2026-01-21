import type { Metadata } from 'next';
import { getCaseBySlug, getLocalizedText } from '@/app/lib/casesData';

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

  // Default to Ukrainian text for SEO (site renders uk by default)
  const title = getLocalizedText(caseData.title, 'uk');
  const description = getLocalizedText(caseData.shortDescription, 'uk');

  return {
    title,
    description,
    alternates: {
      canonical: `/cases/${caseData.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/cases/${caseData.slug}`,
      type: 'article',
    },
    twitter: {
      title,
      description,
    },
  };
}

export default function CaseSlugLayout({ children }: { children: React.ReactNode; params: Promise<SegmentParams> }) {
  return children;
}

