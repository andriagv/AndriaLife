import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  try {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/admin/'],
      },
      sitemap: 'https://andria.life/sitemap.xml',
    }
  } catch (error) {
    console.error('Error generating robots.txt:', error)
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
    }
  }
}
