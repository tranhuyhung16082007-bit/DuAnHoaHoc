"use client";

import React, { useState } from "react";
import { ChevronDown, Check, X } from "lucide-react";
import type { QuestionType } from "@/lib/search";

interface HiddenAnswerProps {
  type: QuestionType;
  dapAnTn?: string;
  dapAnDs?: Record<string, boolean>;
  dapAnTl?: string;
  loiGiai: string;
}

export function HiddenAnswer({ type, dapAnTn, dapAnDs, dapAnTl, loiGiai }: HiddenAnswerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-6 border-t border-zinc-100 dark:border-zinc-800/60 pt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer
          bg-zinc-100/80 hover:bg-zinc-200 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/80
          text-violet-700 dark:text-violet-300
          border border-transparent
          hover:shadow-sm"
      >
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
        {isOpen ? "Ẩn phân tích" : "Xem phân tích chi tiết"}
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[2000px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        {/* Kết quả chung */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-4 text-sm font-semibold bg-violet-50 text-violet-700 border border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800/50">
          <div className="p-1 rounded-md bg-violet-200 dark:bg-violet-800/50">KẾT QUẢ</div>
          
          {type === "TN" && (
            <span>Đáp án đúng là: <strong className="font-black text-lg ml-1">{dapAnTn}</strong></span>
          )}

          {type === "DS" && dapAnDs && (
            <div className="flex gap-4">
              {['a', 'b', 'c', 'd'].map(key => (
                <span key={key}>
                  Ý {key}: <strong className={dapAnDs[key] ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-red-600 dark:text-red-400 font-bold"}>{dapAnDs[key] ? "ĐÚNG" : "SAI"}</strong>
                </span>
              ))}
            </div>
          )}

          {type === "TL" && (
            <span>Kết quả: <strong className="font-black text-lg ml-1 text-blue-600 dark:text-blue-400">{dapAnTl}</strong></span>
          )}
        </div>

        {/* Lời giải */}
        <div className="relative p-5 rounded-2xl bg-gradient-to-br from-zinc-50 to-zinc-100/50 dark:from-zinc-800/50 dark:to-zinc-900/30 border border-zinc-200/80 dark:border-zinc-700/50">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-violet-500 to-blue-500 rounded-l-2xl" />
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-3 ml-2">
            Lời giải chi tiết
          </div>
          <div
            className="prose prose-sm prose-zinc dark:prose-invert max-w-none ml-2
              prose-p:my-2 prose-li:my-0.5
              [&_.katex]:text-blue-700 dark:[&_.katex]:text-blue-300"
            dangerouslySetInnerHTML={{ __html: loiGiai }}
          />
        </div>
      </div>
    </div>
  );
}
