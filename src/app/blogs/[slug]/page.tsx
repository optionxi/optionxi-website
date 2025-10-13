import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ChevronRight, Share2, Tag } from "lucide-react";
import { client } from "@/app/sanity/client";
import { PortableTextBlock } from "@portabletext/types";
import { PortableTextComponents } from "@portabletext/react";

// Types
interface Author {
  name: string;
  image?: SanityImageSource;
  bio?: PortableTextBlock[];
}

interface Category {
  title: string;
  slug: {
    current: string;
  };
}

interface Post {
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  estimatedReadingTime?: number;
  mainImage?: SanityImageSource;
  body?: PortableTextBlock[];
  author?: Author;
  categories?: Category[];
}

interface RecentPost {
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  mainImage?: SanityImageSource;
}

interface PostData {
  post: Post;
  recentPosts: RecentPost[];
}

const POST_QUERY = `{
  "post": *[_type == "post" && slug.current == $slug][0]{
    title,
    slug,
    publishedAt,
    estimatedReadingTime,
    mainImage,
    body,
    author->{
      name,
      image,
      bio
    },
    categories[]->{
      title,
      slug
    }
  },
  "recentPosts": *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...4] {
    title,
    slug,
    publishedAt,
    mainImage
  }
}`;

export { generateMetadata } from './generateMetadata';

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// Share buttons component (server component)
const ShareButtons = ({ title, slug }: { title: string; slug: string }) => {
  const currentUrl = `https://yourdomain.com/blogs/${slug}`;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-400 flex items-center gap-2">
        <Share2 size={16} />
        Share:
      </span>
      <div className="flex gap-2">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-slate-800 hover:bg-blue-500 transition-colors"
          aria-label="Share on Twitter"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.016 10.016 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-slate-800 hover:bg-blue-600 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-slate-800 hover:bg-blue-700 transition-colors"
          aria-label="Share on Facebook"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        <a
          href={shareLinks.reddit}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-slate-800 hover:bg-orange-600 transition-colors"
          aria-label="Share on Reddit"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

// Enhanced components with distinct gradients
const components: PortableTextComponents = {
  list: {
    bullet: ({children}) => (
      <ul className="space-y-2 my-4 list-none">
        {children}
      </ul>
    ),
    number: ({children}) => (
      <ol className="space-y-2 my-4 list-decimal">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({children}) => (
      <li className="flex items-start gap-2 group animate-fadeIn">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-400 mt-2.5 group-hover:bg-pink-400 transition-colors"></span>
        <span className="text-gray-300">{children}</span>
      </li>
    ),
    number: ({children}) => (
      <li className="text-gray-300 animate-fadeIn">{children}</li>
    ),
  },
  block: {
    h1: ({children}) => (
      <h1 className="text-4xl font-bold mt-12 mb-6 relative group animate-slideUp">
        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
          {children}
        </span>
        <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-purple-400 to-rose-400 group-hover:w-full transition-all duration-300"></span>
      </h1>
    ),
    h2: ({children}) => (
      <h2 className="text-3xl font-bold mt-8 mb-4 relative group animate-slideUp">
        <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
          {children}
        </span>
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-400 group-hover:w-full transition-all duration-300"></span>
      </h2>
    ),
    h3: ({children}) => (
      <h3 className="text-3xl font-semibold mt-6 mb-3 text-gray-200 tracking-tight">
        {children}
      </h3>
    ),
    h4: ({children}) => (
      <h4 className="text-xl font-medium mt-5 mb-2 text-gray-300 hover:text-gray-100 cursor-pointer transition-colors">
        {children}
      </h4>
    ),
    normal: ({children}) => (
      <p className="p-4 mb-6 text-gray-300 text-justify leading-relaxed animate-fadeIn">
        {children}
      </p>
    ),
    blockquote: ({children}) => (
      <blockquote className="my-6 pl-6 border-l-4 border-purple-400 italic text-gray-300 animate-slideRight">
        <div className="relative">
          <span className="absolute -left-8 -top-2 text-4xl text-purple-400 opacity-20">&quot;</span>
          {children}
          <span className="absolute -bottom-4 right-0 text-4xl text-purple-400 opacity-20">&quot;</span>
        </div>
      </blockquote>
    ),
  },
  marks: {
    link: ({children, value}) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a 
          href={value.href} 
          rel={rel}
          className="relative inline-block text-purple-400 hover:text-pink-400 transition-colors group"
        >
          <span className="relative z-10">{children}</span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
        </a>
      );
    },
  },
};

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { post, recentPosts }: PostData = await client.fetch(
    POST_QUERY,
    params,
    options
  );

  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(1200).height(675).url()
    : null;

  const authorImageUrl = post.author?.image
    ? urlFor(post.author.image)?.width(100).height(100).url()
    : null;

  return (
    <main className="min-h-screen bg-slate-950 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/blogs" 
          className="inline-flex items-center text-purple-400 hover:text-pink-400 transition-colors mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to posts
        </Link>

        <div className="grid lg:grid-cols-[1fr,380px] gap-8">
          <article className="relative">
            {postImageUrl && (
              <div className="mb-8 rounded-xl overflow-hidden ring-1 ring-purple-500/20">
                <img
                  src={postImageUrl}
                  alt={post.title}
                  className="w-full aspect-video object-cover"
                  width="1200"
                  height="675"
                />
              </div>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
              <div className="flex items-center gap-1">
                <Calendar size={16} className="text-purple-400" />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
              </div>
              {post.estimatedReadingTime && (
                <div className="flex items-center gap-1">
                  <Clock size={16} className="text-pink-400" />
                  <span>{post.estimatedReadingTime} min read</span>
                </div>
              )}
              
              {/* Categories - Fixed with null check */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {post.categories.map((category) => (
                    category.slug && category.slug.current ? (
                      <Link 
                        key={category.slug.current}
                        href={`/blogs/category/${category.slug.current}`}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors"
                      >
                        <Tag size={12} className="text-indigo-400" />
                        <span className="text-xs font-medium text-indigo-400">
                          {category.title}
                        </span>
                      </Link>
                    ) : (
                      // Fallback for categories without slug
                      <div 
                        key={category.title}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-500/10 border border-gray-500/20"
                      >
                        <Tag size={12} className="text-gray-400" />
                        <span className="text-xs font-medium text-gray-400">
                          {category.title}
                        </span>
                      </div>
                    )
                  ))}
                </div>
              )}

            </div>

            {/* Author Section */}
            {post.author && (
              <div className="flex items-center gap-4 mb-8 p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                {authorImageUrl && (
                  <img
                    src={authorImageUrl}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full ring-2 ring-purple-500/50"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-200">{post.author.name}</h3>
                  {post.author.bio && (
                    <div className="text-sm text-gray-400 mt-1">
                      <PortableText value={post.author.bio} />
                    </div>
                  )}
                </div>
              </div>
            )}

            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
              {post.title}
            </h1>

            <div className="max-w-none prose prose-invert">
              {post.body && (
                <PortableText 
                  value={post.body} 
                  components={components}
                />
              )}
            </div>

            {/* Share Buttons */}
            <div className="mt-12 pt-8 border-t border-slate-800">
              <ShareButtons title={post.title} slug={post.slug.current} />
            </div>
          </article>

          <aside className="lg:border-l lg:border-slate-800 lg:pl-8">
            <div className="sticky top-8">
              <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Recent Posts
              </h2>
              <div className="flex flex-col gap-6">
                {recentPosts.map((recentPost) => (
                  <Link 
                    key={recentPost.slug.current}
                    href={`/blogs/${recentPost.slug.current}`}
                    className="group"
                  >
                    <article className="flex gap-4 p-3 rounded-lg transition-all 
                      hover:bg-slate-900/50 hover:ring-1 hover:ring-purple-500/20">
                      {recentPost.mainImage && (
                        <img
                          src={urlFor(recentPost.mainImage)?.width(100).height(100).url()}
                          alt={recentPost.title}
                          className="w-24 h-24 rounded-lg object-cover ring-1 ring-slate-800"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-200 group-hover:text-purple-400 transition-colors line-clamp-2 mb-2">
                          {recentPost.title}
                        </h3>
                        <time className="text-sm text-gray-500">
                          {new Date(recentPost.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </time>
                      </div>
                      <ChevronRight size={20} className="text-gray-600 group-hover:text-pink-400 transition-colors" />
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}