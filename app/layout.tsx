import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Andria Gvaramia - iOS Developer & Mathematician',
    template: '%s | Andria Gvaramia'
  },
  description: 'iOS Developer, Mathematician, and Technology Enthusiast. Specializing in mobile app development, mathematical research, and innovative technology solutions.',
  keywords: ['iOS Developer', 'Mathematician', 'Mobile App Development', 'Swift', 'React Native', 'Mathematics', 'Technology', 'Portfolio'],
  authors: [{ name: 'Andria Gvaramia' }],
  creator: '@andriagv',
  publisher: 'Andria Gvaramia',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://andrialife.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://andrialife.vercel.app',
    siteName: 'Andria Gvaramia Portfolio',
    title: 'Andria Gvaramia - iOS Developer & Mathematician',
    description: 'iOS Developer, Mathematician, and Technology Enthusiast. Specializing in mobile app development, mathematical research, and innovative technology solutions.',
    images: [
      {
        url: '/photos/me.PNG',
        width: 1200,
        height: 630,
        alt: 'Andria Gvaramia - iOS Developer & Mathematician',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@andriagv',
    creator: '@andriagv',
    title: 'Andria Gvaramia - iOS Developer & Mathematician',
    description: 'iOS Developer, Mathematician, and Technology Enthusiast. Specializing in mobile app development, mathematical research, and innovative technology solutions.',
    images: ['/photos/me.PNG'],
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/photos/me.PNG" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/photos/me.PNG" as="image" type="image/png" />
        <link rel="preload" href="https://buildmyagent.io/widget/68aff2d26d39689687c858a6/widget-professional.js" as="script" />
        
        {/* Preload critical CSS */}
        <link rel="preload" href="/globals.css" as="style" />
      </head>
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
