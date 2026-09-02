import type { APIRoute } from "astro";

/**
 * Emitted as a static /robots.txt at build time.
 *
 * Written as a route rather than a file in public/ so the Sitemap line always
 * matches the real deployed domain (from `site` in astro.config.mjs, which reads
 * SITE_URL) instead of a hardcoded URL that silently goes stale.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemapLine = site ? `Sitemap: ${new URL("sitemap-index.xml", site).href}\n` : "";

  return new Response(
    `User-agent: *\nAllow: /\n\n${sitemapLine}`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
};
