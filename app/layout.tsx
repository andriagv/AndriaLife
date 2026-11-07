import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

const SITE_URL = 'https://andria.life'
const TITLE = 'Andria Gvaramia - AI Engineer & Mathematician'
const DESCRIPTION =
  'Portfolio of Andria Gvaramia: AI engineer, mathematics enthusiast and Computer Science student at the Georgian Technical University. LLM agents, voice assistants, iOS apps, hackathons, camps, academic achievements, design and photography.'
const OG_IMAGE = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'Andria Gvaramia - AI Engineer & Mathematician',
}

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: '%s | Andria Gvaramia',
  },
  description: DESCRIPTION,
  keywords: ['Andria Gvaramia', 'AI Engineer', 'LLM', 'LangGraph', 'MCP', 'Voice Assistant', 'iOS Developer', 'Swift', 'SwiftUI', 'Mathematics', 'Georgian Technical University', 'Georgia', 'Portfolio'],
  authors: [{ name: 'Andria Gvaramia', url: SITE_URL }],
  creator: 'Andria Gvaramia',
  publisher: 'Andria Gvaramia',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ka_GE',
    alternateLocale: ['en_US'],
    url: SITE_URL,
    siteName: 'Andria Gvaramia Portfolio',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Andria Gvaramia',
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  jobTitle: 'AI Engineer',
  description: DESCRIPTION,
  // Studies at GTU now, after Kutaisi International University
  affiliation: {
    '@type': 'CollegeOrUniversity',
    name: 'Georgian Technical University',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Kutaisi International University',
  },
  knowsAbout: ['AI agents', 'LLM', 'LangGraph', 'Voice assistants', 'iOS development', 'Swift', 'Mathematics', 'Photography', 'Graphic design'],
  sameAs: [
    'https://github.com/andriagv',
    'https://www.instagram.com/gvaroph/',
    'https://www.facebook.com/andria361791/',
    'https://medium.com/@gvaramiaandria1',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ka" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
