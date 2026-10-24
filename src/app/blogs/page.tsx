import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { Newsreader, Public_Sans } from "next/font/google";
import { Clock } from "lucide-react";
import { client } from "../sanity/client";
import { urlForImage } from "../sanity/image";

/* ---------------------------------------------------------------------------
   Typography
   Newsreader (serif) carries headlines and gives the page an editorial voice.
   Public Sans keeps body copy and metadata clean and highly legible.
--------------------------------------------------------------------------- */
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});
const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = "font-[family-name:var(--font-serif)]";

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

/* ---------------------------------------------------------------------------
   Helpers
--------------------------------------------------------------------------- */
const linkFocus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 rounded-sm";

const imageMotion =
  "motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]";

const titleHover =
  "decoration-teal-700 decoration-2 underline-offset-4 group-hover:underline";

function formatDate(
  value: string,
  opts: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }
) {
  return new Date(value).toLocaleDateString("en-US", opts);
}

function postHref(post: SanityDocument) {
  return `/blogs/${post.slug?.current || "#"}`;
}

function Category({ post }: { post: SanityDocument }) {
  const title = post.categories?.[0]?.title;
  if (!title) return null;
  return <p className="mb-2 text-sm font-semibold text-teal-700">{title}</p>;
}

function Meta({
  post,
  showDate = true,
}: {
  post: SanityDocument;
  showDate?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
      {post.author?.name && (
        <span className="font-medium text-slate-700">{post.author.name}</span>
      )}
      {showDate && post.publishedAt && (
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      )}
      {post.estimatedReadingTime && (
        <span className="inline-flex items-center gap-1.5">
          <Clock size={14} aria-hidden="true" />
          {post.estimatedReadingTime} min read
        </span>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Page
--------------------------------------------------------------------------- */
export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  // Up to 3 featured posts: the first is the lead story, the rest sit beside it.
  const featuredPosts = posts.filter((post) => post.isFeatured).slice(0, 3);
  const [leadPost, ...sidePosts] = featuredPosts;

  // Everything that isn't featured goes in the main list.
  const featuredIds = new Set(featuredPosts.map((post) => post._id));
  const regularPosts = posts.filter((post) => !featuredIds.has(post._id));

  return (
    <main
      className={`${newsreader.variable} ${publicSans.variable} min-h-screen bg-stone-50 font-[family-name:var(--font-sans)] text-slate-900 antialiased`}
    >
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-8 md:pt-14">
        <h1 className="sr-only">Blog</h1>

        {/* Featured */}
        {leadPost && (
          <section aria-labelledby="featured-heading">
            <h2
              id="featured-heading"
              className={`${serif} mb-8 text-2xl font-medium text-slate-900`}
            >
              Featured
            </h2>

            <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
              {/* Lead story */}
              <Link
                href={postHref(leadPost)}
                className={`group block ${linkFocus} ${
                  sidePosts.length > 0 ? "lg:col-span-7" : "lg:col-span-12"
                }`}
              >
                <article>
                  {leadPost.mainImage && (
                    <div className="aspect-[3/2] overflow-hidden rounded-md bg-slate-200">
                      <img
                        src={urlForImage(leadPost.mainImage)
                          .width(1200)
                          .height(800)
                          .url()}
                        alt={leadPost.title || "Featured article"}
                        className={`h-full w-full object-cover ${imageMotion}`}
                      />
                    </div>
                  )}

                  <div className="mt-6">
                    <Category post={leadPost} />
                    <h3
                      className={`${serif} text-3xl font-medium leading-tight tracking-tight text-slate-900 md:text-4xl ${titleHover}`}
                    >
                      {leadPost.title}
                    </h3>
                    {leadPost.excerpt && (
                      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600 line-clamp-3">
                        {leadPost.excerpt}
                      </p>
                    )}
                    <div className="mt-5">
                      <Meta post={leadPost} />
                    </div>
                  </div>
                </article>
              </Link>

              {/* Supporting featured stories */}
              {sidePosts.length > 0 && (
                <div className="flex flex-col divide-y divide-slate-300 lg:col-span-5 lg:border-l lg:border-slate-300 lg:pl-14">
                  {sidePosts.map((post, index) => (
                    <Link
                      key={post._id}
                      href={postHref(post)}
                      className={`group block py-8 ${linkFocus} ${
                        index === 0 ? "pt-0" : ""
                      } ${index === sidePosts.length - 1 ? "pb-0" : ""}`}
                    >
                      <article className="flex items-start gap-5">
                        <div className="min-w-0 flex-1">
                          <Category post={post} />
                          <h3
                            className={`${serif} text-xl font-medium leading-snug text-slate-900 md:text-2xl ${titleHover}`}
                          >
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="mt-3 text-base leading-relaxed text-slate-600 line-clamp-2">
                              {post.excerpt}
                            </p>
                          )}
                          <div className="mt-4">
                            <Meta post={post} />
                          </div>
                        </div>

                        {post.mainImage && (
                          <div className="aspect-square w-24 shrink-0 overflow-hidden rounded bg-slate-200 sm:w-32">
                            <img
                              src={urlForImage(post.mainImage)
                                .width(320)
                                .height(320)
                                .url()}
                              alt={post.title || "Featured article"}
                              className={`h-full w-full object-cover ${imageMotion}`}
                            />
                          </div>
                        )}
                      </article>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* All articles */}
        <section
          aria-labelledby="all-articles-heading"
          className={
            leadPost
              ? "mt-16 border-t border-slate-300 pt-8 md:mt-24"
              : undefined
          }
        >
          <div className="mb-2 flex items-baseline justify-between gap-4">
            <h2
              id="all-articles-heading"
              className={`${serif} text-2xl font-medium text-slate-900`}
            >
              All articles
            </h2>
            <span className="text-sm text-slate-500">
              {regularPosts.length}{" "}
              {regularPosts.length === 1 ? "article" : "articles"}
            </span>
          </div>

          {regularPosts.length === 0 ? (
            <p className="py-16 text-slate-600">
              No articles yet. New posts will show up here as soon as they are
              published.
            </p>
          ) : (
            <ul className="divide-y divide-slate-300">
              {regularPosts.map((post) => (
                <li key={post._id}>
                  <Link
                    href={postHref(post)}
                    className={`group grid gap-5 py-8 md:grid-cols-[9rem_minmax(0,1fr)_14rem] md:gap-10 ${linkFocus}`}
                  >
                    {/* Date column */}
                    <div className="hidden text-sm text-slate-500 md:block">
                      {post.publishedAt && (
                        <time dateTime={post.publishedAt}>
                          {formatDate(post.publishedAt)}
                        </time>
                      )}
                    </div>

                    {/* Text */}
                    <article className="min-w-0 md:order-none">
                      <Category post={post} />
                      <h3
                        className={`${serif} text-2xl font-medium leading-snug text-slate-900 ${titleHover}`}
                      >
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="mt-4">
                        {/* Date is shown in its own column on desktop */}
                        <div className="md:hidden">
                          <Meta post={post} />
                        </div>
                        <div className="hidden md:block">
                          <Meta post={post} showDate={false} />
                        </div>
                      </div>
                    </article>

                    {/* Thumbnail */}
                    {post.mainImage && (
                      <div className="order-first aspect-[3/2] overflow-hidden rounded bg-slate-200 md:order-none md:self-start">
                        <img
                          src={urlForImage(post.mainImage)
                            .width(420)
                            .height(280)
                            .url()}
                          alt={post.title || "Blog image"}
                          className={`h-full w-full object-cover ${imageMotion}`}
                        />
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}