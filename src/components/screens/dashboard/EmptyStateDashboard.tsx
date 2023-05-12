import Image from "next/image";
import Link from "next/link";
import React from "react";

import teacherImage from "../../../../public/assets/teacher.svg";
import { Button, Variant } from "../../common/Button/Button";

export const EmptyStateDashboard = () => {
  return (
    <div className="mx-auto flex w-1/2 flex-col items-center justify-center gap-8 text-center">
      <Image alt="no classrooms found" height="300" src={teacherImage} width="300" />
      <div className="text-xl text-gray-500">
        No tienes ningún curso o tutoría. Busca uno para empezar a usar la plataforma.
      </div>
      <Link passHref href="/browse-classrooms">
        <Button as="a" variant={Variant.Primary}>
          Buscar cursos y tutorías
        </Button>
      </Link>
    </div>
  );
};
