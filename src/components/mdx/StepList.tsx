import React from "react";

export function StepList({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 relative border-l border-zinc-200 dark:border-zinc-800 ml-3 md:ml-4">
      {children}
    </div>
  );
}

export function Step({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <div className="mb-8 relative pl-8 last:mb-0">
      <div className="absolute left-[-17px] top-1 flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 border-4 border-white dark:bg-zinc-800 dark:border-black shadow-sm">
        <div className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-500" />
      </div>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-锌-100 mb-2 mt-1.5">{title}</h3>
      <div className="text-zinc-600 dark:text-zinc-400 prose-p:my-2 prose-sm md:prose-base">
        {children}
      </div>
    </div>
  );
}
