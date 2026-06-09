import Link from "next/link";
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { curriculumData } from "@/data/curriculum";
import { getLessonData } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// Use the styling for Katex
import 'katex/dist/katex.min.css';

export default async function LessonViewerPage({
  params,
}: {
  params: Promise<{ grade: string; chapterId: string; lessonId: string }>;
}) {
  const { grade, chapterId, lessonId } = await params;

  // Validate properties
  const gradeData = curriculumData[grade];
  if (!gradeData) return <div className="p-8 text-center text-red-500">Không tìm thấy môn học. Lớp: {grade}</div>;

  const chapterIndex = gradeData.findIndex((c) => c.id === chapterId);
  const chapter = gradeData[chapterIndex];
  if (!chapter) return <div className="p-8 text-center text-red-500">Không tìm thấy chương.</div>;

  const lessonIndex = chapter.lessons.findIndex((l) => l.id === lessonId);
  const lesson = chapter.lessons[lessonIndex];
  if (!lesson) return <div className="p-8 text-center text-red-500">Không tìm thấy file định tuyến bài học.</div>;

  // Fetch MDX Content
  const mdxData = await getLessonData(grade, chapterId, lessonId);

  // Navigation Logic
  const prevLesson = lessonIndex > 0 ? chapter.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < chapter.lessons.length - 1 ? chapter.lessons[lessonIndex + 1] : null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center">
      {/* Header Setup */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4 shrink-0 shadow-sm z-10 w-full sticky top-0">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link 
              href={`/hoc/${grade}`}
              className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">{chapter.title}</p>
              <h1 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <BookOpen size={18} className="text-blue-500" />
                {lesson.title}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2 self-end md:self-auto">
             {prevLesson ? (
                <Link
                  href={`/hoc/${grade}/${chapter.id}/${prevLesson.id}`}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 transition-all"
                >
                  <ChevronLeft size={16} /> Bài trước
                </Link>
             ) : (
                <span className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg text-zinc-400 dark:text-zinc-600 cursor-not-allowed">
                  <ChevronLeft size={16} /> Bài trước
                </span>
             )}
             
             {nextLesson ? (
                <Link
                  href={`/hoc/${grade}/${chapter.id}/${nextLesson.id}`}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Bài tiếp <ChevronRight size={16} />
                </Link>
             ) : (
                <span className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg text-zinc-400 bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-600 cursor-not-allowed">
                  Bài tiếp <ChevronRight size={16} />
                </span>
             )}
          </div>
        </div>
      </header>

      {/* Main Content Render */}
      <main className="flex-1 w-full max-w-4xl bg-white dark:bg-zinc-900 shadow-xl border-x border-zinc-200 dark:border-zinc-800 p-8 md:p-12 prose prose-zinc dark:prose-invert max-w-none">
        
        {!mdxData.success ? (
          <div className="p-10 border-2 border-dashed border-red-200 dark:border-red-900 rounded-2xl bg-red-50 dark:bg-red-950/20 text-center">
            <p className="text-red-500 font-bold text-xl mb-4">Bài học chưa được biên soạn</p>
            <p className="text-zinc-600 dark:text-zinc-400">{mdxData.error}</p>
            <p className="text-sm mt-4 text-zinc-500">Bạn có thể tạo file tại <code className="block mt-2 bg-zinc-200 dark:bg-zinc-800 p-2 rounded text-zinc-800 dark:text-zinc-200">content/{grade}/{chapterId}/{lessonId}.mdx</code></p>
          </div>
        ) : (
          <div className="mdx-content text-lg">
            {mdxData.frontmatter?.description && (
              <p className="text-xl text-zinc-500 dark:text-zinc-400 font-medium italic border-l-4 border-blue-500 pl-4 mb-8">
                {mdxData.frontmatter.description}
              </p>
            )}
            
            <MDXRemote 
              source={mdxData.content} 
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkMath],
                  rehypePlugins: [rehypeKatex],
                }
              }}
            />
          </div>
        )}
      </main>

      {/* Styles for MDX Elements */}
      <style>{`
        .mdx-content h1 { font-size: 2.25rem; font-weight: 800; color: #3b82f6; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; margin-top: 2rem; margin-bottom: 1.5rem; }
        .mdx-content h2 { font-size: 1.75rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 1rem; color: var(--foreground); }
        .mdx-content p { line-height: 1.8; margin-bottom: 1.25rem; color: #3f3f46; }
        .dark .mdx-content p { color: #d4d4d8; }
        .dark .mdx-content h1 { border-bottom-color: #27272a; }
        .mdx-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.25rem; }
        .mdx-content li { margin-bottom: 0.5rem; line-height: 1.6; }
        .katex-display { margin: 1.5rem 0 !important; overflow-x: auto; padding: 1rem; background: #f8fafc; border-radius: 0.75rem; border: 1px solid #e2e8f0; }
        .dark .katex-display { background: #09090b; border-color: #27272a; }
        .katex { font-size: 1.1em !important; }
      `}</style>
    </div>
  );
}
