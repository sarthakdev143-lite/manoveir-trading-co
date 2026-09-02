# Manoveir Trading CO — Static Site — Status & Handoff

**Date:** 2026-09-02 (updated — site now built)  
**Working directory:** `D:\Sarthak\Coding\Work\KWTC\ManoveirTradingCO`  
**Status:** **Built and verified.** All 4 pages implemented, `npm run build` passes with 0 errors,
visually checked at desktop (1440px) and mobile (390px). Remaining work is filling in real business
details — see §11.  
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
| **Pages / Sections** | **ALL selected:** Home/Hero, About Us, Products/Categories, Why Choose Us, Contact + Location, Testimonials |
| **Site structure** | **Multi-page** (not single-page anchors). Separate routes, shared layout/nav/footer. |
| **Contact details** | **Use clearly-marked placeholders** in a single central config file. Do not invent fake addresses. Use `TODO:` markers. |
| **Color theme** | **Deep navy + warm gold** — navy base, gold accents, cream backgrounds. Classic/trustworthy trading-company feel. |
| **Product categories** | **All 6 selected:** Groceries & Staples, Household Essentials, Personal Care, Beverages & Snacks, Stationery & Sundries, Seasonal & Festive Goods |

---

## 3. Current Filesystem State

Astro project scaffolded and fully implemented. Actual tree:

```
├── astro.config.mjs          # output: static, cssTarget pinned (see §12)
├── package.json              # astro ^7.2.10, @astrojs/check, typescript
├── tsconfig.json             # extends astro/tsconfigs/strict
├── .gitignore
├── README.md                 # dev/build instructions + placeholder checklist
├── status.md                 # this file
├── public/
│   ├── favicon.svg           # navy tile, gold "M"
│   └── images/README.md      # where to drop the shopfront photo
├── src/
│   ├── config/site.ts        # SINGLE SOURCE OF TRUTH (all copy + placeholders)
│   ├── layouts/BaseLayout.astro
│   ├── components/  Header, Footer, Hero, CategoryCard,
│   │                FeatureCard, TestimonialCard, ContactBlock  (7 files)
│   ├── pages/       index, about, products, contact  (4 files)
│   └── styles/global.css     # theme variables + utilities
└── dist/                     # build output (gitignored)
```

- Node v24.14.1, npm 11.12.1 — verified working.
- Git repo: **still No.** Not initialised — commit/push was not requested.
- `node_modules/` installed (269 packages).

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
│   │   ├── TestimonialCard.astro
│   │   └── ContactBlock.astro
│   ├── pages/
│   │   ├── index.astro       # Home / Hero + highlights + Why Choose Us teaser + Testimonials teaser
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
    address: "TODO: Shop No., Street, Area, City, State - PIN",
    phone: "TODO: +91-XXXXXXXXXX",
    phoneDisplay: "TODO: +91 9XXXX XXXXX",
    email: "TODO: contact@manoveirtrading.example",
    hours: "TODO: Mon–Sat 9:00 AM – 9:00 PM, Sun 10:00 AM – 6:00 PM",
    mapEmbedUrl: "TODO: Google Maps embed URL",
    mapLink: "TODO: Google Maps share link",
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

## 5. Design System — Deep Navy + Warm Gold

Create CSS variables in `src/styles/global.css`:

```css
:root {
  --navy-900: #0f2040; /* header, footer, headings */
  --navy-700: #1a335c;
  --navy-600: #243a63;
  --gold-500: #c49a3c; /* primary accent, CTA, underline */
  --gold-400: #d4a84b;
  --gold-100: #fdf6e3; /* light accent bg */
  --cream-50: #fdfbf7; /* page bg */
  --cream-100: #f7f1e6;
  --slate-600: #475569;
  --slate-800: #1e293b;
  --radius: 14px;
  --shadow: 0 6px 24px rgba(15,32,64,0.08);
}
```

- Typography: System font stack or `Inter` + `Playfair Display` for headings (load via Google Fonts). No extra build deps.
- Layout: max-width ~1120px, centered, 16–24px gutters, mobile-first.
- Header: sticky, cream/navy, gold CTA button (Visit Our Shop → /contact).
- Cards: white, rounded, subtle shadow, gold top border on hover.
- Footer: navy bg, cream text, gold links.

---

## 6. Content Plan Per Page

