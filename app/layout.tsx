import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './globals.css';
import ChatWidget from './components/ChatWidget';
import { ChatProvider } from './context/ChatContext';
import { LanguageProvider } from './context/LanguageContext';
import { DEFAULT_DESCRIPTION, DEFAULT_KEYWORDS, DEFAULT_TITLE, getSiteUrl, SITE_NAME, TITLE_TEMPLATE } from './lib/site';

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: DEFAULT_TITLE,
    template: TITLE_TEMPLATE,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: 'FssjOblx7nbHTbP51suqX3HfaMfuP20-RqLJMYnw6sc',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteUrl = getSiteUrl();
  const hdrs = await headers();
  const langHeader = hdrs.get('x-aiinsider-lang');
  const lang = langHeader === 'en' || langHeader === 'uk' ? langHeader : 'uk';

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}#organization`,
    name: SITE_NAME,
    url: siteUrl.toString(),
    description: DEFAULT_DESCRIPTION,
    areaServed: [
      { '@type': 'Country', name: 'Switzerland' },
      { '@type': 'Continent', name: 'Europe' },
      { '@type': 'Country', name: 'United States' },
    ],
    knowsAbout: [
      'AI automation',
      'AI chatbots',
      'AI voice agents',
      'Workflow automation',
      'Lead generation automation',
      'CRM automation',
    ],
    sameAs: [
      'https://t.me/aiinsider',
      'https://youtube.com/@aiinsider',
      'https://linkedin.com/company/aiinsider',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@aiinsider.com',
      contactType: 'sales',
      availableLanguage: ['English', 'Ukrainian'],
    },
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}#website`,
    name: SITE_NAME,
    url: siteUrl.toString(),
    inLanguage: ['en', 'uk'],
    publisher: { '@id': `${siteUrl}#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}${lang === 'en' ? '/en' : '/uk'}/cases?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <LanguageProvider initialLang={lang}>
          <ChatProvider>
            {children}
            <ChatWidget />
          </ChatProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
