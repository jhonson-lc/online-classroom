import { useRouter } from "next/router";
import { useEffect } from "react";

import { useSession } from "../libs/useSession";
import { Roles } from "../server/utils/constants";

import { api } from "@/utils/api";

export const useIsClassroomAdmin = (classroomId: string) => {
  const session = useSession();
  const router = useRouter();

  const classroomQuery = api.Classroom.getClassroom.useQuery({
    classroomId,
  });

  useEffect(() => {
    if (!router) return;
    if (classroomQuery.isLoading) return;
    if (session.data === undefined) return;

    if (
      session.data?.user?.role !== Roles.Teacher ||
      classroomQuery.data?.userId !== session.data.user.id
    ) {
      router.push("/");
    }
  }, [classroomQuery, router, session]);
};
