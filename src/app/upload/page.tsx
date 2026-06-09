'use client';

import { useState, useEffect } from 'react';
import { UploadCloud, CheckCircle, AlertCircle, Loader2, Copy, Clock, X, FileText } from 'lucide-react';
import Link from 'next/link';

interface HistoryItem {
  shortId: string;
  taskId: string;
  date: string;
}

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shortId, setShortId] = useState<string | null>(null);
  
  // Lịch sử
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    // Load lịch sử từ localStorage
    const saved = localStorage.getItem('homework_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError(null);
      setSuccess(false);
      setShortId(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upload thất bại');
      }

      setSuccess(true);
      setFile(null);
      
      const newId = data.short_id || data.task_id.substring(0, 6).toUpperCase();
      setShortId(newId);

      // Lưu vào lịch sử
      const newItem: HistoryItem = {
        shortId: newId,
        taskId: data.task_id,
        date: new Date().toISOString()
      };
      
      const newHistory = [newItem, ...history];
      setHistory(newHistory);
      localStorage.setItem('homework_history', JSON.stringify(newHistory));

    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const copyId = () => {
    if (shortId) {
      navigator.clipboard.writeText(shortId);
      alert('Đã copy mã ID: ' + shortId);
    }
  };

  return (
    <div className="min-h-screen p-8 sm:p-20 bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center relative overflow-x-hidden">
      
      {/* Header Bar */}
      <div className="absolute top-0 w-full p-6 flex justify-between items-center z-10 max-w-6xl mx-auto left-0 right-0">
        <Link href="/" className="text-sm font-semibold text-zinc-500 hover:text-blue-500 flex items-center">
          ← Quay lại trang chủ
        </Link>
        <button 
          onClick={() => setShowHistory(true)}
          className="flex items-center px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition shadow-sm"
        >
          <Clock className="w-4 h-4 mr-2" />
          Lịch sử của tôi
        </button>
      </div>

      <div className="max-w-2xl w-full mt-10">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
            Tải lên bài tập <span className="text-blue-600 dark:text-blue-500">cần giải</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Gửi ảnh bài tập của bạn. Trí tuệ nhân tạo sẽ phân tích và giải đáp. Hệ thống sẽ tự động lưu lại lịch sử học tập trên thiết bị này.
          </p>
        </header>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm relative z-0">
          {!success ? (
            <div className="flex flex-col items-center">
              <label 
                htmlFor="file-upload" 
                className={`relative w-full border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all ${
                  preview ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/10' : 'border-zinc-300 dark:border-zinc-700 hover:border-blue-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                }`}
              >
                <input 
                  id="file-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileChange} 
                />
                
                {preview ? (
                  <div className="relative w-full max-w-sm aspect-video rounded-xl overflow-hidden mb-4 shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
                    <UploadCloud className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                )}
                
                <p className="text-zinc-700 dark:text-zinc-300 font-medium text-center">
                  {file ? file.name : "Nhấn để chọn ảnh tải lên"}
                </p>
                <p className="text-zinc-500 dark:text-zinc-500 text-sm mt-2 text-center">
                  Hỗ trợ PNG, JPG, JPEG (Tối đa 5MB)
                </p>
              </label>

              {error && (
                <div className="mt-6 w-full flex items-center p-4 rounded-xl bg-red-50 text-red-600 text-sm">
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className={`mt-8 w-full py-4 rounded-xl font-bold text-white transition-all flex justify-center items-center ${
                  !file || uploading 
                    ? 'bg-zinc-300 dark:bg-zinc-800 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5'
                }`}
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Đang tải lên và phân tích...
                  </>
                ) : (
                  "Gửi bài tập cho AI"
                )}
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full mb-4">
                <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Đã gửi bài thành công!</h2>
              
              <div className="w-full bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/50 rounded-2xl p-6 my-6 relative overflow-hidden">
                <p className="text-blue-800 dark:text-blue-300 font-medium mb-3 text-sm">MÃ BÀI TẬP CỦA BẠN</p>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-5xl font-black text-blue-600 dark:text-blue-400 tracking-wider">
                    {shortId}
                  </span>
                  <button 
                    onClick={copyId}
                    className="p-3 bg-blue-100 dark:bg-blue-800/40 text-blue-600 dark:text-blue-300 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                    title="Copy ID"
                  >
                    <Copy className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="w-full bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 p-4 rounded-xl mb-8 text-left flex gap-3">
                <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                <p className="text-amber-800 dark:text-amber-400 text-sm">
                  <strong>Lưu ý quan trọng:</strong> Hãy ghi nhớ mã ID này hoặc copy lại. Lần sau bạn chỉ cần gõ mã ID này vào thanh tìm kiếm trên trang chủ để xem kết quả giải! (Hệ thống cũng đã tự động lưu ID vào "Lịch sử của tôi" trên máy này).
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowHistory(true)}
                  className="px-6 py-3 bg-white border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-50 rounded-xl font-semibold transition-colors"
                >
                  Xem lịch sử
                </button>
                <button
                  onClick={() => {
                    setSuccess(false);
                    setPreview(null);
                    setShortId(null);
                  }}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-md"
                >
                  Gửi thêm bài khác
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* History Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white dark:bg-zinc-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-zinc-200 dark:border-zinc-800 ${showHistory ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-950/50">
            <h2 className="text-xl font-bold flex items-center text-zinc-900 dark:text-zinc-50">
              <Clock className="w-5 h-5 mr-2 text-blue-500" />
              Lịch sử đã gửi
            </h2>
            <button 
              onClick={() => setShowHistory(false)}
              className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition"
            >
              <X className="w-5 h-5 text-zinc-500" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-zinc-400">
                <FileText className="w-12 h-12 mb-4 opacity-20" />
                <p>Chưa có bài tập nào được gửi từ thiết bị này.</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {history.map((item, index) => (
                  <li key={index} className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4 border border-zinc-100 dark:border-zinc-800 hover:border-blue-200 dark:hover:border-blue-900 transition group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-black rounded-md text-sm tracking-widest">
                        {item.shortId}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {new Date(item.date).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-500 mt-2">Trạng thái: Đang chờ xử lý / Đã có kết quả (Hãy tra cứu mã trên trang chủ)</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {history.length > 0 && (
            <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50">
              <button 
                onClick={() => {
                  if (confirm('Bạn có chắc muốn xóa toàn bộ lịch sử trên máy này?')) {
                    setHistory([]);
                    localStorage.removeItem('homework_history');
                  }
                }}
                className="w-full py-3 text-sm font-semibold text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition"
              >
                Xóa lịch sử
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Backdrop for Sidebar */}
      {showHistory && (
        <div 
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 backdrop-blur-sm"
          onClick={() => setShowHistory(false)}
        />
      )}
    </div>
  );
}
