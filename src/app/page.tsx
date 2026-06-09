import Link from "next/link";
import { BookOpen, FlaskConical, Atom, TestTubes, Search, UploadCloud } from "lucide-react";

export default function Home() {
  const courses = [
    {
      title: "Hóa Học 10",
      description: "Cấu tạo nguyên tử, bảng tuần hoàn, liên kết hóa học và phản ứng oxi hóa - khử.",
      slug: "hoa-10",
      icon: <Atom size={40} className="mb-4 text-emerald-500" />
    },
    {
      title: "Hóa Học 11",
      description: "Sự điện li, Nito-Photpho, Đại cương hữu cơ và hiđrocacbon.",
      slug: "hoa-11",
      icon: <FlaskConical size={40} className="mb-4 text-purple-500" />
    },
    {
      title: "Hóa Học 12",
      description: "Este-Lipit, Cacbohidrat, Amin, Amino axit và Đại cương kim loại (Trọng tâm THPTQG).",
      slug: "hoa-12",
      icon: <BookOpen size={40} className="mb-4 text-blue-500" />,
      featured: true
    }
  ];

  return (
    <div className="min-h-screen p-8 sm:p-20 bg-zinc-50 dark:bg-zinc-950">
      <main className="max-w-5xl mx-auto py-10">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
            Hóa Học THPTQG <span className="text-blue-600 dark:text-blue-500">Survival Guide</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            Hệ thống kiến thức được phân loại rõ ràng theo từng "Dạng". Chọn lớp học để rèn luyện thuật toán và chinh phục điểm số.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {courses.map((course) => (
            <Link 
              key={course.slug} 
              href={`/hoc/${course.slug}`}
              className={`group relative flex flex-col p-8 rounded-2xl bg-white dark:bg-zinc-900 border transition-all hover:shadow-lg ${course.featured ? 'border-blue-500/50 shadow-[0_4px_20px_-4px_rgba(59,130,246,0.2)] hover:border-blue-500' : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600'}`}
            >
              {course.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Trọng Tâm
                </div>
              )}
              {course.icon}
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">{course.title}</h2>
              <p className="text-zinc-500 dark:text-zinc-400 flex-grow leading-relaxed">
                {course.description}
              </p>
              <div className="mt-6 text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center group-hover:translate-x-1 transition-transform">
                Vào xem chương trình <span className="ml-1">→</span>
              </div>
            </Link>
          ))}
        </section>

        {/* Feature: Hỏi Bài AI */}
        <section className="mb-10">
          <Link href="/upload" className="group flex flex-col sm:flex-row items-center p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-emerald-900 to-teal-900 overflow-hidden relative shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
            <div className="absolute top-0 right-0 -mt-20 -mr-16 text-white opacity-5 group-hover:rotate-12 transition-transform duration-700">
              <UploadCloud size={350} />
            </div>
            
            <div className="flex-shrink-0 bg-white/10 p-5 rounded-2xl backdrop-blur-md mb-6 sm:mb-0 sm:mr-8 border border-white/20">
              <UploadCloud size={56} className="text-emerald-200" />
            </div>
            
            <div className="flex-grow z-10 text-center sm:text-left">
              <div className="inline-block px-3 py-1 bg-emerald-500/40 text-emerald-100 text-xs font-bold rounded-full uppercase tracking-wider mb-3 backdrop-blur-sm border border-emerald-400/30">
                New Feature
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Hỏi Bài AI</h2>
              <p className="text-emerald-200/90 mb-0 max-w-xl text-lg">
                Upload ảnh bài tập hóa học bất kỳ, AI sẽ tự động giải đáp chi tiết. Tích hợp lưu trữ lịch sử bằng ID siêu xịn xò.
              </p>
            </div>
            
            <div className="mt-6 sm:mt-0 hidden md:flex items-center justify-center px-6 py-4 bg-white/10 rounded-full text-white backdrop-blur-md group-hover:bg-white group-hover:text-emerald-900 font-bold ml-4 border border-white/20 transition-colors z-10">
              Tải lên ngay →
            </div>
          </Link>
        </section>

        {/* Feature: Kho Bài Tập */}
        <section className="mb-10">
          <Link href="/kho-bai-tap" className="group flex flex-col sm:flex-row items-center p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-violet-900 to-purple-900 overflow-hidden relative shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
            <div className="absolute top-0 right-0 -mt-20 -mr-16 text-white opacity-5 group-hover:rotate-12 transition-transform duration-700">
              <Search size={350} />
            </div>
            
            <div className="flex-shrink-0 bg-white/10 p-5 rounded-2xl backdrop-blur-md mb-6 sm:mb-0 sm:mr-8 border border-white/20">
              <Search size={56} className="text-violet-200" />
            </div>
            
            <div className="flex-grow z-10 text-center sm:text-left">
              <div className="inline-block px-3 py-1 bg-violet-500/40 text-violet-100 text-xs font-bold rounded-full uppercase tracking-wider mb-3 backdrop-blur-sm border border-violet-400/30">
                Smart Search
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Kho Bài Tập</h2>
              <p className="text-violet-200/90 mb-0 max-w-xl text-lg">
                Ngân hàng đề tổng hợp với tìm kiếm thông minh. Gõ bất kỳ từ khóa nào — hệ thống sẽ tìm đúng bài tập bạn cần.
              </p>
            </div>
            
            <div className="mt-6 sm:mt-0 hidden md:flex items-center justify-center px-6 py-4 bg-white/10 rounded-full text-white backdrop-blur-md group-hover:bg-white group-hover:text-violet-900 font-bold ml-4 border border-white/20 transition-colors z-10">
              Tìm kiếm →
            </div>
          </Link>
        </section>

        {/* Feature Component Bảng Tuần Hoàn */}
        <section>
          <Link href="/bang-tuan-hoan" className="group flex flex-col sm:flex-row items-center p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-indigo-900 to-blue-900 overflow-hidden relative shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
            <div className="absolute top-0 right-0 -mt-20 -mr-16 text-white opacity-5 group-hover:rotate-12 transition-transform duration-700">
              <TestTubes size={350} />
            </div>
            
            <div className="flex-shrink-0 bg-white/10 p-5 rounded-2xl backdrop-blur-md mb-6 sm:mb-0 sm:mr-8 border border-white/20">
              <FlaskConical size={56} className="text-blue-200" />
            </div>
            
            <div className="flex-grow z-10 text-center sm:text-left">
              <div className="inline-block px-3 py-1 bg-blue-500/40 text-blue-100 text-xs font-bold rounded-full uppercase tracking-wider mb-3 backdrop-blur-sm border border-blue-400/30">
                Công cụ cực xịn
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Bảng Tuần Hoàn Tương Tác</h2>
              <p className="text-blue-200/90 mb-0 max-w-xl text-lg">
                Hệ thống 35 nguyên tố thiết yếu trong đề thi THPTQG. Tra cứu cấu hình Electron, khối lượng và độ âm điện chỉ bằng một cái lướt chuột.
              </p>
            </div>
            
            <div className="mt-6 sm:mt-0 hidden md:flex items-center justify-center px-6 py-4 bg-white/10 rounded-full text-white backdrop-blur-md group-hover:bg-white group-hover:text-blue-900 font-bold ml-4 border border-white/20 transition-colors z-10">
              Trải nghiệm →
            </div>
          </Link>
        </section>
      </main>
    </div>
  );
}
