import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { Button, Variant } from "../../common/Button/Button";

import classroomImage from "@/../public/assets/assignments.svg";
import { api } from "@/utils/api";

export const ClassroomOverviewScreen = ({ classroomId }: { classroomId: string }) => {
  const classroomQuery = api.Classroom.getClassroom.useQuery({ classroomId });
  const userQuery = api.User.getUser.useQuery();
  const router = useRouter();
  const enrollMutation = api.Classroom.enrollInClassroom.useMutation();

  const classroom = classroomQuery.data;

  const handleEnroll = async () => {
    if (!classroomId) return;
    toast.promise(enrollMutation.mutateAsync({ classroomId }), {
      loading: "Inscribiéndote en el curso...",
      success: "¡Te has inscrito en el curso!",
      error: (e) => e.message,
    });
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
      <section className="bg-white">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="tracking-tightmd:text-5xl mb-4 max-w-2xl text-4xl font-extrabold leading-none xl:text-6xl">
              {classroom?.name}
            </h1>
            <p className="text-gray-500md:text-lg mb-6 max-w-2xl font-light lg:mb-8 lg:text-xl">
              {classroom?.description}
            </p>
            <Button variant={Variant.Primary} onClick={handleEnroll}>
              Inscribirse
            </Button>
          </div>
          <div className="hidden lg:col-span-5 lg:mt-0 lg:flex">
            <Image
              alt="a student"
              height={140}
              src={classroomImage}
              style={{
                objectFit: "cover",
              }}
              width={400}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
