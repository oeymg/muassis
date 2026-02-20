import type { MetadataRoute } from 'next';
import { SITE_URL, seoPages } from '@/lib/seo';
import { BlogNotFoundError, getBlogPostSummaries } from '@/lib/blog';
import { getSpotlightEntries, SpotlightNotFoundError } from '@/lib/spotlight';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = Object.values(seoPages).map(({ path }) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified
  }));

  let spotlightRoutes: MetadataRoute.Sitemap = [];
  try {
    const spotlights = await getSpotlightEntries();

    spotlightRoutes = spotlights.map((entry) => ({
      url: `${SITE_URL}${entry.href}`,
      lastModified: entry.frontmatter.publishedAt
        ? new Date(entry.frontmatter.publishedAt)
        : lastModified
    }));
  } catch (error) {
    if (error instanceof SpotlightNotFoundError) {
      spotlightRoutes = [];
    } else {
      throw error;
    }
  }

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPostSummaries();
    blogRoutes = posts.map((post) => ({
      url: `${SITE_URL}${post.href}`,
      lastModified: new Date(post.updatedAt)
    }));
  } catch (error) {
    if (error instanceof BlogNotFoundError) {
      blogRoutes = [];
    } else {
      throw error;
    }
  }

  return [...staticRoutes, ...spotlightRoutes, ...blogRoutes];
}
