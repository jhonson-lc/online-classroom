import { Classroom } from "@prisma/client";
import Link from "next/link";
import React from "react";

import { Card } from "../../common/Card";

export const ClassroomCard = ({ classroom }: { classroom: Classroom }) => {
  return (
    <Card
      body="Puedes editar la información necesaria para que tus estudiantes puedan encontrar tu curso."
      title={classroom.name}
      titleAs="h2"
    >
      <div className="flex justify-end">
        <Link
          className="text-sm font-medium text-secondary hover:underline"
          href={`/classrooms/${classroom.id}`}
        >
          Gestionar curso
        </Link>
      </div>
    </Card>
  );
};
