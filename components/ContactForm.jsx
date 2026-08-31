'use client';

import { useState } from 'react';
import { site } from '../lib/site';

const WEB3FORMS_ACCESS_KEY = (process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '').trim();

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const canSubmit = Boolean(WEB3FORMS_ACCESS_KEY || site.email);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    if (!canSubmit) return;

    if (!WEB3FORMS_ACCESS_KEY) {
      // Fallback: open the user's email client pre-filled
      const body = encodeURIComponent(
        `Name: ${data.name}\nCompany: ${data.company}\nPhone: ${data.phone}\nEmail: ${data.email}\n\n${data.message}`
      );
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        'Business Inquiry — ' + data.company
      )}&body=${body}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, ...data }),
      });
      setStatus(res.ok ? 'sent' : 'error');
      if (res.ok) form.reset();
    } catch {
      setStatus('error');
    }
  }

  // Fields are quiet ivory wells with a brass keyline that brightens on focus.
  const field =
    'w-full border border-sun-600/25 bg-paper px-4 py-3.5 text-sm text-ink-900 placeholder-ink-400 outline-none transition-colors focus:border-brand-500';

  const label = 'mb-2 block font-display text-[10px] font-medium uppercase tracking-[0.24em] text-ink-500';

  return (
    <form onSubmit={handleSubmit} className="deco-panel p-7 sm:p-10">
      <p className="eyebrow">Project enquiry</p>
      <h2 className="deco-display mt-5 text-2xl sm:text-3xl">Tell us what needs to move</h2>
      <div className="deco-rule mt-7 max-w-xs" aria-hidden="true" />
      <p className="mt-7 max-w-xl text-sm leading-[1.8] text-ink-600">
        Share the service, locations, and operating challenge. We use these details only to prepare a practical response.
      </p>
      <div className="mt-9 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Full Name *
          </label>
          <input id="name" name="name" required placeholder="Your name" className={field} />
        </div>
        <div>
          <label htmlFor="company" className={label}>
            Company *
          </label>
          <input id="company" name="company" required placeholder="Company name" className={field} />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email *
          </label>
          <input id="email" name="email" type="email" required placeholder="you@company.com" className={field} />
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            Phone
          </label>
          <input id="phone" name="phone" type="tel" placeholder="+91" className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={label}>
            How can we help? *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="Tell us about your requirement — service type, locations, volumes…"
            className={field}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'sending' || !canSubmit}
        aria-describedby={!canSubmit ? 'contact-unavailable' : undefined}
        className="btn-primary mt-9 w-full disabled:cursor-not-allowed disabled:bg-ink-300 disabled:text-ink-500 sm:w-auto"
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>

      {!canSubmit && (
        <p id="contact-unavailable" className="mt-6 border-l-2 border-sun-400 bg-sun-50 p-5 text-sm leading-[1.8] text-ink-700">
          Enquiry delivery is being configured for the new Drona Logitech launch. The form is available for preview, but sending is temporarily disabled.
        </p>
      )}

      {status === 'sent' && (
        <p className="mt-6 border-l-2 border-sun-400 bg-sun-50 p-5 text-sm leading-[1.8] text-ink-800">
          Thank you — your message has been sent. We&apos;ll get back to you shortly.
        </p>
      )}
      {status === 'error' && (
        <p className="mt-6 border-l-2 border-brand-500 bg-brand-50 p-5 text-sm leading-[1.8] text-brand-900">
          Something went wrong. Please try again shortly{site.email ? ` or email us at ${site.email}` : ''}.
        </p>
      )}
    </form>
  );
}
