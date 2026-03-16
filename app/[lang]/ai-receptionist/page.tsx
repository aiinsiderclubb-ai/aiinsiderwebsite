import SeoServiceLanding from '@/app/components/SeoServiceLanding';

type Params = { lang: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { lang } = await params;
  return <SeoServiceLanding lang={lang} slug="ai-receptionist" />;
}
