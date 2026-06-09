"use client";

import { useState, useEffect } from "react";
import { PeriodicTable } from "./PeriodicTable";
import { Beaker, X } from "lucide-react";

export function FloatingPeriodicTable() {
  const [isOpen, setIsOpen] = useState(false);

  // Keyboard shortcuts: Alt+T to toggle, Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
      if (e.altKey && e.key.toLowerCase() === "t") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-tr from-blue-600 to-cyan-500 text-white rounded-full shadow-xl hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-label="Tra cứu Bảng Tuần Hoàn"
        title="Tra cứu Bảng Tuần Hoàn (Alt+T)"
      >
        <Beaker className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-[95vw] xl:max-w-[1400px] 2xl:max-w-[1536px] max-h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header / Toolbar inside Modal */}
            <div className="flex justify-between items-center p-4 md:px-8 md:py-6 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                <Beaker className="w-5 h-5 text-blue-500" />
                Bảng Tuần Hoàn Hóa Học
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Đóng bảng tuần hoàn"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content area: grid tự quản lý scroll bên trong */}
            <div className="overflow-hidden p-4 md:p-8 flex-1 flex flex-col">
              <PeriodicTable />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
