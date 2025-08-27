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
  creator: 'Andria Gvaramia',
  publisher: 'Andria Gvaramia',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://andrialife.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://andrialife.com',
    title: 'Andria Gvaramia - iOS Developer & Mathematician',
    description: 'iOS Developer, Mathematician, and Technology Enthusiast. Specializing in mobile app development, mathematical research, and innovative technology solutions.',
    siteName: 'Andria Gvaramia Portfolio',
    images: [
      {
        url: '/me.PNG',
        width: 1200,
        height: 630,
        alt: 'Andria Gvaramia - iOS Developer & Mathematician',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andria Gvaramia - iOS Developer & Mathematician',
    description: 'iOS Developer, Mathematician, and Technology Enthusiast. Specializing in mobile app development, mathematical research, and innovative technology solutions.',
    images: ['/me.PNG'],
    creator: '@andriagv',
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
        <link rel="apple-touch-icon" href="/me.PNG" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
