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
 * text instead of the flat navy background.
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
const NAVY = "#0f2040";
const NAVY_LIGHT = "#1a335c";
const GOLD = "#c49a3c";
const GOLD_LIGHT = "#d4a84b";
const CREAM = "#fdfbf7";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const categories = "Groceries · Household · Personal Care · Beverages · Stationery · Festive";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${NAVY_LIGHT}"/>
      <stop offset="55%" stop-color="${NAVY}"/>
      <stop offset="100%" stop-color="#0a1730"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.12" cy="0.08" r="0.75">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- gold frame -->
  <rect x="24" y="24" width="1152" height="582" rx="20"
        fill="none" stroke="${GOLD}" stroke-opacity="0.42" stroke-width="2"/>

  <!-- brand mark -->
  <rect x="88" y="96" width="96" height="96" rx="20" fill="${GOLD}"/>
  <text x="136" y="163" text-anchor="middle" fill="${NAVY}"
        font-family="Georgia, 'Times New Roman', serif" font-size="62" font-weight="700">M</text>

  <!-- eyebrow -->
  <text x="88" y="258" fill="${GOLD_LIGHT}"
        font-family="'Segoe UI', Arial, Helvetica, sans-serif"
        font-size="23" font-weight="700" letter-spacing="4.4">LOCAL RETAIL SHOP</text>

  <!-- name -->
  <text x="88" y="352" fill="${CREAM}"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="82" font-weight="700">${esc(name)}</text>

  <!-- tagline -->
  <text x="88" y="424" fill="${GOLD_LIGHT}"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="41" font-weight="600">${esc(tagline)}</text>

  <!-- rule -->
  <rect x="88" y="470" width="132" height="4" rx="2" fill="${GOLD}"/>

  <!-- categories -->
  <text x="88" y="536" fill="${CREAM}" fill-opacity="0.72"
        font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-size="25">${esc(categories)}</text>
</svg>`;

mkdirSync(dirname(OUT), { recursive: true });

const info = await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(OUT);

console.log(`Wrote public/og-image.png — ${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KB`);
