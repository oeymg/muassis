import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import imageSize from 'image-size';

const SPOTLIGHT_ROOT = path.join(process.cwd(), 'public', 'Spotlight');
const POST_DIRNAME = 'Post';
const POST_FILENAME = 'index.md';
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png'] as const;

type RawFrontmatter = Record<string, unknown>;

export interface SpotlightFrontmatter {
  founder: string;
  company: string;
  description?: string;
  tagline?: string;
  quote?: string;
  publishedAt?: string;
  heroAlt?: string;
  secondaryAlt?: string;
  eventAlt?: string;
  metaDescription?: string;
}

export interface SpotlightImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface SpotlightSummary {
  slug: string;
  founder: string;
  company: string;
  description: string;
  tagline?: string;
  href: string;
  heroImage: SpotlightImage;
}

export interface SpotlightEntry extends SpotlightSummary {
  content: string;
  frontmatter: SpotlightFrontmatter;
  secondaryImage?: SpotlightImage;
  eventImage?: SpotlightImage;
  dirName: string;
}

interface SpotlightDirectory {
  slug: string;
  dirName: string;
}

class SpotlightNotFoundError extends Error {}

function ensureSpotlightRoot(): Promise<void> {
  return fs.access(SPOTLIGHT_ROOT).catch(() => {
    throw new SpotlightNotFoundError('Spotlight content directory not found.');
  });
}

async function readSpotlightDirectories(): Promise<SpotlightDirectory[]> {
  await ensureSpotlightRoot();

  const dirents = await fs.readdir(SPOTLIGHT_ROOT, { withFileTypes: true });

  return dirents
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => ({
      slug: dirent.name.toLowerCase(),
      dirName: dirent.name
    }));
}

function normalizeStringField(frontmatter: RawFrontmatter, key: keyof SpotlightFrontmatter, required = false) {
  const value = frontmatter[key];
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed.length > 0) {
      return trimmed;
    }
  }

  if (required) {
    throw new Error(`Missing required frontmatter field: ${String(key)}`);
  }

  return undefined;
}

function parseFrontmatter(raw: RawFrontmatter): SpotlightFrontmatter {
  const founder = normalizeStringField(raw, 'founder', true)!;
  const company = normalizeStringField(raw, 'company', true)!;

  return {
    founder,
    company,
    description: normalizeStringField(raw, 'description'),
    tagline: normalizeStringField(raw, 'tagline'),
    quote: normalizeStringField(raw, 'quote'),
    publishedAt: normalizeStringField(raw, 'publishedAt'),
    heroAlt: normalizeStringField(raw, 'heroAlt'),
    secondaryAlt: normalizeStringField(raw, 'secondaryAlt'),
    eventAlt: normalizeStringField(raw, 'eventAlt'),
    metaDescription: normalizeStringField(raw, 'metaDescription')
  };
}

async function pathExists(targetPath: string): Promise<boolean> {
  try {
    await fs.access(targetPath);
    return true;
  } catch (error) {
    return false;
  }
}

async function resolveImage(dirName: string, slug: string, index: 1 | 2 | 3, alt: string): Promise<SpotlightImage | undefined> {
  const postDir = path.join(SPOTLIGHT_ROOT, dirName, POST_DIRNAME);
  const candidates = buildImageCandidateNames(dirName, slug, index);

  for (const fileName of candidates) {
    const fullPath = path.join(postDir, fileName);
    if (await pathExists(fullPath)) {
      const fileBuffer = await fs.readFile(fullPath);
      const { width, height } = imageSize(fileBuffer);
      return {
        src: buildImageSrc(dirName, fileName),
        width: width ?? 1600,
        height: height ?? 900,
        alt
      };
    }
  }

  return undefined;
}

function buildImageCandidateNames(dirName: string, slug: string, index: number): string[] {
  const normalisedDir = dirName.replace(/\s+/g, '-');
  const altSlug = slug.replace(/\s+/g, '-');
  const extensionVariants = IMAGE_EXTENSIONS.flatMap((extension) => [extension, extension.toUpperCase()]);

  const baseNames = [
    `${slug}-${index}`,
    `${altSlug}-${index}`,
    `${normalisedDir}-${index}`,
    `${dirName}-${index}`,
    `${slug} ${index}`,
    `${altSlug} ${index}`,
    `${dirName} ${index}`,
    `${normalisedDir} ${index}`,
    `${slug}- ${index}`,
    `${altSlug}- ${index}`,
    `${dirName}- ${index}`,
    `${normalisedDir}- ${index}`
  ];

  const candidates: string[] = [];

  for (const base of baseNames) {
    for (const extension of extensionVariants) {
      candidates.push(`${base}${extension}`);
    }
  }

  return candidates;
}

