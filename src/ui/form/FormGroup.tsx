import { ReactNode, useEffect, useRef } from "react";

export const FormGroup = ({
  children,
  label,
  name,
  error,
}: {
  children: ReactNode;
  label: string;
  name: string;
  error?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current
      ?.getElementsByTagName("input")[0]
      ?.classList[error ? "add" : "remove"]("border-red-500");
  }, [error]);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>
      {children}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};
