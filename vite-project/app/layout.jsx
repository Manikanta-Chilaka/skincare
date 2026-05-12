import './globals.css'

export const metadata = {
  title: 'ForHerWellbeing — Science-Backed Holistic Wellness for Women | Dr Raga Deepthi Ediga',
  description:
    'Root-cause nutrition, yoga, and personalised coaching for PCOS, hormonal weight, fertility, thyroid, and gut health. Led by Dr Raga Deepthi Ediga, PhD (Heidelberg University). Serving women in India, UK, Germany, USA, and Australia.',
  keywords:
    'PCOS healing, women nutrition, holistic wellness, Dr Raga Deepthi Ediga, Heidelberg PhD, hormonal health, fertility nutrition, thyroid balance, gut health, Indian women abroad',
  openGraph: {
    title: 'ForHerWellbeing — Holistic Wellness for Women',
    description:
      'Science-backed root-cause care for PCOS, weight, hormones, and fertility. Led by Dr Raga Deepthi Ediga, PhD.',
    url: 'https://www.forherwellbeing.com',
    siteName: 'ForHerWellbeing',
    images: [{ url: '/images/dr-raga.jpg', width: 800, height: 600, alt: 'Dr Raga Deepthi Ediga' }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ForHerWellbeing — Holistic Wellness for Women',
    description: 'Science-backed root-cause care for PCOS, weight, hormones, and fertility.',
    images: ['/images/dr-raga.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
