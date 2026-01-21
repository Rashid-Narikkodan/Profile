import { useEffect } from "react";

type NotifyProps = {
  message: string;
  type?: "error" | "success" | "info";
  onClose: () => void;
  duration?: number;
};

const Notify = ({
  message,
  type = "error",
  onClose,
  duration = 3000,
}: NotifyProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const styles = {
    error: "bg-red-500 text-white",
    success: "bg-green-500 text-white",
    info: "bg-blue-500 text-white",
  };

  return (
    <div
      className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg
                  flex items-center gap-3 ${styles[type]}`}
    >
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="text-white/80 hover:text-white text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
};

export default Notify;
