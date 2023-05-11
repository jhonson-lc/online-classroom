import Image from "next/image";

import { Button, Variant } from "../../common/Button/Button";

import assignmentsImage from "@/../public/assets/assignments.svg";

export const NoAssignments = ({ openAssignmentModal }: { openAssignmentModal: () => void }) => {
  return (
    <div className="flex flex-col items-center gap-8">
      <Image alt="no classrooms found" height="200" src={assignmentsImage} width="200" />
      <div className="text-center text-2xl">No tienes asignaciones creadas en esta curso.</div>
      <div className="self-center">
        <Button variant={Variant.Primary} onClick={openAssignmentModal}>
          Crear asignación
        </Button>
      </div>
    </div>
  );
};
