import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

// The site is a single page (categories are client-side state, not separate URLs),
// so only the root URL is listed. Add more entries here if categories ever get real routes.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://andria.life',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
