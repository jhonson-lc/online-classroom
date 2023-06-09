import { useState } from "react";
import { toast } from "sonner";

import { api } from "@/utils/api";

export const useEditClassroom = ({
  refreshClassroom,
  classroomId,
}: {
  refreshClassroom: () => void;
  classroomId: string;
}) => {
  const [showEditClassroomModal, setShowEditClassroomModal] = useState(false);

  const editClassroomMutation = api.Classroom.editClassroom.useMutation();

  const openEditClassroomModal = () => {
    setShowEditClassroomModal(true);
  };

  const closeEditModal = () => {
    setShowEditClassroomModal(false);
  };

  const handleEditClassroomComplete = (updatedClassroomData: any) => {
    toast.promise(
      editClassroomMutation
        .mutateAsync({
          ...updatedClassroomData,
          classroomId,
        })
        .then(() => refreshClassroom()),
      {
        loading: "Actualizando aula...",
        success: "Aula actualizada correctamente",
        error: "Error al actualizar aula",
      },
    );
    setShowEditClassroomModal(false);
  };

  return {
    openEditClassroomModal,
    closeEditModal,
    handleEditClassroomComplete,
    showEditClassroomModal,
  };
};
