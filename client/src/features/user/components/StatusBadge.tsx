/* --------------------- Status Badge --------------------- */
const StatusBadge = ({ status, onClick }: { status?: string, onClick?:()=>void }) => {
  const isActive = status === "active";
  return (
    <div
    onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium ${
        isActive
          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
          : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${isActive ? "bg-emerald-400" : "bg-rose-400"} animate-pulse`}
      />
      {status || "unknown"}
    </div>
  );
};

export default StatusBadge