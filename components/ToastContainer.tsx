"use client";

import React from "react";
import { useApp } from "./AppContext";
import { CheckCircle, XCircle, Info } from "lucide-react";

export default function ToastContainer() {
  const { toasts } = useApp();

  const iconMap = {
    success: <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />,
    error: <XCircle className="w-4 h-4 text-rose-500 shrink-0" />,
    info: <Info className="w-4 h-4 text-blue-500 shrink-0" />,
  };

  const bgMap = {
    success: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800",
    error: "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800",
    info: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800",
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg animate-in slide-in-from-bottom-5 fade-in duration-300 ${bgMap[toast.type]}`}
        >
          {iconMap[toast.type]}
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 flex-1">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
