import { Messages, User } from "@prisma/client";
import { DateTime } from "luxon";
import React from "react";
import { toast } from "sonner";

import { TrashIcon } from "@/components/common/Icons/TrashIcon";
import { api } from "@/utils/api";

interface Props {
  message: Messages & {
    author: User;
    receiver: User;
  };
}

const MessageCard: React.FC<Props> = ({ message }) => {
  const deleteMessage = api.Message.deleteMessage.useMutation();
  const handleDelete = (id: string) => {
    toast("¿Estás seguro que quieres eliminar este mensaje?", {
      style: {
        backgroundColor: "#ef4444",
        color: "#fff",
        border: "none",
      },
      cancel: {
        label: "Cancelar",
        onClick: () => {
          toast.dismiss();
        },
      },
      action: {
        label: "Confirmar",
        onClick: async () => {
          await deleteMessage.mutateAsync({
            messageId: id,
          });
          toast.dismiss();
        },
      },
      invert: true,
    });
  };
  return (
    <article className="mb-6 rounded-lg bg-primary/5 p-4">
      <div className="flex justify-between">
        <h4 className="mb-4 border-b-2 pb-2 text-lg font-bold text-gray-800">{message.subject}</h4>
        <div
          className="cursor-pointer text-red-500 transition-all hover:scale-110"
          onClick={() => handleDelete(message.id)}
        >
          <TrashIcon />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            className="h-8 w-8 rounded-full border border-gray-500"
            src={message.author.image as string}
          />
          <div className="ml-2 flex flex-col">
            <span className="text-sm font-semibold">{message.author.name}</span>
            <span className="text-xs text-gray-400">Para: {message.receiver.email}</span>
          </div>
        </div>
        <span className="text-sm text-gray-500">
          {DateTime.fromISO(message.createdAt.toISOString()).toLocaleString(DateTime.DATETIME_MED)}
        </span>
      </div>
      <div className="py-6 pl-2 text-gray-700">
        <p className="mt-4">{message.message}</p>
      </div>
    </article>
  );
};

export default MessageCard;
