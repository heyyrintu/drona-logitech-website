import { pageMeta, graph, breadcrumbSchema, jsonLdProps } from '../../lib/seo';
import { PageHero, SectionHeading, CTABand } from '../../components/Sections';
import Icon from '../../components/Icons';
import ClientLogo from '../../components/ClientLogo';

export const metadata = pageMeta({
  title: 'Clients & Testimonials',
  description:
    'Trusted by manufacturers and distributors across pharma, automotive and consumer sectors. Client testimonials and success stories from Drona Logitech.',
  path: '/clients/',
});

const clientsSchema = graph(breadcrumbSchema([{ name: 'Clients', path: '/clients/' }]));

// `logo` points to the real logo file (drop the official image in public/images/clients/).
// If a file is missing, ClientLogo falls back to the client name as text.
const clients = [
  { name: 'JMC Motor', logo: '/images/clients/jmc-motor.png' },
  { name: 'Ananda Dairy', logo: '/images/clients/ananda-dairy.png' },
  { name: 'Ashok Leyland', logo: '/images/clients/ashok-leyland.png' },
  { name: 'Lifelong Online', logo: '/images/clients/lifelong-online.png' },
  { name: 'Eshopbox', logo: '/images/clients/eshopbox.jpg' },
  { name: 'RedTape', logo: '/images/clients/redtape.png' },
];

// Freshly onboarded partners — highlighted at the top of the page.
const newWins = [
  {
    name: 'JMC Motor',
    sector: 'Automotive',
    win: 'Onboarded as an integrated logistics partner — bringing Drona’s in-plant and supply-chain discipline to their automotive operations.',
  },
  {
    name: 'Ananda Dairy',
    sector: 'Dairy · Transportation',
    win: 'Awarded their transportation mandate — moving temperature-sensitive dairy on time, every time, across the network.',
  },
];

// TODO: replace with approved client testimonials
const testimonials = [
  {
    quote:
      'Drona took over our in-plant material handling and the difference was visible within the first month — cleaner flows, fewer line stoppages, full visibility.',
    name: 'Operations Head',
    company: 'Automotive component manufacturer',
  },
  {
    quote:
      'Pan-India pharma distribution with batch-level traceability and zero compliance escalations. Exactly the partner we needed.',
    name: 'Supply Chain Manager',
    company: 'Pharmaceutical distributor',
  },
  {
    quote:
      'One team handling warehousing, packaging and dispatch means one phone call when we need anything. That accountability is rare.',
    name: 'Plant Director',
    company: 'Consumer goods manufacturer',
  },
];

const caseStudies = [
  {
    title: 'Dairy Transportation for Ananda',
    result: 'Trusted with time-critical dairy movement — reliable, temperature-aware transport that keeps product fresh from source to shelf.',
    tags: ['Transportation', 'Dairy'],
  },
  {
    title: 'In-Plant Transformation for an Automotive OEM Supplier',
    result: 'Streamlined line feeding and kitting; improved material availability at point of use.',
    tags: ['In-Plant', 'Automotive'],
  },
  {
    title: 'Pan-India Pharma Distribution Program',
    result: 'Compliant, batch-traceable deliveries across India with time-definite SLAs.',
    tags: ['Last-Mile', 'Pharma'],
  },
  {
    title: 'Integrated Warehouse + Packaging Operation',
    result: 'Single-partner accountability across storage, repacking and dispatch.',
    tags: ['Warehousing', 'Packaging'],
  },
];

export default function ClientsPage() {
  return (
    <>
      <script {...jsonLdProps(clientsSchema)} />
      <PageHero
        ghost="CLIENTS" eyebrow="Clients & Testimonials"
        title="Trusted Where It Counts"
        intro="Manufacturers and distributors across pharma, automotive and consumer sectors rely on Drona to keep their supply chains moving."
      />

      {/* Recently onboarded — the glorify band */}
      <section className="section border-y border-sun-400/20 bg-ink-50">
        <div className="container-site">
          <SectionHeading
            eyebrow="Latest Wins"
            title="Newest Partners on Board"
            intro="We’re proud to welcome two new names to the Drona family — the latest businesses to trust us with their supply chain."
            center
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {newWins.map((w) => (
              // Red is the badge, not the field. Two full red plates side by
              // side read as an alert band; a lacquer plate with one red
              // marker keeps the accent meaningful and the name the hero.
              <div key={w.name} className="deco-panel relative p-8 sm:p-9">
                <span className="inline-flex items-center gap-2.5 bg-brand-500 px-4 py-2 font-display text-[10px] font-medium uppercase tracking-[0.22em] text-white">
                  <Icon name="check" className="h-3 w-3" />
                  Newly Onboarded
                </span>
                <h3 className="deco-display mt-7 text-2xl">{w.name}</h3>
                <p className="mt-3 font-display text-[10px] font-medium uppercase tracking-[0.26em] text-sun-400">{w.sector}</p>
                <div className="deco-rule mt-6" aria-hidden="true" />
                <p className="mt-6 leading-[1.8] text-ink-600">{w.win}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client logo strip */}
      <section className="section">
        <div className="container-site">
          <SectionHeading eyebrow="Our Clients" title="Companies We Work With" center />
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 items-stretch gap-4 sm:grid-cols-3">
            {/* Client marks are mounted on white enamel wells inside the shared
                brass frame so mixed source artwork stays crisp and consistent. */}
            {clients.map((c) => (
              <div key={c.name} className="deco-panel group p-2.5">
                <div className="flex h-28 items-center justify-center border border-ink-100 bg-white px-6 transition-colors duration-300 group-hover:bg-sun-50">
                  <ClientLogo
                    name={c.name}
                    src={c.logo}
                    className="max-h-14 w-auto max-w-[80%] object-contain sm:max-h-16"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-y border-sun-400/20 bg-ink-50">
        <div className="container-site">
          <SectionHeading eyebrow="Testimonials" title="What Our Clients Say" center />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.quote} className="deco-panel flex flex-col p-8">
                <Icon name="quote" className="h-7 w-7 text-sun-400" />
                <blockquote className="mt-6 flex-1 text-sm leading-[1.8] text-ink-600">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 border-t border-sun-400/20 pt-5">
                  <p className="display text-xs text-ink-900">{t.name}</p>
                  <p className="mt-1.5 font-display text-[10px] uppercase tracking-[0.2em] text-ink-500">{t.company}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <SectionHeading eyebrow="Case Studies" title="Results in the Field" center />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {caseStudies.map((c) => (
              <div key={c.title} className="deco-panel flex flex-col p-8">
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((tag) => (
                    <span key={tag} className="border border-sun-400/30 px-3 py-1.5 font-display text-[9px] font-medium uppercase tracking-[0.18em] text-sun-400">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="display mt-6 text-base text-ink-900">{c.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-[1.8] text-ink-600">{c.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Become our next success story." buttonLabel="Start a Conversation" />
    </>
  );
}