### `index.astro` — Home
- Hero: large heading "Manoveir Trading CO", subheading from tagline, 2 CTAs (Explore Products → /products, Find Us → /contact), hero image placeholder (shopfront/goods).
- Trust bar: "Serving local customers • Quality goods • Fair prices"
- Featured categories: 3–4 cards teaser → link to /products
- Why Choose Us: 3–4 pillars (Wide Selection, Quality Assured, Fair & Transparent Pricing, Friendly Local Service)
- Testimonials teaser: 2–3 quotes → link to testimonials section on same page or dedicated block
- Visit Us strip: hours + address placeholder + map link

### `about.astro`
- Our Story: 2 paragraphs (local retail, customer-first, curating daily essentials)
- Our Promise / Values: Quality, Honesty, Community
- Stats strip (e.g., "6+ Categories", "1000+ Products", "Serving Local Families")

### `products.astro`
- Grid of 6 CategoryCard components (from `site.categories`)
- Each card: icon, title, desc, bullet examples
- CTA footer: "Looking for something specific? Visit us or get in touch."

### `contact.astro`
- Two-column: contact details (address/phone/email/hours from `site.contact`) + map placeholder (iframe with `site.contact.mapEmbedUrl` or dashed box saying "Map placeholder — replace embed URL in site.ts")
- Simple contact form: name, phone, message → `mailto:` (no backend, static-safe) + note "or call us directly"
- No real form handler needed.

Shared:
- `Header.astro` / `Footer.astro` use `site.nav` and `site.contact`
- SEO: `<title>`, `<meta description>` per page, Open Graph basics in `BaseLayout.astro`

---

## 7. Placeholder Strategy

- Every real-world value that is unknown must be `TODO:` prefixed and sourced from `src/config/site.ts`.
- Do not invent a fake street address. Use the exact strings shown in §4.3.
- Map: use a grey dashed placeholder div with instructions if `mapEmbedUrl` still contains `TODO`.

---

## 8. Next Steps Checklist (for continuing AI)

1. [x] Astro project created + deps installed (scaffolded manually rather than via the interactive
       `npm create astro` wizard, which cannot run unattended — same result, no template cruft)
2. [x] `src/config/site.ts` — content from §4.3, plus `whyChooseUs`, `values`, `stats`,
       `testimonials`, `trustBar`, category `examples[]`, and `isPlaceholder()` / `displayValue()` helpers
3. [x] `src/styles/global.css` — variables from §5 verbatim, plus reset, typography, buttons, cards, utilities
4. [x] `src/layouts/BaseLayout.astro` — head, SEO/OG tags, canonical, Google Fonts, skip link, nav, footer
5. [x] All 7 components built
6. [x] All 4 pages built per §6
7. [x] `npm run build` → **0 errors, 0 warnings, 0 hints**; 4 pages emitted; **0 occurrences of the
       literal `TODO` in built HTML** (markers live only in `site.ts` + one comment in `astro.config.mjs`)
8. [x] Visual check done via headless Edge at 1440px and 390px — see §12 for the two bugs this caught
9. [x] `README.md` written. **`git init` intentionally skipped** — not requested.

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

The site is structurally complete; what is left is data only. Every item below is a string in
`src/config/site.ts`. Placeholders render inside an **amber dashed badge** so they are impossible to
miss on the page, and `displayValue()` strips the literal `TODO:` prefix so the built HTML stays clean.

| Field | Effect while unfilled |
|---|---|
| `contact.address` | Amber badge on `/contact`, home visit-strip, footer |
| `contact.phone` / `phoneDisplay` | Rendered as plain text instead of a `tel:` link |
| `contact.email` | **Enquiry form on `/contact` is disabled** with a visible "Form inactive" notice (it submits via `mailto:`, so it cannot work without a real address) |
| `contact.hours` | Amber badge in footer, home strip, `/contact` |
| `contact.mapEmbedUrl` | `/contact` shows a dashed "Map placeholder" box; set it and a live `<iframe>` map renders instead |
| `contact.mapLink` | "Open in Maps" / directions links are hidden entirely |
| `testimonials[].name` / `.detail` | Quote bodies are generic-but-plausible drafts; **names/details are placeholders.** Either replace with real attributed feedback or delete the entries — do not publish invented names as real customers |
| `site` in `astro.config.mjs` | Canonical + Open Graph URLs point at `example.com`. Set before deploy |
| `public/images/shopfront.jpg` | Hero shows a dashed photo placeholder |

**These are the only things worth asking the user about.** Everything else is decided (§2).

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

*Handoff complete — the site is built. Next session: fill in §11, then deploy `dist/` to any static host.*
