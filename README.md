# Drona Logitech Website

Corporate website built with Next.js (static export) + Tailwind CSS.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build for deployment

```bash
npm run build
```

The static site is generated in the `out/` folder. Upload the **contents** of `out/` to your hosting (cPanel File Manager → public_html, or via FTP). That's the entire deployment.

## Editing content

| What | Where |
|---|---|
| Contact details, services, industries, stats, nav | `lib/site.js` (single source of truth) |
| Page content | `app/<page>/page.jsx` |
| Blog posts | Add a `.md` file in `content/posts/` (copy an existing one as a template), then rebuild |
| Colors/fonts | `tailwind.config.js` |
| Logo | Replace the temporary mark inside `components/Logo.jsx` when the official logo is supplied |
| Photos | Drop into `public/images/` and reference as `/images/filename.jpg` |

## Launch configuration

The unconfigured build is intentionally non-indexable and does not publish a contact address. Add these build-time variables in Coolify when the final values are verified:

- `NEXT_PUBLIC_SITE_URL` — canonical public origin, for example `https://example.com`
- `NEXT_PUBLIC_CONTACT_EMAIL` — public enquiry email and mail-client fallback
- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` — optional Web3Forms delivery key

Submission precedence is Web3Forms, then the configured email fallback, then a disabled staging state.

## TODOs before launch

- [ ] Confirm public URL, email, phone, and full street address
- [ ] Replace the temporary wordmark tile with the official logo
- [ ] Replace leadership placeholders in `app/about/page.jsx`
- [ ] Replace client logo placeholders and testimonials in `app/clients/page.jsx`
- [ ] Add Web3Forms key for the contact form
- [ ] Add real operations photos
