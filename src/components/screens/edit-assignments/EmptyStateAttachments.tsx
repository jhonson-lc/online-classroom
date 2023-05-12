import Image from "next/image";
import React from "react";

import teacherImage from "@/../public/assets/teacher.svg";

export const EmptyStateAttachments = () => {
  return (
    <div className="mx-auto flex w-1/3 flex-col items-center justify-center gap-8">
      <Image alt="no classrooms found" height="100" src={teacherImage} width="100" />
      <div className="text-xl">No hay archivos adjuntos</div>
    </div>
  );
};
