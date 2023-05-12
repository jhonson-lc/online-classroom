import Image from "next/image";
import React from "react";
import Link from "next/link";

import { Button, Variant } from "../../common/Button/Button";

import studentImage from "@/../public/assets/student.jpeg";
import { api } from "@/utils/api";
import { MainHeading } from "@/components/common/MainHeading";

export const BrowseClassroomsScreen = () => {
  const findClassroom = api.Classroom.findClassroom.useQuery();
  const classrooms = api.Student.getClassrooms.useQuery();

  const isEnrolled = (classroomId: string) => {
    return classrooms.data?.some(({ id }) => id === classroomId);
  };

  return (
    <section>
      <MainHeading title="Cursos" />
      {findClassroom.data?.map((classroom) => (
        <div key={classroom.id}>
          <article className="flex items-end justify-between">
            <section className="flex gap-8">
              <figure>
                <Image alt="no classrooms found" height="300" src={studentImage} width="300" />
              </figure>
              <div className="flex flex-col justify-between">
                <div className="flex flex-col space-y-1">
                  <h3 className="text-xl font-bold">{classroom.name}</h3>
                  <h3>{classroom.description}</h3>
                </div>
                <div className="flex flex-col text-sm">
                  <span>
                    <span className="font-medium">Profesor: </span>
                    {classroom.teacher.name}
                  </span>
                  <span>
                    <span className="font-medium">Estado: </span>
                    {isEnrolled(classroom.id) ? "Inscrito" : "No inscrito"}
                  </span>
                </div>
              </div>
            </section>

            <div>
              <Link
                href={
                  isEnrolled(classroom.id)
                    ? `/classrooms/${classroom.id}`
                    : `/classrooms/${classroom.id}/overview`
                }
              >
                <Button color="primary" variant={Variant.Primary}>
                  Ir al curso
                </Button>
              </Link>
            </div>
          </article>
          <hr className="my-8 border-gray-600" />
        </div>
      ))}
    </section>
  );
};
