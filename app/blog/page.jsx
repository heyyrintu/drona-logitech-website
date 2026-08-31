import Link from 'next/link';
import { getAllPosts, formatDate } from '../../lib/posts';
import { PageHero } from '../../components/Sections';
import { pageMeta, graph, breadcrumbSchema, jsonLdProps } from '../../lib/seo';

export const metadata = pageMeta({
  title: 'Blog & News',
  description:
    'Company updates and practical logistics insights from the Drona Logitech team — warehousing, in-plant operations, inventory and distribution in India.',
  path: '/blog/',
});

const blogSchema = graph(breadcrumbSchema([{ name: 'Blog', path: '/blog/' }]));

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <script {...jsonLdProps(blogSchema)} />
      <PageHero
        ghost="INSIGHTS" eyebrow="Blog & News"
        title="Insights from the Field"
        intro="Company updates, operational know-how and perspectives on Indian logistics."
      />

      <section className="section">
        <div className="container-site">
          {posts.length === 0 ? (
            <p className="text-center font-display text-xs uppercase tracking-[0.2em] text-ink-500">No posts yet. Check back soon.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}/`}
                  className="deco-panel group flex flex-col p-8 transition-colors duration-300 hover:bg-inlay"
                >
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="border border-sun-400/30 px-3 py-1.5 font-display text-[9px] font-medium uppercase tracking-[0.18em] text-sun-400">
                      {post.tag}
                    </span>
                    <time dateTime={post.date} className="font-display text-[10px] uppercase tracking-[0.2em] text-ink-500">
                      {formatDate(post.date)}
                    </time>
                  </div>
                  <h2 className="display mt-6 text-base leading-snug text-ink-900 transition-colors group-hover:text-sun-400">
                    {post.title}
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-[1.8] text-ink-600">{post.excerpt}</p>
                  <span className="mt-7 inline-flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.2em] text-sun-400">
                    Read more
                    <span className="deco-chevron transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
