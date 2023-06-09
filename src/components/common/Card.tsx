import Image from "next/image";
import React, { ReactHTML, ReactNode } from "react";

import StudentImage from "@/../public/assets/student.jpeg";

export const Card = ({
  children,
  title,
  body,
  titleAs,
}: {
  children: ReactNode;
  title: string;
  body: ReactNode;
  titleAs?: keyof ReactHTML;
}) => {
  const TitleAs = titleAs || "div";

  return (
    <li className="flex max-w-sm cursor-default flex-col gap-4 overflow-hidden rounded-lg bg-white shadow-md">
      <Image
        alt="a student"
        height={100}
        src={StudentImage}
        style={{
          objectFit: "cover",
        }}
        width={400}
      />
      <section className="px-6">
        <TitleAs className="mb-2 text-xl font-bold">{title}</TitleAs>
        <p className="text-base text-gray-500">{body}</p>
      </section>
      <footer className="px-6 pb-6 pt-4">{children}</footer>
    </li>
  );
};
