import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ChevronRight } from "lucide-react";
import { client } from "@/app/sanity/client";
import { PortableTextBlock } from "@portabletext/types";
import { PortableTextComponents } from "@portabletext/react";

// Types remain the same...
interface Post {
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  estimatedReadingTime?: number;
  mainImage?: SanityImageSource;
  body?: PortableTextBlock[];
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
    body
  },
  "recentPosts": *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...4] {
    title,
    slug,
    publishedAt,
    mainImage
  }
}`;

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// Properly typed components for PortableText
const components: PortableTextComponents = {
  block: {
    h1: ({children}) => (
      <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-100">{children}</h1>
    ),
    h2: ({children}) => (
      <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-100">{children}</h2>
    ),
    h3: ({children}) => (
      <h3 className="text-xl font-bold mt-4 mb-2 text-gray-100">{children}</h3>
    ),
    normal: ({children}) => (
      <p className="mb-4 text-gray-300 text-justify leading-relaxed">{children}</p>
    ),
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-blue-400 pl-4 italic my-4 text-gray-300">
        {children}
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
          className="text-blue-400 hover:text-green-400 transition-colors"
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

  return (
    <main className="min-h-screen bg-slate-950 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/blogs" 
          className="inline-flex items-center text-blue-400 hover:text-green-400 transition-colors mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to posts
        </Link>

        <div className="grid lg:grid-cols-[1fr,380px] gap-8">
          <article className="relative">
            {postImageUrl && (
              <div className="mb-8 rounded-xl overflow-hidden ring-1 ring-blue-500/20">
                <img
                  src={postImageUrl}
                  alt={post.title}
                  className="w-full aspect-video object-cover"
                  width="1200"
                  height="675"
                />
              </div>
            )}

            <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
              <div className="flex items-center gap-1">
                <Calendar size={16} className="text-blue-400" />
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
                  <Clock size={16} className="text-green-400" />
                  <span>{post.estimatedReadingTime} min read</span>
                </div>
              )}
            </div>

            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
              {post.title}
            </h1>

            <div className="max-w-none">
              {post.body && (
                <PortableText 
                  value={post.body} 
                  components={components}
                />
              )}
            </div>
          </article>

          <aside className="lg:border-l lg:border-slate-800 lg:pl-8">
            <div className="sticky top-8">
              <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
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
                      hover:bg-slate-900/50 hover:ring-1 hover:ring-blue-500/20">
                      {recentPost.mainImage && (
                        <img
                          src={urlFor(recentPost.mainImage)?.width(100).height(100).url()}
                          alt={recentPost.title}
                          className="w-24 h-24 rounded-lg object-cover ring-1 ring-slate-800"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-200 group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
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
                      <ChevronRight size={20} className="text-gray-600 group-hover:text-green-400 transition-colors" />
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