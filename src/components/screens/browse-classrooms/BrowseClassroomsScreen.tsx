import Image from "next/image";
import React from "react";
import Link from "next/link";

import { Button, Variant } from "../../common/Button/Button";

import studentImage from "@/../public/assets/student.jpeg";
import { api } from "@/utils/api";

export const BrowseClassroomsScreen = () => {
  const findClassroom = api.Classroom.findClassroom.useQuery();
  const classrooms = api.Student.getClassrooms.useQuery();

  const isEnrolled = (classroomId: string) => {
    return classrooms.data?.some(({ id }) => id === classroomId);
  };

  return (
    <section>
      <div className="my-8">Filters</div>
      {findClassroom.data?.map((classroom) => (
        <div key={classroom.id}>
          <article className="flex gap-8">
            <figure>
              <Image alt="no classrooms found" height="300" src={studentImage} width="300" />
            </figure>

            <div>
              <h3 className="font-bold">{classroom.name}</h3>
              <h3 className="">{classroom.description}</h3>
              <h3 className="">{classroom.teacher.name}</h3>
            </div>

            <div>
              <Link
                href={
                  isEnrolled(classroom.id)
                    ? `/classrooms/${classroom.id}`
                    : `/classrooms/${classroom.id}/overview`
                }
              >
                <Button
                  color="primary"
                  variant={isEnrolled(classroom.id) ? Variant.Secondary : Variant.Primary}
                >
                  {isEnrolled(classroom.id) ? "(Already Enrolled) View" : "View Classroom"}
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
