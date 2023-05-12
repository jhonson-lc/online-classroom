import React, { ReactNode } from "react";

export enum LinkButtonVariant {
  Primary,
  Danger,
  Secondary,
}

const LinkButton = ({
  children,
  onClick,
  variant = LinkButtonVariant.Primary,
}: {
  children: ReactNode;
  onClick: () => void;
  variant?: LinkButtonVariant;
}) => {
  const colors = {
    [LinkButtonVariant.Primary]:
      "text-sm text-secondary px-4 py-2 hover:text-secondary/80 flex items-center gap-2",
    [LinkButtonVariant.Danger]:
      "text-sm text-red-600 px-4 py-2 hover:text-red-400 flex items-center gap-2",
    [LinkButtonVariant.Secondary]:
      "text-sm text-gray-700 px-4 py-2 hover:text-gray-800 flex items-center gap-2",
  };
  return (
    <button className={colors[variant]} onClick={onClick}>
      {children}
    </button>
  );
};

LinkButton.displayName = "LinkButton";

export { LinkButton };
