"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { Search, Sparkles, X } from "lucide-react";

interface ExerciseSearchProps {
  onSearch: (query: string) => void;
  resultCount: number;
  isSearching: boolean;
}

export function ExerciseSearch({ onSearch, resultCount, isSearching }: ExerciseSearchProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onSearch(value);
      }, 300);
    },
    [onSearch]
  );

  const handleClear = useCallback(() => {
    setQuery("");
    onSearch("");
    inputRef.current?.focus();
  }, [onSearch]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const suggestions = [
    "đốt cháy este",
    "kim loại HCl",
    "xà phòng hóa",
    "tráng bạc",
    "điện phân",
    "ăn mòn điện hóa",
  ];

  return (
    <div className="w-full">
      {/* Ô search chính */}
      <div
        className={`relative group transition-all duration-500 ${
          isFocused
            ? "scale-[1.01]"
            : "scale-100"
        }`}
      >
        {/* Glow effect */}
        <div
          className={`absolute -inset-1 rounded-3xl bg-gradient-to-r from-violet-500/20 via-blue-500/20 to-cyan-500/20 blur-xl transition-opacity duration-500 ${
            isFocused ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`relative flex items-center gap-3 px-6 py-4 md:py-5 rounded-2xl border-2 transition-all duration-300 
            bg-white dark:bg-zinc-900
            ${
              isFocused
                ? "border-violet-400 dark:border-violet-600 shadow-2xl shadow-violet-500/10"
                : "border-zinc-200 dark:border-zinc-800 shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700"
            }`}
        >
          <Search
            size={22}
            className={`flex-shrink-0 transition-colors duration-300 ${
              isFocused
                ? "text-violet-500"
                : "text-zinc-400"
            }`}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder='Gõ từ khóa để tìm bài tập... (vd: "đốt cháy este", "kim loại HCl")'
            className="flex-1 bg-transparent outline-none text-base md:text-lg text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
            id="exercise-search-input"
          />
          {query && (
            <button
              onClick={handleClear}
              className="flex-shrink-0 p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-500 transition-all cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Kết quả count */}
      {query && (
        <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 animate-fade-in">
          {isSearching ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
              Đang tìm kiếm...
            </div>
          ) : resultCount > 0 ? (
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-violet-500" />
              Tìm thấy <span className="font-bold text-zinc-900 dark:text-zinc-100">{resultCount}</span> bài tập
            </div>
          ) : (
            <div className="text-zinc-400">
              Không tìm thấy bài tập nào. Thử từ khóa khác nhé!
            </div>
          )}
        </div>
      )}

      {/* Gợi ý khi chưa gõ */}
      {!query && (
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => {
                setQuery(s);
                onSearch(s);
              }}
              className="px-4 py-2 rounded-full text-sm font-medium 
                bg-zinc-100 hover:bg-violet-100 text-zinc-600 hover:text-violet-700
                dark:bg-zinc-800 dark:hover:bg-violet-900/30 dark:text-zinc-400 dark:hover:text-violet-300
                border border-zinc-200 hover:border-violet-300
                dark:border-zinc-700 dark:hover:border-violet-700
                transition-all duration-300 cursor-pointer
                hover:shadow-md hover:shadow-violet-500/10
                hover:-translate-y-0.5"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
