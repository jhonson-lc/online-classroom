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
        className="transition-opacity bg-gray-900 text-gray-100 absolute left-1/2 w-max translate-x-6 
    rounded-md px-2 py-1 text-xs opacity-0 duration-200 group-hover:opacity-100"
      >
        {title}
      </span>
    </div>
  );
};

export default Tooltip;
