const ActionButton: React.FC<{
  label: string;
  color: string;
  onClick: () => void;
}> = ({ label, color, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-md text-sm text-white ${color} hover:opacity-90`}
  >
    {label}
  </button>
);

export default ActionButton