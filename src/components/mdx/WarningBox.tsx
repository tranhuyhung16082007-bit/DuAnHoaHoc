import { AlertTriangle } from "lucide-react";
import React from "react";

export function WarningBox({ children, title = "Lưu ý Bẫy" }: { children: React.ReactNode, title?: string }) {
  return (
    <div className="my-6 flex items-start space-x-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-900 shadow-sm dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-200">
      <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-500" />
      <div>
        <h4 className="font-semibold">{title}</h4>
        <div className="mt-1 text-sm leading-relaxed prose-p:my-0 prose-strong:text-red-900 dark:prose-strong:text-red-200">{children}</div>
      </div>
    </div>
  );
}
