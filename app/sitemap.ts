import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yrcar.ma'
  
  // Pages statiques principales
  const staticPages = [
    '',
    '/about',
    '/services',
    '/contact',
  ]

  // Pages de landing par ville
  const cityPages = [
    '/location-voiture-casablanca',
    '/location-voiture-rabat',
    '/location-voiture-marrakech',
    '/car-rental-casablanca',
  ]

  // Générer les URLs statiques
  const staticUrls = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page === '' ? 1.0 : 0.8,
  }))

  // Générer les URLs des villes
  const cityUrls = cityPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Combiner toutes les URLs
  return [...staticUrls, ...cityUrls]
}
