import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DateTime, Duration } from "luxon";

import { Button, Variant } from "../../common/Button/Button";
import { Modal, ModalActions, ModalForm } from "../../common/Modal";

import { api } from "@/utils/api";
import { FormGroup } from "@/components/common/form/FormGroup";

type EditDateForm = {
  dueDate: string;
};

export const EditDateModal = ({
  onCancel,
  initialDueDate,
  onComplete,
  isOpen,
  assignmentId,
}: {
  initialDueDate: string;
  onCancel: () => void;
  onComplete: () => void;
  isOpen: boolean;
  assignmentId: string;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditDateForm>();

  useEffect(() => {
    reset({
      dueDate: DateTime.fromISO(initialDueDate).toFormat("yyyy-MM-dd"),
    });
  }, [initialDueDate, reset]);

  const updateDueDate = api.Assignment.updateDueDate.useMutation();

  const onSubmit = handleSubmit(async (data) => {
    const dur = Duration.fromObject({ day: 1, seconds: -1 }); // TODO: this seems like backend business logic
    await updateDueDate.mutateAsync({
      assignmentId,
      dueDate: DateTime.fromISO(data.dueDate).plus(dur).toISO() as string,
    });
    onComplete();
  });

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <Modal
      description="Ingresa la información de tu nueva tarea."
      handleCancel={handleCancel}
      isOpen={isOpen}
      title="Crear tarea"
    >
      <ModalForm onSubmit={onSubmit}>
        <FormGroup
          error={errors.dueDate && "Fecha límite es requerida"}
          label="Fecha Límite"
          name="dueDate"
        >
          <input
            className="mb-2 rounded-md bg-slate-100 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            id="dueDate"
            type="date"
            {...register("dueDate", { required: true })}
          />
        </FormGroup>

        <ModalActions>
          <Button type="button" variant={Variant.Secondary} onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit" variant={Variant.Primary} onClick={onSubmit}>
            Actualizar
          </Button>
        </ModalActions>
      </ModalForm>
    </Modal>
  );
};
