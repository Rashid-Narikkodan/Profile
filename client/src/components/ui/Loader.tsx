
const Loader = () => {
  return (
    <div className="flex items-center justify-center bg-black/50 h-screen absolute left-0 top-0 bottom-0 right-0">
      <div className="relative w-14 h-14">
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