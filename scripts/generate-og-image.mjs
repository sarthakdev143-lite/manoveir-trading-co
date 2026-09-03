/**
 * Generates the Open Graph share image at public/og-image.png (1200x630).
 *
 * Run with:  npm run og
 *
 * The PNG is committed to the repo, so this only needs re-running when the
 * business name, tagline or brand colours change. Rasterised with sharp, which
 * Astro already depends on — no extra tooling.
 *
 * The shopfront on the right is a condensed version of the hero illustration in
 * src/components/illustrations/Shopfront.astro — keep the two in step if the
 * artwork changes.
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

/**
 * Breaks the name across two lines at the word boundary nearest its midpoint.
 * Set on one line it would run into the illustration at any readable size.
 */
const splitName = (value) => {
  const words = value.split(/\s+/);
  if (words.length < 2) return [value, ""];
  let best = 1;
  let bestDelta = Infinity;
  for (let i = 1; i < words.length; i += 1) {
    const head = words.slice(0, i).join(" ").length;
    const tail = words.slice(i).join(" ").length;
    const delta = Math.abs(head - tail);
    if (delta < bestDelta) {
      bestDelta = delta;
      best = i;
    }
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
};

const [nameLine1, nameLine2] = splitName(name);

// Brand tokens — keep in sync with src/styles/global.css.
const BG = "#100e0c";
const BG_2 = "#15120e";
const WALL = "#241f19";
const WALL_DARK = "#1c1813";
const FRAME = "#3c332a";
const GLASS = "#33291d";
const AMBER = "#e8a33d";
const AMBER_DEEP = "#c8842a";
const TEXT = "#f3efe7";
const DIM = "#b5aca0";
const SAGE = "#7fa88a";
const CLAY = "#c96f4a";

// Fraunces and Inter are not installed locally, so the rasteriser falls back to
// Georgia and Segoe UI — the same serif/sans pairing in spirit.
const DISPLAY = "Georgia, 'Times New Roman', serif";
const BODY = "'Segoe UI', Arial, Helvetica, sans-serif";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Nine 30px scallops close the awning's bottom edge, right to left.
const scallops = Array.from({ length: 9 }, () => "a15 15 0 0 1 -30 0").join(" ");
const awning = `M60 96 H330 V122 ${scallops} Z`;
const stripeXs = [60, 120, 180, 240, 300];

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <clipPath id="og-awning"><path d="${awning}"/></clipPath>
    <clipPath id="og-window"><rect x="82" y="152" width="126" height="104" rx="3"/></clipPath>
  </defs>

  <rect width="1200" height="630" fill="${BG}"/>
  <rect x="648" y="0" width="552" height="630" fill="${BG_2}"/>

  <!-- left column: type -->
  <rect x="80" y="196" width="54" height="3" rx="1.5" fill="${AMBER}"/>
  <text x="152" y="203" fill="${AMBER}" font-family="${BODY}" font-size="21" letter-spacing="3.4">LOCAL RETAIL · WALK-IN SHOP</text>

  <text x="80" y="282" fill="${TEXT}" font-family="${DISPLAY}" font-size="66" font-weight="600">${esc(nameLine1)}</text>
  <text x="80" y="352" fill="${TEXT}" font-family="${DISPLAY}" font-size="66" font-weight="600">${esc(nameLine2)}</text>
  <text x="80" y="414" fill="${AMBER}" font-family="${DISPLAY}" font-size="30" font-weight="600">${esc(tagline)}</text>

  <text x="80" y="474" fill="${DIM}" font-family="${BODY}" font-size="21">Groceries · Household · Personal care</text>
  <text x="80" y="504" fill="${DIM}" font-family="${BODY}" font-size="21">Beverages · Stationery · Festive goods</text>

  <!-- right column: shopfront, drawn on a 390x330 grid and placed -->
  <g transform="translate(700 168) scale(1.2)">
    <rect x="0" y="250" width="390" height="16" fill="${WALL_DARK}"/>
    <path d="M84 250h122l12 16H72Z" fill="${AMBER}" opacity="0.08"/>

    <rect x="60" y="56" width="270" height="194" fill="${WALL}"/>
    <rect x="60" y="56" width="270" height="34" fill="${WALL_DARK}"/>

    <rect x="112" y="62" width="166" height="22" rx="3" fill="${WALL_DARK}" stroke="${FRAME}" stroke-width="1.2"/>
    <text x="195" y="77" text-anchor="middle" fill="${TEXT}" font-family="${BODY}" font-size="12" font-weight="600" letter-spacing="3">MANOVEIR</text>

    <path d="${awning}" fill="${AMBER}"/>
    <g clip-path="url(#og-awning)">
      ${stripeXs.map((x) => `<rect x="${x}" y="96" width="30" height="42" fill="${TEXT}"/>`).join("\n      ")}
    </g>
    <path d="${awning}" fill="none" stroke="${AMBER_DEEP}" stroke-width="1.2"/>
    <rect x="60" y="93" width="270" height="5" rx="2.5" fill="${AMBER_DEEP}"/>

    <rect x="80" y="150" width="130" height="108" rx="3" fill="${GLASS}" stroke="${FRAME}" stroke-width="3"/>
    <g clip-path="url(#og-window)">
      <rect x="90" y="164" width="15" height="22" rx="2" fill="${AMBER}"/>
      <rect x="110" y="170" width="12" height="16" rx="2" fill="${TEXT}" opacity="0.85"/>
      <rect x="127" y="162" width="13" height="24" rx="2" fill="${SAGE}"/>
      <rect x="145" y="170" width="16" height="16" rx="2" fill="${CLAY}"/>
      <rect x="166" y="164" width="12" height="22" rx="2" fill="${TEXT}" opacity="0.7"/>
      <rect x="184" y="170" width="16" height="16" rx="2" fill="${AMBER}" opacity="0.7"/>
      <rect x="86" y="186" width="120" height="3" fill="${FRAME}"/>
      <rect x="92" y="198" width="22" height="18" rx="2" fill="${TEXT}" opacity="0.75"/>
      <rect x="120" y="196" width="17" height="20" rx="2" fill="${CLAY}" opacity="0.8"/>
      <rect x="143" y="202" width="20" height="14" rx="2" fill="${SAGE}" opacity="0.8"/>
      <rect x="169" y="197" width="15" height="19" rx="2" fill="${AMBER}" opacity="0.75"/>
      <rect x="86" y="216" width="120" height="3" fill="${FRAME}"/>
      <path d="M94 248c0-10 3.5-15 10-15s10 5 10 15Z" fill="${AMBER}" opacity="0.8"/>
      <path d="M120 248c0-9 3.5-13.5 9-13.5s9 4.5 9 13.5Z" fill="${SAGE}" opacity="0.7"/>
      <path d="M144 248c0-10 3.5-15 10-15s10 5 10 15Z" fill="${CLAY}" opacity="0.7"/>
      <path d="M170 248c0-9 3.5-13.5 9-13.5s9 4.5 9 13.5Z" fill="${TEXT}" opacity="0.5"/>
    </g>
    <path d="M145 150v108" stroke="${FRAME}" stroke-width="2.4"/>

    <rect x="226" y="154" width="60" height="96" rx="2.5" fill="${WALL_DARK}" stroke="${FRAME}" stroke-width="2.4"/>
    <rect x="236" y="164" width="40" height="42" rx="2" fill="${GLASS}"/>
    <rect x="242" y="174" width="28" height="14" rx="2" fill="${AMBER}"/>
    <text x="256" y="185" text-anchor="middle" fill="${WALL_DARK}" font-family="${BODY}" font-size="8" font-weight="700">OPEN</text>
    <rect x="271" y="212" width="5" height="15" rx="2.5" fill="${AMBER}"/>

    <path d="M256 96v14" stroke="${FRAME}" stroke-width="1.6"/>
    <path d="M248 122c0-5.5 3.6-9.6 8-9.6s8 4.1 8 9.6Z" fill="${AMBER_DEEP}"/>
    <ellipse cx="256" cy="123" rx="7.5" ry="2" fill="${AMBER}"/>

    <rect x="300" y="216" width="46" height="34" rx="2.5" fill="${WALL_DARK}" stroke="${FRAME}" stroke-width="1.6"/>
    <path d="M300 228h46" stroke="${FRAME}" stroke-width="1.2"/>
    <circle cx="311" cy="211" r="7" fill="${CLAY}"/>
    <circle cx="325" cy="209" r="8" fill="${AMBER}"/>
    <circle cx="338" cy="212" r="6.5" fill="${CLAY}" opacity="0.85"/>
  </g>
</svg>`;

mkdirSync(dirname(OUT), { recursive: true });

const info = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(OUT);

console.log(`Wrote public/og-image.png — ${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KB`);
