import Reveal from './Reveal';
import { SectionHeading } from './Sections';

/**
 * FAQ block.
 *
 * Deliberately rendered as native <details>/<summary> rather than a JS
 * accordion: the answer text is present in the HTML and readable without
 * scripting, which is what lets crawlers and answer engines extract it. A
 * client-side accordion that mounts answers on click would hide the exact
 * content this section exists to expose.
 *
 * Questions are <h3> so they sit correctly under the section <h2> — answer
 * engines lean on heading text to decide what a passage is answering.
 */
export default function FAQ({
  faqs,
  eyebrow = 'FAQ',
  title = 'Frequently Asked Questions',
  intro,
  className = 'section bg-ink-50',
}) {
  if (!faqs?.length) return null;

  return (
    <section className={className}>
      <div className="container-site">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />

        <div className="mt-14 max-w-3xl border-t border-sun-400/20">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 60}>
              <details className="group border-b border-sun-400/15 py-7" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left [&::-webkit-details-marker]:hidden">
                  <h3 className="display text-base leading-snug text-ink-900 transition-colors group-hover:text-sun-400">
                    {faq.q}
                  </h3>
                  {/* A brass lozenge that rotates to a cross when open -
                      the frame turning, not an icon swapping. */}
                  <span
                    aria-hidden="true"
                    className="relative mt-1 flex h-6 w-6 shrink-0 items-center justify-center border border-sun-400/40 font-display text-sm text-sun-400 transition-transform duration-300 group-open:rotate-45 group-hover:border-sun-400"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-5 max-w-2xl pr-10 text-[15px] leading-[1.8] text-ink-600">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
