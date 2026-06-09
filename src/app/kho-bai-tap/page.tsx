"use client";

import React, { useState, useCallback, useMemo } from "react";
import { ExerciseSearch } from "@/components/ExerciseSearch";
import { ExerciseCard } from "@/components/ExerciseCard";
import { searchExercises } from "@/lib/search";
import { renderMathInText } from "@/lib/renderMath";
import type { Exercise } from "@/lib/search";
import { FlaskConical, BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";

// import exercisesData from "../../../content/exercises/exercises.json";
// const exercises: Exercise[] = exercisesData as Exercise[];

export default function KhoBaiTapPage() {
  const [searchResults, setSearchResults] = useState<Exercise[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      setSearchResults(data);
      setHasSearched(true);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // The search results array to render directly
  const toRender = hasSearched ? searchResults : [];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-600" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.2),transparent_60%)]" />

        {/* Floating elements */}
        <div className="absolute top-12 left-[10%] text-white/5 animate-float-slow">
          <FlaskConical size={120} />
        </div>
        <div className="absolute bottom-8 right-[15%] text-white/5 animate-float-slower">
          <BookOpen size={100} />
        </div>

        {/* Content */}
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          {/* Nút Về Trang Chủ */}
          <div className="absolute top-6 left-6 md:top-8 md:left-8">
            <Link 
              href="/" 
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 text-sm font-medium transition-all backdrop-blur-md"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Về trang chủ
            </Link>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-semibold uppercase tracking-[0.2em] mb-6 mt-10 md:mt-0">
            <FlaskConical size={14} />
            Smart Search
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Kho Bài Tập
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
            Gõ bất kỳ từ khóa nào — hệ thống sẽ tìm đúng bài tập bạn cần,
            <br className="hidden md:block" />
            bất kể cách đề ra câu hỏi như thế nào.
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <ExerciseSearch
              onSearch={handleSearch}
              resultCount={searchResults.length}
              isSearching={isSearching}
            />
          </div>
        </div>

        {/* Bottom curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" className="w-full">
            <path
              d="M0 48h1440V24C1440 24 1140 0 720 0S0 24 0 24v24z"
              className="fill-zinc-50 dark:fill-zinc-950"
            />
          </svg>
        </div>
      </div>

      {/* Kết quả */}
      <div className="max-w-4xl mx-auto px-6 pb-20 -mt-4">
        {/* Empty state — chưa search */}
        {!hasSearched && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-100 to-blue-100 dark:from-violet-900/30 dark:to-blue-900/30 mb-6">
              <FlaskConical size={36} className="text-violet-500" />
            </div>
            <h3 className="text-xl font-bold text-zinc-700 dark:text-zinc-300 mb-2">
              Bắt đầu tìm kiếm
            </h3>
            <p className="text-zinc-400 dark:text-zinc-500 max-w-md mx-auto">
              Nhập từ khóa bất kỳ vào ô tìm kiếm phía trên hoặc bấm vào các gợi ý
              để khám phá kho bài tập.
            </p>
          </div>
        )}

        {/* Danh sách kết quả */}
        {hasSearched && toRender.length > 0 && (
          <div className="space-y-6">
            {toRender.map((exercise, index) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Không tìm thấy */}
        {hasSearched && toRender.length === 0 && !isSearching && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-zinc-100 dark:bg-zinc-800 mb-6">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-xl font-bold text-zinc-700 dark:text-zinc-300 mb-2">
              Không tìm thấy bài tập
            </h3>
            <p className="text-zinc-400 dark:text-zinc-500 max-w-md mx-auto">
              Thử tìm với từ khóa khác, ví dụ: &quot;đốt cháy este&quot;, &quot;kim loại + HCl&quot;,
              &quot;điện phân&quot;...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
