import React from "react";

import { MainHeading } from "@/components/common/MainHeading";

interface Props {}

const ClassroomsScreen: React.FC<Props> = () => {
  return (
    <div>
      <MainHeading title="Cursos y tutorías" />

      <span>Lista de cursos y tutorías disponibles para que puedas inscribirte.</span>
    </div>
  );
};

export default ClassroomsScreen;
