/**
 * Generates the Open Graph share image at public/og-image.png (1200x630).
 *
 * Run with:  npm run og
 *
 * The PNG is committed to the repo, so this only needs re-running when the
 * business name, tagline or brand colours change. Rasterised with sharp, which
 * Astro already depends on — no extra tooling.
 *
 * Once a real shopfront photograph exists, prefer compositing that behind the
 * text instead of the flat dark background.
 */

import { readFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const OUT = resolve(root, "public/og-image.png");

// Pull the name and tagline straight from the config so this cannot drift.
const siteTs = readFileSync(resolve(root, "src/config/site.ts"), "utf8");
const read = (key) => {
  const match = siteTs.match(new RegExp(`^\\s*${key}:\\s*"([^"]+)"`, "m"));
  if (!match) throw new Error(`Could not read "${key}" from src/config/site.ts`);
  return match[1];
};

const name = read("name");
const tagline = read("tagline");

// Brand tokens — keep in sync with src/styles/global.css.
const BG = "#080b11";
const TEXT = "#e9edf4";
const DIM = "#a2aebf";
const VIOLET = "#7c5cff";
const BLUE = "#4f8cff";
const CYAN = "#22d3ee";

// Sora is not installed locally, so the rasteriser falls back to Segoe UI —
// close enough in weight and proportion for a share card.
const DISPLAY = "'Segoe UI Semibold', 'Segoe UI', 'Sora', Arial, Helvetica, sans-serif";
const BODY = "'Segoe UI', 'Inter', Arial, Helvetica, sans-serif";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const categories = "Groceries · Household · Personal care · Beverages · Stationery · Festive";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${VIOLET}"/>
      <stop offset="48%" stop-color="${BLUE}"/>
      <stop offset="100%" stop-color="${CYAN}"/>
    </linearGradient>
    <radialGradient id="glowA" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="${VIOLET}" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="${VIOLET}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="${CYAN}" stop-opacity="0.26"/>
      <stop offset="100%" stop-color="${CYAN}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="${BG}"/>
  <ellipse cx="180" cy="30" rx="620" ry="430" fill="url(#glowA)"/>
  <ellipse cx="1120" cy="60" rx="520" ry="380" fill="url(#glowB)"/>

  <!-- glass frame -->
  <rect x="28" y="28" width="1144" height="574" rx="34"
        fill="#ffffff" fill-opacity="0.03" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1"/>

  <!-- brand mark -->
  <rect x="80" y="78" width="88" height="88" rx="22" fill="url(#grad)"/>
  <text x="124" y="140" text-anchor="middle" fill="#ffffff"
        font-family="${DISPLAY}" font-size="53" font-weight="700">M</text>

  <!-- eyebrow -->
  <text x="188" y="118" fill="${DIM}"
        font-family="${BODY}" font-size="22" letter-spacing="2.6">LOCAL RETAIL</text>
  <text x="188" y="150" fill="${DIM}" fill-opacity="0.75"
        font-family="${BODY}" font-size="22" letter-spacing="2.6">WALK-IN SHOP</text>

  <!-- name -->
  <text x="80" y="342" fill="${TEXT}"
        font-family="${DISPLAY}" font-size="78" font-weight="700" letter-spacing="-2.4">${esc(name)}</text>

  <!-- tagline in the brand gradient -->
  <text x="80" y="414" fill="url(#grad)"
        font-family="${DISPLAY}" font-size="40" font-weight="700" letter-spacing="-1">${esc(tagline)}</text>

  <!-- gradient rule -->
  <rect x="80" y="462" width="150" height="4" rx="2" fill="url(#grad)"/>

  <!-- categories -->
  <text x="80" y="536" fill="${DIM}"
        font-family="${BODY}" font-size="24">${esc(categories)}</text>
</svg>`;

mkdirSync(dirname(OUT), { recursive: true });

const info = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(OUT);

console.log(`Wrote public/og-image.png — ${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KB`);
