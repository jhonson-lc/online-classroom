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
    <>
      <section className="mb-8 flex items-end justify-between gap-8">
        <div className="flex-col">
          <h1 className="mt-8 text-4xl">{title}</h1>
          {subTitle && <h2 className="mt-4 text-2xl">{subTitle}</h2>}
        </div>
        {children}
      </section>

      <hr className="mb-8" />
    </>
  );
};
