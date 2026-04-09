import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trimio.in';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // When dedicated routes like /pricing, /features, /blog are added in the future,
    // they should be added here as separate entries with priority: 0.9, 0.8, and 0.7 respectively.
  ];
}
