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
  const currentUrl = `https://optionxi.com/blogs/${slug}`;
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
      <span className="text-sm text-slate-500 flex items-center gap-2">
        <Share2 size={16} />
        Share:
      </span>
      <div className="flex gap-2">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-900 hover:text-white transition-colors"
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
          className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-900 hover:text-white transition-colors"
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
          className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-900 hover:text-white transition-colors"
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
          className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-900 hover:text-white transition-colors"
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

// Clean, editorial, light-theme Portable Text components
const components: PortableTextComponents = {
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-2 my-6 list-none pl-0">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="space-y-2 my-6 list-decimal pl-5 marker:text-slate-400">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 shrink-0" />
        <span className="text-slate-700">{children}</span>
      </li>
    ),
    number: ({ children }) => <li className="text-slate-700">{children}</li>,
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-bold mt-12 mb-5 text-slate-900 tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-slate-900 tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-3 text-slate-900">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold mt-6 mb-2 text-slate-800">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-6 text-[17px] leading-8 text-slate-700">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 pl-5 border-l-4 border-indigo-500 italic text-slate-600 text-lg leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-indigo-600 underline decoration-indigo-200 underline-offset-4 hover:decoration-indigo-500 transition-colors"
        >
          {children}
        </a>
      );
    },
  },
};

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Next.js 15: params is now async and must be awaited before use.
  const { slug } = await params;

  const { post, recentPosts }: PostData = await client.fetch(
    POST_QUERY,
    { slug },
    options
  );

  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(1400).height(787).url()
    : null;

  const authorImageUrl = post.author?.image
    ? urlFor(post.author.image)?.width(100).height(100).url()
    : null;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <Link
          href="/blogs"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-10"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to posts
        </Link>

        <div className="grid lg:grid-cols-[1fr,340px] gap-12">
          <article className="max-w-2xl">
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {post.categories.map((category) =>
                  category.slug && category.slug.current ? (
                    <Link
                      key={category.slug.current}
                      href={`/blogs/category/${category.slug.current}`}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 transition-colors"
                    >
                      <Tag size={12} className="text-indigo-500" />
                      <span className="text-xs font-medium text-indigo-600">
                        {category.title}
                      </span>
                    </Link>
                  ) : (
                    <div
                      key={category.title}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-50 border border-slate-200"
                    >
                      <Tag size={12} className="text-slate-400" />
                      <span className="text-xs font-medium text-slate-500">
                        {category.title}
                      </span>
                    </div>
                  )
                )}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-slate-900 mb-6 tracking-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500 pb-6 mb-8 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <Calendar size={15} />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
              {post.estimatedReadingTime && (
                <div className="flex items-center gap-1.5">
                  <Clock size={15} />
                  <span>{post.estimatedReadingTime} min read</span>
                </div>
              )}
            </div>

            {postImageUrl && (
              <div className="mb-10 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                <img
                  src={postImageUrl}
                  alt={post.title}
                  className="w-full aspect-video object-cover"
                  width="1400"
                  height="787"
                />
              </div>
            )}

            {/* Author */}
            {post.author && (
              <div className="flex items-center gap-4 mb-10 p-4 rounded-xl bg-slate-50 border border-slate-100">
                {authorImageUrl && (
                  <img
                    src={authorImageUrl}
                    alt={post.author.name}
                    className="w-11 h-11 rounded-full ring-2 ring-white shadow-sm"
                  />
                )}
                <div className="flex-1">
                  <p className="text-sm text-slate-400">Written by</p>
                  <h3 className="font-semibold text-slate-900">{post.author.name}</h3>
                  {post.author.bio && (
                    <div className="text-sm text-slate-500 mt-1">
                      <PortableText value={post.author.bio} />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Body */}
            <div className="prose prose-slate max-w-none">
              {post.body && <PortableText value={post.body} components={components} />}
            </div>

            {/* Share */}
            <div className="mt-14 pt-8 border-t border-slate-100">
              <ShareButtons title={post.title} slug={post.slug.current} />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:border-l lg:border-slate-100 lg:pl-10">
            <div className="sticky top-10">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-6">
                Recent Posts
              </h2>
              <div className="flex flex-col gap-3">
                {recentPosts.map((recentPost) => (
                  <Link
                    key={recentPost.slug.current}
                    href={`/blogs/${recentPost.slug.current}`}
                    className="group"
                  >
                    <article className="flex gap-4 p-2 rounded-xl transition-colors hover:bg-slate-50">
                      {recentPost.mainImage && (
                        <img
                          src={urlFor(recentPost.mainImage)?.width(96).height(96).url()}
                          alt={recentPost.title}
                          className="w-16 h-16 rounded-lg object-cover border border-slate-100 shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-1">
                          {recentPost.title}
                        </h3>
                        <time className="text-xs text-slate-400">
                          {new Date(recentPost.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                      </div>
                      <ChevronRight
                        size={16}
                        className="text-slate-300 group-hover:text-indigo-500 transition-colors mt-1 shrink-0"
                      />
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