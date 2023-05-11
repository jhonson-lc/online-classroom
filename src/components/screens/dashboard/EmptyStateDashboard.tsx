import Image from "next/image";
import Link from "next/link";
import React from "react";

import teacherImage from "../../../../public/assets/teacher.svg";
import { Button, Variant } from "../../common/Button/Button";

export const EmptyStateDashboard = () => {
  return (
    <div className="mx-auto flex w-1/3 flex-col items-center justify-center gap-8">
      <Image alt="no classrooms found" height="300" src={teacherImage} width="300" />
      <div className="text-2xl">You have no classrooms yet!</div>
      <Link passHref href="/browse-classrooms">
        <Button as="a" variant={Variant.Primary}>
          Browse for Classrooms
        </Button>
      </Link>
    </div>
  );
};
