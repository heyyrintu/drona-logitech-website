import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-site flex flex-col items-center py-24 text-center">
        <p className="deco-display text-7xl text-sun-400 sm:text-8xl">404</p>
        <div className="deco-rule mt-8 w-48" aria-hidden="true" />
        <h1 className="deco-display mt-8 text-2xl sm:text-3xl">This route does not exist</h1>
        <p className="mt-6 max-w-md leading-[1.8] text-ink-600">
          The page you are looking for has moved or was never here. Head back to the main line.
        </p>
        <Link href="/" className="btn-primary mt-10">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
