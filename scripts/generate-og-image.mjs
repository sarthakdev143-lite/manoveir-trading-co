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
 * text instead of the flat ink background.
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

const name = read("name").toUpperCase();
const tagline = read("tagline").toUpperCase();

// Brand tokens — keep in sync with src/styles/global.css.
const INK = "#131514";
const PAPER = "#edeee9";
const LIME = "#cbf24c";
const CLAY = "#e24e1b";

// Heavy grotesque with fallbacks, mirroring the site's Archivo 900 display face.
const DISPLAY = "'Arial Black', 'Archivo', Arial, Helvetica, sans-serif";
const MONO = "'Consolas', 'DejaVu Sans Mono', 'Courier New', monospace";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const categories = "GROCERIES / HOUSEHOLD / PERSONAL CARE / BEVERAGES / STATIONERY / FESTIVE";

// The same 12-column stripe pattern the hero and mastheads expose on screen.
const columns = Array.from({ length: 11 }, (_, i) => {
  const x = Math.round((1200 / 12) * (i + 1));
  return `<line x1="${x}" y1="0" x2="${x}" y2="630" stroke="${PAPER}" stroke-opacity="0.07" stroke-width="1"/>`;
}).join("\n  ");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${INK}"/>
  ${columns}

  <!-- hairline frame -->
  <rect x="28" y="28" width="1144" height="574" fill="none" stroke="${PAPER}" stroke-opacity="0.35" stroke-width="1"/>

  <!-- brand mark -->
  <rect x="72" y="72" width="96" height="96" fill="${LIME}"/>
  <text x="120" y="146" text-anchor="middle" fill="${INK}"
        font-family="${DISPLAY}" font-size="66" font-weight="900">M</text>

  <!-- kicker -->
  <text x="192" y="118" fill="${LIME}"
        font-family="${MONO}" font-size="21" font-weight="700" letter-spacing="3.4">LOCAL RETAIL</text>
  <text x="192" y="150" fill="${PAPER}" fill-opacity="0.6"
        font-family="${MONO}" font-size="21" font-weight="700" letter-spacing="3.4">WALK-IN SHOP</text>

  <!-- name -->
  <text x="72" y="330" fill="${PAPER}"
        font-family="${DISPLAY}" font-size="76" font-weight="900" letter-spacing="-2.5">${esc(name)}</text>

  <!-- tagline on a lime bar. The bar is sized from an average cap advance of
       ~0.72em at 30px, since SVG cannot measure text before rasterising. -->
  <rect x="72" y="372" width="${Math.min(1056, Math.round(tagline.length * 21.5) + 40)}" height="60" fill="${LIME}"/>
  <text x="92" y="413" fill="${INK}"
        font-family="${DISPLAY}" font-size="30" font-weight="900" letter-spacing="-0.5">${esc(tagline)}</text>

  <!-- clay marker + categories -->
  <rect x="72" y="496" width="14" height="14" fill="${CLAY}"/>
  <text x="72" y="556" fill="${PAPER}" fill-opacity="0.72"
        font-family="${MONO}" font-size="20" letter-spacing="1.2">${esc(categories)}</text>
</svg>`;

mkdirSync(dirname(OUT), { recursive: true });

const info = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(OUT);

console.log(`Wrote public/og-image.png — ${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KB`);
