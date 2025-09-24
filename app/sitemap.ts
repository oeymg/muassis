import type { MetadataRoute } from 'next';
import { SITE_URL, seoPages } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return Object.values(seoPages).map(({ path }) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified
  }));
}
