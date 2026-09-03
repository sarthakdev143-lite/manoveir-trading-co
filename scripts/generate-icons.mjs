/**
 * Generates the favicon / app-icon PNG set in public/ from the same storefront
 * mark used by public/favicon.svg and the site header.
 *
 * Run with:  npm run icons
 *
 * The PNGs are committed to the repo, so this only needs re-running when the
 * brand mark or its colours change. The mark is drawn as strokes rather than
 * text, so it does not depend on any font being installed.
 */

import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(here, "../public");

// Brand tokens — keep in sync with src/styles/global.css.
const BG = "#100e0c";
const AMBER = "#e8a33d";

/**
 * Storefront glyph on the dark ground, drawn on a 64-unit grid and scaled.
 * `pad` insets the tile inside the ground for the Apple icon, which gets
 * composited onto a rounded square by the OS.
 */
const mark = (size, { pad = 0, radiusRatio = 0.22, keyline = size >= 64 } = {}) => {
  const box = size - pad * 2;
  const radius = Math.round(box * radiusRatio);
  // The glyph is authored at 64x64; scale and centre it inside the tile.
  const glyph = (box / 64) * 0.78;
  const offset = pad + (box - 64 * glyph) / 2;
  const stroke = Math.max(1.4, 3.4 * glyph);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect x="${pad}" y="${pad}" width="${box}" height="${box}" rx="${radius}" fill="${BG}"/>
  ${
    keyline
      ? `<rect x="${pad + stroke / 2}" y="${pad + stroke / 2}" width="${box - stroke}" height="${box - stroke}" rx="${Math.max(0, radius - stroke / 2)}" fill="none" stroke="${AMBER}" stroke-opacity="0.35" stroke-width="${stroke * 0.6}"/>`
      : ""
  }
  <g transform="translate(${offset} ${offset}) scale(${glyph})" fill="none" stroke="${AMBER}"
     stroke-width="${(stroke / glyph).toFixed(2)}" stroke-linecap="round" stroke-linejoin="round">
    <path d="M15 27h34v22a4 4 0 0 1-4 4H19a4 4 0 0 1-4-4Z"/>
    <path d="M12 27l6-14h28l6 14"/>
    <path d="M28 53v-12h8v12"/>
  </g>
</svg>`;
};

const targets = [
  // At 16-32px the keyline and the doorway detail turn to mud, so drop them.
  { file: "favicon-16x16.png", size: 16, opts: { radiusRatio: 0.14, keyline: false } },
  { file: "favicon-32x32.png", size: 32, opts: { radiusRatio: 0.16, keyline: false } },
  { file: "apple-touch-icon.png", size: 180, opts: { pad: 10 } },
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
