import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "../sanity/client";
import { Calendar, Clock, ArrowRight, Star, User, Tag } from "lucide-react";
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
  isFeatured,
  author->{
    name,
    image
  },
  categories[]->{
    title,
    slug
  },
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

  // 1. Get up to 3 featured posts
  const featuredPosts = posts.filter((post) => post.isFeatured).slice(0, 3);
  
  // 2. Filter out featured posts from regular posts
  const featuredIds = new Set(featuredPosts.map(post => post._id));
  const regularPosts = posts.filter((post) => !featuredIds.has(post._id));

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Header - More Compact */}
        <header className="mb-12 text-center">
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            <span className="text-xs font-medium text-blue-400">Latest Updates</span>
          </div>
          <h1 className="mb-4 text-4xl md:text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              Blog Insights
            </span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-xl">
            Discover our latest thoughts on technology, design, and innovation
          </p>
        </header>

        {/* Featured Section - Compact Modern Design */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500">
                <Star className="text-white" size={16} />
              </div>
              <h2 className="text-2xl font-bold text-white">Featured</h2>
            </div>

            <div className="space-y-6">
              {featuredPosts.map((post) => (
                <Link
                  href={`/blogs/${post.slug?.current || "#"}`}
                  key={post._id}
                  className="group block bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-indigo-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
                >
                  <div className="grid md:grid-cols-2 gap-6 p-6">
                    {/* Content Side */}
                    <div className="flex flex-col justify-center">
                      {/* Category Chip */}
                      {post.categories?.[0] && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 w-fit mb-3">
                          <Tag size={12} className="text-indigo-400" />
                          <span className="text-xs font-semibold text-indigo-400">
                            {post.categories[0].title}
                          </span>
                        </div>
                      )}

                      <h2 className="text-2xl font-bold mb-3 group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="text-gray-400 text-sm mb-4 line-clamp-4 leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Meta Info - Compact */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
                        {post.publishedAt && (
                          <div className="flex items-center gap-1.5">
                            <Calendar size={12} />
                            <time dateTime={post.publishedAt}>
                              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </time>
                          </div>
                        )}
                        
                        {post.estimatedReadingTime && (
                          <div className="flex items-center gap-1.5">
                            <Clock size={12} />
                            <span>{post.estimatedReadingTime} min</span>
                          </div>
                        )}
                        
                        {post.author?.name && (
                          <div className="flex items-center gap-1.5">
                            <User size={12} />
                            <span>{post.author.name}</span>
                          </div>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                        <span>Read more</span>
                        <ArrowRight
                          size={16}
                          className="transform transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </div>
                    </div>

                    {/* Image Side */}
                    {post.mainImage && (
                      <div className="relative rounded-lg overflow-hidden p-2">
                        <img
                          src={urlForImage(post.mainImage).width(400).height(240).url()}
                          alt={post.title || "Featured post"}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
                        />
                        <div className="absolute inset-0 " />
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Articles Grid - More Compact */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">All Articles</h2>
            <span className="text-gray-400 text-xs">
              {regularPosts.length} {regularPosts.length === 1 ? "post" : "posts"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {regularPosts.map((post) => (
              <Link
                href={`/blogs/${post.slug?.current || "#"}`}
                key={post._id}
                className="group"
              >
                <article className="h-full bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-indigo-500/40 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-0.5">
                  {post.mainImage && (
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={urlForImage(post.mainImage).width(400).height(300).url()}
                        alt={post.title || "Blog image"}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="p-5">
                    {/* Category Chip */}
                    {post.categories?.[0] && (
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 w-fit mb-3">
                        <Tag size={10} className="text-indigo-400" />
                        <span className="text-xs font-medium text-indigo-400">
                          {post.categories[0].title}
                        </span>
                      </div>
                    )}

                    <h3 className="mb-2 text-base font-semibold text-white group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="text-gray-400 text-xs mb-3 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Meta Info - Compact */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      {post.publishedAt && (
                        <div className="flex items-center gap-1">
                          <Calendar size={10} />
                          <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </time>
                        </div>
                      )}

                      {post.estimatedReadingTime && (
                        <div className="flex items-center gap-1">
                          <Clock size={10} />
                          <span>{post.estimatedReadingTime} min</span>
                        </div>
                      )}

                      {/* Author Tag - Added */}
                      {post.author?.name && (
                        <div className="flex items-center gap-1">
                          <User size={10} />
                          <span>{post.author.name}</span>
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-xs font-medium text-indigo-400 group-hover:text-indigo-300 transition-colors">
                      Read article
                      <ArrowRight
                        size={12}
                        className="ml-1 transform transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}