import type { MetadataRoute } from 'next';

const baseUrl = 'https://muassis.org';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
