import './globals.css';
import { Jost, Poiret_One } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { site, hasPublicOrigin } from '../lib/site';
import { graph, organizationSchema, websiteSchema, jsonLdProps, ogImage } from '../lib/seo';

// Self-hosted at build time by next/font, so no request ever leaves for
// fonts.googleapis.com on the critical path.
//
// Jost is a Futura revival, and Futura (1927) is the geometric sans of the
// Deco era itself - it carries headings, UI and body, with hierarchy coming
// from scale, weight and letterspacing the way period print did.
const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

// Poiret One is the Deco moment: 1920s Parisian geometry, single weight, far
// too fine below ~30px. It is loaded for the largest type only - page titles,
// section titles, the closing line - via the .deco-display class.
const poiret = Poiret_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-deco',
  display: 'swap',
});

export const metadata = {
  ...(hasPublicOrigin ? { metadataBase: new URL(site.url) } : {}),
  title: {
    default: `${site.shortName} — Integrated Logistics & Supply Chain Solutions`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.shortName,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: 'Logistics',
  keywords: site.knowsAbout,
  // max-image-preview:large is what allows a full-size thumbnail in Google
  // results and AI Overviews; max-snippet:-1 removes the snippet length cap so
  // answer engines may quote a full passage.
  robots: {
    index: hasPublicOrigin,
    follow: hasPublicOrigin,
    googleBot: {
      index: hasPublicOrigin,
      follow: hasPublicOrigin,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: site.shortName,
    locale: 'en_IN',
    title: `${site.shortName} — Integrated Logistics & Supply Chain Solutions`,
    description: site.description,
    ...(hasPublicOrigin ? { url: site.url, images: [ogImage] } : {}),
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.shortName} — Integrated Logistics & Supply Chain Solutions`,
    description: site.description,
    ...(hasPublicOrigin ? { images: [ogImage.url] } : {}),
  },
};

export const viewport = {
  themeColor: '#fffcf7',
  width: 'device-width',
  initialScale: 1,
};

// One graph for the whole site. Page-level schema (Service, FAQPage,
// BreadcrumbList, BlogPosting) references these @ids rather than restating the
// organisation, so every fact resolves to a single entity.
const siteGraph = graph(organizationSchema(), websiteSchema());

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${jost.variable} ${poiret.variable}`}>
      <body className="flex min-h-screen flex-col bg-paper">
        <script {...jsonLdProps(siteGraph)} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-brand-500 focus:px-5 focus:py-3 focus:font-display focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.2em] focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
