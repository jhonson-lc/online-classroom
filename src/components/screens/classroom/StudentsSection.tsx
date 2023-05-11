import React from "react";

import { EmptyStateWrapper } from "../../common/EmptyStateWrapper";

import { Students } from "./Students";
import { NoStudents } from "./NoStudents";

import { api } from "@/utils/api";

export const StudentsSection = ({ classroomId }: { classroomId: string }) => {
  const studentsQuery = api.Classroom.getStudents.useQuery({ classroomId });

  const { data: students, isLoading } = studentsQuery;

  return (
    <EmptyStateWrapper
      EmptyComponent={<NoStudents />}
      NonEmptyComponent={<Students students={students ?? []} />}
      data={students}
      isLoading={isLoading}
    />
  );
};
