// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * The production domain. Canonical URLs, Open Graph tags, the sitemap and
 * robots.txt are all derived from it, so it must be correct in production.
 *
 * Set SITE_URL in the host's environment variables (Netlify, Vercel and
 * Cloudflare Pages all support this) — that way going live needs no code change.
 * The fallback tries Vercel's auto URL so preview deploys get correct canonical
 * tags even before SITE_URL is set, then falls back to example.com for local dev.
 */
const SITE_URL =
  process.env.SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://example.com");

export default defineConfig({
  site: SITE_URL,
  output: "static",
  trailingSlash: "ignore",
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith("/404"),
    }),
  ],
  // Default `build.format: 'directory'` is kept deliberately: /about/index.html
  // resolves on every static host, including plain nginx/Apache with no rewrite
  // rules. Switching to 'file' would need host-side clean-URL config.
  vite: {
    build: {
      // Without a pinned target the CSS minifier rewrites `@media (max-width: 52rem)`
      // into range syntax `(width<=52rem)`, which iOS Safari below 16.4 ignores —
      // that would leave the mobile nav permanently expanded and overflowing.
      cssTarget: ['safari15', 'chrome87', 'firefox78', 'edge88'],
    },
  },
});
