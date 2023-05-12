import React from "react";
import Image from "next/image";

import { Button, Variant } from "../../common/Button/Button";

import assignmentsImage from "@/../public/assets/assignments.svg";

export const NoStudents = () => {
  return (
    <div className="mt-10 flex flex-col items-center gap-8">
      <Image alt="no students enrolled" height="200" src={assignmentsImage} width="200" />
      <div className="text-center text-xl text-gray-500">
        No tienes estudiantes inscritos en esta curso.
      </div>
      <div className="text-center">
        <Button variant={Variant.Primary}>Enviar invitación</Button>
      </div>
    </div>
  );
};
