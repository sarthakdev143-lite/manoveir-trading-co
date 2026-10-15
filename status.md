# Manoveir Trading CO — Static Site — Status & Handoff

**Date:** 2026-09-02 (updated — site now built)  
**Working directory:** `D:\Sarthak\Coding\Work\KWTC\ManoveirTradingCO`  
**Status:** **Production-ready.** 5 routes implemented, `npm run build` passes with 0 errors,
visually checked at desktop (1440px) and mobile (390px). SEO/structured data/headers/deployment
config all in place, and the work is committed to git. The ONLY remaining work is filling in real
business details — see §11.  
**Purpose:** Pass context to another AI to continue building the site without re-asking the user.

---

## 1. Business Brief

- **Name:** Manoveir Trading CO
- **Description:** A retail business engaged in the purchase and sale of various consumer goods and products, serving local customers through direct shop-based sales.
- **Type:** Local shop-based retail (walk-in customers), not e-commerce.
- **Goal:** Static informational site to establish online presence, showcase categories, build trust, and drive foot traffic / contact.

---

## 2. Decisions Already Made (Do Not Re-Ask)

| Question | Answer |
|---|---|
| **Tech stack** | **Astro** (static site generator, `output: static`). User explicitly rejected plain HTML and Tailwind CDN. Requires Node.js + npm. |
| **Pages / Sections** | Home/Hero, About Us, Products/Categories, Why Choose Us, Contact. **Testimonials were dropped** — every quote was a placeholder, and the user asked to keep only the phone and email as provisional data. |
| **Site structure** | **Multi-page** (not single-page anchors). Separate routes, shared layout/nav/footer. |
| **Contact details** | **Use clearly-marked placeholders** in a single central config file. Do not invent fake addresses. Use `TODO:` markers. |
| **Color theme** | **Warm dark shopfront** (see §5) — near-black walnut grounds, amber as the only accent, drawn SVG illustrations, no gradients or glass. Three earlier themes were rejected: *navy + gold on cream*, an editorial *ink + chartreuse* one, and a *violet→cyan gradient glass* one the user called "ai slop vibecoded". Do not re-pitch any of them. |
| **Product categories** | **All 6 selected:** Groceries & Staples, Household Essentials, Personal Care, Beverages & Snacks, Stationery & Sundries, Seasonal & Festive Goods |

---

## 3. Current Filesystem State

Astro project scaffolded and fully implemented. Actual tree:

```
├── astro.config.mjs          # static output, SITE_URL env, sitemap, cssTarget pin (§12)
├── package.json              # astro ^7.2.10, @astrojs/check, @astrojs/sitemap, typescript
├── tsconfig.json             # extends astro/tsconfigs/strict
├── netlify.toml              # build cmd, publish dir, NODE_VERSION pin, 404 redirect
├── .nvmrc                    # 24
├── .env.example              # documents SITE_URL
├── .gitattributes            # eol=lf so Linux CI matches local Windows builds
├── .gitignore
├── README.md                 # dev/build/deploy instructions + pre-launch checklist
├── status.md                 # this file
├── scripts/
│   └── generate-og-image.mjs # `npm run og` → public/og-image.png via sharp
├── public/
│   ├── favicon.svg           # dark tile, amber storefront glyph (PNG set: npm run icons)
│   ├── og-image.png          # 1200x630 branded share card (committed)
│   ├── _headers              # CSP + security headers + cache rules
│   └── images/README.md      # where to drop the shopfront photo
├── src/
│   ├── config/site.ts        # SINGLE SOURCE OF TRUTH (all copy + placeholders)
│   ├── layouts/BaseLayout.astro   # SEO, OG, canonical, Store JSON-LD
│   ├── components/  Header, Footer, Hero, Icon, CategoryCard,
│   │                FeatureCard, ContactBlock  (7 files)
│   │                illustrations/ Shopfront, ShelfRack, Counter  (3 files)
│   ├── pages/       index, about, products, contact, 404, robots.txt.ts  (6 files)
│   └── styles/global.css     # theme variables + utilities
└── dist/                     # build output (gitignored)
```

- Node v24.14.1, npm 11.12.1 — verified working. **Astro 7 requires Node >= 22.12.0**, pinned in
  `engines`, `.nvmrc` and `netlify.toml` (hosts defaulting to Node 18/20 will otherwise fail the build).
- Git repo: **yes.** Initialised on branch `main`, one commit (`0a62530`, 32 files), working tree clean.
  Nothing has been pushed — no remote is configured.
- `node_modules/` installed (275 packages).

