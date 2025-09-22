import type { MetadataRoute } from 'next';

const baseUrl = 'https://muassis.org';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/community',
    '/join'
  ];

  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified
  }));
}
