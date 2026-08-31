import Link from 'next/link';
import Icon from './Icons';
import Reveal from './Reveal';
import CountUp from './CountUp';

export function PageHero({ eyebrow, title, intro, ghost }) {
  return (
    <section className="surface-hall relative overflow-hidden border-b border-sun-400/15 py-24 sm:py-32">
      <div className="grid-texture-light absolute inset-0 opacity-30" aria-hidden="true" />
      {ghost && (
        <p
          className="deco-display text-ghost-dark pointer-events-none absolute -right-4 top-1/2 hidden -translate-y-1/2 select-none whitespace-nowrap text-[10rem] leading-none lg:block"
          aria-hidden="true"
        >
          {ghost}
        </p>
      )}
      <div className="container-site relative">
        <Reveal className="max-w-3xl">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="deco-display mt-7 text-4xl leading-[1.15] sm:text-6xl">{title}</h1>
          <div className="deco-rule mt-8 max-w-md" aria-hidden="true" />
          {intro && <p className="mt-8 max-w-2xl text-lg leading-[1.8] text-ink-600">{intro}</p>}
        </Reveal>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, intro, center = false }) {
  return (
    <Reveal className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className={`eyebrow ${center ? 'justify-center' : ''}`}>{eyebrow}</p>}
      <h2 className="deco-display mt-6 text-3xl leading-[1.2] sm:text-5xl">{title}</h2>
      {intro && <p className="mt-6 text-lg leading-[1.8] text-ink-600">{intro}</p>}
    </Reveal>
  );
}

export function ServiceCard({ service, index = 0, anchor = false }) {
  return (
    <Reveal delay={index * 80} className="h-full">
      <div
        id={anchor ? service.slug : undefined}
        className="deco-panel group relative flex h-full flex-col p-8 transition-colors duration-300 hover:bg-inlay"
      >
        {/* Brass lozenge holding the service icon - the same station mark
            used on the value chain, so the vocabulary stays consistent. */}
        <span className="relative flex h-14 w-14 items-center justify-center">
          <span
            className="absolute inset-0 rotate-45 border border-sun-400/45 transition-colors duration-300 group-hover:border-sun-400"
            aria-hidden="true"
          />
          <Icon name={service.icon} className="relative h-6 w-6 text-sun-400" />
        </span>

        {/* The heading is the link, so the anchor text is the service name -
            a descriptive anchor pointing at the page we want ranking for that
            term. The stretched-link span makes the whole card clickable
            without nesting interactive elements. */}
        <h3 className="display mt-7 text-lg text-ink-900">
          <Link href={`/services/${service.slug}/`} className="transition-colors hover:text-sun-400">
            <span className="absolute inset-0 z-10" aria-hidden="true" />
            {service.title}
          </Link>
        </h3>
        <p className="mt-4 text-sm leading-[1.75] text-ink-600">{service.summary}</p>

        <ul className="mt-6 flex-1 space-y-3 text-sm text-ink-600">
          {service.points.map((p) => (
            <li key={p} className="flex items-start gap-3">
              <span className="deco-lozenge mt-[0.45rem]" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>

        <span className="mt-8 inline-flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.2em] text-sun-400">
          Explore
          <span className="deco-chevron transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Reveal>
  );
}

export function CTABand({ title, text, buttonLabel = 'Talk to Our Team', href = '/contact/' }) {
  return (
    <section className="night-surface relative overflow-hidden border-y border-sun-400/20">
      {/* A pale fan and red axis close the page like a daylight station hall. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(100deg, rgba(255,252,247,0.98) 0%, rgba(255,252,247,0.84) 42%, rgba(255,252,247,0.24) 100%), repeating-conic-gradient(from 200deg at 55% 125%, rgba(181,122,18,0.14) 0deg 1.4deg, transparent 1.4deg 7deg)',
        }}
        aria-hidden="true"
      />
      <div className="container-site relative flex flex-col items-start justify-between gap-10 py-20 sm:py-24 lg:flex-row lg:items-center">
        <Reveal>
          <div className="deco-rule w-28" aria-hidden="true" />
          <h2 className="deco-display mt-7 max-w-2xl text-3xl leading-[1.2] sm:text-4xl">{title}</h2>
          {text && <p className="mt-5 max-w-2xl leading-[1.8] text-ink-600">{text}</p>}
        </Reveal>
        <Reveal delay={120}>
          <Link href={href} className="btn-sun shrink-0">
            {buttonLabel}
            <span className="deco-chevron !border-ink-900" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function StatStrip({ stats }) {
  return (
    // One continuous brass-ruled register rather than four floating cards:
    // the figures read as a single instrument panel.
    <div className="grid grid-cols-2 border-l border-t border-sun-400/20 lg:grid-cols-4">
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 90} className="h-full">
          {/* The figure sits in a fixed band so the brass rules line up across
              all four cells, whether the value is one line or two. */}
          <div className="group flex h-full flex-col border-b border-r border-sun-400/20 p-8 text-center transition-colors duration-300 hover:bg-lacquer">
            <p className="deco-display flex min-h-[5rem] items-center justify-center text-4xl leading-none text-sun-400 sm:min-h-[7rem] sm:text-5xl">
              <CountUp value={s.value} />
            </p>
            <div className="deco-rule mx-auto mt-6 w-16" aria-hidden="true" />
            <p className="mt-6 font-display text-[10px] font-medium uppercase leading-relaxed tracking-[0.24em] text-ink-500">
              {s.label}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
