import { useEffect } from "react";
import type { RootState } from "@/app/store";
import { removeToast, type Toast } from "@/app/slices/toastSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

const AUTO_CLOSE_MS = 3000;

const ToastContainer = () => {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector((state: RootState) => state.toast);

  useEffect(() => {
    toasts.forEach((toast) => {
      const timer = setTimeout(() => {
        dispatch(removeToast(toast.id));
      }, AUTO_CLOSE_MS);

      return () => clearTimeout(timer);
    });
  }, [toasts, dispatch]);

  if (!toasts.length) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast: Toast) => (
        <div
          key={toast.id}
          className={`px-4 py-2 rounded shadow text-sm
            ${toast.type === "success" && "bg-green-600/60 border border-green-400 text-white"}
            ${toast.type === "error" && "bg-red-600 border border-red-400 text-white"}
            ${toast.type === "warning" && "bg-yellow-300/60 text-black border border-yellow-400"}
            ${toast.type === "info" && "bg-purple-500/60 border border-purple-800 text-white"}
          `}
        >
          <div className="flex items-center justify-between gap-3">
            <span>{toast.message}</span>
            <button
              onClick={() => dispatch(removeToast(toast.id))}
              className="text-lg leading-none opacity-70 hover:opacity-100"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
