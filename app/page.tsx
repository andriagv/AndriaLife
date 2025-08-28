import type { Metadata } from 'next'
import HomePageClient from '@/components/HomePageClient'

export const metadata: Metadata = {
  title: 'Andria Gvaramia - iOS Developer & Mathematician',
  description: 'iOS Developer, Mathematician, and Technology Enthusiast. Specializing in mobile app development, mathematical research, and innovative technology solutions.',
  keywords: ['iOS Developer', 'Mathematician', 'Mobile App Development', 'Swift', 'React Native', 'Mathematics', 'Technology', 'Portfolio'],
  openGraph: {
    title: 'Andria Gvaramia - iOS Developer & Mathematician',
    description: 'iOS Developer, Mathematician, and Technology Enthusiast. Specializing in mobile app development, mathematical research, and innovative technology solutions.',
    url: 'https://andria.life',
    siteName: 'Andria Gvaramia Portfolio',
    images: [
      {
        url: '/photos/me.PNG',
        width: 1200,
        height: 630,
        alt: 'Andria Gvaramia - iOS Developer & Mathematician',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andria Gvaramia - iOS Developer & Mathematician',
    description: 'iOS Developer, Mathematician, and Technology Enthusiast. Specializing in mobile app development, mathematical research, and innovative technology solutions.',
    images: ['/photos/me.PNG'],
  },
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  return <HomePageClient />
}
