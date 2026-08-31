import Link from 'next/link';
import { site, services, industries, stats, companyFaqs } from '../lib/site';
import { pageMeta, graph, faqSchema, jsonLdProps } from '../lib/seo';
import { SectionHeading, CTABand, StatStrip } from '../components/Sections';
import FAQ from '../components/FAQ';
import Icon from '../components/Icons';
import Reveal from '../components/Reveal';
import Marquee from '../components/Marquee';
import HeroChain from '../components/HeroChain';
import ChainRail from '../components/ChainRail';

export const metadata = pageMeta({
  title: `${site.shortName} — Integrated Logistics & Supply Chain Solutions`,
  description: site.description,
  path: '/',
});

const whyUs = [
  {
    icon: 'shield',
    title: 'One Accountable Partner',
    text: 'No vendor handovers, no finger-pointing. One team owns your supply chain end to end — and answers for it.',
  },
  {
    icon: 'chart',
    title: 'Technology-Enabled',
    text: 'Real-time tracking, live inventory visibility and data-driven insights across every node of your network.',
  },
  {
    icon: 'clock',
    title: 'Built to Scale',
    text: 'A pan-India network and 24/7 operations that flex with seasonal peaks and rapid growth.',
  },
];

// Bento layout. Warm-paper panels carry the content; last-mile takes the
// signal-red enamel plate so the final handoff becomes the visual punctuation.
const bento = {
  'in-plant-services': {
    variant: 'feature',
    span: 'sm:col-span-2 lg:col-span-1 lg:row-span-2',
  },
  warehousing: { span: 'sm:col-span-2 lg:col-span-2' },
  'inventory-management': { span: 'lg:col-span-1' },
  'packaging-solutions': { span: 'lg:col-span-1' },
  'manpower-supply': { span: 'lg:col-span-1' },
  'last-mile-delivery': {
    variant: 'banner',
    span: 'sm:col-span-2 lg:col-span-2',
  },
};

