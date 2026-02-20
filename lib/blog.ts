import fs from 'node:fs/promises';
import path from 'node:path';

const BLOG_ROOT = path.join(process.cwd(), 'content', 'blog');
const WORDS_PER_MINUTE = 220;

export interface BlogPostSummary {
  slug: string;
  title: string;
  preview: string;
  href: string;
  wordCount: number;
  readingTime: number;
  publishedAt: string;
  updatedAt: string;
}

export interface BlogPost extends BlogPostSummary {
  content: string;
}

export class BlogNotFoundError extends Error {}

async function ensureBlogRoot(): Promise<void> {
  return fs.access(BLOG_ROOT).catch(() => {
    throw new BlogNotFoundError('Blog content directory not found.');
  });
}

async function readBlogFiles(): Promise<string[]> {
  await ensureBlogRoot();
  const entries = await fs.readdir(BLOG_ROOT, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.md'))
    .map((entry) => entry.name);
}

function stripMarkdown(value: string): string {
  return value
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/[*_`>#-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function derivePreview(body: string): string {
  const paragraphs = body.split(/\n{2,}/).map((paragraph) => paragraph.trim());
  const firstParagraph = paragraphs.find((paragraph) => paragraph.length > 0) ?? '';

  return stripMarkdown(firstParagraph).slice(0, 240);
}

function parsePost(raw: string) {
  const normalized = raw.replace(/\r\n/g, '\n');
  const lines = normalized.split('\n');
  let cursor = 0;

  let title = '';
  let preview = '';

  if (lines[cursor]?.startsWith('# ')) {
    title = lines[cursor].replace(/^#\s+/, '').trim();
    cursor += 1;
  }

  while (lines[cursor]?.trim() === '') {
    cursor += 1;
  }

  if (lines[cursor]?.startsWith('**Preview:**')) {
    preview = lines[cursor].replace('**Preview:**', '').trim();
    cursor += 1;
  }

  while (lines[cursor]?.trim() === '') {
    cursor += 1;
  }

  const body = lines.slice(cursor).join('\n').trim();

  return {
    title: title || 'Untitled',
    preview: preview || derivePreview(body),
    body
  };
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function toReadingTime(wordCount: number): number {
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}

function toSlug(fileName: string): string {
  return fileName.replace(/\.md$/i, '');
}

async function loadBlogPost(fileName: string): Promise<BlogPost> {
  const filePath = path.join(BLOG_ROOT, fileName);
  const [raw, stats] = await Promise.all([fs.readFile(filePath, 'utf-8'), fs.stat(filePath)]);
  const parsed = parsePost(raw);
  const wordCount = countWords(parsed.body);
  const publishedAt = (stats.birthtime ?? stats.mtime).toISOString();
  const updatedAt = stats.mtime.toISOString();
  const slug = toSlug(fileName);

  return {
    slug,
    title: parsed.title,
    preview: parsed.preview,
    content: parsed.body,
    href: `/blog/${slug}`,
    wordCount,
    readingTime: toReadingTime(wordCount),
    publishedAt,
    updatedAt
  };
}

function sortPosts(posts: BlogPostSummary[]): BlogPostSummary[] {
  return posts.sort((a, b) => {
    const aDate = Date.parse(a.updatedAt);
    const bDate = Date.parse(b.updatedAt);

    if (!Number.isNaN(aDate) && !Number.isNaN(bDate)) {
      return bDate - aDate;
    }

    return a.title.localeCompare(b.title);
  });
}

export async function getBlogPostSummaries(): Promise<BlogPostSummary[]> {
  const files = await readBlogFiles();
  const posts = await Promise.all(files.map((file) => loadBlogPost(file)));
  return sortPosts(posts);
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const files = await readBlogFiles();
  const fileName = files.find((file) => toSlug(file) === slug);

  if (!fileName) {
    throw new BlogNotFoundError(`Blog post not found: ${slug}`);
  }

  return loadBlogPost(fileName);
}
