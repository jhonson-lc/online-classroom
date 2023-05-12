import { useState } from "react";

import { Button, Variant } from "../../common/Button/Button";
import { MainHeading } from "../../common/MainHeading";

import { ClassroomsList } from "./ClassroomsList";
import { EmptyStateClassrooms } from "./EmptyStateClassrooms";
import { CreateClassroomModal } from "./CreateClassroomModal";

import { EmptyStateWrapper } from "@/components/common/EmptyStateWrapper";
import { useSession } from "@/libs/useSession";
import { api } from "@/utils/api";

export const ClassroomsScreen = () => {
  const { data: session } = useSession();

  const [showCreateClassroomModal, setShowCreateClassroomModal] = useState(false);

  const {
    data: classrooms,
    isLoading,
    refetch: refetchClassrooms,
  } = api.Classroom.getClassroomsForTeacher.useQuery();

  const closeClassroomModal = () => {
    setShowCreateClassroomModal(false);
  };

  const openClassroomModal = () => {
    setShowCreateClassroomModal(true);
  };

  const handleClassroomModalComplete = () => {
    refetchClassrooms();
    closeClassroomModal();
  };
  return (
    <>
      <MainHeading title={"Mis cursos y tutorías"}>
        {session?.user?.role === "teacher" && (
          <Button variant={Variant.Primary} onClick={openClassroomModal}>
            Crear un curso
          </Button>
        )}
      </MainHeading>
      <div>
        <EmptyStateWrapper
          EmptyComponent={<EmptyStateClassrooms />}
          NonEmptyComponent={<ClassroomsList classrooms={classrooms ?? []} />}
          data={classrooms}
          isLoading={isLoading}
        />
      </div>

      <CreateClassroomModal
        isOpen={showCreateClassroomModal}
        onCancel={closeClassroomModal}
        onComplete={handleClassroomModalComplete}
      />
    </>
  );
};
