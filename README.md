# Angular Atelier — website

Static Angular site for [angular-atelier.ch](https://angular-atelier.ch), replacing the
previous WordPress.com site. Built with Angular 22 (standalone, zoneless, signals, new
control-flow syntax), prerendered at build time to plain HTML/CSS/JS — no Node server
required to serve it.

## Running locally

```bash
npm install
npm start
```

Opens a dev server at `http://localhost:4200`.

## Building for production

```bash
npm run build
```

This runs `scripts/fetch-blog-posts.mjs` first (via the `prebuild` npm lifecycle script),
then `ng build`, which prerenders every route (`/`, `/blog`, `/datenschutz`, `/not-found`) to
static HTML, then `scripts/postbuild-404.mjs` (via `postbuild`) copies the prerendered
`/not-found` page to `404.html` at the output root. Output is written to
`dist/angular-atelier-ng/browser/` — deploy that folder's contents as-is to any static host
(Hostpoint, Netlify, Cloudflare Pages, GitHub Pages, etc. — see "Deploying to Hostpoint"
below for this project's actual host). No server-side runtime is needed; the
`dist/angular-atelier-ng/server/` bundle Angular also emits is not used for this static
deployment and can be ignored.

To sanity-check the static output locally without any Node server:

```bash
npx serve -s dist/angular-atelier-ng/browser
```

## Swapping the contact form endpoint

The contact form posts to [Formspree](https://formspree.io). The endpoint is a single
constant in [`src/app/core/config/app.constants.ts`](src/app/core/config/app.constants.ts):

```ts
export const FORMSPREE_ENDPOINT = 'REPLACE_ME_FORMSPREE_ENDPOINT';
```

Replace it with your real Formspree form URL (`https://formspree.io/f/xxxxxxx`) once the
account exists. The submission logic lives behind an abstract `ContactSubmissionService`
([`src/app/core/services/contact-submission.service.ts`](src/app/core/services/contact-submission.service.ts)),
so swapping to Netlify Forms (or any other backend) later only means adding a new
implementation class and changing the `useClass` provider in
[`src/app/app.config.ts`](src/app/app.config.ts) — no component changes required.

## Missing assets

Three photos referenced by the About Us section were not available when this site was
built and are currently rendered as clearly labelled placeholder boxes
(`shared/ui/placeholder-photo`):

- Team photo of Elisa & Rafael (old filename: `facetune_26-08-2025-20-37-50.jpeg`)
- Portrait of Elisa Schnabel (old filename: `facetune_13-10-2025-11-06-51-2.jpg`)
- Portrait of Rafael Kapp (old filename: `pxl_20251011_134324932.portrait-edit.jpg`)

Once these files are available, drop them into `public/images/portraits/` and replace the
three `<app-placeholder-photo>` usages in
[`src/app/pages/home/sections/about-us/about-us.html`](src/app/pages/home/sections/about-us/about-us.html)
(and the one in [`blog-card.html`](src/app/shared/ui/blog-card/blog-card.html), which reuses
the same portraits as author avatars) with plain `<img>` tags — each call site has a `TODO`
comment marking the swap.

All other illustrations from the old site were supplied and are in place under
`public/images/`.

## Blog content

`scripts/fetch-blog-posts.mjs` fetches Rafael's and Elisa's Medium RSS feeds at build time,
merges and sorts them, and writes `src/app/data/blog-posts.generated.json`, which is
imported directly into the blog teaser and `/blog` archive components. This keeps the
deployed site fully static (no runtime network calls, no CORS issues), but means **the post
list is only as fresh as the last build**. If a feed is unreachable at build time, the
script logs a warning and continues rather than failing the build.

Run it manually with:

```bash
npm run fetch:blog
```

**Follow-up suggestion (not implemented in this pass):** add a scheduled GitHub Actions
workflow (e.g. a daily cron) that runs `npm run build` and redeploys, so new Medium posts
show up automatically without a manual deploy.

## Datenschutzerklärung

The `/datenschutz` page currently contains a **draft** privacy policy (standard Swiss
revDSG-style boilerplate), clearly marked as unreviewed both on the page itself and in a
code comment in
[`datenschutz-page.ts`](src/app/pages/datenschutz/datenschutz-page.ts). It must not go live
before a lawyer reviews it. Replace the content in
[`datenschutz-page.html`](src/app/pages/datenschutz/datenschutz-page.html) with the final,
approved text when available.

## Deploying to Hostpoint

This site is hosted on Hostpoint (Swiss shared Apache hosting) — traditional hosting, not a
git-connected static host. There is no CI/CD in this pass; you build locally and upload the
output yourself.

1. Build: `npm run build`. This also runs `postbuild` automatically
   (`scripts/postbuild-404.mjs`), which copies the prerendered `/not-found` page to
   `404.html` at the output root.
2. Upload the **contents** of `dist/angular-atelier-ng/browser/` (not the folder itself) to
   the web root Hostpoint assigns your domain — the exact folder name varies by plan, check
   the Hostpoint control panel (often something like `/htdocs` or a domain-specific
   subfolder). Use an FTP/SFTP client such as [FileZilla](https://filezilla-project.org/) or
   [Cyberduck](https://cyberduck.io/), or Hostpoint's own web-based file manager.
3. The output includes a `.htaccess` (forces HTTPS, enables gzip/Brotli compression, sets
   long-lived cache headers for hashed JS/CSS/SVG and no-cache for HTML, and points
   `ErrorDocument 404` at `404.html`) and `404.html` itself — both need to land in the same
   web root as `index.html`. Double-check Hostpoint's Apache module support
   (`mod_rewrite`/`mod_headers`/`mod_deflate`/`mod_brotli`/`mod_expires`) in their control
   panel or support docs if any of these don't seem to take effect; plans vary, and each
   directive is wrapped in an `<IfModule>` so it silently no-ops rather than erroring if a
   module is missing.

**Follow-up (not implemented this pass):** a GitHub Actions workflow that builds and
deploys via FTP/SFTP automatically on push, using repo secrets for the Hostpoint
credentials, would remove the manual upload step. Worth doing once the manual process is
comfortable.

**Before cutting the live domain over:**

- **Back up** the current WordPress installation on Hostpoint first — both the files and the
  database export — before touching anything.
- If the Hostpoint plan supports it, **test on a staging subdomain** first (point a
  subdomain's document root at the new build) rather than pointing the main domain straight
  at it.

## Design tokens

Shared colors, spacing, and type scale live in `src/styles/_tokens.scss` as CSS custom
properties. The brand color (`--color-brand-ink: #2f0064`) is the exact hex sampled from the
logo SVG; the rose/lavender accents are sampled from the hero illustration and are
decorative/background use only — verify contrast before using them for text.
