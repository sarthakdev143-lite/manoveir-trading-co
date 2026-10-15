/**
 * Generates the Open Graph share image at public/og-image.png (1200x630).
 *
 * Run with:  npm run og
 *
 * The PNG is committed to the repo, so this only needs re-running when the
 * business name, tagline, service list or brand colours change. Rasterised
 * with sharp, which Astro already depends on — no extra tooling.
 *
 * The desk scene on the right is a condensed rendition of the hero
 * illustration in src/components/illustrations/TechDesk.astro — keep the two
 * in step if the artwork changes.
 */

import { readFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const OUT = resolve(root, "public/og-image.png");

// Pull the name, tagline and service list straight from the config so this
// cannot drift.
const siteTs = readFileSync(resolve(root, "src/config/site.ts"), "utf8");
const read = (key) => {
  const match = siteTs.match(new RegExp(`^\\s*${key}:\\s*"([^"]+)"`, "m"));
  if (!match) throw new Error(`Could not read "${key}" from src/config/site.ts`);
  return match[1];
};
const readList = (key) => {
  const match = siteTs.match(new RegExp(`^\\s*${key}:\\s*\\[([^\\]]+)\\]`, "m"));
  if (!match) throw new Error(`Could not read "${key}" from src/config/site.ts`);
  return match[1].split(",").map((s) => s.trim().replace(/^"|"$/g, ""));
};

const name = read("name");
const tagline = read("tagline");
const services = readList("trustBar");

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

// Split the service list across two lines, e.g. 4 entries -> 2 + 2.
const mid = Math.ceil(services.length / 2);
const serviceLine1 = services.slice(0, mid).join(" · ");
const serviceLine2 = services.slice(mid).join(" · ");

// Brand tokens — keep in sync with src/styles/global.css and TechDesk.astro.
const BG = "#100e0c";
const BG_2 = "#15120e";
const INK = "#0c0e18";
const INK_DARK = "#080a12";
const FRAME = "#2a2f45";
const SCREEN = "#12162a";
const CREAM = "#f3efe7";
const INDIGO = "#7c6cff";
const INDIGO_DEEP = "#5b48e0";
const CYAN = "#22d3ee";
const PINK = "#ec4899";
const AMBER = "#e8a33d";
const TEXT = "#f3efe7";
const DIM = "#b5aca0";

// Fraunces and Inter are not installed locally, so the rasteriser falls back to
// Georgia and Segoe UI — the same serif/sans pairing in spirit.
const DISPLAY = "Georgia, 'Times New Roman', serif";
const BODY = "'Segoe UI', Arial, Helvetica, sans-serif";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  <rect x="648" y="0" width="552" height="630" fill="${BG_2}"/>

  <!-- left column: type -->
  <rect x="80" y="196" width="54" height="3" rx="1.5" fill="${AMBER}"/>
  <text x="152" y="203" fill="${AMBER}" font-family="${BODY}" font-size="20" letter-spacing="3">IT SERVICES · STAFF AUGMENTATION</text>

  <text x="80" y="282" fill="${TEXT}" font-family="${DISPLAY}" font-size="66" font-weight="600">${esc(nameLine1)}</text>
  <text x="80" y="352" fill="${TEXT}" font-family="${DISPLAY}" font-size="66" font-weight="600">${esc(nameLine2)}</text>
  <text x="80" y="414" fill="${AMBER}" font-family="${DISPLAY}" font-size="30" font-weight="600">${esc(tagline)}</text>

  <text x="80" y="474" fill="${DIM}" font-family="${BODY}" font-size="21">${esc(serviceLine1)}</text>
  <text x="80" y="504" fill="${DIM}" font-family="${BODY}" font-size="21">${esc(serviceLine2)}</text>

  <!-- right column: desk scene, drawn on a 400x300 grid and placed -->
  <g transform="translate(684 135) scale(1.2)">
    <!-- desk -->
    <rect x="0" y="244" width="400" height="10" fill="${FRAME}"/>
    <rect x="0" y="254" width="400" height="46" fill="${INK_DARK}"/>

    <!-- laptop base -->
    <path d="M96 244h208l14 20a6 6 0 0 1-6 8H88a6 6 0 0 1-6-8Z" fill="${FRAME}"/>
    <rect x="150" y="248" width="100" height="5" rx="2.5" fill="${INK_DARK}"/>

    <!-- laptop screen -->
    <rect x="110" y="96" width="180" height="148" rx="8" fill="${INK}" stroke="${FRAME}" stroke-width="3"/>
    <rect x="122" y="108" width="156" height="112" rx="3" fill="${SCREEN}"/>

    <!-- dashboard: heading bar + bars + trend line -->
    <rect x="132" y="118" width="60" height="6" rx="3" fill="${CREAM}" opacity="0.7"/>
    <rect x="132" y="150" width="16" height="52" rx="2" fill="${INDIGO}"/>
    <rect x="154" y="166" width="16" height="36" rx="2" fill="${CYAN}"/>
    <rect x="176" y="140" width="16" height="62" rx="2" fill="${INDIGO_DEEP}"/>
    <rect x="198" y="176" width="16" height="26" rx="2" fill="${PINK}" opacity="0.85"/>
    <path d="M228 196l10-24 12 14 14-30" fill="none" stroke="${CYAN}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="264" cy="156" r="3" fill="${CYAN}"/>

    <!-- keyboard deck -->
    <path d="M104 244l6-8h180l6 8Z" fill="${INK_DARK}"/>

    <!-- floating code-window chip -->
    <rect x="292" y="150" width="92" height="70" rx="8" fill="${INK}" stroke="${FRAME}" stroke-width="2.5"/>
    <rect x="292" y="150" width="92" height="18" rx="8" fill="${SCREEN}"/>
    <circle cx="303" cy="159" r="2.6" fill="${PINK}" opacity="0.8"/>
    <circle cx="312" cy="159" r="2.6" fill="${INDIGO}" opacity="0.8"/>
    <circle cx="321" cy="159" r="2.6" fill="${CYAN}" opacity="0.8"/>
    <rect x="302" y="176" width="46" height="5" rx="2.5" fill="${INDIGO}"/>
    <rect x="302" y="188" width="64" height="5" rx="2.5" fill="${CREAM}" opacity="0.55"/>
    <rect x="302" y="200" width="34" height="5" rx="2.5" fill="${CYAN}" opacity="0.85"/>

    <!-- desk plant -->
    <path d="M70 244v-24" stroke="${FRAME}" stroke-width="3" stroke-linecap="round"/>
    <path d="M70 220c-3-14-14-20-24-19 2 13 12 21 24 19Z" fill="${CYAN}" opacity="0.75"/>
    <path d="M70 224c3-16 15-23 26-21-2 15-13 24-26 21Z" fill="${INDIGO}" opacity="0.75"/>
    <path d="M56 244h28l-4-14h-20Z" fill="${FRAME}"/>
  </g>
</svg>`;

mkdirSync(dirname(OUT), { recursive: true });

const info = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(OUT);

console.log(`Wrote public/og-image.png — ${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KB`);
