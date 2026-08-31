import Link from 'next/link';
import { industries } from '../../lib/site';
import { pageMeta, graph, breadcrumbSchema, jsonLdProps } from '../../lib/seo';
import { PageHero, CTABand } from '../../components/Sections';
import Reveal from '../../components/Reveal';
import Marquee from '../../components/Marquee';
import Icon from '../../components/Icons';

export const metadata = pageMeta({
  title: 'Industries We Serve',
  description:
    'Specialised logistics for pharmaceutical, automotive & engineering, and FMCG & retail sectors — compliant, precise and built for scale.',
  path: '/industries/',
});

// Per-sector identity. Each sector takes one metal from the system - brass,
// signal red, oxblood - so the register stays a set of three, not a rainbow.
const meta = {
  pharmaceutical: {
    icon: 'shield',
    tag: 'Regulated / Temperature-aware',
    plate: 'bg-sun-300 text-noir',
    rule: 'bg-ink-900/25',
    keyline: 'border-noir/30',
    accent: 'text-sun-400',
    float: 'GDP-aligned',
  },
  automotive: {
    icon: 'factory',
    tag: 'In-plant / JIT / JIS',
    plate: 'bg-brand-500 text-white',
    rule: 'bg-white/25',
    keyline: 'border-white/30',
    accent: 'text-sun-400',
    float: 'Line-side ready',
  },
  'fmcg-retail': {
    icon: 'package',
    tag: 'High-velocity / Multi-channel',
    plate: 'bg-grape-700 text-white',
    rule: 'bg-white/25',
    keyline: 'border-white/30',
    accent: 'text-sun-400',
    float: 'Peak-season scale',
  },
};

const fallback = meta.automotive;

export default function IndustriesPage() {
  return (
    <>
      <script {...jsonLdProps(graph(breadcrumbSchema([{ name: 'Industries', path: '/industries/' }])))} />
      <PageHero
        ghost="SECTORS"
        eyebrow="Industries We Serve"
        title={
          <>
            Sector expertise that shows in <span className="text-gradient">execution</span>
          </>
        }
        intro="Regulated goods, precision manufacturing, high-velocity retail — each industry demands different disciplines. We bring them."
      />

      {/* animated capabilities ticker */}
      <div className="relative border-y border-sun-400/30 bg-sun-300 py-4">
        <Marquee
          items={[
            'Pharmaceutical', 'GDP-aligned Handling', 'Automotive', 'JIT / JIS Line Feeding',
            'FMCG & Retail', 'Multi-channel Distribution', 'Pan-India Reach', 'Cold-chain Discipline',
          ]}
          itemClassName="font-display text-[11px] font-medium uppercase tracking-[0.3em] text-noir"
        />
      </div>

      <section className="section">
        <div className="container-site space-y-12 lg:space-y-16">
          {industries.map((ind, i) => {
            const m = meta[ind.slug] || fallback;
            const flip = i % 2 === 1;
            return (
              <Reveal key={ind.slug}>
                <div
                  id={ind.slug}
                  className="group grid items-stretch gap-6 lg:grid-cols-2 lg:gap-10"
                >
                  {/* -- Sector plate: a solid enamel panel with a stepped
                       keyline and the sector number set as an inlay. -- */}
                  <div
                    className={`relative flex overflow-hidden p-8 sm:p-10 ${m.plate} ${
                      flip ? 'lg:order-2' : ''
                    }`}
                  >
                    <span
                      className="pointer-events-none absolute inset-0"
                      style={{
                        backgroundImage:
                          'repeating-conic-gradient(from 200deg at 50% 130%, rgba(23,20,24,0.10) 0deg 1.4deg, transparent 1.4deg 7deg)',
                      }}
                      aria-hidden="true"
                    />
                    <span className={`pointer-events-none absolute inset-4 border ${m.keyline}`} aria-hidden="true" />
                    <span className="deco-display pointer-events-none absolute -right-1 bottom-3 select-none text-[8rem] leading-none opacity-15 sm:text-[10rem]" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div className="relative flex h-full w-full flex-col">
                      <span className="relative flex h-16 w-16 items-center justify-center">
                        <span className={`absolute inset-0 rotate-45 border ${m.keyline}`} aria-hidden="true" />
                        <Icon name={m.icon} className="relative h-7 w-7" />
                      </span>

                      <p className="mt-auto pt-16 font-display text-[10px] font-medium uppercase tracking-[0.3em] opacity-80">
                        {m.tag}
                      </p>
                      <div className={`mt-4 h-px w-full ${m.rule}`} aria-hidden="true" />
                      <h2 className="deco-display mt-5 text-3xl !text-current sm:text-4xl">{ind.title}</h2>

                      <span className={`absolute right-0 top-1/2 inline-flex items-center gap-3 border px-4 py-2.5 font-display text-[10px] font-medium uppercase tracking-[0.2em] ${m.keyline}`}>
                        <span className="h-1.5 w-1.5 rotate-45 bg-current" aria-hidden="true" />
                        {m.float}
                      </span>
                    </div>
                  </div>

                  {/* -- Content panel -- */}
                  <div
                    className={`deco-panel flex flex-col justify-center p-8 sm:p-10 ${
                      flip ? 'lg:order-1' : ''
                    }`}
                  >
                    <p className={`font-display text-[10px] font-medium uppercase tracking-[0.32em] ${m.accent}`}>
                      Sector {String(i + 1).padStart(2, '0')}
                    </p>
                    <div className="deco-rule mt-5 max-w-[14rem]" aria-hidden="true" />
                    <p className="mt-7 text-lg leading-[1.8] text-ink-600">{ind.summary}</p>

                    <ul className="mt-9 grid gap-px border-l border-t border-sun-400/20 sm:grid-cols-2">
                      {ind.points.map((p, j) => (
                        <Reveal as="li" key={p} delay={120 + j * 90} className="h-full">
                          <div className="flex h-full items-start gap-3.5 border-b border-r border-sun-400/20 p-4 text-sm leading-relaxed text-ink-700 transition-colors duration-300 hover:bg-lacquer">
                            <span className="deco-lozenge mt-[0.4rem]" aria-hidden="true" />
                            {p}
                          </div>
                        </Reveal>
                      ))}
                    </ul>

                    {/* Points at the sector detail page rather than /contact/.
                        The hub is the strongest page in this cluster, so its
                        outbound links are what give the detail pages authority
                        - and the anchor text carries the target keyword. */}
                    <Link
                      href={`/industries/${ind.slug}/`}
                      className={`mt-9 inline-flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.2em] ${m.accent}`}
                    >
                      More on {ind.title.toLowerCase()}
                      <span className="deco-chevron !border-current transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CTABand
        title="Operating in a different sector?"
        text="Our integrated model adapts. Tell us about your industry and requirements."
      />
    </>
  );
}
