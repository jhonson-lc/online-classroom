import Image from "next/image";
import React from "react";

import { Button, Variant } from "../../common/Button/Button";

import teacherImage from "@/../public/assets/teacher.svg";

export const EmptyStateClassrooms = ({
  openClassroomModal,
}: {
  openClassroomModal: () => void;
}) => {
  return (
    <div className="flex flex-col justify-center gap-8">
      <Image alt="no classrooms found" height="300" src={teacherImage} width="300" />
      <div className="text-2xl">You have no classrooms yet!</div>
      <Button variant={Variant.Primary} onClick={openClassroomModal}>
        Create a Classroom
      </Button>
    </div>
  );
};
