interface ServiceSchemaInput {
  url: string;
}

export function buildBeautyServiceSchema({ url }: ServiceSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Автоматизація салону краси',
    serviceType: 'AI automation for beauty salons',
    url,
    areaServed: {
      '@type': 'Country',
      name: 'Ukraine',
    },
    provider: {
      '@type': 'Organization',
      name: 'AI Insider',
      url: 'https://www.aiinsider.it.com/uk',
    },
    description:
      'Автоматизація запису, Instagram-лідів, нагадувань, CRM-сегментації та повторних продажів для салонів краси.',
  };
}

export function buildRealEstateServiceSchema({ url }: ServiceSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Автоматизація нерухомості',
    serviceType: 'AI automation for real estate agencies',
    url,
    areaServed: {
      '@type': 'Country',
      name: 'Ukraine',
    },
    provider: {
      '@type': 'Organization',
      name: 'AI Insider',
      url: 'https://www.aiinsider.it.com/uk',
    },
    description:
      'AI-автоматизація для агентств нерухомості: кваліфікація лідів, голосові агенти, CRM-автоматизація та аналітика рекламних каналів.',
  };
}
