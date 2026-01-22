import { useState } from "react";

function Tooltip({ content, children }:{content:string, children:React.ReactNode}) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible && (
        <div className={`absolute bottom-full min-w-40 mb-2 px-3 py-1 text-sm bg-indigo-500 text-white rounded`}>
          {content}
        </div>
      )}
    </div>
  );
}

export default Tooltip;
