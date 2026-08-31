import Link from 'next/link';
import { notFound } from 'next/navigation';
import { services, industries } from '../../../lib/site';
import {
  pageMeta,
  graph,
  breadcrumbSchema,
  serviceSchema,
  faqSchema,
  jsonLdProps,
} from '../../../lib/seo';
import { PageHero, CTABand, SectionHeading } from '../../../components/Sections';
import FAQ from '../../../components/FAQ';
import Reveal from '../../../components/Reveal';
import Icon from '../../../components/Icons';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};
  return pageMeta({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}/`,
  });
}

export default function ServiceDetailPage({ params }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const path = `/services/${service.slug}/`;
  const related = services.filter((s) => s.slug !== service.slug);
  const servedIndustries = industries.filter((i) => service.industries.includes(i.slug));

  const schema = graph(
    serviceSchema(service),
    breadcrumbSchema([
      { name: 'Services', path: '/services/' },
      { name: service.title, path },
    ]),
    faqSchema(service.faqs, path)
  );

  return (
    <>
      <script {...jsonLdProps(schema)} />

      {/* Visible breadcrumb — matches the BreadcrumbList schema above. */}
      <nav aria-label="Breadcrumb" className="border-b border-sun-400/20 bg-lacquer">
        <ol className="container-site flex flex-wrap items-center gap-3 py-4 font-display text-[10px] uppercase tracking-[0.2em] text-ink-500">
          <li>
            <Link href="/" className="transition-colors hover:text-sun-400">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/services/" className="transition-colors hover:text-sun-400">
              Services
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-sun-400" aria-current="page">
            {service.title}
          </li>
        </ol>
      </nav>

      <PageHero
        ghost={service.title.split(' ')[0].toUpperCase()}
        eyebrow="Service"
        title={service.h1}
        intro={service.intro}
      />

      {/* Definition block. Placed first and written as a self-contained
          paragraph so it can be quoted on its own by an answer engine. */}
      <section className="section">
        <div className="container-site">
          <Reveal className="deco-panel max-w-3xl p-8 sm:p-10">
            <p className="eyebrow">In short</p>
            <div className="deco-rule mt-6 max-w-xs" aria-hidden="true" />
            <p className="mt-6 text-lg leading-[1.8] text-ink-700">{service.definition}</p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-site grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="max-w-3xl">
            {service.sections.map((block, i) => (
              <Reveal key={block.h2} delay={i * 70} className="mb-12 last:mb-0">
                <h2 className="display text-xl text-ink-900 sm:text-2xl">{block.h2}</h2>
                <div className="mt-5 h-px w-16 bg-sun-400" aria-hidden="true" />
                <p className="mt-6 text-[17px] leading-[1.8] text-ink-600">{block.body}</p>
              </Reveal>
            ))}
          </div>

          <aside className="space-y-6">
            <Reveal>
              <div className="deco-panel p-7">
                <span className="relative flex h-12 w-12 items-center justify-center">
                  <span className="absolute inset-0 rotate-45 border border-sun-400/45" aria-hidden="true" />
                  <Icon name={service.icon} className="relative h-5 w-5 text-sun-400" />
                </span>
                <h2 className="display mt-5 text-lg text-ink-900">What you get</h2>
                <ul className="mt-4 space-y-3 text-sm text-ink-600">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2.5">
                      <span className="deco-lozenge mt-[0.45rem]" aria-hidden="true" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="border border-brand-500/35 bg-brand-50 p-7">
                <h2 className="display text-lg text-ink-900">What it changes</h2>
                <ul className="mt-4 space-y-3 text-sm text-ink-600">
                  {service.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2.5">
                      <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-brand-600" aria-hidden="true" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {servedIndustries.length > 0 && (
        <section className="section bg-ink-50">
          <div className="container-site">
            <SectionHeading
              eyebrow="Where we apply it"
              title={`${service.title} by industry`}
              intro="The same service line looks different depending on what you make and who you ship to."
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {servedIndustries.map((ind, i) => (
                <Reveal key={ind.slug} delay={i * 80}>
                  <Link
                    href={`/industries/${ind.slug}/`}
                    className="deco-panel group flex h-full flex-col p-7 transition-colors duration-300 hover:bg-inlay"
                  >
                    <h3 className="display text-base text-ink-900 transition-colors group-hover:text-sun-400">
                      {ind.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">{ind.summary}</p>
                    <span className="mt-6 inline-flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.2em] text-sun-400">
                      {ind.title} logistics
                      <Icon name="arrow" className="h-4 w-4" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQ
        faqs={service.faqs}
        eyebrow="FAQ"
        title={`${service.title} — common questions`}
        className="section"
      />

      <section className="section bg-ink-50 pt-0">
        <div className="container-site">
          <SectionHeading eyebrow="Also from Drona" title="Other service lines" />
          <div className="mt-10 flex flex-wrap gap-3">
            {related.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}/`}
                className="border border-sun-400/30 px-5 py-2.5 font-display text-[11px] font-medium uppercase tracking-[0.16em] text-ink-700 transition-colors hover:border-sun-400 hover:bg-sun-400 hover:text-noir"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title={`Need ${service.title.toLowerCase()} you can hold to an SLA?`}
        text="Tell us your volumes, locations and current pain points — we'll come back with a practical proposal."
        buttonLabel="Request a Consultation"
      />
    </>
  );
}
