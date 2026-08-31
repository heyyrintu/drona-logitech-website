import { site } from '../../../lib/site';
import { getAllPosts } from '../../../lib/posts';

export const dynamic = 'force-static';

/** Escapes the five XML predefined entities. */
function xml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET() {
  const posts = getAllPosts();
  const origin = site.url || 'http://localhost';
  const feedUrl = `${origin}/blog/rss.xml`;
  const updated = posts.length ? new Date(posts[0].date) : new Date();

  const items = posts
    .map((post) => {
      const url = `${origin}/blog/${post.slug}/`;
      return `    <item>
      <title>${xml(post.title)}</title>
      <link>${xml(url)}</link>
      <guid isPermaLink="true">${xml(url)}</guid>
      <description>${xml(post.excerpt)}</description>
      <category>${xml(post.tag)}</category>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(`${site.shortName} — Blog & News`)}</title>
    <link>${xml(`${origin}/blog/`)}</link>
    <description>${xml('Company updates and logistics insights from the Drona Logitech team.')}</description>
    <language>en-IN</language>
    <lastBuildDate>${updated.toUTCString()}</lastBuildDate>
    <atom:link href="${xml(feedUrl)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
