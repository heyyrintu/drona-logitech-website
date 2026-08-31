import { site, hasPhone, hasEmail, formatAddress } from '../../lib/site';
import { pageMeta, graph, breadcrumbSchema, jsonLdProps, abs, ORG_ID } from '../../lib/seo';
import { PageHero } from '../../components/Sections';
import Icon from '../../components/Icons';
import ContactForm from '../../components/ContactForm';

export const metadata = pageMeta({
  title: 'Contact Us',
  description: `Get in touch with ${site.shortName} for logistics and supply chain inquiries. Headquartered in ${site.address.city}, ${site.address.country}.`,
  path: '/contact/',
});

const contactSchema = graph(
  {
    '@type': 'ContactPage',
    '@id': `${abs('/contact/')}#webpage`,
    url: abs('/contact/'),
    name: `Contact ${site.shortName}`,
    description: `Contact details and enquiry form for ${site.name}.`,
    mainEntity: { '@id': ORG_ID },
  },
  breadcrumbSchema([{ name: 'Contact', path: '/contact/' }])
);

export default function ContactPage() {
  return (
    <>
      <script {...jsonLdProps(contactSchema)} />
      <PageHero
        ghost="CONTACT" eyebrow="Contact"
        title="Let's Talk Logistics"
        intro="Tell us about your operation — volumes, locations, pain points — and we'll come back with a practical proposal."
      />

      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <div className="deco-panel flex items-start gap-5 p-6">
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center">
                <span className="absolute inset-0 rotate-45 border border-sun-400/45" aria-hidden="true" />
                <Icon name="pin" className="relative h-4 w-4 text-sun-400" />
              </span>
              <div>
                <h3 className="display text-sm text-ink-900">Head Office</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {formatAddress()}
                </p>
              </div>
            </div>
            {hasEmail ? (
              <div className="deco-panel flex items-start gap-5 p-6">
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center">
                  <span className="absolute inset-0 rotate-45 border border-sun-400/45" aria-hidden="true" />
                  <Icon name="mail" className="relative h-4 w-4 text-sun-400" />
                </span>
                <div>
                  <h3 className="display text-sm text-ink-900">Email</h3>
                  <a href={`mailto:${site.email}`} className="mt-2 block text-sm text-sun-400 transition-colors hover:text-sun-300">
                    {site.email}
                  </a>
                </div>
              </div>
            ) : (
              <div className="deco-panel flex items-start gap-5 p-6">
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center">
                  <span className="absolute inset-0 rotate-45 border border-sun-400/45" aria-hidden="true" />
                  <Icon name="mail" className="relative h-4 w-4 text-sun-400" />
                </span>
                <div>
                  <h3 className="display text-sm text-ink-900">New contact channel</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">The Drona Logitech enquiry address will be added before launch.</p>
                </div>
              </div>
            )}
            {hasPhone && (
              <div className="deco-panel flex items-start gap-5 p-6">
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center">
                  <span className="absolute inset-0 rotate-45 border border-sun-400/45" aria-hidden="true" />
                  <Icon name="phone" className="relative h-4 w-4 text-sun-400" />
                </span>
                <div>
                  <h3 className="display text-sm text-ink-900">Phone</h3>
                  <a
                    href={`tel:${site.phone.replace(/\s/g, '')}`}
                    className="mt-2 block text-sm text-sun-400 transition-colors hover:text-sun-300"
                  >
                    {site.phone}
                  </a>
                </div>
              </div>
            )}
            {/* Deliberately quiet. On this page the red belongs to the submit
                button - the action - not to the opening hours. */}
            <div className="deco-panel p-6">
              <h3 className="font-display text-[10px] font-medium uppercase tracking-[0.32em] text-sun-400">Business Hours</h3>
              <div className="mt-4 h-px w-full bg-sun-400/20" aria-hidden="true" />
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-ink-500">Operations</dt>
                  <dd className="text-ink-800">24/7</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-ink-500">Office</dt>
                  <dd className="text-right text-ink-800">Mon to Sat, 9:00 to 18:00 IST</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
