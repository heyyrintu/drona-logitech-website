import Link from 'next/link';
import { notFound } from 'next/navigation';
import { industries, services } from '../../../lib/site';
import { pageMeta, graph, breadcrumbSchema, faqSchema, jsonLdProps, abs, ORG_ID } from '../../../lib/seo';
import { PageHero, CTABand, SectionHeading } from '../../../components/Sections';
import FAQ from '../../../components/FAQ';
import Reveal from '../../../components/Reveal';
import Icon from '../../../components/Icons';

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }) {
  const industry = industries.find((i) => i.slug === params.slug);
  if (!industry) return {};
  return pageMeta({
    title: industry.metaTitle,
    description: industry.metaDescription,
    path: `/industries/${industry.slug}/`,
  });
}

export default function IndustryDetailPage({ params }) {
  const industry = industries.find((i) => i.slug === params.slug);
  if (!industry) notFound();

  const path = `/industries/${industry.slug}/`;
  const used = services.filter((s) => industry.servicesUsed.includes(s.slug));

  const schema = graph(
    {
      '@type': 'WebPage',
      '@id': `${abs(path)}#webpage`,
      url: abs(path),
      name: industry.metaTitle,
      description: industry.metaDescription,
      about: { '@type': 'Thing', name: industry.title },
      isPartOf: { '@id': `${abs('/')}#website` },
      publisher: { '@id': ORG_ID },
    },
    breadcrumbSchema([
      { name: 'Industries', path: '/industries/' },
      { name: industry.title, path },
    ]),
    faqSchema(industry.faqs, path)
  );

  return (
    <>
      <script {...jsonLdProps(schema)} />

      <nav aria-label="Breadcrumb" className="border-b border-sun-400/20 bg-lacquer">
        <ol className="container-site flex flex-wrap items-center gap-3 py-4 font-display text-[10px] uppercase tracking-[0.2em] text-ink-500">
          <li>
            <Link href="/" className="transition-colors hover:text-sun-400">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/industries/" className="transition-colors hover:text-sun-400">
              Industries
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-sun-400" aria-current="page">
            {industry.title}
          </li>
        </ol>
      </nav>

      <PageHero
        ghost={industry.slug.split('-')[0].toUpperCase()}
        eyebrow="Industry"
        title={industry.h1}
        intro={industry.intro}
      />

      <section className="section">
        <div className="container-site">
          <Reveal className="max-w-3xl">
            <h2 className="deco-display text-2xl sm:text-3xl">
              What makes {industry.title.toLowerCase()} different
            </h2>
            <div className="deco-rule mt-7 max-w-xs" aria-hidden="true" />
            <p className="mt-7 text-[17px] leading-[1.8] text-ink-600">{industry.challenge}</p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-ink-50 pt-0 sm:pt-0">
        <div className="container-site pt-20">
          <SectionHeading eyebrow="Our approach" title={`How we run ${industry.title.toLowerCase()}`} />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {industry.approach.map((item, i) => (
              <Reveal key={item.h3} delay={i * 80}>
                <div className="deco-panel h-full p-8">
                  <p className="deco-display text-3xl text-sun-400">{String(i + 1).padStart(2, '0')}</p>
                  <div className="mt-5 h-px w-12 bg-sun-400/50" aria-hidden="true" />
                  <h3 className="display mt-6 text-lg text-ink-900">{item.h3}</h3>
                  <p className="mt-4 text-sm leading-[1.75] text-ink-600">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <SectionHeading
            eyebrow="Service lines involved"
            title={`Services we typically deploy in ${industry.title.toLowerCase()}`}
            intro="Most engagements combine several of these under a single contract and a single point of accountability."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {used.map((s, i) => (
              <Reveal key={s.slug} delay={i * 70}>
                <Link
                  href={`/services/${s.slug}/`}
                  className="deco-panel group flex h-full flex-col p-7 transition-colors duration-300 hover:bg-inlay"
                >
                  <span className="relative flex h-11 w-11 items-center justify-center">
                    <span className="absolute inset-0 rotate-45 border border-sun-400/45 transition-colors duration-300 group-hover:border-sun-400" aria-hidden="true" />
                    <Icon name={s.icon} className="relative h-4 w-4 text-sun-400" />
                  </span>
                  <h3 className="display mt-6 text-base text-ink-900 transition-colors group-hover:text-sun-400">
                    {s.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{s.summary}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FAQ
        faqs={industry.faqs}
        eyebrow="FAQ"
        title={`${industry.title} — common questions`}
      />

      <CTABand
        title={`Running a ${industry.title.split(' ')[0].toLowerCase()} operation that needs a better logistics partner?`}
        text="Share your volumes, locations and current pain points and we'll come back with a practical proposal."
        buttonLabel="Talk to Our Team"
      />
    </>
  );
}