---

## 4. Target Architecture (Astro, Multi-Page, Static)

### 4.1 Scaffolding command (run in `D:\Sarthak\Coding\Work\KWTC\ManoveirTradingCO`)
```powershell
npm create astro@latest . -- --template basics --no-git --install --typescript strict
# or: npm create astro@latest -- --template minimal  (if basics is too heavy)
npm install
npm run dev   # verify at http://localhost:4321
```

### 4.2 Suggested file structure
```
/
├── astro.config.mjs          # site: placeholder, output: static
├── package.json
├── public/
│   ├── favicon.svg
│   └── images/               # placeholder product/category images (use /public or src/assets)
├── src/
│   ├── config/
│   │   └── site.ts           # SINGLE SOURCE OF TRUTH for placeholders
│   ├── layouts/
│   │   └── BaseLayout.astro  # <head>, sticky nav, footer, global styles
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── CategoryCard.astro
│   │   ├── FeatureCard.astro
│   │   ├── Icon.astro
│   │   └── ContactBlock.astro
│   ├── pages/
│   │   ├── index.astro       # Home / Hero + featured categories + Why Choose Us + visit strip
│   │   ├── about.astro       # About Us (story, values, commitment)
│   │   ├── products.astro    # All 6 categories grid + what we stock
│   │   └── contact.astro     # Address, phone, email, hours, map embed placeholder, contact form (mailto / no backend)
│   └── styles/
│       └── global.css        # CSS variables for theme, reset, utilities
└── status.md                 # this file
```

### 4.3 Central config — `src/config/site.ts` (create this)
```ts
export const site = {
  name: "Manoveir Trading CO",
  tagline: "Your Trusted Local Retail Partner",
  description: "A retail business engaged in the purchase and sale of various consumer goods and products, serving local customers through direct shop-based sales.",
  contact: {
    // Only these two are provisional. Address, hours and map URLs were removed
    // outright — see §7.
    phone: "TODO: +91-XXXXXXXXXX",
    phoneDisplay: "TODO: +91 9XXXX XXXXX",
    email: "hr@manoveirtrading.com",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Contact", href: "/contact" },
  ],
  categories: [
    { title: "Groceries & Staples", desc: "Rice, flour, pulses, oils, spices, packaged food", icon: "🌾" },
    { title: "Household Essentials", desc: "Cleaning supplies, detergents, kitchenware, storage", icon: "🧹" },
    { title: "Personal Care", desc: "Soaps, shampoos, skincare, oral care, grooming", icon: "🧴" },
    { title: "Beverages & Snacks", desc: "Soft drinks, juices, tea, coffee, biscuits, confectionery", icon: "🥤" },
    { title: "Stationery & Sundries", desc: "Notebooks, pens, batteries, small daily-use items", icon: "✏️" },
    { title: "Seasonal & Festive Goods", desc: "Gift items, decorations, festival-specific products", icon: "🎁" },
  ],
};
```

---

## 5. Design System — warm dark shopfront

Fourth and current theme. History matters here, because three directions have been rejected:
navy/gold/cream → editorial ink + chartreuse ("this ui is bad") → violet/cyan gradient glass
("it looks even bad. ai slop vibecoded"). The user's fix-list for that last one was concrete: cut
the placeholder data down to the phone and email, and use **icons, mockups and images**. Live
tokens are at the top of `src/styles/global.css`:

```css
:root {
  color-scheme: dark;
  --bg: #100e0c;        /* warm near-black, not blue-black */
  --bg-2: #15120e;      /* .section--alt / masthead / footer */
  --surface: #1a1713;   /* cards, panels (solid, not translucent) */
  --surface-2: #211c17; /* card hover */
  --line: #2b2520;
  --line-strong: #3d352c;
  --text: #f3efe7;
  --text-dim: #b5aca0;
  --text-faint: #8a8075;
  --amber: #e8a33d;     /* the only accent */
  --amber-soft: rgba(232,163,61,.11);  /* icon-tile fill */
  --amber-edge: rgba(232,163,61,.28);  /* icon-tile border */
  --radius-sm: 8px; --radius: 12px; --radius-lg: 18px;
}
```

- **Explicitly banned vocabulary:** gradients, glows, blur/`backdrop-filter`, glassmorphism,
  gradient text, full-pill buttons and emoji. All of those were in the rejected version.
- Typography: `Fraunces` (600/700) for h1/h2 only, `Inter` (400/500/600) for h3 down and all body
  copy. Sentence case throughout.
