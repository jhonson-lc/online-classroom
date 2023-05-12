import { Attachment } from "@prisma/client";

import { LinkButton, LinkButtonVariant } from "../../common/Button/LinkButton";
import { DownloadIcon } from "../../common/Icons/DownloadIcon";
import { TrashIcon } from "../../common/Icons/TrashIcon";
import { Table } from "../../common/Table/Table";

import { api } from "@/utils/api";
import { useSession } from "@/libs/useSession";

export const AttachmentsTable = ({
  attachments,
  onAttachmentDeleted,
}: {
  attachments: Attachment[];
  onAttachmentDeleted?: () => void;
}) => {
  const deleteAttachment = api.Assignment.deleteAttachment.useMutation();
  const session = useSession();
  const isTeacher = session.data?.user?.role === "teacher";

  const handleDeleteAttachment = async (attachmentId: string) => {
    if (!confirm("Estás seguro?")) return;
    await deleteAttachment.mutateAsync({
      attachmentId,
    });
    if (onAttachmentDeleted) onAttachmentDeleted();
  };

  return (
    <Table
      headers={["Archivo", "Acciones"]}
      rows={attachments.map((attachment) => [
        attachment.filename,
        <span key={attachment.id} className="flex items-center gap-4">
          <a
            className="link flex gap-2"
            download={attachment.filename}
            href={`/api/download-attachment?attachmentId=${attachment.id}`}
            rel="noreferrer"
            target="_blank"
          >
            <DownloadIcon />
            Descargar
          </a>
          {isTeacher && (
            <LinkButton
              variant={LinkButtonVariant.Danger}
              onClick={() => handleDeleteAttachment(attachment.id)}
            >
              <TrashIcon />
              Eliminar
            </LinkButton>
          )}
        </span>,
      ])}
    />
  );
};
