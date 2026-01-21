
const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-50">
      <div className="relative w-16 h-16">
        {/* Main spinning circle */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-700 animate-spin"></div>
        
        {/* Optional: softer outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-purple-700/20 animate-spin [animation-duration:1.4s]"></div>
        
        {/* Optional: smaller inner pulse */}
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-purple-700 animate-ping opacity-75"></div>
      </div>
    </div>
  );
};

export default Loader;