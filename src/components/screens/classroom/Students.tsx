import Link from "next/link";
import { ReactNode } from "react";
import Image from "next/image";

import { EyeIcon } from "../../common/Icons/EyeIcon";
import { Table } from "../../common/Table/Table";

import profileImage from "@/../public/assets/profile.jpeg";

export const Students = ({
  students,
}: {
  students: {
    image: string | null;
    id: string;
    name: string | null;
  }[];
}) => {
  const totalStudents = students.length;

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="flex items-center gap-8">
        <h3 className="text-md">{totalStudents} Estudiantes(s) inscritos</h3>
      </div>
      <div className="overflow-x-auto">
        <Table
          headers={["Nombre", "Nota", "Acciones"]}
          rows={students.map((student) => [
            // eslint-disable-next-line react/jsx-key
            <div className="flex items-center gap-2">
              <Image
                alt=""
                className="h-8 w-8 rounded-full"
                height="30"
                referrerPolicy="no-referrer"
                src={student.image ?? profileImage}
                width="30"
              />{" "}
              {student.name}
            </div>,
            "65% (D)",
            (
              <div className="flex gap-4">
                <Link className="link flex items-center gap-1" href={`/students/${student.id}`}>
                  <EyeIcon /> Ver
                </Link>
              </div>
            ) as ReactNode,
          ])}
        />
      </div>
    </div>
  );
};
