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
      description="Enter the information for your new assignment."
      handleCancel={handleCancel}
      isOpen={isOpen}
      title="Create Assignment"
    >
      <ModalForm onSubmit={onSubmit}>
        <FormGroup error={errors.dueDate && "Due date is required"} label="Due Date" name="dueDate">
          <input id="dueDate" type="date" {...register("dueDate", { required: true })} />
        </FormGroup>

        <ModalActions>
          <Button type="button" variant={Variant.Secondary} onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" variant={Variant.Primary} onClick={onSubmit}>
            Update
          </Button>
        </ModalActions>
      </ModalForm>
    </Modal>
  );
};
