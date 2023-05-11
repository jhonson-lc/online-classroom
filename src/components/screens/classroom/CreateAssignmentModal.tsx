import React from "react";
import { useForm } from "react-hook-form";
import { DateTime, Duration } from "luxon";

import { Button, Variant } from "../../common/Button/Button";
import { Modal, ModalActions, ModalForm } from "../../common/Modal";

import { api } from "@/utils/api";
import { FormGroup } from "@/components/common/form/FormGroup";

type CreateAssignmentForm = {
  name: string;
  description: string;
  dueDate: string;
};

export const CreateAssignmentModal = ({
  onCancel,
  onComplete,
  isOpen,
  classroomId,
}: {
  onCancel: () => void;
  onComplete: (assignmentId: string) => void;
  isOpen: boolean;
  classroomId: string;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateAssignmentForm>();

  const createAssignment = api.Classroom.createAssignment.useMutation();

  const onSubmit = handleSubmit(async (data) => {
    const dur = Duration.fromObject({ day: 1, seconds: -1 }); // TODO: this seems like backend business logic
    const assignment = await createAssignment.mutateAsync({
      name: data.name,
      classroomId,
      dueDate: DateTime.fromISO(data.dueDate).plus(dur).toISO() as string,
    });
    reset();
    onComplete(assignment.id);
  });

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <Modal
      description="Ingresa los datos de la asignación que deseas crear."
      handleCancel={handleCancel}
      isOpen={isOpen}
      title="Crear asignación"
    >
      <ModalForm onSubmit={onSubmit}>
        <FormGroup error={errors.name && "Nombre es requerido"} label="Nombre" name="name">
          <input
            className="focus:ring-primary-500 mb-2 rounded-md bg-slate-100 p-2 focus:border-transparent focus:outline-none focus:ring-2"
            id="name"
            {...register("name", { required: true })}
          />
        </FormGroup>

        <FormGroup
          error={errors.dueDate && "Fecha Límite es requerida"}
          label="Fecha Límite"
          name="dueDate"
        >
          <input
            id="dueDate"
            type="date"
            {...register("dueDate", { required: true })}
            className="focus:ring-primary-500 mb-2 rounded-md bg-slate-100 p-2 focus:border-transparent focus:outline-none focus:ring-2"
          />
        </FormGroup>

        <ModalActions>
          <Button type="button" variant={Variant.Secondary} onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit" variant={Variant.Primary} onClick={onSubmit}>
            Crear
          </Button>
        </ModalActions>
      </ModalForm>
    </Modal>
  );
};
