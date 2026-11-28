import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/cdn-cgi/'] }],
    sitemap: 'https://optionxi.com/sitemap.xml', // only if you actually have one
  };
}