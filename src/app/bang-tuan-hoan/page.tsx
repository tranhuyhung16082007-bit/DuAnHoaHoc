import { PeriodicTable } from "@/components/PeriodicTable";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Bảng Tuần Hoàn Tương Tác | Hóa Học THPTQG",
  description: "Bảng Hệ Thống Tuần Hoàn Các Nguyên Tố Hóa Học siêu trực quan dạng Web 3D.",
};

export default function PeriodicTablePage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto mb-8 flex justify-between items-end">
        <div>
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition font-medium mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" /> Về trang chủ
          </Link>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
            Bảng Tuần Hoàn Hóa Học
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400 max-w-2xl">
            Di chuột hoặc Nhấp vào các nguyên tố để tra cứu Khối lượng, Độ âm điện, và Cấu hình Electron ngay lập tức.
          </p>
        </div>
      </div>
      
      {/* 
        Container using full width but centered.
        Using pb-32 to allow space for the floating bottom-right detail panel on smaller screens
      */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden py-10 md:py-16 pb-64 lg:pb-16 relative">
        <PeriodicTable />
      </div>
    </div>
  );
}
