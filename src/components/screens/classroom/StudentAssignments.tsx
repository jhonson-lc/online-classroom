import { Assignment } from "@prisma/client";
import Link from "next/link";
import { ReactNode } from "react";
import { DateTime } from "luxon";

import { EyeIcon } from "../../common/Icons/EyeIcon";
import { Table } from "../../common/Table/Table";
import { useSession } from "../../../libs/useSession";

import { api } from "@/utils/api";

export const StudentAssignments = ({
  assignments,
  classroomId,
}: {
  assignments: Assignment[];
  classroomId: string;
}) => {
  const totalAssignments = assignments.length;

  const session = useSession();

  const submissionsQuery = api.Submission.getSubmissionForStudent.useQuery(
    {
      classroomId,
      studentId: session.data?.user?.id as string,
    },
    {
      enabled: !!session.data,
    },
  );

  const getSubmission = (assignmentId: string) => {
    return submissionsQuery.data?.find((submission) => submission.assignmentId === assignmentId);
  };

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="flex items-center gap-8">
        <h2 className="text-md">Tus tareas ({totalAssignments} total)</h2>
      </div>
      <div className="overflow-x-auto">
        <Table
          headers={["Número", "Nota", "Nombre", "Fecha Límite", "Acciones"]}
          rows={assignments.map((assignment, idx) => [
            assignment.number,
            getSubmission(assignment.id)?.grade ?? "N/A",
            assignment.name,
            <span key={idx} className="whitespace-nowrap">
              {DateTime.fromISO(assignment.dueDate).toLocaleString(DateTime.DATE_MED)}
            </span>,
            (
              <span className="flex gap-4">
                <Link
                  className="link flex items-center gap-1"
                  href={`/classrooms/${classroomId}/assignments/${assignment.id}`}
                >
                  <EyeIcon /> Ver
                </Link>
              </span>
            ) as ReactNode,
          ])}
        />
      </div>
    </div>
  );
};
