import Icon from './Icons';

// -- Signature: the Chain Frieze --------------------------------------------
// Five stations on one brass spine. A gleam runs the spine top to bottom and
// lights each station as it passes - the way a departure board marks stops
// along a route. It carries the brand promise literally: every link of the
// chain, one accountable partner.
//
// The station numbers earn their place here and nowhere else on the site:
// this genuinely is a sequence, and the order is the information. Pure
// CSS/SVG, no JS, static-export safe.

const stages = [
  { icon: 'factory', name: 'In-Plant', role: 'Material flow and line feeding', metric: 'Live' },
  { icon: 'warehouse', name: 'Warehousing', role: 'Receive, store, dispatch', metric: '12 sites' },
  { icon: 'inventory', name: 'Inventory', role: 'Real-time accuracy', metric: '99.9%' },
  { icon: 'package', name: 'Packaging', role: 'Protect, label, palletise', metric: 'Ready' },
  { icon: 'truck', name: 'Last-Mile', role: 'Pan-India delivery', metric: 'On time' },
];

export default function HeroChain() {
  return (
    <div className="relative mx-auto w-full max-w-[30rem]">
      {/* Terminal plate: a Deco double keyline framing the whole frieze. */}
      {/* A solid plate, so the frieze reads as an instrument mounted on the
          wall rather than an overlay floating on the sunburst. */}
      <div className="relative border border-sun-600/35 bg-paper/95 p-6 shadow-[12px_12px_0_rgba(222,28,28,0.06)] sm:p-8">
        <div className="pointer-events-none absolute inset-[5px] border border-sun-400/12" aria-hidden="true" />

        {/* Departure header */}
        <div className="relative flex items-center justify-between font-display text-[10px] font-medium uppercase tracking-[0.3em] text-ink-500">
          <span className="inline-flex items-center gap-2.5">
            <span className="deco-lozenge" aria-hidden="true" />
            Goods in
          </span>
          <span className="text-sun-400">Route</span>
        </div>
        <div className="deco-rule mt-4" aria-hidden="true" />

        <div className="relative mt-7">
          {/* the spine */}
          <div
            className="chain-spine absolute bottom-6 top-6 w-px"
            style={{ left: '1.5rem' }}
            aria-hidden="true"
          />
          {/* travelling gleam */}
          <span
            className="chain-packet absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: '1.5rem' }}
            aria-hidden="true"
          >
            <span className="block h-2 w-2 rotate-45 bg-sun-300 shadow-[0_0_14px_3px_rgba(239,215,148,0.55)]" />
          </span>

          <ol className="relative flex flex-col gap-5">
            {stages.map((s, i) => (
              <li key={s.name} className="group relative flex items-center gap-5" style={{ '--i': i }}>
                {/* station = brass lozenge sitting on the spine */}
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center">
                  <span
                    className="stage-node absolute inset-0 rotate-45 border bg-paper"
                    style={{ borderColor: 'rgba(200,162,74,0.45)' }}
                    aria-hidden="true"
                  />
                  <Icon name={s.icon} className="relative h-5 w-5 text-sun-400" />
                </span>

                {/* station plate */}
                <div className="flex flex-1 items-center justify-between gap-3 border-b border-sun-400/15 pb-3 transition-colors duration-300 group-hover:border-sun-400/50">
                  <div className="min-w-0">
                    <p className="font-display text-[10px] font-medium uppercase tracking-[0.28em] text-sun-700">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <p className="mt-1.5 font-display text-sm font-semibold uppercase tracking-[0.1em] text-ink-900">
                      {s.name}
                    </p>
                    <p className="mt-1 truncate text-xs text-ink-500">{s.role}</p>
                  </div>
                  <span className="shrink-0 font-display text-[10px] font-medium uppercase tracking-[0.16em] text-ink-600">
                    {s.metric}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="deco-rule mt-7" aria-hidden="true" />
        <div className="relative mt-4 flex items-center justify-between font-display text-[10px] font-medium uppercase tracking-[0.3em] text-ink-500">
          <span className="text-sun-400">One partner</span>
          <span className="inline-flex items-center gap-2.5">
            Delivered
            <span className="deco-lozenge" aria-hidden="true" />
          </span>
        </div>
      </div>

      {/* Proof medallion - overlaps the plate corner */}
      <div className="animate-float absolute -bottom-7 -right-4 z-20 bg-paper p-px sm:-right-6">
        <div className="flex items-center gap-4 border border-sun-600 bg-paper px-5 py-4 shadow-[8px_8px_0_rgba(181,122,18,0.10)]">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
            <span className="absolute inset-0 rotate-45 border border-sun-400/50" aria-hidden="true" />
            <Icon name="shield" className="relative h-4 w-4 text-sun-400" />
          </span>
          <div>
            <p className="deco-display text-2xl leading-none">99.4%</p>
            <p className="mt-1.5 font-display text-[9px] font-medium uppercase tracking-[0.24em] text-ink-500">
              On-time delivery
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
