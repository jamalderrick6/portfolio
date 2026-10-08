# Derrick Omanwa: portfolio

Next.js 16 (App Router, Cache Components) + TypeScript + Tailwind CSS v4. Deploys to Vercel.

## Develop

```bash
npm install
cp .env.example .env.local   # optional for local dev, see "Contact form"
npm run dev
```

## Editing content

| What | Where |
| --- | --- |
| Name, tagline, GitHub/LinkedIn URLs, CV path | `data/site.ts` |
| Projects (home grid + `/work/[slug]` pages) | `data/projects.ts` |
| Project images | `public/projects/` (placeholders come from `scripts/make-placeholders.mjs`) |
| CV | `public/derrick-omanwa-cv.pdf` (currently a placeholder) |
| Section copy | `components/sections/*.tsx` |

Adding a project to `data/projects.ts` creates its page, OG image, and sitemap entry. Nothing else needs changing.

## Contact form

`components/contact-form.tsx` posts JSON to `app/api/contact/route.ts`, which validates the input and sends the message through [Resend](https://resend.com).

- **Spam protection:** a hidden honeypot field (`company`) plus a minimum fill time (2s). Submissions that trip either get a fake success response and are never sent.
- **Rate limit:** 5 submissions per IP per 10 minutes (`lib/rate-limit.ts`), answered with a 429 and a friendly message. It's in-memory, so it limits each serverless instance separately rather than globally.
- **Env vars:** `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` (an address on a domain verified in Resend).
- **Without a key in development,** the route logs the message to the server console and reports success, so the UI can be tested. **In production,** a missing key returns 503 with a friendly error.

## Deploy (Vercel)

1. Import the repo in Vercel (framework preset: Next.js).
2. Add the env vars above. `NEXT_PUBLIC_SITE_URL` is optional: without it, metadata and the sitemap use `VERCEL_PROJECT_PRODUCTION_URL`.
3. Deploy.

## SEO bits

`app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` / `twitter-image.tsx` (site card), `app/work/[slug]/opengraph-image.tsx` (per-project card, prerendered at build), `app/icon.svg`, `app/apple-icon.tsx`, `app/favicon.ico`, and Person JSON-LD on the home page.