function buildImageSrc(dirName: string, fileName: string): string {
  return `/Spotlight/${encodeURIComponent(dirName).replace(/%2F/g, '/')}/Post/${encodeURIComponent(fileName).replace(/%2F/g, '/')}`;
}

function deriveDescription(frontmatter: SpotlightFrontmatter, content: string): string {
  if (frontmatter.description) {
    return frontmatter.description;
  }

  const lines = content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#') && !line.startsWith('!['));

  return lines[0] ?? `${frontmatter.founder} — ${frontmatter.company}`;
}

function deriveMetaDescription(frontmatter: SpotlightFrontmatter, description: string): string {
  return frontmatter.metaDescription ?? description;
}

function sortEntries(entries: SpotlightEntry[]): SpotlightEntry[] {
  return entries.sort((a, b) => {
    const aDate = a.frontmatter.publishedAt ? Date.parse(a.frontmatter.publishedAt) : NaN;
    const bDate = b.frontmatter.publishedAt ? Date.parse(b.frontmatter.publishedAt) : NaN;

    if (!Number.isNaN(aDate) && !Number.isNaN(bDate)) {
      return bDate - aDate;
    }

    if (!Number.isNaN(aDate)) {
      return -1;
    }

    if (!Number.isNaN(bDate)) {
      return 1;
    }

    return a.company.localeCompare(b.company);
  });
}

async function loadSpotlightEntry(directory: SpotlightDirectory): Promise<SpotlightEntry | undefined> {
  const postPath = path.join(SPOTLIGHT_ROOT, directory.dirName, POST_DIRNAME, POST_FILENAME);
  if (!(await pathExists(postPath))) {
    return undefined;
  }

  const rawFile = await fs.readFile(postPath, 'utf-8');
  const { data, content } = matter(rawFile);
  const frontmatter = parseFrontmatter(data as RawFrontmatter);
  const description = deriveDescription(frontmatter, content);
  const heroImage = await resolveImage(
    directory.dirName,
    directory.slug,
    1,
    frontmatter.heroAlt ?? `${frontmatter.founder} — ${frontmatter.company}`
  );

  if (!heroImage) {
    throw new Error(`Missing hero image for Spotlight entry "${directory.dirName}"`);
  }

  const secondaryImage = await resolveImage(
    directory.dirName,
    directory.slug,
    2,
    frontmatter.secondaryAlt ?? `${frontmatter.company} — secondary`
  );

  const eventImage = await resolveImage(
    directory.dirName,
    directory.slug,
    3,
    frontmatter.eventAlt ?? `${frontmatter.company} — community`
  );

  return {
    slug: directory.slug,
    dirName: directory.dirName,
    founder: frontmatter.founder,
    company: frontmatter.company,
    description,
    tagline: frontmatter.tagline,
    href: `/Spotlight/${directory.slug}`,
    heroImage,
    content: content.trim(),
    frontmatter,
    secondaryImage,
    eventImage
  };
}

export async function getSpotlightEntries(): Promise<SpotlightEntry[]> {
  const directories = await readSpotlightDirectories();

  const entries = await Promise.all(directories.map((directory) => loadSpotlightEntry(directory)));
  const filtered = entries.filter((entry): entry is SpotlightEntry => Boolean(entry));

  return sortEntries(filtered);
}

export async function getSpotlightSummaries(): Promise<SpotlightSummary[]> {
  const entries = await getSpotlightEntries();
  return entries.map(({ dirName: _dirName, secondaryImage: _secondary, eventImage: _event, content: _content, frontmatter, ...summary }) => summary);
}

export async function getSpotlightEntry(slug: string): Promise<SpotlightEntry> {
  const directories = await readSpotlightDirectories();
  const match = directories.find((directory) => directory.slug === slug.toLowerCase());

  if (!match) {
    throw new SpotlightNotFoundError(`Spotlight entry not found for slug: ${slug}`);
  }

  const entry = await loadSpotlightEntry(match);

  if (!entry) {
    throw new SpotlightNotFoundError(`Spotlight entry missing Post/index.md for slug: ${slug}`);
  }

  return entry;
}

export async function getSpotlightMetaDescription(slug: string): Promise<string | undefined> {
  try {
    const entry = await getSpotlightEntry(slug);
    return deriveMetaDescription(entry.frontmatter, entry.description);
  } catch (error) {
    return undefined;
  }
}

export { SpotlightNotFoundError };
