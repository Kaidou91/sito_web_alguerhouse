export function HotelJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: 'Alguer House Experience',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lungomare Dante 12',
      addressLocality: 'Alghero',
      addressRegion: 'SS',
      addressCountry: 'IT'
    },
    url: 'https://alguer.house',
    telephone: '+39 079 123456'
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(data)}} />;
}
