/**
 * Generates the favicon / app-icon PNG set in public/ from the same "M" mark
 * used by public/favicon.svg.
 *
 * Run with:  npm run icons
 *
 * The PNGs are committed to the repo, so this only needs re-running when the
 * brand mark or its colours change. The inner keyline is dropped below 48px,
 * where it would read as noise rather than structure.
 */

import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(here, "../public");

// Brand tokens — keep in sync with src/styles/global.css.
const INK = "#131514";
const LIME = "#cbf24c";
const DISPLAY = "'Arial Black', 'Archivo', Arial, Helvetica, sans-serif";

/** Square ink tile with a lime "M", sized for a given pixel box. */
const mark = (size, { keyline = size >= 48, pad = 0 } = {}) => {
  const inset = Math.round(size * 0.0625) + pad;
  const fontSize = Math.round(size * (pad ? 0.56 : 0.64));
  // Nudge the baseline so the cap-height block sits optically centred.
  const baseline = Math.round(size / 2 + fontSize * 0.36);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${INK}"/>
  ${
    keyline
      ? `<rect x="${inset}" y="${inset}" width="${size - inset * 2}" height="${size - inset * 2}" fill="none" stroke="${LIME}" stroke-width="${Math.max(1, Math.round(size * 0.031))}"/>`
      : ""
  }
  <text x="${size / 2}" y="${baseline}" text-anchor="middle" fill="${LIME}"
        font-family="${DISPLAY}" font-size="${fontSize}" font-weight="900">M</text>
</svg>`;
};

const targets = [
  { file: "favicon-16x16.png", size: 16, opts: { keyline: false } },
  { file: "favicon-32x32.png", size: 32, opts: { keyline: false } },
  // Apple crops to a rounded square, so the mark is padded away from the edge.
  { file: "apple-touch-icon.png", size: 180, opts: { pad: 14 } },
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
