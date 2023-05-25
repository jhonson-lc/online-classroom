import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button, Variant } from "../../common/Button/Button";

import { useMessageStore } from "./store";

import { api } from "@/utils/api";
import { FormGroup } from "@/components/common/form/FormGroup";
import { Modal, ModalActions, ModalForm } from "@/components/common/Modal";

type CreateMessageForm = {
  subject: string;
  message: string;
};

export const CreateMessageModal = ({
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
  } = useForm<CreateMessageForm>();

  const createMessageQuery = api.Message.createMessage.useMutation();

  const by = useMessageStore((state) => state.for);

  const onSubmit = handleSubmit(async (data) => {
    if (!by) return;
    toast.promise(
      createMessageQuery.mutateAsync({
        ...data,
        receiverId: by.id,
      }),
      {
        loading: "Enviando mensaje...",
        success: "Mensaje enviado",
        error: "Error al enviar mensaje",
      },
    );
    reset();
    onComplete();
  });

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <Modal
      description="Alguna inquietud o sugerencia que tengas, el profesor te responderá lo más pronto posible."
      handleCancel={handleCancel}
      isOpen={isOpen}
      title="Crear un mensaje"
    >
      <ModalForm onSubmit={onSubmit}>
        <FormGroup error={errors.subject && "Asunto es requerido"} label="Asunto" name="subject">
          <input
            className="focus:ring-primary-500 mb-2 rounded-md bg-slate-100 p-2 focus:border-transparent focus:outline-none focus:ring-2"
            id="name"
            {...register("subject", { required: true })}
          />
        </FormGroup>

        <label className="flex flex-col gap-2">
          <div>Mensaje</div>
          <textarea
            className="focus:ring-primary-500 mb-2 rounded-md bg-slate-100 p-2 focus:border-transparent focus:outline-none focus:ring-2"
            {...register("message", { required: true })}
          />
          {errors.message?.type === "required" && (
            <div className="text-red-500">Mensaje es requerida</div>
          )}
        </label>

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
