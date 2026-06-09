'use client';

import { useState } from 'react';
import { UploadCloud, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError(null);
      setSuccess(false);
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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 sm:p-20 bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full">
        <Link href="/" className="text-sm font-semibold text-zinc-500 hover:text-blue-500 mb-8 inline-block">
          ← Quay lại trang chủ
        </Link>
        
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
            Tải lên bài tập <span className="text-blue-600 dark:text-blue-500">cần giải</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Gửi ảnh bài tập của bạn. Hệ thống AI sẽ tự động đọc đề, giải bài và gửi cho đội ngũ kiểm duyệt trước khi xuất bản.
          </p>
        </header>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
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
            <div className="flex flex-col items-center py-10 text-center">
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full mb-6">
                <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Đã gửi thành công!</h2>
              <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm">
                Bài tập của bạn đã được chuyển cho các trạm AI xử lý. Sẽ mất một chút thời gian để được duyệt.
              </p>
              <button
                onClick={() => {
                  setSuccess(false);
                  setPreview(null);
                }}
                className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-50 rounded-xl font-semibold transition-colors"
              >
                Gửi thêm bài tập khác
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
