import Link from 'next/link';
import Image from 'next/image';
import { pageMeta } from '../../lib/seo';

export const metadata = pageMeta({
  title: 'BIMI Logo Verification',
  description:
    'Official BIMI-compatible brand mark for Drona Logitech email authentication and verified inbox display.',
  path: '/bimi/',
});

const checks = [
  ['Format', 'SVG Tiny PS 1.2'],
  ['Canvas', 'Square · 1254 × 1254'],
  ['Profile', 'baseProfile="tiny-ps"'],
  ['Delivery', 'Public HTTPS asset'],
];

export default function BimiPage() {
  return (
    <>
      <section className="surface-hall relative overflow-hidden border-b border-sun-400/20 py-20 sm:py-28">
        <div className="grid-texture-light absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="container-site relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <p className="eyebrow">Brand Identity</p>
              <h1 className="deco-display mt-7 text-4xl leading-[1.12] sm:text-6xl">
                BIMI logo verification
              </h1>
              <div className="deco-rule mt-8 max-w-md" aria-hidden="true" />
              <p className="mt-8 max-w-2xl text-lg leading-[1.8] text-ink-600">
                This is the official BIMI-compatible brand mark for Drona Logitech. Mail providers can retrieve the square SVG from the permanent public endpoint below.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href="/bimi/logo.svg" className="btn-primary" target="_blank" rel="noopener noreferrer">
                  Open SVG logo
                  <span className="deco-chevron !border-white" aria-hidden="true" />
                </a>
                <Link href="/" className="btn-secondary">
                  Return home
                </Link>
              </div>
            </div>

            <div className="deco-panel relative bg-paper p-5 sm:p-8">
              <div className="pointer-events-none absolute inset-[6px] border border-sun-400/15" aria-hidden="true" />
              <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-white">
                <Image
                  src="/bimi/logo.svg"
                  alt="Official Drona Logitech BIMI brand mark"
                  width={1254}
                  height={1254}
                  unoptimized
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="eyebrow">Published Endpoint</p>
              <h2 className="deco-display mt-6 text-3xl leading-[1.2] sm:text-5xl">Direct. Stable. Verifiable.</h2>
              <p className="mt-6 max-w-xl leading-[1.8] text-ink-600">
                The logo is served as a standalone SVG rather than an HTML page, which allows BIMI-aware inbox providers to request the artwork directly.
              </p>
            </div>

            <div className="deco-panel p-7 sm:p-9">
              <p className="font-display text-[10px] font-medium uppercase tracking-[0.28em] text-brand-600">
                Production asset URL
              </p>
              <a
                href="https://dronalogitech.com/bimi/logo.svg"
                className="mt-4 block break-all font-display text-base font-medium text-ink-900 underline decoration-sun-400 underline-offset-4 transition-colors hover:text-brand-600 sm:text-lg"
              >
                https://dronalogitech.com/bimi/logo.svg
              </a>

              <dl className="mt-9 grid border-l border-t border-sun-400/20 sm:grid-cols-2">
                {checks.map(([label, value]) => (
                  <div key={label} className="border-b border-r border-sun-400/20 p-5">
                    <dt className="font-display text-[9px] font-medium uppercase tracking-[0.24em] text-sun-400">
                      {label}
                    </dt>
                    <dd className="mt-2 text-sm font-medium text-ink-800">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
