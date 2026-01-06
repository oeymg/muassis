import type { Metadata } from 'next';

export const SITE_URL = 'https://muassis.org';

const DEFAULT_SOCIAL_IMAGE = '/social/muassis-default.png';

const baseOpenGraph = {
  siteName: "Mu'assis",
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
    title: "Mu'assis: Muslim Founders Australia",
    description:
      "Mu'assis is a Muslim founders network in Australia uniting Muslims to shape futures — in business, in community, and for the next generation. Looking for a Muslim startup accelerator in Australia? Mu'assis connects entrepreneurs through mentorship, community, and values-driven programs.",
    keywords: [
      "Muslim startup accelerator Australia",
      "Muslim entrepreneur network",
      "Islamic values in business",
      "Muslim innovation hub",
      "Faith-driven founders",
      "Startup incubator for Muslims",
      "Mu’assis community"
    ]
  },
  community: {
    path: '/community',
    title: "Community | Mu'assis: Muslim Founders Australia",
    description:
      "Explore how Mu'assis activates Muslim founders across business, ummah, and next generation futures through shared intelligence and collaborative builds. Want to join a faith-based mentorship and networking platform? Our community supports entrepreneurs with peer collaboration and shared values.",
    keywords: [
      "Muslim networking platform",
      "Faith-based mentorship",
      "Founder collaboration Australia",
      "Muslim professional network",
      "Peer-to-peer support for entrepreneurs",
      "Startup ecosystem for Muslims",
      "Entrepreneur community with values"
    ]
  },
  team: {
    path: '/advisors',
    title: "Team | Mu'assis: Muslim Founders Australia",
    description:
      "Meet the Mu'assis team stewarding our mission — from the founder to partners guiding strategy, capital growth, and long-term stewardship. Discover the people turning values into ventures.",
    keywords: [
      "Mu’assis team",
      "Muslim founders leadership",
      "Islamic startup mentors",
      "Faith-led business advisors",
      "Purpose-driven strategic partners",
      "Muslim entrepreneur support",
      "Values-aligned founder network"
    ]
  },
  pathways: {
    path: '/pathways',
    title: "Mu'assis Pathways | Values-Aligned Hiring & Careers",
    description:
      "Mu'assis Pathways connects values-led Muslim founders and operators with open roles, curated intros, and job-ready support. Whether you are hiring or exploring your next move, share your brief and we will match you with aligned talent or opportunities.",
    keywords: [
      "Muslim job board Australia",
      "Faith-aligned hiring platform",
      "Values-led talent matching",
      "Islamic careers network",
      "Hire Muslim founders and operators",
      "Career pathways for Muslim professionals",
      "Mu’assis job pathways"
    ]
  },
  spotlight: {
    path: '/Spotlight',
    title: "Founder Spotlight | Mu'assis: Muslim Founders Australia",
    description:
      "Founder spotlights from the Mu'assis network — stories of Muslim founders giving back, leading with hikmah, and building with mutual respect. Curious about inspiring Muslim entrepreneur journeys? Discover leadership and wisdom through our featured founder stories.",
    keywords: [
      "Muslim founder stories",
      "Islamic leadership in business",
      "Case studies of Muslim startups",
      "Values-led entrepreneurship",
      "Muslim innovation journeys",
      "Entrepreneurial wisdom (hikmah)",
      "Mu’assis spotlight series"
    ]
  },
  join: {
    path: '/join',
    title: "Join the Mu'assis Muslim Founders Club",
    description:
      "Apply to Mu'assis to connect with Muslim founders shaping futures, access curated circles, and collaborate through our community Slack. Looking to become part of a supportive Muslim founders program? Join us to access mentorship, networking, and growth opportunities tailored for Muslim entrepreneurs.",
    keywords: [
      "Apply to Muslim accelerator",
      "Join startup incubator",
      "Membership for Muslim entrepreneurs",
      "Muslim founders program Australia",
      "Startup mentorship network",
      "Faith-rooted business support",
      "Mu’assis accelerator application"
    ]
  },
  events: {
    path: '/events',
    title: "Events | Mu'assis: Muslim Founders Australia",
    description:
      "Discover Mu'assis events designed to help Muslim founders collaborate, access mentorship, and launch impactful solutions. Join build sprints, pitch sessions, and community gatherings crafted for values-led entrepreneurs.",
    keywords: [
      "Muslim founders events",
      "Startup workshops for Muslims",
      "Faith-led innovation sessions",
      "Entrepreneur build sprint",
      "Muslim business community events",
      "Mentorship events for Muslim startups",
      "Values-driven startup programming"
    ]
  },
  launchpad: {
    path: '/launchpad',
    title: "Launchpad | Mu'assis: Professional Incubator for Purpose-Driven Founders",
    description:
      "Mu'assis Launchpad is Australia's first Muslim-led incubator designed to professionalize ethical entrepreneurship. We bridge the gap between having a good idea and running a legally robust, investor-ready company. Join our 3-month hybrid program launching in 2026.",
    keywords: [
      "Muslim startup incubator Australia",
      "Ethical entrepreneurship program",
      "Purpose-driven founder accelerator",
      "Startup governance and structure",
      "Muslim-led business incubator",
      "Investor-ready startup program",
      "Mu'assis Launchpad 2026"
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
      url: buildUrl(home.path),
      images: [
        {
          url: buildUrl(DEFAULT_SOCIAL_IMAGE),
          alt: "Mu'assis default social graphic"
        }
      ]
    },
    twitter: {
      ...baseTwitter,
      title: home.title,
      description: home.description,
      images: [buildUrl(DEFAULT_SOCIAL_IMAGE)]
    },
    robots: {
      index: true,
      follow: true
    },
    alternates: {
      canonical: SITE_URL
    },
    icons: {
      icon: [
        { url: '/logo.svg', type: 'image/svg+xml' }
      ],
      shortcut: '/logo.svg',
      apple: '/logo.svg'
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
      canonical: buildUrl(page.path)
    },
    openGraph: {
      ...baseOpenGraph,
      title: page.title,
      description: page.description,
      url: buildUrl(page.path),
      images: [
        {
          url: buildUrl(DEFAULT_SOCIAL_IMAGE),
          alt: "Mu'assis default social graphic"
        }
      ]
    },
    twitter: {
      ...baseTwitter,
      title: page.title,
      description: page.description,
      images: [buildUrl(DEFAULT_SOCIAL_IMAGE)]
    }
  };
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: seoPages.home.title,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  missionStatement:
    'A Muslim founders network in Australia uniting Muslims to shape futures — in business, in community, and for the next generation.'
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Mu’assis',
  url: SITE_URL
};
