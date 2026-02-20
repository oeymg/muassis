import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SITE_URL } from '@/lib/seo';
import { BlogNotFoundError, getBlogPost, getBlogPostSummaries } from '@/lib/blog';
import { createBlogImageMap, getBlogImageByIndex } from '@/lib/blog-images';

interface BlogPageParams {
  params: {
    slug: string;
  };
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const posts = await getBlogPostSummaries();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPageParams): Promise<Metadata> {
  try {
    const summaries = await getBlogPostSummaries();
    const imageMap = createBlogImageMap(summaries.map((post) => post.slug));
    const heroImage = imageMap.get(params.slug) ?? getBlogImageByIndex(0);
    const post = await getBlogPost(params.slug);
    const title = `${post.title} | Mu'assis Blog`;
    const description = post.preview;
    const url = `${SITE_URL}/blog/${post.slug}`;

    const absoluteImageUrl = heroImage.src.startsWith('http')
      ? heroImage.src
      : `${SITE_URL}${heroImage.src}`;

    return {
      title,
      description,
      keywords: [
        "Mu'assis",
        'You have what it takes',
        'Muassis founder identity',
        'Governance Debt',
        'Scaling Ethical Ambition',
        'Institutional Infrastructure',
        'Venture Factory',
        'Founder legacy'
      ],
      alternates: {
        canonical: url
      },
      openGraph: {
        title,
        description,
        url,
        type: 'article',
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt,
        images: [
          {
            url: absoluteImageUrl,
            alt: post.title,
            width: 1200,
            height: 630
          }
        ]
      },
      twitter: {
        title,
        description,
        card: 'summary_large_image',
        images: [absoluteImageUrl]
      },
      authors: [{ name: "Mu'assis" }]
    } satisfies Metadata;
  } catch (error) {
    if (error instanceof BlogNotFoundError) {
      notFound();
    }

    throw error;
  }
}

export default async function BlogPostPage({ params }: BlogPageParams) {
  try {
    const summaries = await getBlogPostSummaries();
    const imageMap = createBlogImageMap(summaries.map((post) => post.slug));
    const heroImage = imageMap.get(params.slug) ?? getBlogImageByIndex(0);
    const post = await getBlogPost(params.slug);
    const url = `${SITE_URL}/blog/${post.slug}`;
    const formatter = new Intl.DateTimeFormat('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const absoluteHeroImageUrl = heroImage.src.startsWith('http')
      ? heroImage.src
      : `${SITE_URL}${heroImage.src}`;

    const postSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.preview,
      url,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      wordCount: post.wordCount,
      author: {
        '@type': 'Organization',
        name: "Mu'assis",
        url: SITE_URL
      },
      publisher: {
        '@type': 'Organization',
        name: "Mu'assis",
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.svg`
        }
      },
      image: [absoluteHeroImageUrl],
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url
      },
      about: {
        '@type': 'Thing',
        name: 'Founder legacy and ethical entrepreneurship'
      }
    };

    return (
      <article className="section blog-article" data-reveal-skip="true">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
        />

        <header className="blog-article-header">
          <span className="blog-kicker">The Mu'assis Journal</span>
          <h1 className="blog-article-title">{post.title}</h1>
          <p className="blog-article-preview">{post.preview}</p>
          <div className="blog-article-meta">
            <span>{formatter.format(new Date(post.publishedAt))}</span>
            <span className="blog-meta-divider" aria-hidden="true" />
            <span>{post.readingTime} min read</span>
            <span className="blog-meta-divider" aria-hidden="true" />
            <span>{post.wordCount} words</span>
          </div>
          <Link className="blog-backlink" href="/blog">
            ← Back to all posts
          </Link>
        </header>

        <div className="blog-article-hero">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            sizes="(max-width: 960px) 100vw, 70vw"
            className="blog-article-hero-image"
            priority
          />
        </div>

        <div className="blog-article-body">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ node, ...props }) => <h2 className="blog-heading" {...props} />,
              h3: ({ node, ...props }) => <h3 className="blog-subheading" {...props} />,
              h4: ({ node, ...props }) => <h4 className="blog-subheading" {...props} />,
              hr: ({ node, ...props }) => <hr className="blog-divider" {...props} />,
              strong: ({ node, ...props }) => <strong className="blog-strong" {...props} />,
              p: ({ node, ...props }) => <p className="blog-paragraph" {...props} />,
              ul: ({ node, ...props }) => <ul className="blog-list" {...props} />,
              ol: ({ node, ...props }) => <ol className="blog-list" {...props} />,
              li: ({ node, ...props }) => <li className="blog-list-item" {...props} />,
              blockquote: ({ node, ...props }) => <blockquote className="blog-quote" {...props} />
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="blog-article-cta">
          <div className="blog-article-cta-inner">
            <span className="blog-kicker">Your legacy starts here</span>
            <h2 className="blog-article-cta-heading">You have what it takes.</h2>
            <p className="blog-article-cta-body">
              Mu&apos;assis is your key to your legacy. We are built for founders who are ready to
              move — from intent to institutional-grade execution. Apply to the Launchpad and start
              building the company your future self would be proud of.
            </p>
            <div className="blog-article-cta-actions">
              <Link href="/launchpad" className="blog-article-cta-btn blog-article-cta-btn--primary">
                Apply to Launchpad →
              </Link>
              <Link href="/blog" className="blog-article-cta-btn blog-article-cta-btn--ghost">
                ← More essays
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  } catch (error) {
    if (error instanceof BlogNotFoundError) {
      notFound();
    }

    throw error;
  }
}