export default function HomePage() {
  return (
    <>
      {/* Organization and WebSite schema live in the root layout; the homepage
          adds only its own FAQ block. */}
      <script {...jsonLdProps(graph(faqSchema(companyFaqs, '/')))} />

      {/* ----- Hero: the terminal hall ----- */}
      <section className="surface-hall relative -mt-20 overflow-hidden border-b border-sun-400/20 pt-20">
        <div className="grid-texture-light absolute inset-0 opacity-30" aria-hidden="true" />

        <div className="container-site relative py-20 sm:py-24 lg:py-28">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
            {/* LEFT - copy */}
            <div className="relative z-10">
              <Reveal>
                <span className="inline-flex items-center gap-3 border border-sun-400/30 px-5 py-2.5 font-display text-[10px] font-medium uppercase tracking-[0.26em] text-sun-400">
                  <span className="deco-lozenge" aria-hidden="true" />
                  Integrated &amp; Diversified Logistics &middot; India
                </span>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="deco-display mt-9 text-[2.6rem] leading-[1.14] sm:text-6xl xl:text-[4.5rem]">
                  We move supply
                  <br />
                  chains <span className="text-gradient">forward</span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <div className="deco-rule mt-9 max-w-lg" aria-hidden="true" />
              </Reveal>

              <Reveal delay={200}>
                <p className="mt-9 max-w-xl text-lg leading-[1.8] text-ink-600">{site.description}</p>
              </Reveal>

              {/* Mission plate - a brass-framed dedication panel, the way a
                  Deco building carries its inscription at the entrance. */}
              <Reveal delay={260}>
                <div className="relative mt-10 max-w-xl border border-sun-400/30 p-6 sm:p-7">
                  <div className="pointer-events-none absolute inset-[5px] border border-sun-400/12" aria-hidden="true" />
                  <div className="relative flex items-start gap-5">
                    <span className="relative mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center">
                      <span className="absolute inset-0 rotate-45 border border-sun-400/50" aria-hidden="true" />
                      <Icon name="target" className="relative h-4 w-4 text-sun-400" />
                    </span>
                    <div>
                      <p className="font-display text-[10px] font-medium uppercase tracking-[0.3em] text-sun-400">
                        Our Mission &middot; {site.tagline}
                      </p>
                      <p className="mt-3 text-base leading-[1.75] text-ink-800">{site.mission}</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={320}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link href="/contact/" className="btn-primary">
                    Get a Quote
                    <span className="deco-chevron !border-white" aria-hidden="true" />
                  </Link>
                  <Link href="/services/" className="btn-secondary">
                    Explore Services
                  </Link>
                </div>
              </Reveal>

              {/* Industry register */}
              <Reveal delay={380}>
                <div className="mt-12 border-t border-sun-400/15 pt-6">
                  <p className="font-display text-[10px] font-medium uppercase tracking-[0.3em] text-ink-500">
                    Trusted across
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-3 font-display text-[11px] font-medium uppercase tracking-[0.16em] text-ink-700">
                    <span className="inline-flex items-center gap-2.5"><span className="deco-lozenge" aria-hidden="true" />Pharma</span>
                    <span className="inline-flex items-center gap-2.5"><span className="deco-lozenge" aria-hidden="true" />Automotive</span>
                    <span className="inline-flex items-center gap-2.5"><span className="deco-lozenge" aria-hidden="true" />FMCG &amp; Retail</span>
                    <span className="inline-flex items-center gap-2.5"><span className="deco-lozenge" aria-hidden="true" />Engineering</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* RIGHT - the Chain Frieze */}
            <div className="relative z-10 hidden lg:block">
              <HeroChain />
            </div>
          </div>
        </div>

        {/* Services ticker - a brass departure board across the base */}
        <div className="relative border-y border-brand-700/20 bg-brand-500 py-4 text-white">
          <Marquee
            items={services.map((s) => s.title).concat(['Pan-India Network', '24/7 Operations'])}
            itemClassName="font-display text-[11px] font-medium uppercase tracking-[0.3em]"
          />
        </div>
      </section>

      {/* ───── Stats with animated counters ───── */}
      <section className="section !pb-0">
        <div className="container-site">
          <StatStrip stats={stats} />
        </div>
      </section>

      {/* ───── Services — bento grid ───── */}
      <section className="section">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="What We Do"
              title={
                <>
                  Every link of the chain.
                  <br />
                  One partner.
                </>
              }
            />
            <Reveal delay={150}>
              <Link href="/services/" className="btn-secondary shrink-0">
                All Services
                <span className="deco-chevron !border-current" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={120} className="mt-12">
            <ChainRail />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-3">
            {services.map((s, i) => {
              const m = bento[s.slug] || { span: 'lg:col-span-1' };

              if (m.variant === 'banner') {
                return (
                  <Reveal key={s.slug} delay={i * 60} className={`${m.span} h-full`}>
                    {/* The one signal-red plate on the page. Last-mile is where
                        the chain either delivers or does not, so it earns the
                        hot colour and nothing else on this grid competes. */}
                    <Link
                      href={`/services/${s.slug}/`}
                      className="group relative flex h-full flex-col justify-between overflow-hidden bg-brand-500 p-8 text-white transition-colors duration-300 hover:bg-brand-400 sm:p-10"
                    >
                      <span
                        className="pointer-events-none absolute inset-0"
                        style={{
                          backgroundImage:
                            'repeating-conic-gradient(from 200deg at 100% 120%, rgba(242,235,220,0.13) 0deg 1.4deg, transparent 1.4deg 7deg)',
                        }}
                        aria-hidden="true"
                      />
                      <span className="pointer-events-none absolute inset-4 border border-white/25" aria-hidden="true" />
                      <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-6">
                          <span className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                            <span className="absolute inset-0 rotate-45 border border-white/60" aria-hidden="true" />
                            <Icon name={s.icon} className="relative h-6 w-6" />
                          </span>
                          <div>
                            <h3 className="display text-xl">{s.title}</h3>
                            <p className="mt-3 max-w-xl text-sm leading-[1.75] text-white">{s.summary}</p>
                          </div>
                        </div>
                        <span className="inline-flex shrink-0 items-center gap-3 self-start border border-white/50 px-6 py-3 font-display text-[11px] font-medium uppercase tracking-[0.2em] transition-colors group-hover:bg-white group-hover:text-brand-500 sm:self-auto">
                          Explore
                          <span className="deco-chevron !border-current" aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                );
              }

              return (
                <Reveal key={s.slug} delay={i * 60} className={`${m.span} h-full`}>
                  <Link
                    href={`/services/${s.slug}/`}
                    className="deco-panel group relative flex h-full flex-col p-7 transition-colors duration-300 hover:bg-inlay"
                  >
                    <span className="relative flex h-12 w-12 items-center justify-center">
                      <span
                        className="absolute inset-0 rotate-45 border border-sun-400/45 transition-colors duration-300 group-hover:border-sun-400"
                        aria-hidden="true"
                      />
                      <Icon name={s.icon} className="relative h-5 w-5 text-sun-400" />
                    </span>
                    <h3 className="display mt-6 text-lg text-ink-900 transition-colors group-hover:text-sun-400">{s.title}</h3>
                    <p className="mt-3 text-sm leading-[1.75] text-ink-600">{s.summary}</p>

                    {m.variant === 'feature' && (
                      <ul className="mt-6 space-y-3 text-sm text-ink-600">
                        {s.points.map((p) => (
                          <li key={p} className="flex items-start gap-3">
                            <span className="deco-lozenge mt-[0.45rem]" aria-hidden="true" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    )}

                    <span className="mt-auto inline-flex items-center gap-3 pt-8 font-display text-[11px] font-medium uppercase tracking-[0.2em] text-sun-400">
                      Learn more
                      <span className="deco-chevron transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ----- Industries: the specialisation register ----- */}
      <section className="surface-hall relative overflow-hidden border-y border-sun-400/20 py-20 sm:py-28">
        <div className="grid-texture-light absolute inset-0 opacity-60" aria-hidden="true" />
        <p
          className="deco-display text-ghost-sun pointer-events-none absolute -top-4 right-0 select-none whitespace-nowrap text-[8rem] leading-none"
          aria-hidden="true"
        >
          Industries
        </p>
        <div className="container-site relative">
          <SectionHeading
            eyebrow="Industries"
            title="Specialised where it matters"
            intro="Regulated goods, precision manufacturing, high-velocity retail - each demands different disciplines. We bring them."
          />
          <div className="mt-16 grid border-l border-t border-sun-400/20 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <Reveal key={ind.slug} delay={i * 100} className="h-full">
                <Link
                  href={`/industries/${ind.slug}/`}
                  className="group flex h-full flex-col border-b border-r border-sun-400/20 p-8 transition-colors duration-300 hover:bg-lacquer sm:p-9"
                >
                  <span className="relative flex h-11 w-11 items-center justify-center">
                    <span
                      className="absolute inset-0 rotate-45 border border-sun-400/40 transition-colors duration-300 group-hover:border-sun-400"
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="display mt-7 text-lg text-ink-900 transition-colors group-hover:text-sun-400">
                    {ind.title}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-[1.75] text-ink-600">{ind.summary}</p>
                  <span className="mt-8 inline-flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.2em] text-sun-400">
                    Learn more
                    <span className="deco-chevron transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Why Drona ───── */}
      <section className="section">
        <div className="container-site">
          <SectionHeading
            center
            eyebrow="Why Drona"
            title="Veterans on the ground. Technology in the loop."
            intro={`Founded in ${site.founded} by leaders with 20+ years in logistics, Drona pairs operational discipline with modern digital tools.`}
          />
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 100} className="h-full">
                <div className="deco-panel group h-full p-8 transition-colors duration-300 hover:bg-inlay sm:p-9">
                  <span className="relative flex h-14 w-14 items-center justify-center">
                    <span
                      className="absolute inset-0 rotate-45 border border-sun-400/45 transition-colors duration-300 group-hover:border-sun-400"
                      aria-hidden="true"
                    />
                    <Icon name={w.icon} className="relative h-6 w-6 text-sun-400" />
                  </span>
                  <h3 className="display mt-7 text-lg text-ink-900">{w.title}</h3>
                  <p className="mt-4 text-sm leading-[1.75] text-ink-600">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FAQ
        faqs={companyFaqs}
        eyebrow="FAQ"
        title="What people ask us"
        intro="Straight answers about what we do, where we operate and how an engagement starts."
      />

      <CTABand
        title="Ready to streamline your supply chain?"
        text="Tell us about your operation and we'll design an integrated logistics program around it."
      />
    </>
  );
}
