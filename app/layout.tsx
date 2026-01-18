import React from "react"
import type { Metadata, Viewport } from 'next'
import { Cairo } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from '@/components/providers'
import './globals.css'

const cairo = Cairo({ 
  subsets: ["latin", "arabic"],
  variable: '--font-cairo'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://napoli-ovens.com'),
  title: {
    default: 'Napoli Refractory Ovens | Premium Stone & Pizza Ovens | أفران نابولي الحرارية',
    template: '%s | Napoli Refractory Ovens',
  },
  description: 'Leading manufacturer of premium refractory ovens in the Middle East. Titan, StoneFire, and Royal Flame series with up to 10-year warranty. Professional pizza ovens, stone ovens, and smokers for restaurants, hotels, and homes. أفران حرارية فاخرة للاستخدام المهني والمنزلي في الخليج العربي.',
  generator: 'v0.app',
  keywords: [
    'refractory ovens', 'pizza ovens', 'stone ovens', 'wood-fired ovens', 'brick ovens',
    'commercial ovens', 'outdoor kitchen', 'BBQ smokers', 'restaurant ovens',
    'أفران حرارية', 'أفران بيتزا', 'أفران حجرية', 'أفران خارجية', 'مطابخ خارجية',
    'أفران مطاعم', 'أفران فنادق', 'أفران الحطب', 'مدخنة لحم',
    'Saudi Arabia ovens', 'UAE ovens', 'Kuwait ovens', 'Qatar ovens', 'Bahrain ovens',
    'Titan ovens', 'StoneFire ovens', 'Royal Flame ovens'
  ],
  authors: [{ name: 'Napoli Refractory Ovens', url: 'https://napoli-ovens.com' }],
  creator: 'Napoli Refractory Ovens',
  publisher: 'Napoli Refractory Ovens',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'ar': '/ar',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_SA',
    url: 'https://napoli-ovens.com',
    siteName: 'Napoli Refractory Ovens',
    title: 'Napoli Refractory Ovens | Premium Stone & Pizza Ovens',
    description: 'Leading manufacturer of premium refractory ovens in the Middle East. Professional pizza ovens, stone ovens, and smokers with up to 10-year warranty.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Napoli Refractory Ovens - Premium Stone & Pizza Ovens',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Napoli Refractory Ovens | Premium Stone & Pizza Ovens',
    description: 'Leading manufacturer of premium refractory ovens in the Middle East. Professional pizza ovens with up to 10-year warranty.',
    images: ['/images/og-image.jpg'],
    creator: '@napoliovens',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'business',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#2c2c2c',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${cairo.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
