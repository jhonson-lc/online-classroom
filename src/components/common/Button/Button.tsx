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
      [Variant.Primary]: "bg-primary/70 text-white px-4 py-2 rounded-2xl hover:bg-primary/80",
      [Variant.Secondary]:
        "bg-transparent text-primary/80 px-4 py-2 rounded-2xl hover:text-primary",
      [Variant.Danger]: "bg-red-500 text-white px-4 py-2 rounded-2xl hover:bg-red-400",
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
