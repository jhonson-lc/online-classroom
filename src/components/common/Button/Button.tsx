import React, { ReactHTML, ReactNode } from "react";

import { Spinner } from "../Icons/Spinner";

export enum Variant {
  Primary,
  Secondary,
  Danger,
}

// TODO: why am I using a forwardRef here
const Button = React.forwardRef(
  (
    {
      children,
      isLoading = false,
      variant = Variant.Primary,
      as = "button",
      className,
      ...rest
    }: {
      children: ReactNode;
      isLoading?: boolean;
      variant: Variant;
      className?: string;
      as?: keyof ReactHTML;
      [key: string]: any;
    },
    ref,
  ) => {
    const colors = {
      [Variant.Primary]: "bg-blue-200 text-black px-4 py-2 rounded hover:bg-blue-100",
      [Variant.Secondary]: "bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400",
      [Variant.Danger]: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400",
    };
    const As = as;
    return (
      <As
        className={`${colors[variant]} ${className} flex items-center gap-2 rounded-md text-sm font-medium`}
        {...rest}
      >
        {isLoading && <Spinner />}
        {children}
      </As>
    );
  },
);

Button.displayName = "Button";

export { Button };
