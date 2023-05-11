import React from "react";
import { useRouter } from "next/router";

import { PencilSquare } from "../../common/Icons/PencilSquare";
import { EmptyStateWrapper } from "../../common/EmptyStateWrapper";
import { useSession } from "../../../libs/useSession";
import { Button, Variant } from "../../common/Button/Button";
import { MainHeading } from "../../common/MainHeading";
import { Roles } from "../../../server/utils/constants";

import { CreateAssignmentModal } from "./CreateAssignmentModal";
import { EditClassroomModal } from "./EditClassroomModal";
import { NoAssignments } from "./NoAssignments";
import { StudentAssignments } from "./StudentAssignments";
import { useCreateAssignment } from "./hooks/useCreateAssignment";
import { useEditClassroom } from "./hooks/useEditClassroom";
import { StudentsSection } from "./StudentsSection";
import { SideNavigation, TabName } from "./SideNavigation";
import { SubmissionsSection } from "./SubmissionsSection";
import { TeacherAssignments } from "./TeacherAssignments";
import { useClassroomStore } from "./store";

import { api } from "@/utils/api";

export const ClassroomScreen = ({ classroomId }: { classroomId: string }) => {
  const selectedTab = useClassroomStore((state) => state.selectedTab);

  const assignmentsQuery = api.Classroom.getAssignments.useQuery({
    classroomId,
  });

  const classroomQuery = api.Classroom.getClassroom.useQuery({ classroomId });

  const classrooms = api.Student.getClassrooms.useQuery();

  const unenrollMutation = api.Classroom.unenroll.useMutation();

  const {
    openEditClassroomModal,
    closeEditModal,
    handleEditClassroomComplete,
    showEditClassroomModal,
  } = useEditClassroom({
    refreshClassroom: classroomQuery.refetch,
    classroomId,
  });

  const {
    showCreateAssignmentModal,
    closeAssignmentModal,
    openAssignmentModal,
    handleAssignmentModalComplete,
  } = useCreateAssignment({
    classroomId,
  });

  const session = useSession();
  const router = useRouter();

  const isLoadingAssignments = assignmentsQuery.isLoading;
  const assignments = assignmentsQuery.data;
  const classroom = classroomQuery.data;
  const hasAdminAccess = classroom?.userId === session?.data?.user?.id;
  const showUnenroll = classrooms.data?.some(({ id }) => id === classroomId);

  const handleUnenroll = async () => {
    if (confirm("Estás seguro que quieres salir de esta clase?")) {
      await unenrollMutation.mutateAsync({ classroomId });
      router.push("/dashboard");
    }
  };

  return (
    <>
      <MainHeading title={classroom?.name ?? "loading..."}>
        {hasAdminAccess && (
          <button className="link inline-flex items-center" onClick={openEditClassroomModal}>
            <PencilSquare /> Editar
          </button>
        )}

        {showUnenroll && (
          <Button variant={Variant.Danger} onClick={handleUnenroll}>
            Salir de la clase
          </Button>
        )}
      </MainHeading>

      <div className="mb-12 flex flex-col">
        <SideNavigation />

        <section className="grow">
          {selectedTab === TabName.Assignment && (
            <EmptyStateWrapper
              EmptyComponent={<NoAssignments openAssignmentModal={openAssignmentModal} />}
              NonEmptyComponent={
                session.data?.user?.role === Roles.Teacher ? (
                  <TeacherAssignments
                    assignments={assignments ?? []}
                    classroomId={classroomId}
                    openAssignmentModal={openAssignmentModal}
                  />
                ) : (
                  <StudentAssignments assignments={assignments ?? []} classroomId={classroomId} />
                )
              }
              data={assignments}
              isLoading={isLoadingAssignments}
            />
          )}

          {selectedTab === TabName.Students && <StudentsSection classroomId={classroomId} />}

          {selectedTab === TabName.Submissions && <SubmissionsSection classroomId={classroomId} />}
        </section>
      </div>

      <CreateAssignmentModal
        classroomId={classroomId}
        isOpen={showCreateAssignmentModal}
        onCancel={closeAssignmentModal}
        onComplete={handleAssignmentModalComplete}
      />

      {classroom && (
        <EditClassroomModal
          classroom={classroom}
          isOpen={showEditClassroomModal}
          onCancel={closeEditModal}
          onComplete={handleEditClassroomComplete}
        />
      )}
    </>
  );
};
