type LoaderProps = {
  fullScreen?: boolean;
  className?: string;
};

const Loader = ({ fullScreen = false, className = "" }: LoaderProps) => {
  const wrapperClasses = fullScreen
    ? "flex items-center justify-center h-screen w-screen bg-black/50 fixed inset-0 z-50"
    : "flex items-center justify-center relative";

  return (
    <div className={`${wrapperClasses} ${className}`} aria-busy="true">
      <div className="relative w-14 h-14">
        {/* Main spinning circle */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-700 animate-spin"></div>

        {/* Softer outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-purple-700/20 animate-spin [animation-duration:1.4s]"></div>

        {/* Smaller inner pulse */}
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-purple-700 animate-ping opacity-75"></div>
      </div>
    </div>
  );
};

export default Loader;
