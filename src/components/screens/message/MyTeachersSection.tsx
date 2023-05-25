import React from "react";

import { EmptyStateWrapper } from "../../common/EmptyStateWrapper";
import { NoStudents } from "../classroom/NoStudents";

import { Teachers } from "./Teachers";

import { api } from "@/utils/api";

export const MyTeachers = ({ sendMessage }: { sendMessage: () => void }) => {
  const teachersQuery = api.Classroom.getTeachersOfStudent.useQuery();

  const { data: teachers, isLoading } = teachersQuery;

  return (
    <EmptyStateWrapper
      EmptyComponent={<NoStudents />}
      NonEmptyComponent={<Teachers dm={sendMessage} teachers={teachers ?? []} />}
      data={teachers}
      isLoading={isLoading}
    />
  );
};
