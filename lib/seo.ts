import type { Metadata } from 'next';

export const SITE_URL = 'https://muassis.org';

const baseOpenGraph = {
  siteName: 'Mu’assis',
  locale: 'en_AU',
  type: 'website' as const
};

const baseTwitter = {
  card: 'summary_large_image' as const,
  creator: '@muassis_org'
};

export const seoPages = {
  home: {
    path: '/',
    title: 'Mu’assis: Muslim Founders Australia',
    description:
      'Mu’assis is a Muslim founders network in Australia uniting Muslims to shape futures — in business, in community, and for the next generation.',
    keywords: [
      'Mu’assis',
      'Muslim founders',
      'Muslim entrepreneurs Australia',
      'Islamic startups',
      'Muslim venture network',
      'Muslim futures'
    ]
  },
  community: {
    path: '/community',
    title: 'Community | Mu’assis: Muslim Founders Australia',
    description:
      'Explore how Mu’assis activates Muslim founders across business, ummah, and next generation futures through shared intelligence and collaborative builds.',
    keywords: [
      'Muslim founders community',
      'Muslim startup collaboration',
      'Australian Muslim professionals',
      'Muslim youth mentorship'
    ]
  },
  join: {
    path: '/join',
    title: 'Join the Mu’assis Muslim Founders Club',
    description:
      'Apply to Mu’assis to connect with Muslim founders shaping futures, access curated circles, and collaborate through our community Slack.',
    keywords: [
      'Join Muslim founders',
      'Muslim entrepreneur network',
      'Mu’assis Slack community',
      'Shape Muslim futures'
    ]
  }
};

export type PageKey = keyof typeof seoPages;

function buildUrl(path: string) {
  return `${SITE_URL}${path === '/' ? '' : path}`;
}

export function createRootMetadata(): Metadata {
  const home = seoPages.home;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: home.title,
      template: '%s | Mu’assis'
    },
    description: home.description,
    keywords: home.keywords,
    openGraph: {
      ...baseOpenGraph,
      title: home.title,
      description: home.description,
      url: buildUrl(home.path)
    },
    twitter: {
      ...baseTwitter,
      title: home.title,
      description: home.description
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export function createPageMetadata(key: PageKey): Metadata {
  const page = seoPages[key];

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: page.path
    },
    openGraph: {
      ...baseOpenGraph,
      title: page.title,
      description: page.description,
      url: buildUrl(page.path)
    },
    twitter: {
      ...baseTwitter,
      title: page.title,
      description: page.description
    }
  };
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: seoPages.home.title,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  missionStatement:
    'A Muslim founders network in Australia uniting Muslims to shape futures — in business, in community, and for the next generation.'
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Mu’assis',
  url: SITE_URL
};
