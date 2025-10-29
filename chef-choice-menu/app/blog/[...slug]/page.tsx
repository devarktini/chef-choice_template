// app/blog/[...slug]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
// import styles from "./BlogDetail.module.css";
import { getBlogById } from "../../../services/blogService";
// import ShareBlogs from "@/components/share/ShareBlogs";
import type { Metadata } from 'next';

export const dynamic = "force-dynamic";

interface Blog {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  imageUrl?: string;
}

interface Props {
  params: { slug: string[] };
}

// utils/seo.ts (you can keep inline or extract)
function normalizeAbsoluteImage(raw: string | undefined, fallback: string) {
  if (!raw) return fallback;
  try {
    // If raw is already absolute, use it; otherwise treat as relative to fallback origin
    const u = raw.startsWith('http') ? new URL(raw) : new URL(raw, fallback);
    // encode only pathname+search (preserve host)
    u.pathname = encodeURI(u.pathname);
    u.search = encodeURI(u.search);
    return u.toString();
  } catch (e) {
    // fallback safe url
    return fallback;
  }
}

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  const blogId = params?.slug?.[1];
  if (!blogId) return {};

  const blog = await getBlogById(blogId);
  if (!blog) return {};
  // Build slug part consistently with your client code
  const slugPart = (blog.title || 'blog')
    .toLowerCase()
    .replace(/[\s,%]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const base = 'https://equipmedy.com';
  const canonicalUrl = `${base}/blog-listing/${encodeURIComponent(slugPart)}/${encodeURIComponent(blogId)}`;

  // Normalize image. Use absolute URL and encode path. Provide fallback (png/jpg).
  const defaultOg = `${base}/default-og-image.png`;
  // If your blog.imageUrl is relative (e.g. "/uploads/xyz.webp"), prefix it with its media origin
  const mediaOrigin = 'https://blogapi.gyprc.com'; // adapt to your media host
  const rawImage = blog.imageUrl ? (blog.imageUrl.startsWith('http') ? blog.imageUrl : mediaOrigin + blog.imageUrl) : undefined;
  const imageUrl = normalizeAbsoluteImage(rawImage, defaultOg);

  // Provide a JPG/PNG fallback for social platforms that prefer non-webp
  const imageJpgFallback = imageUrl.replace(/\.webp(?:$|\?)/i, '.jpg');

  // const truncatedDescription = (blog.description || 'Check out this medical equipment').slice(0, 160);

  return {
    title: blog?.metaTitle,
    keywords: blog?.metaKeywords,
    description: blog?.metaDescription,
    metadataBase: new URL(base),
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: blog.metaTitle,
      description: blog.metaDescription,
      keywords: blog.metaKeywords,
      url: canonicalUrl,
      siteName: 'EquipMedy',
      type: 'article',
      locale: 'en_US',
      // supply explicit OG images (absolute, encoded)
      images: [
        { url: imageUrl, width: 1200, height: 630, alt: blog.title },
        { url: imageJpgFallback, width: 1200, height: 630, alt: blog.title },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.metaTitle,
      keywords: blog.metaKeywords,
      description: blog.metaDescription,
      images: [imageJpgFallback, imageUrl], // twitter prefers jpg/png but include both
    },
  } as any; // cast to Metadata if desired
}


/**
 * Normalize markdown text so that authoring inconsistencies (like "•" bullets)
 * are converted to valid markdown lists. You can expand this if you have other
 * oddities in the API content.
 */
function normalizeMarkdown(raw: string) {
  if (!raw) return raw;

  // Convert bullet char "•" (possibly followed by tabs) into "- " for lists
  // ^[\s]*•\s?  -> replace with '- '
  let s = raw.replace(/^[\t ]*•\s?/gm, "- ");

  // Convert Windows CRLF to LF (react-markdown is fine with LF)
  s = s.replace(/\r\n/g, "\n");

  // Optionally ensure there is a blank line before lists (helps parsing)
  // Replace a previous-line that is not blank and is not a list header with newline + list
  s = s.replace(/([^\n])\n(-\s+)/g, "$1\n\n$2");

  return s;
}

