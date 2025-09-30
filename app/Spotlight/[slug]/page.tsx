import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SpotlightCarousel } from '@/components/SpotlightCarousel';
import { SITE_URL } from '@/lib/seo';
import {
  SpotlightNotFoundError,
  type SpotlightImage,
  getSpotlightEntry,
  getSpotlightSummaries
} from '@/lib/spotlight';

interface SpotlightPageParams {
  params: {
    slug: string;
  };
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const entries = await getSpotlightSummaries();
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: SpotlightPageParams): Promise<Metadata> {
  try {
    const entry = await getSpotlightEntry(params.slug);
    const title = `${entry.founder} – ${entry.company} | Founder Spotlight`;
    const description = entry.frontmatter.metaDescription ?? entry.description;

    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/Spotlight/${entry.slug}`
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/Spotlight/${entry.slug}`,
        images: [
          {
            url: entry.heroImage.src,
            width: entry.heroImage.width,
            height: entry.heroImage.height,
            alt: entry.heroImage.alt
          }
        ]
      },
      twitter: {
        title,
        description,
        card: 'summary_large_image'
      }
    } satisfies Metadata;
  } catch (error) {
    if (error instanceof SpotlightNotFoundError) {
      notFound();
    }

    throw error;
  }
}

export default async function SpotlightPostPage({ params }: SpotlightPageParams) {
  try {
    const entry = await getSpotlightEntry(params.slug);
    const supportingImages = [entry.secondaryImage, entry.eventImage].filter(
      (image): image is SpotlightImage => Boolean(image)
    );
    const galleryImages = [entry.heroImage, ...supportingImages].filter(
      (image, index, array) => array.findIndex((candidate) => candidate.src === image.src) === index
    );
    const gallerySrcs = new Set(galleryImages.map((image) => image.src));
    const trimmedContent = entry.content.replace(/\n## 📸 More from[\s\S]*/i, '');

    return (
      <article className="section spotlight-article">
        <header className="spotlight-article-header">
          <span className="spotlight-kicker">Founder Spotlight</span>
          <h2 className="spotlight-article-title">
            {entry.founder} – {entry.company}
          </h2>
          <h1 className="sr-only">
            {entry.founder} – {entry.company}
          </h1>
          {entry.tagline ? <p className="spotlight-article-tagline">{entry.tagline}</p> : null}
          <Link className="spotlight-backlink" href="/Spotlight">
            ← Back to all spotlights
          </Link>
        </header>

        <SpotlightCarousel images={galleryImages} />

        <div className="spotlight-article-body">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ node, ...props }) => <h2 className="spotlight-heading" {...props} />,
              h3: ({ node, ...props }) => <h3 className="spotlight-subheading" {...props} />,
              h4: ({ node, ...props }) => <h4 className="spotlight-subheading" {...props} />,
              hr: ({ node, ...props }) => <hr className="spotlight-divider" {...props} />,
              strong: ({ node, ...props }) => <strong className="spotlight-strong" {...props} />,
              p: ({ node, ...props }) => <p className="spotlight-paragraph" {...props} />,
              ul: ({ node, ...props }) => <ul className="spotlight-list" {...props} />,
              ol: ({ node, ...props }) => <ol className="spotlight-list" {...props} />,
              li: ({ node, ...props }) => <li className="spotlight-list-item" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote className="spotlight-quote" {...props} />
              ),
              img: ({ node, src, alt, ...props }) => {
                if (!src) return null;

                if (gallerySrcs.has(src)) {
                  return null;
                }

                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={src} alt={alt ?? ''} className="spotlight-body-image" {...props} />
                );
              }
            }}
          >
            {trimmedContent}
          </ReactMarkdown>
        </div>
      </article>
    );
  } catch (error) {
    if (error instanceof SpotlightNotFoundError) {
      notFound();
    }

    throw error;
  }
}
