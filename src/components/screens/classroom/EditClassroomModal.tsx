import { Classroom } from "@prisma/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button, Variant } from "../../common/Button/Button";
import { Modal, ModalActions, ModalForm } from "../../common/Modal";

type EditClassroomForm = {
  name: string;
  description: string;
};

export const EditClassroomModal = ({
  onCancel,
  onComplete,
  isOpen,
  classroom,
}: {
  onCancel: () => void;
  onComplete: (formData: EditClassroomForm) => void;
  isOpen: boolean;
  classroom: Classroom;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditClassroomForm>();

  useEffect(() => {
    reset({
      name: classroom.name,
      description: classroom.description,
    });
  }, [classroom]);

  const onSubmit = handleSubmit(async (data) => {
    onComplete(data);
    reset();
  });

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <Modal
      description="Edita la información necesaria para que tus estudiantes puedan encontrar tu curso."
      handleCancel={handleCancel}
      isOpen={isOpen}
      title="Editar curso"
    >
      <ModalForm onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <div>Nombre</div>
            <input
              className="focus:ring-primary-500 mb-2 rounded-md bg-slate-100 p-2 focus:border-transparent focus:outline-none focus:ring-2"
              placeholder="Nombre"
              {...register("name", { required: true })}
            />
          </label>
          {errors.name?.type === "required" && (
            <div className="text-red-500">Nombre es requerido</div>
          )}

          <label className="flex flex-col gap-2">
            <div>Descripción</div>
            <textarea
              className="focus:ring-primary-500 mb-2 rounded-md bg-slate-100 p-2 focus:border-transparent focus:outline-none focus:ring-2"
              {...register("description", { required: true })}
              placeholder="Descripción"
            />
            {errors.description?.type === "required" && (
              <div className="text-red-500">Descripción es requerida</div>
            )}
          </label>
        </div>
        <ModalActions>
          <Button type="button" variant={Variant.Secondary} onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit" variant={Variant.Primary}>
            Guardar
          </Button>
        </ModalActions>
      </ModalForm>
    </Modal>
  );
};
