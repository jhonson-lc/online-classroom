import { ReactNode } from "react";

export const MainHeading = ({
  title,
  subTitle,
  children,
}: {
  title: string | undefined;
  subTitle?: string;
  children?: ReactNode;
}) => {
  return (
    <>
      <section className="mb-6 flex items-end justify-between gap-8">
        <div className="flex-col leading-3">
          {title ? (
            <h1 className="font-regular mt-6 text-3xl">{title}</h1>
          ) : (
            <div className="max-w-sm animate-pulse" role="status">
              <div className="mb-4 h-4 w-60 rounded-full bg-gray-200" />
            </div>
          )}
          {subTitle && <h2 className="text-md mt-4 text-primary/80">{subTitle}</h2>}
        </div>
        {children}
      </section>
      <hr className="my-6 border-primary/20" />
    </>
  );
};
