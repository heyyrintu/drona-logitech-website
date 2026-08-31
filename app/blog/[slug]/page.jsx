import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPost, formatDate } from '../../../lib/posts';
import {
  canonical,
  abs,
  graph,
  breadcrumbSchema,
  blogPostingSchema,
  jsonLdProps,
  ogImage,
} from '../../../lib/seo';
import { hasPublicOrigin } from '../../../lib/site';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return {};
  const path = `/blog/${post.slug}/`;
  return {
    title: post.title,
    description: post.excerpt,
    ...canonical(path),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      ...(hasPublicOrigin ? { url: abs(path), images: [ogImage] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      ...(hasPublicOrigin ? { images: [ogImage.url] } : {}),
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}/`;
  const schema = graph(
    blogPostingSchema(post, path),
    breadcrumbSchema([
      { name: 'Blog', path: '/blog/' },
      { name: post.title, path },
    ])
  );

  return (
    <>
      <script {...jsonLdProps(schema)} />
      <section className="surface-hall relative overflow-hidden border-b border-sun-400/20 py-20">
        <div className="grid-texture-light absolute inset-0" aria-hidden="true" />
        <div className="blob right-[-4rem] top-[-4rem] h-64 w-64 bg-sun-200/60" aria-hidden="true" />
        <div className="container-site relative max-w-3xl">
          <Link href="/blog/" className="inline-flex items-center gap-3 font-display text-[10px] font-medium uppercase tracking-[0.24em] text-sun-400 transition-colors hover:text-sun-300">
            ← Back to Blog
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="border border-sun-400/30 px-3 py-1.5 font-display text-[9px] font-medium uppercase tracking-[0.18em] text-sun-400">{post.tag}</span>
            <time dateTime={post.date} className="font-display text-[10px] uppercase tracking-[0.2em] text-ink-500">
              {formatDate(post.date)}
            </time>
          </div>
          <h1 className="deco-display mt-7 text-3xl leading-[1.2] sm:text-5xl">{post.title}</h1>
          <div className="deco-rule mt-8 max-w-xs" aria-hidden="true" />
          <p className="mt-7 font-display text-[10px] uppercase tracking-[0.24em] text-ink-500">By {post.author}</p>
        </div>
      </section>

      <article className="section">
        <div
          className="container-site prose-blog max-w-3xl"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </>
  );
}
