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
  const featuredIds = new Set(featuredPosts.map((post) => post._id));
  const regularPosts = posts.filter((post) => !featuredIds.has(post._id));

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto max-w-6xl px-4 py-16">
        {/* Header */}
        <header className="mb-14 text-center">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100">
            <span className="text-xs font-semibold tracking-wide text-indigo-600 uppercase">
              Latest Updates
            </span>
          </div>
          <h1 className="mb-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Blog Insights
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Discover our latest thoughts on technology, design, and innovation
          </p>
        </header>

        {/* Featured Section */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-1.5 rounded-lg bg-indigo-600">
                <Star className="text-white" size={16} fill="white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Featured</h2>
            </div>

            <div className="space-y-5">
              {featuredPosts.map((post) => (
                <Link
                  href={`/blogs/${post.slug?.current || "#"}`}
                  key={post._id}
                  className="group block bg-white rounded-2xl border border-gray-200 hover:border-indigo-200 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/60"
                >
                  <div className="grid md:grid-cols-2 gap-0 overflow-hidden rounded-2xl">
                    {/* Image Side */}
                    {post.mainImage && (
                      <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden order-1 md:order-2">
                        <img
                          src={urlForImage(post.mainImage).width(500).height(320).url()}
                          alt={post.title || "Featured post"}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}

                    {/* Content Side */}
                    <div className="flex flex-col justify-center p-6 md:p-8 order-2 md:order-1">
                      {/* Category Chip */}
                      {post.categories?.[0] && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 w-fit mb-3">
                          <Tag size={12} className="text-indigo-600" />
                          <span className="text-xs font-semibold text-indigo-600">
                            {post.categories[0].title}
                          </span>
                        </div>
                      )}

                      <h2 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="text-gray-500 text-sm mb-5 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-5">
                        {post.publishedAt && (
                          <div className="flex items-center gap-1.5">
                            <Calendar size={13} />
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
                            <Clock size={13} />
                            <span>{post.estimatedReadingTime} min read</span>
                          </div>
                        )}

                        {post.author?.name && (
                          <div className="flex items-center gap-1.5">
                            <User size={13} />
                            <span>{post.author.name}</span>
                          </div>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 group-hover:text-indigo-700 transition-colors">
                        <span>Read more</span>
                        <ArrowRight
                          size={16}
                          className="transform transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Articles Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">All Articles</h2>
            <span className="text-gray-400 text-sm">
              {regularPosts.length} {regularPosts.length === 1 ? "post" : "posts"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <Link
                href={`/blogs/${post.slug?.current || "#"}`}
                key={post._id}
                className="group"
              >
                <article className="h-full bg-white rounded-2xl border border-gray-200 hover:border-indigo-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/60 hover:-translate-y-0.5">
                  {post.mainImage && (
                    <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                      <img
                        src={urlForImage(post.mainImage).width(400).height(300).url()}
                        alt={post.title || "Blog image"}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="p-5">
                    {/* Category Chip */}
                    {post.categories?.[0] && (
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-indigo-50 border border-indigo-100 w-fit mb-3">
                        <Tag size={10} className="text-indigo-600" />
                        <span className="text-xs font-medium text-indigo-600">
                          {post.categories[0].title}
                        </span>
                      </div>
                    )}

                    <h3 className="mb-2 text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center flex-wrap gap-3 text-xs text-gray-400 mb-3 pt-3 border-t border-gray-100">
                      {post.publishedAt && (
                        <div className="flex items-center gap-1">
                          <Calendar size={11} />
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
                          <Clock size={11} />
                          <span>{post.estimatedReadingTime} min</span>
                        </div>
                      )}

                      {post.author?.name && (
                        <div className="flex items-center gap-1">
                          <User size={11} />
                          <span>{post.author.name}</span>
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-xs font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors">
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