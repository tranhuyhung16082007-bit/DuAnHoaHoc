import Link from "next/link";
import { ArrowLeft, FlaskConical, BookOpen, Clock, Zap, FileText } from "lucide-react";

export const metadata = {
  title: "Hóa Học 11 | Hóa Học THPTQG",
  description: "Sự điện li, Nito-Photpho, Đại cương hữu cơ và hiđrocacbon.",
};

import { curriculumData } from "@/data/curriculum";

export default function HoaHoc11Page() {
  const chapters = curriculumData["hoa-11"];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20">
      {/* Hero Section Container */}
      <div className="relative overflow-hidden bg-white dark:bg-zinc-950">
        
        {/* Dynamic Abstract Background Gradient for Class 11 (Purple/Magenta Theme) */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-700/90 via-purple-600/80 to-fuchsia-600/90" />
          <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-purple-400/40 rounded-full blur-[120px] mix-blend-overlay" />
          <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-fuchsia-400/30 rounded-full blur-[150px] mix-blend-overlay" />
          
          {/* Subtle overlay grid */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-10 pb-24 md:pt-16 md:pb-32 flex flex-col md:flex-row items-center gap-12 z-10 text-white">
          <div className="w-full md:w-1/2">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 text-sm font-medium transition-all backdrop-blur-md mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" /> Về trang chủ
            </Link>
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-purple-900/40 backdrop-blur-md border border-purple-400/30 text-purple-100 text-xs font-bold uppercase tracking-widest mb-6">
              <FlaskConical size={16} /> Lớp 11
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight drop-shadow-xl">
              Hóa Học 11<br/>
              <span className="text-purple-200">Đột Phá</span>
            </h1>
            
            <p className="text-lg text-purple-50 max-w-xl leading-relaxed mb-8 drop-shadow">
              Làm chủ Sự điện li, hóa học Phi kim, và sự chuyển giao quan trọng sang đại cương Hữu cơ và Hiđrocacbon.
            </p>

            <div className="flex gap-6 items-center flex-wrap">
            </div>
          </div>
          
          <div className="w-full md:w-1/2 relative">
            <div className="relative w-full aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/50 border border-white/20 bg-purple-950/50 flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-800/40 to-transparent" />
              <FlaskConical size={80} className="text-purple-300/50 animate-pulse" />
              <p className="mt-4 text-purple-100/70 font-medium text-sm">Chèn Illustration Hóa 11 vào vùng này</p>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-zinc-200 dark:border-zinc-800">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Zap size={24} className="fill-current" />
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-semibold uppercase">Tốc độ</p>
                <p className="font-bold text-zinc-900 dark:text-white">Kiến thức cực nặng</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Curvy bottom separator */}
        <div className="absolute -bottom-[2px] left-0 right-0 z-20">
          <svg viewBox="0 0 1440 48" fill="none" className="w-full h-12 md:h-16 block transform translate-y-[1px]">
            <path d="M0 48h1440V24C1440 24 1140 0 720 0S0 24 0 24v24z" className="fill-zinc-50 dark:fill-zinc-950" />
          </svg>
        </div>
      </div>

      {/* Chapters Content */}
      <div className="max-w-4xl mx-auto px-6 pt-10">
        <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          Chương trình học
        </h2>
        
        <div className="grid gap-4">
          {chapters.map((chapter, i) => (
            <div 
              key={chapter.id} 
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-[0_8px_30px_rgb(168,85,247,0.15)] transition-all duration-150 ease-out group"
            >
              <div className="flex gap-4 items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:bg-purple-100 group-hover:text-purple-600 font-bold transition-colors">
                  {i + 1}
                </div>
                <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {chapter.title}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-14">
                {chapter.lessons.map((lesson) => (
                  <Link 
                    href={`/hoc/hoa-11/${chapter.id}/${lesson.id}`} 
                    key={lesson.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-purple-700 dark:hover:text-purple-300 transition-colors border border-transparent hover:border-purple-200 dark:hover:border-purple-800"
                  >
                    <FileText size={16} className="text-zinc-400 shrink-0" />
                    <span className="flex-1">{lesson.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
