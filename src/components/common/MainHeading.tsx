import { ReactNode } from "react";

export const MainHeading = ({
  title,
  subTitle,
  children,
}: {
  title: string;
  subTitle?: string;
  children?: ReactNode;
}) => {
  return (
    <section className="mb-6 flex items-end justify-between gap-8">
      <div className="flex-col leading-3">
        <h1 className="font-regular mt-6 text-2xl">{title}</h1>
        {subTitle && <h2 className="text-md mt-4 text-primary/80">{subTitle}</h2>}
      </div>
      {children}
    </section>
  );
};
