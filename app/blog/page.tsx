import Image from 'next/image';
import Link from 'next/link';
import { createPageMetadata, SITE_URL } from '@/lib/seo';
import { getBlogPostSummaries } from '@/lib/blog';
import { createBlogImageMap, getBlogImageByIndex } from '@/lib/blog-images';

export const metadata = createPageMetadata('blog');
export const dynamic = 'force-static';

const MARQUEE_TOPICS = [
  'Governance Debt',
  'Your Legacy',
  'Institutional Infrastructure',
  'Generational Thinking',
  'Ethical Ambition',
  'Venture Factory',
  'Founder Identity',
  'A-to-Z Architecture',
  'Build What Endures',
  'Muassis'
];

export default async function BlogIndexPage() {
  const posts = await getBlogPostSummaries();
  const [featured, ...rest] = posts;
  const totalWords = posts.reduce((sum, post) => sum + post.wordCount, 0);
  const totalReadMinutes = Math.max(1, Math.round(totalWords / 220));
  const formatter = new Intl.DateTimeFormat('en-AU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  const imageMap = createBlogImageMap(posts.map((post) => post.slug));
  const featuredImage = featured ? imageMap.get(featured.slug) ?? getBlogImageByIndex(0) : getBlogImageByIndex(0);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: "The Mu'assis Journal",
    url: `${SITE_URL}/blog`,
    description:
      "You have what it takes to become an innovator, an entrepreneur, a muassis. Motivational essays for founders ready to build their legacy through governance, ethical ambition, and institutional-grade execution.",
    publisher: {
      '@type': 'Organization',
      name: "Mu'assis",
      url: SITE_URL
    }
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: post.title,
      url: `${SITE_URL}${post.href}`
    }))
  };

  return (
    <section className="section jnl-page" data-reveal-skip="true">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* ── Masthead ── */}
      <header className="jnl-masthead">
        <span className="jnl-masthead-name">The Mu&apos;assis Journal</span>
        {posts.length > 0 && (
          <div className="jnl-masthead-meta" aria-label="Journal statistics">
            <span>{posts.length} Essays</span>
            <span className="jnl-dot" aria-hidden="true" />
            <span>≈{totalReadMinutes} min total</span>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <div className="jnl-hero">
        {posts.length > 0 && (
          <div className="jnl-hero-watermark" aria-hidden="true">
            {posts.length}
          </div>
        )}
        <h1 className="jnl-headline">
          <span>You have</span>
          <span>what it</span>
          <span>
            takes
            <span className="jnl-headline-period">.</span>
          </span>
        </h1>
        <p className="jnl-hero-lead">
          Become the innovator, the entrepreneur, the muassis your community is waiting for. These
          essays are your key to your legacy.
        </p>
      </div>

      {/* ── Marquee ── */}
      <div className="jnl-marquee" aria-hidden="true">
        <div className="jnl-marquee-track">
          {[...MARQUEE_TOPICS, ...MARQUEE_TOPICS].map((topic, i) => (
            <span key={i} className="jnl-marquee-item">
              <span className="jnl-marquee-pip" />
              {topic}
            </span>
          ))}
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="jnl-empty">Essays are being prepared. Check back soon.</p>
      ) : (
        <>
          {/* ── Featured essay ── */}
          {featured && (
            <Link
              href={featured.href}
              className="jnl-featured"
              aria-label={`Featured essay: ${featured.title}`}
            >
              <div className="jnl-featured-img-wrap">
                <Image
                  src={featuredImage.src}
                  alt={featuredImage.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 90vw"
                  className="jnl-featured-img"
                  priority
                />
              </div>
              <div className="jnl-featured-veil" aria-hidden="true" />
              <div className="jnl-featured-body">
                <span className="jnl-featured-tag">Featured Essay</span>
                <h2 className="jnl-featured-title">{featured.title}</h2>
                <p className="jnl-featured-desc">{featured.preview}</p>
                <div className="jnl-featured-foot">
                  <div className="jnl-featured-meta">
                    <span>{formatter.format(new Date(featured.publishedAt))}</span>
                    <span className="jnl-dot" aria-hidden="true" />
                    <span>{featured.readingTime} min read</span>
                    <span className="jnl-dot" aria-hidden="true" />
                    <span>{featured.wordCount} words</span>
                  </div>
                  <span className="jnl-featured-read" aria-hidden="true">
                    Read essay →
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* ── Essay roll ── */}
          {rest.length > 0 && (
            <div className="jnl-roll">
              <div className="jnl-roll-header">
                <span className="jnl-roll-label">All Essays</span>
              </div>
              <div className="jnl-roll-grid" role="list">
                {rest.map((post, index) => {
                  const img = imageMap.get(post.slug) ?? getBlogImageByIndex(index + 1);
                  const num = String(index + 2).padStart(2, '0');
                  return (
                    <Link key={post.slug} href={post.href} className="jnl-card" role="listitem">
                      <span className="jnl-card-num" aria-hidden="true">
                        {num}
                      </span>
                      <div className="jnl-card-thumb">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="jnl-card-thumb-img"
                        />
                      </div>
                      <div className="jnl-card-copy">
                        <h3 className="jnl-card-heading">{post.title}</h3>
                        <p className="jnl-card-blurb">{post.preview}</p>
                        <div className="jnl-card-meta">
                          <span>{post.readingTime} min</span>
                          <span className="jnl-dot" aria-hidden="true" />
                          <span>{formatter.format(new Date(post.publishedAt))}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
