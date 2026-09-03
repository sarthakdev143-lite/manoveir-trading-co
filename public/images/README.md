# Images

Drop real photographs here and reference them from `/images/<file>` in the site.

**Nothing here is required.** The site's artwork is hand-built SVG in
`src/components/illustrations/` — `Shopfront.astro` (home hero), `ShelfRack.astro` (products
header and home visit strip) and `Counter.astro` (about header). Those are finished drawings, not
placeholders, so the site is complete without any photography.

Optional swaps, if real photographs become available:

- `shopfront.jpg` — exterior shot. Replace `<Shopfront />` in `src/components/Hero.astro` with an
  `<img>` inside the existing `.hero__figure` frame.
- `interior.jpg` — counter or shelves. Could replace `<Counter />` in `src/pages/about.astro` or
  `<ShelfRack />` in `src/pages/products.astro`.

Keep images optimised (WebP or compressed JPEG, ~1600px wide max) — the site ships zero client JS
and should stay fast.