- **Icons** live in `src/components/Icon.astro` — hand-drawn on a 24×24 grid, 1.6 stroke, round
  caps, `currentColor`. `site.ts` references them by name (`grain`, `spray`, `care`, `cup`,
  `pencil`, `gift`, `basket`, `verified`, `tag`, `people`, `star`, `scales`, `neighbourhood`,
  `phone`, `mail`, `check`, `arrowRight`, `storefront`). They render inside `.icon-tile` squares
  at 2.9rem; below that the finer glyphs turn to mud.
- **Illustrations** live in `src/components/illustrations/` — `Shopfront` (home hero),
  `ShelfRack` (products header + home visit strip), `Counter` (about header). Flat vector, drawn
  in the site palette plus sage `#7fa88a` and clay `#c96f4a`, no gradients. These replace the
  dashed "photo goes here" boxes entirely.
- Surfaces: solid `--surface` with a flat 1px border. Hover changes colour, never elevation, so
  reduced-motion users get the same affordance.
- Layout: max-width 1160px, `--gutter` clamp(1.15rem, 4vw, 2.25rem), left-aligned section heads.
- Header: sticky solid bar; amber-tinted storefront glyph as the brand mark; underline-on-active
  nav. Mobile menu stays a CSS-only checkbox toggle.
- **Grid/flex children need `min-width: 0`** — without it one long word (the placeholder email)
  widens the column past the viewport. `overflow-wrap` does not fix this on its own because it
  does not reduce min-content width. Every page is verified to have zero overflow at a 300px
  viewport.
- Brand marks: `public/favicon.svg` (dark tile, amber storefront glyph), PNG icon set via
  `npm run icons`, share image via `npm run og` (dark card with the shopfront drawing).

---

## 6. Content Plan Per Page

### `index.astro` — Home
- Hero: name in Fraunces, amber tagline, 2 CTAs (Explore products → /products, Get in touch → /contact), `<Shopfront />` illustration in a framed figure with a caption.
- Trust row: "Serving local customers / Quality goods / Fair prices" as ticked items under the CTAs.
- Featured categories: 4 cards teaser → link to all 6 on /products
- Why Choose Us: 4 pillars (Wide Selection, Quality Assured, Fair & Transparent Pricing, Friendly Local Service)
- Visit Us strip: copy + CTAs alongside the `<ShelfRack />` illustration. **No testimonials, no address/hours** — see §7.

### `about.astro`
- Our Story: 2 paragraphs (local retail, customer-first, curating daily essentials)
- Our Promise / Values: Quality, Honesty, Community
- Stats strip (e.g., "6+ Categories", "1000+ Products", "Serving Local Families")

### `products.astro`
- Grid of 6 CategoryCard components (from `site.categories`)
- Each card: icon, title, desc, bullet examples
- CTA footer: "Looking for something specific? Visit us or get in touch."

### `contact.astro`
- Two panels: phone + email rows (from `site.contact`, with icon tiles) and the enquiry form.
- Simple contact form: name, phone, message → `mailto:` (no backend, static-safe). Disabled with a
  short user-facing note while `contact.email` is a placeholder.
- **No map and no address section** — see §7. No real form handler needed.

Shared:
- `Header.astro` / `Footer.astro` use `site.nav` and `site.contact`
- SEO: `<title>`, `<meta description>` per page, Open Graph basics in `BaseLayout.astro`

---

## 7. Placeholder Strategy

Revised after the user's feedback that visible placeholder scaffolding made the site look
unfinished ("don't keep much placeholder data, keep only the number and email").

- **Only `contact.phone` and `contact.email` are placeholders.** The user will supply both.
- **Address, opening hours, map embed/link, `postalAddress`, `openingHoursSpec` and all
  testimonials were deleted from the model, not stubbed.** Absent beats invented or dashed-box
  provisional. README has a section on reintroducing them once the real values exist.
