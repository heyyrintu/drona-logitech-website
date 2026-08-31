import { services } from '../../lib/site';
import { pageMeta, graph, breadcrumbSchema, jsonLdProps, abs } from '../../lib/seo';
import { PageHero, ServiceCard, CTABand, SectionHeading } from '../../components/Sections';
import FAQ from '../../components/FAQ';
import Reveal from '../../components/Reveal';

export const metadata = pageMeta({
  title: 'Logistics Services — In-Plant, Warehousing & Last-Mile',
  description:
    'Six integrated logistics service lines: in-plant services, warehousing and storage, inventory management, packaging, manpower supply and pan-India last-mile delivery.',
  path: '/services/',
});

// One question per service line, lifted from each detail page. Gives the hub
// its own extractable Q&A layer without duplicating a full FAQ set.
const hubFaqs = [
  {
    q: 'What logistics services does Drona Logitech provide?',
    a: 'Six service lines: in-plant logistics services, warehousing and storage, inventory management, industrial and export packaging, contract manpower supply, and pan-India last-mile delivery. Each runs independently or combines into a single end-to-end programme under one contract.',
  },
  {
    q: 'Can we start with just one service instead of the full chain?',
    a: 'Yes. Every service line stands alone, and most engagements begin with a single scope — one warehouse, or one in-plant team — then expand once the operating relationship is proven. There is no requirement to outsource the whole chain to begin.',
  },
  {
    q: 'How does Drona Logitech price its services?',
    a: 'Pricing depends on the service line. Warehousing is typically split into storage — per pallet position or square foot per month — and handling charged per inbound and outbound transaction. In-plant and manpower engagements are priced on deployed headcount and shift pattern. We quote the components openly so you can see what is actually driving your cost.',
  },
  {
    q: 'How long does it take to go live?',
    a: 'A typical engagement runs four to six weeks from signed contract to go-live: roughly two weeks of ground study and solution design, then two to four weeks of recruitment, training, SOP rollout and structured go-live. Well-defined scopes can move faster.',
  },
];

const process = [
  { step: '01', title: 'Assess', text: 'We study your current operation, volumes and pain points on the ground.' },
  { step: '02', title: 'Design', text: 'A tailored solution with clear SLAs, staffing plans and technology setup.' },
  { step: '03', title: 'Deploy', text: 'Structured go-live with trained teams, SOPs and safety compliance in place.' },
  { step: '04', title: 'Optimise', text: 'Continuous KPI reviews, data-driven improvements and scale-up support.' },
];

export default function ServicesPage() {
  const schema = graph(
    breadcrumbSchema([{ name: 'Services', path: '/services/' }]),
    {
      '@type': 'ItemList',
      '@id': `${abs('/services/')}#list`,
      name: 'Logistics services offered by Drona Logitech',
      itemListElement: services.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: s.title,
        url: abs(`/services/${s.slug}/`),
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${abs('/services/')}#faq`,
      mainEntity: hubFaqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    }
  );

  return (
    <>
      <script {...jsonLdProps(schema)} />
      <PageHero
        ghost="SERVICES"
        eyebrow="Our Services"
        title="One Partner. Every Link of the Chain."
        intro="Five integrated service lines that can run independently or as a single end-to-end program — inside your plant, across the warehouse, and out to the last mile."
      />

      <section className="section">
        <div className="container-site grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} anchor />
          ))}
        </div>
      </section>

      <section className="section border-y border-sun-400/20 bg-ink-50">
        <div className="container-site">
          <SectionHeading eyebrow="How We Engage" title="A Proven 4-Step Process" center />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 90}>
                {/* These four genuinely are a sequence, so the numbers carry
                    order rather than decorate the tile. */}
                <div className="deco-panel h-full p-8 transition-colors duration-300 hover:bg-inlay">
                  <p className="deco-display text-4xl text-sun-400">{p.step}</p>
                  <div className="mt-5 h-px w-12 bg-sun-400/50" aria-hidden="true" />
                  <h3 className="display mt-6 text-base text-ink-900">{p.title}</h3>
                  <p className="mt-4 text-sm leading-[1.75] text-ink-600">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FAQ faqs={hubFaqs} title="Questions we get about our services" className="section" />

      <CTABand
        title="Not sure which service fits your operation?"
        text="Share your requirements and our team will recommend the right mix — no obligation."
        buttonLabel="Request a Consultation"
      />
    </>
  );
}
