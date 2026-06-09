"use client";

import React, { useState } from "react";
import { HiddenAnswer } from "./HiddenAnswer";
import type { Exercise } from "@/lib/search";
import { renderMathInText } from "@/lib/renderMath";
import { Check, X, Send } from "lucide-react";

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
}

export function ExerciseCard({ exercise, index }: ExerciseCardProps) {
  // --- States for different types ---
  // TN
  const [selectedTN, setSelectedTN] = useState<string | null>(null);
  
  // DS
  const [selectedDS, setSelectedDS] = useState<Record<string, boolean | null>>({
    a: null, b: null, c: null, d: null
  });
  
  // TL
  const [tlInput, setTlInput] = useState("");
  const [tlSubmitted, setTlSubmitted] = useState(false);

  // Render variables pre-calculated once per card
  const renderedDeBai = React.useMemo(() => renderMathInText(exercise.de_bai), [exercise.de_bai]);
  const renderedLoiGiai = React.useMemo(() => renderMathInText(exercise.loi_giai), [exercise.loi_giai]);
  
  // TN options
  const renderedChoicesTN = React.useMemo(() => {
    if (exercise.type !== "TN" || !exercise.cac_lua_chon) return {};
    return {
      A: renderMathInText(exercise.cac_lua_chon.A),
      B: renderMathInText(exercise.cac_lua_chon.B),
      C: renderMathInText(exercise.cac_lua_chon.C),
      D: renderMathInText(exercise.cac_lua_chon.D),
    };
  }, [exercise]);

  // DS options
  const renderedChoicesDS = React.useMemo(() => {
    if (exercise.type !== "DS" || !exercise.cac_phat_bieu) return {};
    return {
      a: renderMathInText(exercise.cac_phat_bieu.a),
      b: renderMathInText(exercise.cac_phat_bieu.b),
      c: renderMathInText(exercise.cac_phat_bieu.c),
      d: renderMathInText(exercise.cac_phat_bieu.d),
    };
  }, [exercise]);


  // --- Render TN Type ---
  const renderTN = () => {
    const choiceLabels = ["A", "B", "C", "D"] as const;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
        {choiceLabels.map((label) => {
          const isSelected = selectedTN === label;
          const isCorrect = label === exercise.dap_an_tn;
          const showResult = selectedTN !== null;

          let choiceStyle = "border-zinc-200 bg-zinc-50/50 hover:bg-zinc-100 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-800/30 dark:hover:bg-zinc-800/60 dark:hover:border-zinc-700";
          if (showResult && isCorrect) {
            choiceStyle = "border-emerald-400 bg-emerald-50 text-emerald-800 dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-200 ring-2 ring-emerald-400/30";
          } else if (showResult && isSelected && !isCorrect) {
            choiceStyle = "border-red-400 bg-red-50 text-red-800 dark:border-red-600 dark:bg-red-950/40 dark:text-red-200 ring-2 ring-red-400/30";
          } else if (isSelected) {
            choiceStyle = "border-blue-400 bg-blue-50 text-blue-800 dark:border-blue-600 dark:bg-blue-950/40 dark:text-blue-200 ring-2 ring-blue-400/30";
          }

          return (
            <button
              key={label}
              onClick={() => !selectedTN && setSelectedTN(label)}
              disabled={selectedTN !== null}
              className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer disabled:cursor-default ${choiceStyle}`}
            >
              <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${showResult && isCorrect ? "bg-emerald-500 text-white" : showResult && isSelected && !isCorrect ? "bg-red-500 text-white" : isSelected ? "bg-blue-500 text-white" : "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"}`}>
                {label}
              </span>
              <span className="text-sm pt-0.5 [&_.katex]:text-inherit" dangerouslySetInnerHTML={{ __html: renderedChoicesTN[label] || "" }} />
            </button>
          );
        })}
      </div>
    );
  };

  // --- Render DS Type ---
  const renderDS = () => {
    const labels = ["a", "b", "c", "d"] as const;
    return (
      <div className="flex flex-col gap-3 mb-2">
        {labels.map((key) => {
          const content = renderedChoicesDS[key as keyof typeof renderedChoicesDS];
          const correctAns = exercise.dap_an_ds?.[key];
          const userAns = selectedDS[key];
          const hasAnswered = userAns !== null;
          const isCorrect = userAns === correctAns;

          return (
            <div key={key} className={`flex flex-col sm:flex-row gap-3 p-3.5 rounded-xl border transition-all ${hasAnswered ? isCorrect ? "border-emerald-300 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-900/20" : "border-red-300 bg-red-50/50 dark:border-red-800 dark:bg-red-900/20" : "border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-800/30"}`}>
              <div className="flex-1 text-[15px] flex items-start gap-3">
                <span className="font-bold text-violet-500 dark:text-violet-400 mt-0.5">{key}.</span>
                <span dangerouslySetInnerHTML={{ __html: content || "" }} />
              </div>
              <div className="flex gap-2 self-start sm:self-center shrink-0 ml-7 sm:ml-0">
                <button 
                  onClick={() => !hasAnswered && setSelectedDS(prev => ({...prev, [key]: true}))}
                  disabled={hasAnswered}
                  className={`px-4 py-1.5 rounded-lg text-sm font-bold border transition-all ${hasAnswered ? userAns === true ? (isCorrect ? "bg-emerald-500 text-white border-emerald-600" : "bg-red-500 text-white border-red-600") : "bg-zinc-100 text-zinc-400 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-600 dark:border-zinc-700 opacity-50" : "bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50 dark:bg-zinc-900 dark:text-emerald-400 dark:border-emerald-800 dark:hover:bg-emerald-950/30"}`}
                >
                  ĐÚNG
                </button>
                <button 
                  onClick={() => !hasAnswered && setSelectedDS(prev => ({...prev, [key]: false}))}
                  disabled={hasAnswered}
                  className={`px-4 py-1.5 rounded-lg text-sm font-bold border transition-all ${hasAnswered ? userAns === false ? (isCorrect ? "bg-emerald-500 text-white border-emerald-600" : "bg-red-500 text-white border-red-600") : "bg-zinc-100 text-zinc-400 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-600 dark:border-zinc-700 opacity-50" : "bg-white text-red-600 border-red-200 hover:bg-red-50 dark:bg-zinc-900 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-950/30"}`}
                >
                  SAI
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // --- Render TL Type ---
  const renderTL = () => {
    const isCorrect = tlInput.trim() === exercise.dap_an_tl?.trim();

    return (
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center p-4 bg-zinc-50 dark:bg-zinc-800/30 rounded-xl border border-zinc-200 dark:border-zinc-800 uppercase tracking-widest text-xs font-bold text-zinc-500">
        <span className="shrink-0">Nhập số liệu đáp án:</span>
        <div className="relative flex-1">
          <input
            type="text"
            value={tlInput}
            onChange={(e) => !tlSubmitted && setTlInput(e.target.value)}
            disabled={tlSubmitted}
            placeholder="Ví dụ: 11,2"
            className={`w-full max-w-xs font-mono text-base font-bold bg-white dark:bg-zinc-900 border rounded-lg px-4 py-2.5 outline-none transition-all ${tlSubmitted ? isCorrect ? "border-emerald-500 text-emerald-600 ring-2 ring-emerald-500/20" : "border-red-500 text-red-600 ring-2 ring-red-500/20" : "border-zinc-300 dark:border-zinc-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"}`}
          />
        </div>
        <button
          onClick={() => setTlSubmitted(true)}
          disabled={tlSubmitted || !tlInput.trim()}
          className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:bg-zinc-300 disabled:text-zinc-500 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600 text-white font-bold text-sm transition-all"
        >
          <Send size={16} /> Kiểm tra
        </button>
      </div>
    );
  };

  return (
    <div
      className="group relative rounded-2xl border border-zinc-200/80 bg-white 
        dark:border-zinc-800/80 dark:bg-zinc-900/80
        shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50
        transition-all duration-500 overflow-hidden
        backdrop-blur-sm"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 text-white text-sm font-bold shadow-lg shadow-violet-500/20">
            {index + 1}
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
            Câu {index + 1}
          </span>
        </div>

        {/* Đề bài */}
        <div
          className="prose prose-zinc dark:prose-invert max-w-none mb-6 text-[15px] leading-relaxed
            [&_.katex]:text-blue-700 dark:[&_.katex]:text-blue-300 prose-p:my-2"
          dangerouslySetInnerHTML={{ __html: renderedDeBai }}
        />

        {/* Lựa chọn theo Type */}
        {exercise.type === "TN" && renderTN()}
        {exercise.type === "DS" && renderDS()}
        {exercise.type === "TL" && renderTL()}

        {/* Đáp án ẩn/hiện */}
        <HiddenAnswer
          type={exercise.type}
          dapAnTn={exercise.dap_an_tn}
          dapAnDs={exercise.dap_an_ds}
          dapAnTl={exercise.dap_an_tl}
          loiGiai={renderedLoiGiai}
        />
      </div>
    </div>
  );
}
