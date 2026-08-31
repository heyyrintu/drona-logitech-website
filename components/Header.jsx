'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { nav } from '../lib/site';
import Logo from './Logo';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.replace(/\/$/, ''));

  return (
    // A bright terminal entablature: ivory paper, a brass hairline and a
    // red marker rule under the active destination.
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'border-sun-600/30 bg-paper/95 shadow-[0_8px_30px_rgba(75,16,21,0.06)] backdrop-blur' : 'border-sun-600/20 bg-paper/90 backdrop-blur'
      }`}
    >
      <div className="container-site flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Drona Logitech - home" onClick={() => setOpen(false)}>
          <Logo className="h-12 sm:h-14" priority />
        </Link>

        <nav className="hidden items-center lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`group relative px-4 py-2 font-display text-[11px] font-medium uppercase tracking-[0.2em] transition-colors ${
                isActive(item.href) ? 'text-brand-600' : 'text-ink-700 hover:text-brand-600'
              }`}
            >
              {item.label}
              <span
                className={`absolute inset-x-4 bottom-0 h-px origin-left bg-brand-500 transition-transform duration-300 ${
                  isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </Link>
          ))}
          <Link href="/contact/" className="btn-primary ml-6 !px-6 !py-3">
            Get a Quote
          </Link>
        </nav>

        <button
          className="flex h-11 w-11 items-center justify-center text-brand-600 ring-1 ring-inset ring-sun-600/40 transition hover:bg-brand-500 hover:text-white lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-navigation" className="border-t border-sun-600/20 bg-paper lg:hidden">
          <div className="container-site flex flex-col py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`flex items-center gap-3 border-b border-sun-400/10 py-4 font-display text-xs font-medium uppercase tracking-[0.2em] ${
                  isActive(item.href) ? 'text-brand-600' : 'text-ink-700'
                }`}
              >
                <span className={isActive(item.href) ? 'deco-lozenge' : 'deco-lozenge opacity-25'} aria-hidden="true" />
                {item.label}
              </Link>
            ))}
            <Link href="/contact/" onClick={() => setOpen(false)} className="btn-primary my-5">
              Get a Quote
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
