'use client'

import { useLanguage } from '@/lib/language-context'

export function StructuredData() {
  const { language } = useLanguage()
  
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Napoli Refractory Ovens',
    alternateName: 'أفران نابولي الحرارية',
    url: 'https://napoli-ovens.com',
    logo: 'https://napoli-ovens.com/images/logo.svg',
    description: language === 'ar' 
      ? 'الشركة الرائدة في تصنيع الأفران الحرارية الفاخرة في الشرق الأوسط'
      : 'Leading manufacturer of premium refractory ovens in the Middle East',
    foundingDate: '2010',
    areaServed: [
      { '@type': 'Country', name: 'Saudi Arabia' },
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Kuwait' },
      { '@type': 'Country', name: 'Qatar' },
      { '@type': 'Country', name: 'Bahrain' },
      { '@type': 'Country', name: 'Oman' },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+966-XX-XXX-XXXX',
      contactType: 'sales',
      availableLanguage: ['English', 'Arabic'],
      areaServed: 'Middle East',
    },
    sameAs: [
      'https://www.instagram.com/napoliovens',
      'https://www.facebook.com/napoliovens',
      'https://wa.me/966XXXXXXXXX',
    ],
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://napoli-ovens.com/#business',
    name: 'Napoli Refractory Ovens',
    alternateName: 'أفران نابولي الحرارية',
    image: 'https://napoli-ovens.com/images/ovens/oven-1.jpg',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'SA',
      addressRegion: 'Riyadh',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 24.7136,
      longitude: 46.6753,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    telephone: '+966-XX-XXX-XXXX',
    url: 'https://napoli-ovens.com',
  }

  const productSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Titan Series Refractory Oven',
      description: 'Professional-grade refractory oven with iron stone interior and 3-year warranty. Perfect for restaurants and commercial use.',
      brand: {
        '@type': 'Brand',
        name: 'Napoli',
      },
      category: 'Kitchen Equipment',
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'SAR',
        priceValidUntil: '2027-12-31',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '124',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'StoneFire Series Refractory Oven',
      description: 'Premium refractory oven with rectangular stone interior and 10-year warranty. Ideal for professional kitchens and outdoor installations.',
      brand: {
        '@type': 'Brand',
        name: 'Napoli',
      },
      category: 'Kitchen Equipment',
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'SAR',
        priceValidUntil: '2027-12-31',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '89',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Royal Flame Series Refractory Oven',
      description: 'Luxury refractory oven with circular stone interior and 10-year warranty. The ultimate choice for discerning chefs and premium establishments.',
      brand: {
        '@type': 'Brand',
        name: 'Napoli',
      },
      category: 'Kitchen Equipment',
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'SAR',
        priceValidUntil: '2027-12-31',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '67',
      },
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the warranty on Napoli ovens?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Napoli offers warranties ranging from 3 to 10 years depending on the series. Titan and Titan Pro series come with 3-year warranty, while both StoneFire and Royal Flame series come with an industry-leading 10-year warranty.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you deliver to all GCC countries?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Napoli Refractory Ovens delivers to all GCC countries including Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, and Oman. We also offer professional installation services.',
        },
      },
      {
        '@type': 'Question',
        name: 'What types of ovens does Napoli manufacture?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Napoli manufactures premium refractory ovens including pizza ovens, stone ovens, and wood-fired ovens. We also offer smokers and a range of accessories. Our product lines include Titan, Titan Pro, StoneFire, and Royal Flame series.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are Napoli ovens suitable for commercial use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! Napoli ovens are designed for both commercial and residential use. Our ovens are used by restaurants, hotels, bakeries, and sports clubs across the Middle East.',
        },
      },
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://napoli-ovens.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Ovens',
        item: 'https://napoli-ovens.com/#ovens',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Contact',
        item: 'https://napoli-ovens.com/#contact',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {productSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
