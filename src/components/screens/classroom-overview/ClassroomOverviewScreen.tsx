import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { Button, Variant } from "../../common/Button/Button";

import { api } from "@/utils/api";

export const ClassroomOverviewScreen = ({ classroomId }: { classroomId: string }) => {
  const classroomQuery = api.Classroom.getClassroom.useQuery({ classroomId });
  const userQuery = api.User.getUser.useQuery();
  const router = useRouter();
  const enrollMutation = api.Classroom.enrollInClassroom.useMutation();

  const classroom = classroomQuery.data;

  const handleEnroll = async () => {
    await enrollMutation.mutateAsync({ classroomId });
    router.push(`/classrooms/${classroomId}`);
  };

  useEffect(() => {
    if (!userQuery.data) return;
    if (!classroomId) return;
    if (!router) return;
    if (!userQuery.data.enrolledIn.find((classroom) => classroom.id === classroomId)) return;
    router.push(`/classrooms/${classroomId}`);
  }, [userQuery.data, classroomId, router]);

  return (
    <div className="container m-auto">
      <h2>{classroom?.name}</h2>
      <h2>{classroom?.description}</h2>
      <Button variant={Variant.Primary} onClick={handleEnroll}>
        Inscribirse
      </Button>
    </div>
  );
};
