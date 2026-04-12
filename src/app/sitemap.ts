import { MetadataRoute } from 'next';

const CATEGORIES = [
  'İçerik Üretimi', 'Video & Reels', 'Görsel/Tasarım', 'Araştırma & Analiz',
  'Kod & Geliştirme', 'Veri & Dashboard', 'Pazarlama & Growth', 
  'Otomasyon & Agent', 'Ses & Müzik', 'Sunum & Doküman'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yararlan.com';

  const categoryUrls = CATEGORIES.map((category) => ({
    url: `${baseUrl}/?category=${encodeURIComponent(category)}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as 'daily',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
    ...categoryUrls,
  ];
}
