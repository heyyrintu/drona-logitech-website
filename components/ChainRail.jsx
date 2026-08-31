import { services } from '../lib/site';
import Icon from './Icons';

// -- Horizontal echo of the Chain Frieze -------------------------------------
// The six services as one connected thread: a gleam runs the rail left to
// right, lighting each station. Reinforces "every link of the chain, one
// partner." The rail shows on lg+; mobile gets a clean wrapped station row.

export default function ChainRail() {
  return (
    <div className="relative">
      <div className="flex items-center justify-between font-display text-[10px] font-medium uppercase tracking-[0.3em] text-ink-500">
        <span className="inline-flex items-center gap-2.5">
          <span className="deco-lozenge" aria-hidden="true" />
          One partner
        </span>
        <span className="inline-flex items-center gap-2.5">
          End to end
          <span className="deco-chevron" aria-hidden="true" />
        </span>
      </div>

      <div className="relative mt-8">
        {/* connecting rail + gleam - desktop only */}
        <div className="pointer-events-none absolute inset-x-8 top-6 hidden lg:block" aria-hidden="true">
          <div className="chain-rail relative h-px -translate-y-1/2">
            <span className="chain-packet-x absolute top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="block h-2 w-2 rotate-45 bg-sun-300 shadow-[0_0_14px_3px_rgba(239,215,148,0.55)]" />
            </span>
          </div>
        </div>

        <ul className="relative grid grid-cols-3 gap-y-9 sm:grid-cols-6">
          {services.map((s, i) => (
            <li key={s.slug} className="flex flex-col items-center text-center" style={{ '--i': i }}>
              <span className="relative flex h-12 w-12 items-center justify-center">
                <span
                  className="rail-node absolute inset-0 rotate-45 border bg-paper"
                  style={{ borderColor: 'rgba(200,162,74,0.45)' }}
                  aria-hidden="true"
                />
                <Icon name={s.icon} className="relative h-5 w-5 text-sun-400" />
              </span>
              <span className="mt-4 max-w-[7.5rem] font-display text-[10px] font-medium uppercase leading-relaxed tracking-[0.16em] text-ink-600">
                {s.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
