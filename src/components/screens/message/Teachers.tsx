import { ReactNode } from "react";
import Image from "next/image";
import { User } from "@prisma/client";

import { Table } from "../../common/Table/Table";

import { useMessageStore } from "./store";

import profileImage from "@/../public/assets/profile.jpeg";
import { PaperCheckIcon } from "@/components/common/Icons/PaperCheckIcon";

export const Teachers = ({ teachers, dm }: { teachers: User[]; dm: () => void }) => {
  const totalStudents = teachers.length;
  const setReceive = useMessageStore((state) => state.setReceive);

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="flex items-center gap-8">
        <h3 className="text-md">{totalStudents} Profesor(es)</h3>
      </div>
      <div className="overflow-x-auto">
        <Table
          headers={["Nombre", "Email", "Acciones"]}
          rows={teachers.map((teacher) => [
            // eslint-disable-next-line react/jsx-key
            <div className="flex items-center gap-2">
              <Image
                alt=""
                className="h-8 w-8 rounded-full"
                height="30"
                referrerPolicy="no-referrer"
                src={teacher.image ?? profileImage}
                width="30"
              />{" "}
              {teacher.name}
            </div>,
            <div key={teacher.id}>{teacher.email}</div>,
            (
              <div className="flex gap-4">
                <div
                  className="link flex cursor-pointer items-center gap-1"
                  onClick={() => {
                    setReceive(teacher);
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
