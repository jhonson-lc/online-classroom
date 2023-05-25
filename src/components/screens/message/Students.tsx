import { ReactNode } from "react";
import Image from "next/image";
import { User } from "@prisma/client";

import { Table } from "../../common/Table/Table";

import { useMessageStore } from "./store";

import profileImage from "@/../public/assets/profile.jpeg";
import { PaperCheckIcon } from "@/components/common/Icons/PaperCheckIcon";

export const Students = ({ students, dm }: { students: User[]; dm: () => void }) => {
  const totalStudents = students.length;
  const setReceive = useMessageStore((state) => state.setReceive);

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="flex items-center gap-8">
        <h3 className="text-md">{totalStudents} Estudiantes(s)</h3>
      </div>
      <div className="overflow-x-auto">
        <Table
          headers={["Nombre", "Email", "Acciones"]}
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
            <div key={student.id}>{student.email}</div>,
            (
              <div className="flex gap-4">
                <div
                  className="link flex cursor-pointer items-center gap-1"
                  onClick={() => {
                    setReceive(student);
                    dm();
                  }}
                >
                  <PaperCheckIcon /> Enviar mensaje
                </div>
              </div>
            ) as ReactNode,
          ])}
        />
      </div>
    </div>
  );
};
