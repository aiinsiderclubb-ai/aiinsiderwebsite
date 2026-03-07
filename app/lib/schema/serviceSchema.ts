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
