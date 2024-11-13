// app/sitemap.ts
import { MetadataRoute } from 'next'
import { SanityDocument } from '@sanity/client'
import { client } from './sanity/client'

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id, 
  title, 
  slug, 
  publishedAt,
  excerpt,
  estimatedReadingTime,
  mainImage {
    asset->{
      _id,
      url
    }
  }
}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://optionxi.com'
  
  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ]

  // Fetch blog posts from Sanity
  const options = { /* any fetch options you might need */ }
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options)
  
  // Generate blog-specific routes
  const blogRoutes = posts.map(post => ({
    url: `${baseUrl}/blogs/${post.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'hourly' as const,
    priority: 0.9,
  }))

  return [...routes, ...blogRoutes]
}
