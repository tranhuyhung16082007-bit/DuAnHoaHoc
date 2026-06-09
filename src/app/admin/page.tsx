'use client';

import { useState, useEffect } from 'react';
import { Loader2, CheckCircle, XCircle, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';

type Task = {
  task_id: string;
  created_at: string;
  original_image_url: string;
  extracted_prompt: string | null;
  ai_solution_markdown: string | null;
  ai_checker_note: string | null;
  status: 'pending' | 'pending_review' | 'published' | 'rejected';
};

export default function AdminDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'pending_review' | 'published'>('pending_review');

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/tasks');
      const data = await res.json();
      if (data.tasks) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error('Error fetching tasks', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAction = async (taskId: string, action: 'approve' | 'reject') => {
    try {
      const res = await fetch('/api/admin/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, action }),
      });
      if (res.ok) {
        // Refresh
        fetchTasks();
      }
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const filteredTasks = tasks.filter(t => t.status === activeTab);

  return (
    <div className="min-h-screen p-8 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Admin Dashboard</h1>
            <p className="text-zinc-500">Quản lý bài tập chờ duyệt từ AI Worker</p>
          </div>
          <button onClick={fetchTasks} className="text-sm font-semibold text-blue-600 hover:underline">
            Làm mới danh sách
          </button>
        </header>

        <div className="flex space-x-4 mb-6 border-b border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setActiveTab('pending_review')}
            className={`pb-3 px-4 font-semibold text-sm transition-colors relative ${activeTab === 'pending_review' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-zinc-500 hover:text-zinc-700'}`}
          >
            Chờ duyệt (Đã có lời giải)
            <span className="ml-2 bg-blue-100 text-blue-800 py-0.5 px-2 rounded-full text-xs">{tasks.filter(t => t.status === 'pending_review').length}</span>
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`pb-3 px-4 font-semibold text-sm transition-colors relative ${activeTab === 'pending' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-zinc-500 hover:text-zinc-700'}`}
          >
            Chờ AI giải (Mới nộp)
            <span className="ml-2 bg-zinc-200 text-zinc-800 py-0.5 px-2 rounded-full text-xs">{tasks.filter(t => t.status === 'pending').length}</span>
          </button>
          <button
            onClick={() => setActiveTab('published')}
            className={`pb-3 px-4 font-semibold text-sm transition-colors relative ${activeTab === 'published' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-zinc-500 hover:text-zinc-700'}`}
          >
            Đã xuất bản
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500">Không có bài tập nào ở trạng thái này.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredTasks.map((task) => (
              <div key={task.task_id} className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Cột trái: Ảnh gốc */}
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3 text-sm uppercase tracking-wider">Ảnh học sinh gửi</h3>
                    <div className="bg-zinc-100 dark:bg-zinc-950 rounded-xl overflow-hidden aspect-auto border border-zinc-200 dark:border-zinc-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={task.original_image_url} alt="Homework" className="w-full object-contain" />
                    </div>
                  </div>

                  {/* Cột phải: AI Solution */}
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3 text-sm uppercase tracking-wider">AI Giải quyết</h3>
                    
                    {task.status === 'pending' ? (
                      <div className="h-full flex flex-col items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-center">
                        <Clock className="w-8 h-8 text-zinc-400 mb-3" />
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm">Bài này đang đợi AI Cron Worker tự động giải.</p>
                        <p className="text-xs text-zinc-500 mt-2">Sẽ được quét trong đợt tiếp theo.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {task.ai_checker_note && task.ai_checker_note !== 'ALL_CLEAR' && (
                          <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-xl text-sm">
                            <strong>⚠️ AI Cảnh Báo:</strong> {task.ai_checker_note}
                          </div>
                        )}
                        {task.ai_checker_note === 'ALL_CLEAR' && (
                          <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900/50 rounded-xl text-sm flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2" /> AI Check: ALL CLEAR (An toàn)
                          </div>
                        )}
                        
                        <div className="bg-white dark:bg-zinc-950 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 h-[500px] overflow-y-auto prose prose-zinc dark:prose-invert max-w-none text-sm [&_.katex]:text-blue-700 dark:[&_.katex]:text-blue-300">
                          {task.ai_solution_markdown ? (
                            <ReactMarkdown
                              remarkPlugins={[remarkMath, remarkGfm]}
                              rehypePlugins={[rehypeKatex]}
                            >
                              {task.ai_solution_markdown}
                            </ReactMarkdown>
                          ) : (
                            <p className="text-zinc-500 italic">Chưa có lời giải</p>
                          )}
                        </div>

                        {task.status === 'pending_review' && (
                          <div className="flex space-x-3 pt-4">
                            <button
                              onClick={() => handleAction(task.task_id, 'approve')}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center transition-colors"
                            >
                              <CheckCircle className="w-5 h-5 mr-2" /> Duyệt & Đăng
                            </button>
                            <button
                              onClick={() => handleAction(task.task_id, 'reject')}
                              className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-400 font-semibold py-3 rounded-xl flex items-center justify-center transition-colors"
                            >
                              <XCircle className="w-5 h-5 mr-2" /> Từ chối
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
