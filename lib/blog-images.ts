export interface BlogImage {
  src: string;
  alt: string;
}

export const blogImagePool: BlogImage[] = [
  {
    src: '/TAQ03301.jpg',
    alt: 'Founder working session at a studio table.'
  },
  {
    src: '/TAQ03303.jpg',
    alt: 'Team collaboration in a workshop setting.'
  },
  {
    src: '/TAQ03309.jpg',
    alt: 'Focused planning moment with notes and devices.'
  },
  {
    src: '/TAQ03313.jpg',
    alt: 'Group discussion with laptops and notebooks.'
  },
  {
    src: '/TAQ03342.jpg',
    alt: 'Close-up of hands and planning materials.'
  },
  {
    src: '/TAQ03351.jpg',
    alt: 'Creative workspace with team members in motion.'
  },
  {
    src: '/TAQ03371.jpg',
    alt: 'Founder presenting ideas to a small team.'
  },
  {
    src: '/TAQ03384.jpg',
    alt: 'Strategy session with documents and devices.'
  },
  {
    src: '/TAQ03406.jpg',
    alt: 'Focused founder conversation in a workshop.'
  },
  {
    src: '/hero.jpg',
    alt: "Mu'assis community gathering with founders."
  }
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function getBlogImageByIndex(index: number): BlogImage {
  return blogImagePool[index % blogImagePool.length];
}

export function getBlogImageBySlug(slug: string): BlogImage {
  const hash = hashString(slug);
  return blogImagePool[hash % blogImagePool.length];
}

export function createBlogImageMap(slugs: string[]): Map<string, BlogImage> {
  const sorted = [...slugs].sort((a, b) => a.localeCompare(b));
  const map = new Map<string, BlogImage>();

  sorted.forEach((slug, index) => {
    map.set(slug, getBlogImageByIndex(index));
  });

  return map;
}
