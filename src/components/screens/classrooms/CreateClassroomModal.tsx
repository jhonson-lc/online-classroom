import React from "react";
import { useForm } from "react-hook-form";

import { Button, Variant } from "../../common/Button/Button";

import { api } from "@/utils/api";
import { FormGroup } from "@/components/common/form/FormGroup";
import { Modal, ModalActions, ModalForm } from "@/components/common/Modal";

type CreateClassroomForm = {
  name: string;
};

export const CreateClassroomModal = ({
  onCancel,
  onComplete,
  isOpen,
}: {
  onCancel: () => void;
  onComplete: () => void;
  isOpen: boolean;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateClassroomForm>();

  const createClassroom = api.Classroom.createClassroom.useMutation();

  const onSubmit = handleSubmit(async (data) => {
    await createClassroom.mutateAsync({ name: data.name });
    reset();
    onComplete();
  });

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <Modal
      description="Crea un curso para poder compartirlo con tus estudiantes."
      handleCancel={handleCancel}
      isOpen={isOpen}
      title="Crear un curso"
    >
      <ModalForm onSubmit={onSubmit}>
        <FormGroup error={errors.name && "Nombre es requerido"} label="Nombre" name="name">
          <input
            className="focus:ring-primary-500 mb-2 rounded-md bg-slate-100 p-2 focus:border-transparent focus:outline-none focus:ring-2"
            id="name"
            {...register("name", { required: true })}
          />
        </FormGroup>

        <ModalActions>
          <Button type="button" variant={Variant.Secondary} onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit" variant={Variant.Primary}>
            Crear
          </Button>
        </ModalActions>
      </ModalForm>
    </Modal>
  );
};