export default async function BlogDetail({ params }: Props) {
  const blogId = params?.slug?.[1];
  if (!blogId) return notFound();

  let blog: Blog | null = null;
  try {
    blog = await getBlogById(blogId);
  } catch (err) {
    console.error("Error fetching blog (server):", err);
    return notFound();
  }
  if (!blog) return notFound();

  // Sanitizer schema: allow some extra tags/attrs commonly used in blog posts
  const schema = {
    ...defaultSchema,
    tagNames: [...(defaultSchema.tagNames || []), "img", "table", "thead", "tbody", "tr", "th", "td"],
    attributes: {
      ...defaultSchema.attributes,
      a: [...(defaultSchema.attributes?.a || []), "href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
    },
  };

  const content = normalizeMarkdown(blog.content);
  const blogImage = blog.imageUrl ?? '';

  return (
    <div className='blogContainer mt-20'>
      <div className="max-w-6xl w-[95%] md:w-[90%] lg:w-[85%] mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg">
        {blog.imageUrl && (
          <img
            src={blog.imageUrl.startsWith("http") ? blog.imageUrl : `https://blogapi.gyprc.com${blog.imageUrl}`}
            alt={blog.title}
            className="w-full h-48 md:h-72 object-cover rounded-xl mb-6 shadow-md"
          />
        )}

        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{blog.title}</h1>
            <p className="text-base md:text-lg text-gray-600">{blog.description}</p>
          </div>
          <div className="text-sm md:text-base text-gray-500">By <span className="font-medium">{blog.author}</span></div>
        </div>

        {/* article wrapper uses CSS module styles.markdownWrapper and 'wmde-markdown' classnames */}
        <article className={`markdownWrapper wmde-markdown mt-6`}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, [rehypeSanitize, schema]]}
            components={{
              h1: ({ node, ...props }) => <h1 className="text-3xl md:text-4xl font-bold mt-6 mb-2" {...(props as any)} />,
              h2: ({ node, ...props }) => <h2 className="text-2xl md:text-3xl font-semibold mt-5 mb-2" {...(props as any)} />,
              h3: ({ node, ...props }) => <h3 className="text-xl md:text-2xl font-semibold mt-4 mb-2" {...(props as any)} />,
              p: ({ node, ...props }) => <p className="text-base md:text-lg mb-4 leading-relaxed" {...(props as any)} />,
              a: ({ node, ...props }) => {
                const href = (props as any).href ?? "";
                const isExternal = href.startsWith("http");
                return (
                  <a
                    {...(props as any)}
                    className="text-indigo-600 hover:underline break-words"
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                  />
                );
              },
              ul: ({ node, ...props }) => <ul className="ml-6 list-disc mb-4" {...(props as any)} />,
              ol: ({ node, ...props }) => <ol className="ml-6 list-decimal mb-4" {...(props as any)} />,
              li: ({ node, ...props }) => <li className="mb-1 leading-6" {...(props as any)} />,
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-indigo-500 bg-gray-50 p-3 rounded-md my-4" {...(props as any)} />
              ),
              img: ({ node, ...props }) => (
                <img {...(props as any)} className="max-w-full rounded-md my-4 object-contain" loading="lazy" />
              ),

              table: ({ node, ...props }) => (
                <div className="overflow-auto my-4">
                  <table className="min-w-full border-collapse" {...(props as any)} />
                </div>
              ),
              th: ({ node, ...props }) => <th className="bg-gray-100 text-left px-3 py-2 border" {...(props as any)} />,
              td: ({ node, ...props }) => <td className="px-3 py-2 border align-top" {...(props as any)} />,
              pre: ({ node, ...props }) => (
                <pre className="bg-slate-900 text-white rounded-md p-4 overflow-auto my-4" {...(props as any)} />
              ),
              // Fix for TypeScript: accept props as any, destructure inline flag safely
              code: (props: any) => {
                const { inline, className, children, ...rest } = props;
                if (inline) {
                  return (
                    <code className="bg-gray-100 px-1 rounded text-sm" {...rest}>
                      {children}
                    </code>
                  );
                }
                return (
                  <pre className="bg-slate-900 text-white rounded-md p-4 overflow-auto my-4">
                    <code className={className} {...rest}>
                      {children}
                    </code>
                  </pre>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>

      {/* sharing  */}

      {/* sharing  */}
      {/* <div className="w-[95%] mx-auto flex items-center justify-end">
        <ShareBlogs
          url={`https://equipmedy.com/blog-listing/${encodeURIComponent(
            blog?.title
              ?.toLowerCase()
              .replace(/[\s,%]+/g, '-')
              .replace(/[^a-z0-9-]/g, '')
              .replace(/-+/g, '-')
              .replace(/^-|-$/g, '')
          )}/${encodeURIComponent(blogId)}`}
          title={blog.title}
          description={blog.description || 'Check out this medical equipment'}
          imageUrl={blogImage}
        />

      </div> */}

    </div>
  );
}

