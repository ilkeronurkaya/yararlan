import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/submit$'],
    },
    sitemap: 'https://yararlan.com/sitemap.xml',
  };
}
