/**
 * Generates the favicon / app-icon PNG set in public/ from the same gradient
 * "M" mark used by public/favicon.svg.
 *
 * Run with:  npm run icons
 *
 * The PNGs are committed to the repo, so this only needs re-running when the
 * brand mark or its colours change.
 */

import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(here, "../public");

// Brand tokens — keep in sync with src/styles/global.css.
const BG = "#080b11";
const STOPS = ["#7c5cff", "#4f8cff", "#22d3ee"];
const DISPLAY = "'Segoe UI Semibold', 'Segoe UI', 'Sora', Arial, Helvetica, sans-serif";

/**
 * Gradient tile with a white "M".
 * `pad` insets the tile inside a solid ground — used for the Apple icon, which
 * is composited onto a rounded square and should not bleed to the edge.
 */
const mark = (size, { pad = 0, radiusRatio = 0.234 } = {}) => {
  const box = size - pad * 2;
  const radius = Math.round(box * radiusRatio);
  const fontSize = Math.round(box * 0.6);
  // Nudge the baseline so the cap-height sits optically centred.
  const baseline = Math.round(pad + box / 2 + fontSize * 0.35);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${STOPS[0]}"/>
      <stop offset="48%" stop-color="${STOPS[1]}"/>
      <stop offset="100%" stop-color="${STOPS[2]}"/>
    </linearGradient>
  </defs>
  ${pad ? `<rect width="${size}" height="${size}" fill="${BG}"/>` : ""}
  <rect x="${pad}" y="${pad}" width="${box}" height="${box}" rx="${radius}" fill="url(#g)"/>
  <text x="${size / 2}" y="${baseline}" text-anchor="middle" fill="#ffffff"
        font-family="${DISPLAY}" font-size="${fontSize}" font-weight="700">M</text>
</svg>`;
};

const targets = [
  // Tiny sizes read better as a full-bleed square than a rounded tile.
  { file: "favicon-16x16.png", size: 16, opts: { radiusRatio: 0.12 } },
  { file: "favicon-32x32.png", size: 32, opts: { radiusRatio: 0.16 } },
  { file: "apple-touch-icon.png", size: 180, opts: { pad: 12 } },
  { file: "android-chrome-192x192.png", size: 192, opts: {} },
  { file: "android-chrome-512x512.png", size: 512, opts: {} },
];

mkdirSync(publicDir, { recursive: true });

for (const { file, size, opts } of targets) {
  const out = resolve(publicDir, file);
  const info = await sharp(Buffer.from(mark(size, opts)))
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`Wrote public/${file} — ${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KB`);
}
