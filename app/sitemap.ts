import type { MetadataRoute } from 'next';
import { SITE_URL, seoPages } from '@/lib/seo';
import { getSpotlightEntries, SpotlightNotFoundError } from '@/lib/spotlight';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = Object.values(seoPages).map(({ path }) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified
  }));

  try {
    const spotlights = await getSpotlightEntries();

    const spotlightRoutes: MetadataRoute.Sitemap = spotlights.map((entry) => ({
      url: `${SITE_URL}${entry.href}`,
      lastModified: entry.frontmatter.publishedAt
        ? new Date(entry.frontmatter.publishedAt)
        : lastModified
    }));

    return [...staticRoutes, ...spotlightRoutes];
  } catch (error) {
    if (error instanceof SpotlightNotFoundError) {
      return staticRoutes;
    }

    throw error;
  }
}
