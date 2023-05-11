import Image from "next/image";
import React from "react";

import teacherImage from "@/../public/assets/teacher.svg";

export const EmptyStateAttachments = () => {
  return (
    <div className="mx-auto flex w-1/3 flex-col items-center justify-center gap-8">
      <Image alt="no classrooms found" height="150" src={teacherImage} width="150" />
      <div className="text-2xl">You have no attachments yet!</div>
    </div>
  );
};
