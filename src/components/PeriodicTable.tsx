"use client";

import React, { useState, useCallback, memo } from "react";
import { elements, ChemicalElement } from "@/lib/elements";
import { X } from "lucide-react";

const groupColors = {
  "Nonmetal": "bg-green-100 text-green-900 border-green-300 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-200 dark:border-green-800/60 dark:hover:bg-green-800/50",
  "Noble gas": "bg-cyan-100 text-cyan-900 border-cyan-300 hover:bg-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-200 dark:border-cyan-800/60 dark:hover:bg-cyan-800/50",
  "Alkali metal": "bg-rose-100 text-rose-900 border-rose-300 hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-200 dark:border-rose-800/60 dark:hover:bg-rose-800/50",
  "Alkaline earth metal": "bg-orange-100 text-orange-900 border-orange-300 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-200 dark:border-orange-800/60 dark:hover:bg-orange-800/50",
  "Metalloid": "bg-teal-100 text-teal-900 border-teal-300 hover:bg-teal-200 dark:bg-teal-900/30 dark:text-teal-200 dark:border-teal-800/60 dark:hover:bg-teal-800/50",
  "Post-transition metal": "bg-indigo-100 text-indigo-900 border-indigo-300 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-200 dark:border-indigo-800/60 dark:hover:bg-indigo-800/50",
  "Transition metal": "bg-blue-100 text-blue-900 border-blue-300 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800/60 dark:hover:bg-blue-800/50",
  "Halogen": "bg-yellow-100 text-yellow-900 border-yellow-300 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-200 dark:border-yellow-800/60 dark:hover:bg-yellow-800/50",
  "Lanthanide": "bg-purple-100 text-purple-900 border-purple-300 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-200 dark:border-purple-800/60 dark:hover:bg-purple-800/50",
  "Actinide": "bg-fuchsia-100 text-fuchsia-900 border-fuchsia-300 hover:bg-fuchsia-200 dark:bg-fuchsia-900/30 dark:text-fuchsia-200 dark:border-fuchsia-800/60 dark:hover:bg-fuchsia-800/50",
  "Unknown": "bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200 dark:bg-gray-900/30 dark:text-gray-200 dark:border-gray-800/60 dark:hover:bg-gray-800/50",
};

interface ElementCellProps {
  el: ChemicalElement;
  onHover: (el: ChemicalElement) => void;
  onClick: (el: ChemicalElement) => void;
}

const ElementCell = memo(({ el, onHover, onClick }: ElementCellProps) => {
  return (
    <div
      onMouseEnter={() => onHover(el)}
      onClick={() => onClick(el)}
      className={`group cursor-pointer border flex flex-col items-center justify-center p-1 rounded-sm transition-transform duration-75 aspect-square shadow-sm hover:shadow-xl hover:scale-110 hover:ring-2 hover:ring-blue-500 hover:z-20 scale-100 z-10 ${groupColors[el.groupBlock]}`}
      style={{
        gridRow: el.row,
        gridColumn: el.column,
      }}
    >
      <span className="text-[10px] sm:text-xs opacity-70 self-start ml-1 leading-none font-medium">
        {el.atomicNumber}
      </span>
      <span className="font-bold text-base sm:text-xl leading-none mt-1 sm:mt-2">
        {el.symbol}
      </span>
      <span className="text-[8px] sm:text-[10px] truncate w-full text-center opacity-80 mt-1 sm:mt-2 px-1">
        {el.name}
      </span>
    </div>
  );
});
ElementCell.displayName = "ElementCell";

// Component con để hiển thị nội dung Info Panel, dùng chung cho cả Desktop và Mobile
const ElementDetails = ({ el }: { el: ChemicalElement }) => (
  <div className="w-full relative p-5 md:p-7 overflow-hidden h-full flex flex-col justify-center">
    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-100/50 dark:from-blue-900/20 to-transparent blur-3xl -z-10 rounded-full" />
    <div className="flex justify-between items-start mb-5">
      <h2 className="text-6xl md:text-7xl font-black text-zinc-900 dark:text-zinc-50 drop-shadow-sm">{el.symbol}</h2>
      <span className="text-3xl md:text-4xl font-bold opacity-30 dark:text-zinc-600 tracking-tighter">{el.atomicNumber}</span>
    </div>
    <div className="space-y-3">
      <div>
        <div className="text-xs text-zinc-500 uppercase font-bold tracking-widest mb-1">Tên nguyên tố</div>
        <div className="text-lg md:text-xl font-bold text-zinc-800 dark:text-zinc-200">{el.name}</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
          <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Khối lượng</div>
          <div className="text-sm font-semibold dark:text-zinc-300">{el.atomicMass}</div>
        </div>
        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
          <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Độ âm điện</div>
          <div className="text-sm font-semibold dark:text-zinc-300">{el.electronegativity}</div>
        </div>
      </div>
      <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
        <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Cấu hình Electron</div>
        <code className="text-sm font-mono text-blue-600 dark:text-blue-400 font-bold block mt-1">
          {el.electronConfiguration}
        </code>
      </div>
      <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800">
        <span className={`inline-block px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md border shadow-sm ${groupColors[el.groupBlock]}`}>
          {el.groupBlock}
        </span>
      </div>
    </div>
  </div>
);

export function PeriodicTable() {
  const [hoveredEl, setHoveredEl] = useState<ChemicalElement | null>(null);
  const [selectedMobileEl, setSelectedMobileEl] = useState<ChemicalElement | null>(null);

  const handleHover = useCallback((el: ChemicalElement) => {
    setHoveredEl(el);
  }, []);

  const handleClick = useCallback((el: ChemicalElement) => {
    setSelectedMobileEl(el);
  }, []);

  const displayEl = hoveredEl || elements[0];

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full min-h-0 justify-center relative">
      
      {/* KHU VỰC TRÁI: Grid 18 cột */}
      <div className="flex-none overflow-auto min-w-0 min-h-0 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700 w-full lg:w-auto">
        <div className="w-max pb-4 pt-2 pr-4 lg:pr-4 pl-4 lg:pl-0 mx-auto">
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: "repeat(18, minmax(0, 1fr))", width: "900px" }}
          >
            {elements.map((el) => (
              <ElementCell 
                key={el.atomicNumber} 
                el={el} 
                onHover={handleHover} 
                onClick={handleClick} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* KHU VỰC PHẢI: Info Panel - Ẩn trên thiết bị di động (dưới lg) */}
      <div className="hidden lg:flex w-[300px] xl:w-[320px] flex-shrink-0 flex-col">
        <div className="w-full relative rounded-2xl border border-zinc-200 bg-white/95 backdrop-blur-md shadow-2xl dark:border-zinc-700 dark:bg-zinc-900/95 transition-all duration-300 overflow-hidden">
          <ElementDetails el={displayEl} />
        </div>
      </div>

      {/* MOBILE BOTTOM SHEET: Chỉ hiện trên mobile khi chọn 1 nguyên tố */}
      {selectedMobileEl && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setSelectedMobileEl(null)}>
          <div 
            className="w-full sm:max-w-md bg-white dark:bg-zinc-900 rounded-t-3xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end p-4 pb-0">
              <button 
                onClick={() => setSelectedMobileEl(null)}
                className="p-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ElementDetails el={selectedMobileEl} />
          </div>
        </div>
      )}

    </div>
  );
}
