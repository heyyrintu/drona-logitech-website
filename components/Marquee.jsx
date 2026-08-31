/**
 * Seamless infinite ticker. Content is duplicated and the track slides exactly
 * -50% so the loop has no visible jump. GPU-accelerated via transform.
 */
export default function Marquee({ items, className = '', itemClassName = '' }) {
  const row = [...items, ...items];
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee items-center will-change-transform">
        {row.map((item, i) => (
          <span key={i} className={`flex items-center whitespace-nowrap px-7 ${itemClassName}`}>
            {item}
            {/* Brass lozenge as the separator, matching the site-wide unit mark. */}
            <span className="ml-14 h-1.5 w-1.5 rotate-45 bg-current opacity-40" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
