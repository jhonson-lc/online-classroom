import React from "react";

interface Props {
  children: React.ReactNode;
  title: string;
}

const Tooltip: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="group relative flex">
      {children}
      <span
        className="transition-opacity absolute left-1/2 w-max translate-x-6 rounded-md bg-gray-900 
    px-2 py-1 text-xs text-gray-100 opacity-0 duration-200 group-hover:opacity-100"
      >
        {title}
      </span>
    </div>
  );
};

export default Tooltip;
