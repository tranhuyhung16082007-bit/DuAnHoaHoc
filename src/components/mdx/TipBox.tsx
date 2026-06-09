import { Lightbulb } from "lucide-react";
import React from "react";

export function TipBox({ children, title = "Mẹo Giải Nhanh" }: { children: React.ReactNode, title?: string }) {
  return (
    <div className="my-6 flex items-start space-x-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 shadow-sm dark:border-emerald-900/50 dark:bg-emerald-950/20 dark:text-emerald-200">
      <Lightbulb className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-500" />
      <div>
        <h4 className="font-semibold">{title}</h4>
        <div className="mt-1 text-sm leading-relaxed prose-p:my-0 prose-strong:text-emerald-900 dark:prose-strong:text-emerald-200">{children}</div>
      </div>
    </div>
  );
}
