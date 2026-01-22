import { useEffect } from "react";
import type { RootState } from "@/app/store";
import { removeToast, type Toast } from "@/app/slices/toastSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

const AUTO_CLOSE_MS = 3000;
interface Props {
  toast: Toast;
  onClose: () => void;
}

const ToastItem = ({ toast, onClose }: Props) => {
  useEffect(() => {
    const timer = setTimeout(onClose, AUTO_CLOSE_MS);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`px-6 py-3 rounded shadow 
        ${toast.type === "success" && "bg-green-400/70 border border-green-400 text-white"}
        ${toast.type === "error" && "bg-red-500/70 border border-red-800 text-white"}
        ${toast.type === "warning" && "bg-yellow-300/60 text-black border border-yellow-400"}
        ${toast.type === "info" && "bg-purple-500/60 border border-purple-800 text-white"}
      `}
    >
      <div className="flex items-center justify-between gap-3">
        <span>{toast.message}</span>
        <button
          onClick={onClose}
          className="text-lg leading-none opacity-70 hover:opacity-100"
        >
          ×
        </button>
      </div>
    </div>
  );
};

const ToastContainer = () => {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector((state: RootState) => state.toast);

  if (!toasts.length) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => dispatch(removeToast(toast.id))}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
