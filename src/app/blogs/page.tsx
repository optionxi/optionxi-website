import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "../sanity/client";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { urlForImage } from "../sanity/image";

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

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <header className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
            Latest Posts
          </h1>
          <p className="text-lg text-gray-400">
            Discover our latest thoughts, ideas, and insights
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              href={`/blogs/${post.slug.current}`}
              key={post._id}
              className="group relative rounded-xl bg-gray-900/60 backdrop-blur-sm 
                ring-1 ring-gray-800/60 overflow-hidden transition-all duration-300 
                hover:ring-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 
                hover:-translate-y-1"
            >
              {post.mainImage && (
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={urlForImage(post.mainImage)
                      .width(800)
                      .height(450)
                      .url()}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 
                      group-hover:scale-105"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-blue-400" />
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                  
                  {post.estimatedReadingTime && (
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-green-400" />
                      <span>{post.estimatedReadingTime} min read</span>
                    </div>
                  )}
                </div>

                <h2 className="mb-3 text-xl font-semibold text-white group-hover:text-blue-400 
                  transition-colors line-clamp-2">
                  {post.title}
                </h2>
                
                {post.excerpt && (
                  <p className="text-gray-400 line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                )}
                
                <div className="flex items-center text-sm font-medium text-blue-400 
                  group-hover:text-green-400 transition-colors">
                  Read article
                  <ArrowRight size={16} className="ml-1 transform transition-transform 
                    duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}