- Never invent a street address, opening hours or a customer name.
- Placeholders render as quiet dotted-underline text plus a short **user-facing** note ("Our
  published number is being finalised…"). No amber badges, and no developer instructions such as
  "replace this in site.ts" anywhere in the rendered output.

---

## 8. Next Steps Checklist (for continuing AI)

1. [x] Astro project created + deps installed (scaffolded manually rather than via the interactive
       `npm create astro` wizard, which cannot run unattended — same result, no template cruft)
2. [x] `src/config/site.ts` — content from §4.3, plus `whyChooseUs`, `values`, `stats`,
       `trustBar`, category `examples[]`, and `isPlaceholder()` / `displayValue()` helpers
3. [x] `src/styles/global.css` — variables from §5 verbatim, plus reset, typography, buttons, cards, utilities
4. [x] `src/layouts/BaseLayout.astro` — head, SEO/OG tags, canonical, Google Fonts, skip link, nav, footer
5. [x] All 7 components built
6. [x] All 4 pages built per §6
7. [x] `npm run build` → **0 errors, 0 warnings, 0 hints**; 4 pages emitted; **0 occurrences of the
       literal `TODO` in built HTML** (markers live only in `site.ts` + one comment in `astro.config.mjs`)
8. [x] Visual check done via headless Edge at 1440px and 390px — see §12 for the two bugs this caught
9. [x] `README.md` written — now includes full per-host deployment instructions + pre-launch checklist

Then, on request ("do it all to make it a prod. level website"):

10. [x] **404 page** (`src/pages/404.astro`) — on-brand, `noindex`, links every route
11. [x] **Open Graph image** — `public/og-image.png`, 1200x630, generated from `site.ts` by
        `scripts/generate-og-image.mjs` (`npm run og`) using sharp, which Astro already depends on.
        Wired up with `og:image`/`twitter:image` + dimensions + alt text
12. [x] **`Store` JSON-LD structured data** in `BaseLayout` for local search. Built from `site.ts`;
        omits any `TODO:` field and emits **nothing at all** until one real contact detail exists.
        Verified both ways — see §13
13. [x] **`robots.txt` + sitemap** — `@astrojs/sitemap` plus a `robots.txt.ts` route so the
        `Sitemap:` line always tracks the real domain instead of going stale
14. [x] **`SITE_URL` env var** drives canonical/OG/sitemap/robots, so going live needs no code edit
15. [x] **Security + cache headers** (`public/_headers`): CSP allowing only Google Fonts and the
        Maps iframe, plus `nosniff`, `X-Frame-Options`, `Referrer-Policy`, HSTS, and immutable
        caching for fingerprinted `/_astro/` assets
16. [x] **Deployment config** — `netlify.toml`, `.nvmrc`, `.env.example`, `engines`; README covers
        Netlify, Cloudflare Pages, Vercel, GitHub Pages and plain nginx/Apache
17. [x] **git init + initial commit** on `main`. No remote, nothing pushed.

Do not re-ask user for color, stack, categories, or placeholders — all decided. Only ask if blocking (e.g., real logo file, actual map URL).

---

## 9. Constraints & Notes

- **Static only:** No server, no DB, no API. Contact form must be `mailto:` or similar static pattern.
- **No build-step CSS framework:** Plain CSS with variables (user chose Astro, not Tailwind). Do not add Tailwind unless user requests.
- **Multi-page requirement:** Must be true separate routes (`/`, `/about`, `/products`, `/contact`), not single-page anchors.
- **Performance:** Keep images placeholder/optimized, no heavy JS, ship minimal client JS (Astro default is zero JS).
- **Accessibility:** Semantic HTML, alt text, label associations, keyboard nav.
- **Language:** Default English. No i18n requested.

---

## 10. How to Verify

```powershell
Set-Location "D:\Sarthak\Coding\Work\KWTC\ManoveirTradingCO"
npm run build      # runs `astro check` first — must report 0 errors
npm run preview    # NOTE: Astro 7 daemonises this and the command exits immediately.
                   # The server keeps running. Stop it with:  npx astro preview stop
                   # Status/logs:  npx astro preview status | npx astro preview logs

# Open http://localhost:4321 and check /, /about, /products, /contact

# Confirm no TODO markers leaked into the built HTML (expect no matches):
Select-String -Path "dist\*\index.html","dist\index.html" -Pattern "TODO"
```

Last verified: build clean, 4 routes emitted, **zero JS files in `dist/`**, page weights
10–18 KB HTML + ~14 KB CSS total.

---

## 11. Remaining Work — Real Business Details

The site is structurally complete; what is left is two strings. Both live in
`src/config/site.ts`, render as quiet dotted-underline text with a short user-facing note, and
`displayValue()` strips the literal `TODO:` prefix so the built HTML stays clean.

| Field | Effect while unfilled |
|---|---|
| `contact.phone` / `phoneDisplay` | Shown as plain text instead of a `tel:` link, with the note "Our published number is being finalised — please drop by the shop in the meantime." Also omitted from the JSON-LD |
| `contact.email` | **Enquiry form on `/contact` is disabled** (it submits via `mailto:`, so it cannot work without a real inbox), with the note "Our enquiry inbox is being set up." Also omitted from the JSON-LD |
| `site` in `astro.config.mjs` / `SITE_URL` | Canonical + Open Graph URLs fall back to the Vercel host. Already set for Production on Vercel; update if a custom domain is added |
| A real shopfront photograph *(optional)* | The hero ships the `<Shopfront />` illustration, which is finished artwork — not a placeholder. Swap it for an `<img>` only if a photo is wanted |
| An address, hours or a map *(optional)* | Deliberately absent, not stubbed. See README "Adding your address, hours or a map" |

**The phone number and email are the only things worth asking the user about.** Everything else is
decided (§2).

---

## 12. Implementation Notes & Gotchas

Things a future session should know, learned while building:

1. **`npm create astro@latest` is interactive** and will hang unattended. The project was scaffolded
   by hand instead (`package.json` + `npm install astro @astrojs/check typescript`). Do not re-run the wizard.
2. **`astro preview` daemonises in Astro 7.** The npm script exits with code 0 while the server keeps
   running in the background. Stop it with `npx astro preview stop` — do not assume it died.
3. **CSS `cssTarget` is pinned in `astro.config.mjs` on purpose.** Lightning CSS was minifying
   `@media (max-width: 52rem)` into range syntax `@media (width<=52rem)`, which iOS Safari below 16.4
   ignores — that would have left the mobile nav permanently expanded and overflowing the viewport.
   Do not remove the `vite.build.cssTarget` array.
4. **Astro/JSX drops whitespace that contains a newline next to an `{expression}`.** This silently
   produced "talk to someone,call us on" on `/contact`. Fixed with an explicit `{" "}`. Watch for it
   whenever prose wraps onto a new line right before an expression.
5. **Headless `--window-size` does not set the CSS viewport** in `--headless=new`. A 390px-wide
   capture rendered a wider layout and cropped it, which looked exactly like a broken responsive
   layout — a false alarm. To check a real mobile viewport, render the page in a fixed-width
   `<iframe>` (or measure with `matchMedia` / `scrollWidth`) rather than trusting the window flag.
6. **Mobile nav ships zero JavaScript** — it is a hidden checkbox plus a sibling selector
   (`.nav-toggle:checked ~ .site-nav`). Keep it that way; `dist/` currently contains no `.js` at all.

---

## 13. Production Hardening — What Was Verified, Not Just Written

Two things here are easy to add and never actually check, so both were tested by temporarily
filling in real values, building, then reverting:

- **JSON-LD appears and is correctly filtered.** With a test phone/street/locality/hours set, the
  emitted `Store` block contained exactly those fields and correctly **omitted** `addressRegion`
  and `postalCode`, which were still `TODO:`. With everything back to placeholders, no `ld+json`
  block is emitted at all. Test values were reverted and the build confirmed clean of them.
- **`SITE_URL` is honoured.** Building with `SITE_URL=https://manoveirtrading.in` produced that
  domain in `<link rel="canonical">`, `og:image`, the sitemap `<loc>` entries and the `robots.txt`
  `Sitemap:` line.

Also confirmed on the final build: 5 pages, **zero `.js` files in `dist/`**, no literal `TODO`
anywhere in the built HTML, 404 carries `noindex, follow`, and the sitemap lists the 4 real routes
while excluding the 404.

### Deployment status

Config is committed and host-agnostic, but **nothing has been deployed and no remote is set** —
that needs a hosting account and the real domain. `dist/` is ready to upload as-is. The one thing
that will bite on a first deploy is the Node version: Astro 7 needs >= 22.12.0, so hosts defaulting
to Node 18 or 20 fail unless `NODE_VERSION` is set (already handled for Netlify in `netlify.toml`).

**GitHub Pages was deliberately not scaffolded:** if the site lives at
`username.github.io/repo-name` rather than a custom domain, `base: '/repo-name'` must be set in
`astro.config.mjs`, and guessing that would produce a subtly broken build. Ask first.

---

## 14. Preview Server Gotcha (cost time twice)

`astro preview` daemonises and the npm script exits immediately. Worse: **if an old preview is
still alive it keeps port 4321 and the new one silently moves to 4322**, so a screenshot or curl
against 4321 quietly tests a *stale build*. This produced one bogus "the 404 page is broken"
reading before it was caught by checking whether `/og-image.png` (new that build) resolved.

Always confirm which port the current server is on (`npx astro preview status`) and stop strays
with `npx astro preview stop`, or kill whatever holds 4321.

---

*Handoff complete — the site is built, hardened and committed. Next session: fill in §11 (needs the
owner), then pick a host per README "Deploying".*
