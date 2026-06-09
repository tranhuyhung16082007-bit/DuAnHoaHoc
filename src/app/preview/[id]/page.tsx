import { supabaseAdmin } from '@/lib/supabase';
import { renderMathInText } from '@/lib/renderMath';
import { notFound } from 'next/navigation';

export default async function PreviewPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { data, error } = await supabaseAdmin
    .from('homework_tasks')
    .select('*')
    .eq('task_id', params.id)
    .single();

  if (error || !data) {
    return notFound();
  }

  const renderedPrompt = renderMathInText(data.extracted_prompt);
  const renderedSolution = renderMathInText(data.ai_solution_markdown);

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8 min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">Xem trước Lời giải AI</h1>
        <p className="text-zinc-500 text-sm">
          Vui lòng kiểm tra kỹ công thức và kết quả. Sau khi xem xong, hãy quay lại Telegram để bấm <strong>Duyệt</strong> hoặc <strong>Hủy</strong>.
        </p>
      </div>

      <div className="mb-8 p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
        <h2 className="font-bold text-lg mb-4 text-zinc-700 dark:text-zinc-300 flex items-center">
          <span className="mr-2">📝</span> Đề bài trích xuất:
        </h2>
        <div 
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: renderedPrompt }} 
        />
      </div>

      <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl shadow-sm border border-blue-100 dark:border-blue-900/30">
        <h2 className="font-bold text-lg mb-4 text-blue-700 dark:text-blue-400 flex items-center">
          <span className="mr-2">💡</span> Lời giải chi tiết:
        </h2>
        <div 
          className="prose dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200"
          dangerouslySetInnerHTML={{ __html: renderedSolution }} 
        />
      </div>
      
      {data.status === 'published' && (
        <div className="mt-8 p-4 bg-green-100 text-green-700 rounded-lg text-center font-bold">
          ✅ Bài tập này đã được duyệt và đăng!
        </div>
      )}
      {data.status === 'rejected' && (
        <div className="mt-8 p-4 bg-red-100 text-red-700 rounded-lg text-center font-bold">
          ❌ Bài tập này đã bị hủy.
        </div>
      )}
    </div>
  );
}
