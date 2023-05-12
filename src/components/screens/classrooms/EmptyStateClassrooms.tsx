import Image from "next/image";
import React from "react";

import teacherImage from "@/../public/assets/teacher.svg";

export const EmptyStateClassrooms = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <Image alt="no classrooms found" height="300" src={teacherImage} width="300" />
      <div className="text-xl text-gray-500">
        No tienes ningún curso o tutoría. Crea uno para empezar a usar la plataforma.
      </div>
    </div>
  );
};
