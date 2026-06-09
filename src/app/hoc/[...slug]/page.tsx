import { notFound } from "next/navigation";
import { getAllPaths, getMdxBySlug, getDirectoryContent } from "@/lib/mdx";
import path from "path";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import { Folder, FileText } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const paths = getAllPaths();
  return paths.map((p) => {
    const relativePath = path.relative(path.join(process.cwd(), "content"), p);
    const slug = relativePath.replace(/\.mdx$/, "").split(path.sep);
    return { slug };
  });
}

export default async function HocPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug;
  
  // Kiểm tra xem định tuyến có trúng tệp MDX hay không
  const mdxData = getMdxBySlug(slugArray);

  if (mdxData) {
    return (
      <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto py-12 px-6 lg:py-20 lg:px-8">
        <header className="mb-10 text-center border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
            {mdxData.frontmatter.title || mdxData.slug}
          </h1>
          {mdxData.frontmatter.description && (
            <p className="text-zinc-500 dark:text-zinc-400 lg:text-lg">
              {mdxData.frontmatter.description}
            </p>
          )}
        </header>
        <div className="mdx-content">
          <MDXRemote
            source={mdxData.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkMath, remarkGfm],
                rehypePlugins: [rehypeKatex],
              },
            }}
          />
        </div>
      </article>
    );
  }

  // Chế độ xem Thư mục Menu (List View)
  const dirContent = getDirectoryContent(slugArray);
  
  if (!dirContent) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 lg:py-20 lg:px-8">
      <div className="mb-10 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">{dirContent.meta.title}</h1>
        {dirContent.meta.description && <p className="text-zinc-500 max-w-2xl text-lg">{dirContent.meta.description}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dirContent.items.map((item) => (
          <Link
            key={item.slug}
            href={`/hoc/${item.slug}`}
            className="group relative flex flex-col items-start justify-between rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-blue-500 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-400"
          >
            <div className="mb-4 text-blue-600 dark:text-blue-400 group-hover:-translate-y-1 transition-transform">
              {item.type === "directory" ? <Folder size={32} /> : <FileText size={32} />}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{item.title}</h3>
              {item.description && (
                <p className="text-sm text-zinc-500 line-clamp-2 dark:text-zinc-400 mt-2">
                  {item.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
      {dirContent.items.length === 0 && (
        <div className="text-center py-20 text-zinc-500 rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
          Chưa có bài giảng nào được cập nhật trong chuyên mục này.
        </div>
      )}
    </div>
  );
}
