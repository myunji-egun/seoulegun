import { clinicInfo } from '@/data/clinic-info'

export function LocalBusinessJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: clinicInfo.name,
    description:
      '수원치과 서울이건치과 - 서울대 출신 대표 원장 2인이 처음 상담부터 치료 마무리까지 책임지고 진료합니다.',
    url: 'https://egundc.com',
    telephone: clinicInfo.phone,
    faxNumber: clinicInfo.fax,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '인계로220번길 6-3 미산빌딩 2층',
      addressLocality: '수원시 영통구',
      addressRegion: '경기도',
      postalCode: '16512',
      addressCountry: 'KR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: clinicInfo.latitude,
      longitude: clinicInfo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Wednesday'],
        opens: '09:30',
        closes: '18:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Thursday',
        opens: '09:30',
        closes: '20:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Friday'],
        opens: '09:30',
        closes: '20:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:30',
        closes: '13:30',
      },
    ],
    sameAs: [
      clinicInfo.socialLinks.blog,
      clinicInfo.socialLinks.youtube,
      clinicInfo.socialLinks.naverPlace,
    ],
    medicalSpecialty: [
      'Dental Implant',
      'Orthodontics',
      'Cosmetic Dentistry',
      'Pediatric Dentistry',
      'Endodontics',
    ],
    priceRange: '$$',
    image: 'https://egundc.com/images/logo/egun-logo%20(1).png',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FaqJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[]
}) {
  if (faqs.length === 0) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
