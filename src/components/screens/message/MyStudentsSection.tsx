import React from "react";

import { EmptyStateWrapper } from "../../common/EmptyStateWrapper";
import { NoStudents } from "../classroom/NoStudents";

import { Students } from "./Students";

import { api } from "@/utils/api";

export const MyStudents = ({ sendMessage }: { sendMessage: () => void }) => {
  const studentsQuery = api.Classroom.getStudentsOfTeacher.useQuery();

  const { data: students, isLoading } = studentsQuery;

  return (
    <EmptyStateWrapper
      EmptyComponent={<NoStudents />}
      NonEmptyComponent={<Students dm={sendMessage} students={students ?? []} />}
      data={students}
      isLoading={isLoading}
    />
  );
};
