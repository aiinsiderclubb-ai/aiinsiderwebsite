import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './globals.css';
import LazyChatWidget from './components/LazyChatWidget';
import { ChatProvider } from './context/ChatContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { DEFAULT_DESCRIPTION, DEFAULT_KEYWORDS, DEFAULT_TITLE, getSiteUrl, SITE_NAME } from './lib/site';

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: DEFAULT_TITLE,
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
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ['/twitter-image'],
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
  const siteOrigin = siteUrl.origin;
  const hdrs = await headers();
  const langHeader = hdrs.get('x-aiinsider-lang');
  const lang = langHeader === 'en' || langHeader === 'uk' ? langHeader : 'uk';

  const localizedDescription =
    lang === 'en'
      ? DEFAULT_DESCRIPTION
      : 'Ми створюємо AI системи, які думають, говорять і діють — чатботи, голосові агенти та автоматизації для бізнесу. Базуємось у Швейцарії, працюємо глобально.';

  const knowsAbout =
    lang === 'en'
      ? [
          'AI automation',
          'AI agents',
          'AI chatbots',
          'AI voice agents',
          'Business process automation',
          'CRM automation',
          'Lead generation automation',
          'n8n automation',
          'AI-driven marketing',
        ]
      : [
          'AI автоматизація',
          'AI агенти',
          'AI чатботи',
          'AI голосові агенти',
          'автоматизація бізнес-процесів',
          'автоматизація CRM',
          'AI лідогенерація',
          'n8n автоматизація',
          'AI-маркетинг',
        ];

  const vladyslavPersonId = `${siteUrl}#vladyslav-archer`;
  const vladyslavImage = new URL('/images/team/hf_20260220_083203_481eab3a-8c9b-4bcf-8416-dc13dd09d3d7.jpeg', siteUrl).toString();

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}#organization`,
    name: SITE_NAME,
    url: siteOrigin,
    description: localizedDescription,
    logo: new URL('/icon.svg', siteUrl).toString(),
    image: vladyslavImage,
    areaServed: [
      { '@type': 'Country', name: 'Switzerland' },
      { '@type': 'Continent', name: 'Europe' },
      { '@type': 'Country', name: 'United States' },
    ],
    knowsAbout,
    founder: { '@id': vladyslavPersonId },
    sameAs: [
      'https://t.me/aiinsider',
      'https://youtube.com/@aiinsider',
      'https://linkedin.com/company/aiinsider',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@aiinsider.it.com',
      contactType: 'sales',
      availableLanguage: ['English', 'Ukrainian'],
    },
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}#website`,
    name: SITE_NAME,
    url: siteOrigin,
    inLanguage: ['en', 'en-US', 'uk', 'uk-UA'],
    publisher: { '@id': `${siteUrl}#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteOrigin}${lang === 'en' ? '/en' : '/uk'}/cases?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const founderPersonJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': vladyslavPersonId,
    name: 'Vladyslav Archer',
    jobTitle: 'CEO',
    image: vladyslavImage,
    url: `${siteOrigin}${lang === 'en' ? '/en' : '/uk'}/about#vladyslav-archer`,
    worksFor: { '@id': `${siteUrl}#organization` },
    sameAs: [
      'https://www.linkedin.com/in/vladyslav-katash/',
      'https://www.instagram.com/vladyslav.archer?igsh=MXc1c3hkODU5dW9hMQ%3D%3D&utm_source=qr',
    ],
  };

  return (
    <html lang={lang === 'uk' ? 'uk-UA' : 'en'} suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function() {
  try {
    var theme = localStorage.getItem('aiinsider-theme');
    document.documentElement.dataset.theme = theme === 'light' ? 'light' : 'dark';
  } catch (e) {
    document.documentElement.dataset.theme = 'dark';
  }
})();`,
          }}
        />
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(founderPersonJsonLd) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <LanguageProvider initialLang={lang}>
          <ThemeProvider>
            <ChatProvider>
              {children}
              <LazyChatWidget />
            </ChatProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
