import { site, stats } from '../../lib/site';
import { pageMeta, graph, breadcrumbSchema, jsonLdProps } from '../../lib/seo';
import { PageHero, SectionHeading, CTABand, StatStrip } from '../../components/Sections';
import Icon from '../../components/Icons';

export const metadata = pageMeta({
  title: 'About Us',
  description: `Learn about ${site.name} — founded in ${site.founded} by logistics veterans with 20+ years of experience, delivering integrated supply chain solutions across India.`,
  path: '/about/',
});

const aboutSchema = graph(breadcrumbSchema([{ name: 'About Us', path: '/about/' }]));

const values = [
  {
    icon: 'shield',
    title: 'Integrity',
    text: 'Transparent operations, honest commitments and auditable processes our clients can rely on.',
  },
  {
    icon: 'chart',
    title: 'Excellence',
    text: 'Continuous improvement in every process — measured, reviewed and refined.',
  },
  {
    icon: 'clock',
    title: 'Responsiveness',
    text: '24/7 support and rapid escalation paths, because supply chains never sleep.',
  },
];

export default function AboutPage() {
  return (
    <>
      <script {...jsonLdProps(aboutSchema)} />
      <PageHero
        ghost="ABOUT" eyebrow="About Us"
        title="Logistics Veterans. Modern Execution."
        intro={`${site.shortName} was founded in ${site.founded} by industry leaders carrying 20+ years of hands-on logistics experience — with one goal: to bring every link of the supply chain together under one accountable partner.`}
      />

      <section className="section">
        <div className="container-site grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Our Story"
              title="From Day One, Built for Integration"
            />
            <div className="mt-8 space-y-5 leading-[1.85] text-ink-600">
              <p>
                Most companies stitch together separate vendors for warehousing,
                in-plant operations, packaging and distribution — and absorb the
                friction in between. Drona Logitech was created to remove that
                friction entirely.
              </p>
              <p>
                Headquartered in {site.address.city}, we operate as a single
                accountable partner across the full supply chain: inside your
                plant, inside the warehouse, and all the way to the last mile.
                Our teams combine disciplined, process-driven operations with
                modern technology for real-time visibility and data-driven
                decision making.
              </p>
              <p>
                Since inception we have grown rapidly, serving manufacturers and
                distributors across pharmaceuticals, automotive and consumer
                sectors with a pan-India delivery network.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            {/* Mission takes the one signal-red plate; vision answers it in
                lacquer and brass. Two plates, one conversation. */}
            <div className="relative bg-brand-500 p-8 text-white sm:p-9">
              <span className="pointer-events-none absolute inset-4 border border-white/25" aria-hidden="true" />
              <div className="relative">
                <h3 className="font-display text-[10px] font-medium uppercase tracking-[0.32em]">Our Mission</h3>
                <div className="mt-4 h-px w-full bg-white/25" aria-hidden="true" />
                <p className="mt-6 text-lg leading-[1.8] text-white">
                To simplify supply chains by integrating every logistics function
                under one roof — executed with precision, transparency and care.
                </p>
              </div>
            </div>
            <div className="deco-panel p-8 sm:p-9">
              <h3 className="font-display text-[10px] font-medium uppercase tracking-[0.32em] text-sun-400">Our Vision</h3>
              <div className="deco-rule mt-5" aria-hidden="true" />
              <p className="mt-6 text-lg leading-[1.8] text-ink-600">
                To be India&apos;s most trusted integrated logistics partner —
                the company manufacturers call first when reliability matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-y border-sun-400/20 bg-ink-50">
        <div className="container-site">
          <SectionHeading eyebrow="Our Values" title="How We Operate" center />
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="deco-panel group p-8 text-center transition-colors duration-300 hover:bg-inlay">
                <span className="relative mx-auto flex h-14 w-14 items-center justify-center">
                  <span
                    className="absolute inset-0 rotate-45 border border-sun-400/45 transition-colors duration-300 group-hover:border-sun-400"
                    aria-hidden="true"
                  />
                  <Icon name={v.icon} className="relative h-6 w-6 text-sun-400" />
                </span>
                <h3 className="display mt-7 text-base text-ink-900">{v.title}</h3>
                <p className="mt-4 text-sm leading-[1.75] text-ink-600">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-site">
          <StatStrip stats={stats} />
        </div>
      </section>

      <CTABand title="Want to know how we'd run your supply chain?" />
    </>
  );
}
