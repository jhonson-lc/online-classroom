import { useState } from "react";

import { api } from "@/utils/api";

export const useEditClassroom = ({ refreshClassroom, classroomId }) => {
  const [showEditClassroomModal, setShowEditClassroomModal] = useState(false);

  const editClassroomMutation = api.Classroom.editClassroom.useMutation();

  const openEditClassroomModal = () => {
    setShowEditClassroomModal(true);
  };

  const closeEditModal = () => {
    setShowEditClassroomModal(false);
  };

  const handleEditClassroomComplete = async (updatedClassroomData) => {
    await editClassroomMutation.mutateAsync({
      ...updatedClassroomData,
      classroomId,
    });
    refreshClassroom();
    setShowEditClassroomModal(false);
  };

  return {
    openEditClassroomModal,
    closeEditModal,
    handleEditClassroomComplete,
    showEditClassroomModal,
  };
};
