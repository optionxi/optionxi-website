import { Metadata } from 'next';
import { client } from "@/app/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Types for metadata generation
interface PostMetadata {
  title: string;
  publishedAt: string;
  mainImage?: SanityImageSource;
  description?: string;
}

const METADATA_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  title,
  publishedAt,
  mainImage,
  description,
}`;

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // Next.js 15: params is now async and must be awaited before use.
  const { slug } = await params;

  const post: PostMetadata = await client.fetch(
    METADATA_QUERY,
    { slug },
    { next: { revalidate: 30 } }
  );

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(1200).height(675).url()
    : null;

  const description =
    post.description ||
    `Read ${post.title} - Published on ${new Date(post.publishedAt).toLocaleDateString()}`;

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 675,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
    authors: [{ name: 'OptionXi' }],
    alternates: {
      canonical: `/blogs/${slug}`,
    },
  };
}