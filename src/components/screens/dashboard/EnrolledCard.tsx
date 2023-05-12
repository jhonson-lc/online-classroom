import Link from "next/link";
import React from "react";
import { Classroom } from "@prisma/client";

import { Button, Variant } from "../../common/Button/Button";
import { Card } from "../../common/Card";

export const EnrolledCard = ({ classroom }: { classroom: Classroom }) => {
  return (
    <Card
      body={
        <span>
          Tienes <a className="text-blue-400">1 tarea</a> para el 28/9/2022
        </span>
      }
      title={classroom.name}
    >
      <div className="flex justify-end">
        <Link href={`/classrooms/${classroom.id}`}>
          <Button color="primary" variant={Variant.Primary}>
            Ver
          </Button>
        </Link>
      </div>
    </Card>
  );
};
