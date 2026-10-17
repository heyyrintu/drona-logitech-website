import Image from 'next/image';

// Official Drona Logitech artwork. Keeping it behind this shared component
// ensures header/footer sizing stays consistent and future logo revisions only
// require one asset swap.
export default function Logo({ className = 'h-14', priority = false }) {
  return (
    <span className="inline-flex max-w-full items-center">
      <Image
        src="/images/drona-logo.png"
        alt="Drona Logitech"
        width={749}
        height={232}
        priority={priority}
        sizes="(max-width: 640px) 160px, 210px"
        className={`${className} w-auto max-w-full object-contain`}
      />
    </span>
  );
}
