'use client';

import { useState } from 'react';
import { site } from '../lib/site';

// Web3Forms access keys are client-side by design: they only authorise posting
// to the one inbox they were issued for, so shipping this in the bundle via
// NEXT_PUBLIC_ is the intended usage, not a leak.
const WEB3FORMS_ACCESS_KEY = (process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '').trim();
const ENDPOINT = 'https://api.web3forms.com/submit';

export default function ContactForm() {
  // idle | sending | sent | error
  const [status, setStatus] = useState('idle');
  const [errorDetail, setErrorDetail] = useState('');

  // Delivery needs the key. Without it the form deliberately does NOT fall back
  // to a mailto: handoff - a visitor with no mail client configured would click
  // Send, see nothing happen, and the enquiry would be lost silently. A visible
  // disabled state with a direct address is the honest failure.
  const canSubmit = Boolean(WEB3FORMS_ACCESS_KEY);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit || status === 'sending') return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    // Honeypot. Real people never see the field, so anything in it is a bot.
    // Reporting success keeps the bot from retrying with a different shape.
    if (data.botcheck) {
      setStatus('sent');
      form.reset();
      return;
    }

    setStatus('sending');
    setErrorDetail('');

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          // Give the notification email a useful subject and a working reply
          // address, so a reply goes to the enquirer rather than to Web3Forms.
          subject: `Enquiry from ${data.company || data.name} - ${site.shortName} website`,
          from_name: `${site.shortName} website`,
          replyto: data.email,
          name: data.name,
          company: data.company,
          email: data.email,
          phone: data.phone || 'Not provided',
          message: data.message,
        }),
      });

      // Web3Forms reports outcome in the body, not only in the status line -
      // a rejected key can still come back 200.
      const result = await res.json().catch(() => null);

      if (res.ok && result?.success) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
        setErrorDetail(result?.message || `Request failed (${res.status}).`);
      }
    } catch {
      setStatus('error');
      // The sentence this joins already says the message did not send.
      setErrorDetail('Check your connection.');
    }
  }

  // Web3Forms messages arrive without a terminator ("Invalid Access Key"), so
  // normalise it before dropping it into a sentence.
  const detailSentence = errorDetail
    ? /[.!?]$/.test(errorDetail)
      ? errorDetail
      : `${errorDetail}.`
    : '';

  // Fields are quiet ivory wells with a brass keyline that brightens on focus.
  const field =
    'w-full border border-sun-600/25 bg-paper px-4 py-3.5 text-sm text-ink-900 placeholder-ink-400 outline-none transition-colors focus:border-brand-500';

  const label = 'mb-2 block font-display text-[10px] font-medium uppercase tracking-[0.24em] text-ink-500';

  return (
    <form onSubmit={handleSubmit} className="deco-panel p-7 sm:p-10" noValidate={false}>
      <p className="eyebrow">Project enquiry</p>
      <h2 className="deco-display mt-5 text-2xl sm:text-3xl">Tell us what needs to move</h2>
      <div className="deco-rule mt-7 max-w-xs" aria-hidden="true" />
      <p className="mt-7 max-w-xl text-sm leading-[1.8] text-ink-600">
        Share the service, locations, and operating challenge. We use these details only to prepare a practical response.
      </p>

      {/* Honeypot. Off-screen rather than display:none so it stays fillable by
          bots that skip hidden inputs, and removed from the tab order and the
          accessibility tree so no real person can reach it. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="botcheck">Leave this field empty</label>
        <input id="botcheck" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-9 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="company" className={label}>
            Company *
          </label>
          <input
            id="company"
            name="company"
            required
            autoComplete="organization"
            placeholder="Company name"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91"
            className={field}
          />
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
            placeholder="Tell us about your requirement - service type, locations, volumes..."
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
        {status === 'sending' ? 'Sending' : 'Send Message'}
      </button>

      {/* One live region for every outcome, so a screen reader announces the
          result instead of the visitor having to hunt for it. */}
      <div aria-live="polite">
        {!canSubmit && (
          <p
            id="contact-unavailable"
            className="mt-6 border-l-2 border-sun-400 bg-sun-50 p-5 text-sm leading-[1.8] text-ink-700"
          >
            This form is not sending yet. Email us at{' '}
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-brand-600 underline decoration-brand-300 underline-offset-4"
            >
              {site.email}
            </a>{' '}
            and we will pick it up from there.
          </p>
        )}

        {status === 'sent' && (
          <p className="mt-6 border-l-2 border-sun-400 bg-sun-50 p-5 text-sm leading-[1.8] text-ink-800">
            Message sent. We will reply to the address you gave us, usually within one working day.
          </p>
        )}

        {status === 'error' && (
          <p
            role="alert"
            className="mt-6 border-l-2 border-brand-500 bg-brand-50 p-5 text-sm leading-[1.8] text-brand-900"
          >
            The message did not send. {detailSentence} Try again, or email us at{' '}
            <a
              href={`mailto:${site.email}`}
              className="font-medium underline decoration-brand-300 underline-offset-4"
            >
              {site.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
