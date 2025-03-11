import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ChevronRight } from "lucide-react";
import { client } from "@/app/sanity/client";
import { PortableTextBlock } from "@portabletext/types";
import { PortableTextComponents } from "@portabletext/react";

// Types
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

export { generateMetadata } from './generateMetadata';

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;


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

            <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
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
            </div>

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