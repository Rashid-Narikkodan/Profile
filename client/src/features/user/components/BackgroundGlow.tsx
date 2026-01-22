/* --------------------- Background Glows --------------------- */
export const BackgroundGlows = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -top-40 -left-40 w-125 h-125 bg-purple-700/20 rounded-full blur-3xl animate-pulse-slow" />
    <div className="absolute -bottom-40 -right-40 w-160 h-125 bg-indigo-700/15 rounded-full blur-3xl animate-pulse-slow delay-1000" />
    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl animate-pulse-slow delay-2000" />
  </div>
);
