import { Assignment } from "@prisma/client";
import Link from "next/link";
import { ReactNode } from "react";
import { DateTime } from "luxon";

import { Button, Variant } from "../../common/Button/Button";
import { PencilSquare } from "../../common/Icons/PencilSquare";
import { Table } from "../../common/Table/Table";

export const TeacherAssignments = ({
  assignments,
  classroomId,
  openAssignmentModal,
}: {
  assignments: Assignment[];
  classroomId: string;
  openAssignmentModal: () => void;
}) => {
  const totalAssignments = assignments.length;

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="flex items-center gap-8">
        <h2 className="text-md">Tus tareas ({totalAssignments} total)</h2>
        <Button variant={Variant.Primary} onClick={openAssignmentModal}>
          Crear tarea
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table
          headers={["Número", "Nombre", "Fecha Límite", "Acciones"]}
          rows={assignments.map((assignment, idx) => [
            assignment.number,
            assignment.name,
            <span key={idx} className="whitespace-nowrap">
              {DateTime.fromISO(assignment.dueDate).toLocaleString(DateTime.DATE_MED)}
            </span>,
            (
              <span className="flex gap-4">
                <Link
                  className="link inline-flex items-center gap-1"
                  href={`/classrooms/${classroomId}/assignments/${assignment.id}/edit`}
                >
                  <PencilSquare /> Editar
                </Link>
              </span>
            ) as ReactNode,
          ])}
        />
      </div>
    </div>
  );
};
