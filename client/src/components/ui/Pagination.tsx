
const Pagination: React.FC<{
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
}> = ({ page, limit, total, onPageChange }) => {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 pt-6">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 bg-gray-800 rounded disabled:opacity-40"
      >
        Prev
      </button>

      <span className="text-sm text-gray-400">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 bg-gray-800 rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination