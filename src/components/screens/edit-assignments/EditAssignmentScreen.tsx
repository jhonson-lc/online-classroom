import React from "react";
import { DateTime } from "luxon";
import { useForm } from "react-hook-form";
import { useToggle } from "react-use";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";

import { Button } from "../../common/Button/Button";
import { EmptyStateWrapper } from "../../common/EmptyStateWrapper";
import { MainHeading } from "../../common/MainHeading";
import { Badge, BadgeVariant } from "../../common/Badge";
import { PencilSquare } from "../../common/Icons/PencilSquare";
import { LinkButton, LinkButtonVariant } from "../../common/Button/LinkButton";
import { UploadIcon } from "../../common/Icons/UploadIcon";
import { TrashIcon } from "../../common/Icons/TrashIcon";

import { EditDateModal } from "./EditDateModal";
import { EmptyStateAttachments } from "./EmptyStateAttachments";
import { AttachmentsTable } from "./AttachmentsTable";
import UploadAssigmentsDropzone from "./UploadAssigmentsDropzone";

import { api } from "@/utils/api";
import { FormGroup } from "@/components/common/form/FormGroup";
import { useIsClassroomAdmin } from "@/hooks/useIsClassAdmin";

type UpdateDescriptionForm = {
  description: string;
};

type UpdateTitleForm = {
  title: string;
};

export const EditAssignmentScreen = ({
  classroomId,
  assignmentId,
}: {
  classroomId: string;
  assignmentId: string;
}) => {
  const [isEditingDescription, toggleIsEditingDescription] = useToggle(false);
  const [isEditingTitle, toggleIsEditingTitle] = useToggle(false);
  const [isEditDueDateModalOpen, toggleIsEditDueDateModalOpen] = useToggle(false);
  const { register, handleSubmit, setValue } = useForm<UpdateDescriptionForm>();
  const {
    register: registerTitle,
    handleSubmit: handleSubmitTitle,
    setValue: setValueTitle,
  } = useForm<UpdateTitleForm>();
  const router = useRouter();

  useIsClassroomAdmin(classroomId);

  const deleteAssignment = api.Assignment.deleteAssignment.useMutation();

  const updateDescription = api.Assignment.updateDescription.useMutation();

  const updateTitle = api.Assignment.updateTitle.useMutation();

  const attachmentsQuery = api.Assignment.getAttachments.useQuery({
    assignmentId,
  });

  const assignmentQuery = api.Classroom.getAssignment.useQuery(
    {
      assignmentId,
    },
    {
      refetchOnWindowFocus: false,
      onSuccess(data) {
        setValue("description", data?.description ?? "");
        setValueTitle("title", data?.name ?? "");
      },
    },
  );

  const handleSaveEditDescription = async (formData: UpdateDescriptionForm) => {
    await updateDescription.mutateAsync({
      description: formData.description,
      assignmentId,
    });
    assignmentQuery.refetch();
    toggleIsEditingDescription();
  };

  const handleSaveEditTitle = async (formData: UpdateTitleForm) => {
    await updateTitle.mutateAsync({
      title: formData.title,
      assignmentId,
    });
    assignmentQuery.refetch();
    toggleIsEditingTitle();
  };

  const handleDeleteAssignment = async () => {
    if (!confirm("Está seguro que desea eliminar?")) return;
    await deleteAssignment.mutateAsync({ assignmentId });
    router.push(`/classrooms/${classroomId}`);
  };

  const handleOnAttachmentDelete = () => {
    attachmentsQuery.refetch();
  };

  const formattedDueDate = assignmentQuery.data?.dueDate
    ? DateTime.fromISO(assignmentQuery.data?.dueDate).toLocaleString(DateTime.DATE_MED)
    : "N/A";

  const assignment = assignmentQuery.data;

  return (
    <>
      <MainHeading title={`Editar tarea #${assignment?.number}`}>
        <Badge className="flex items-center gap-4" variant={BadgeVariant.Error}>
          Finaliza el {formattedDueDate}
          <LinkButton variant={LinkButtonVariant.Secondary} onClick={toggleIsEditDueDateModalOpen}>
            <PencilSquare /> Editar
          </LinkButton>
        </Badge>

        <LinkButton variant={LinkButtonVariant.Danger} onClick={handleDeleteAssignment}>
          <TrashIcon /> Eliminar
        </LinkButton>
      </MainHeading>

      <section>
        <h2 className="mb-4 flex items-center gap-4 text-2xl">
          Tarea
          <LinkButton onClick={toggleIsEditingTitle}>
            <PencilSquare /> Editar
          </LinkButton>
        </h2>
        {isEditingTitle ? (
          <form
            className="mb-12 flex w-2/3 flex-col"
            onSubmit={handleSubmitTitle(handleSaveEditTitle)}
          >
            <FormGroup label="Nombre" name="title">
              <input
                className="mb-2 rounded-md bg-slate-100 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                {...registerTitle("title")}
              />
            </FormGroup>

            <div className="flex justify-end">
              <Button className="w-fit">
                <UploadIcon size="md" /> Guardar
              </Button>
            </div>
          </form>
        ) : (
          <p className="text-md mb-12 flex items-center gap-4">{assignmentQuery.data?.name}</p>
        )}
      </section>

      <section>
        <h2 className="mb-4 flex text-2xl">
          Descripción
          <LinkButton onClick={toggleIsEditingDescription}>
            <PencilSquare /> Editar
          </LinkButton>
        </h2>

        {isEditingDescription ? (
          <form
            className="mb-12 flex w-2/3 flex-col"
            onSubmit={handleSubmit(handleSaveEditDescription)}
          >
            <FormGroup label="Descripción" name="description">
              <textarea
                className="mb-2 h-56 rounded-md bg-slate-100 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                {...register("description")}
              />
            </FormGroup>

            <div className="flex justify-end">
              <Button className="w-fit">
                <UploadIcon size="md" /> Guardar
              </Button>
            </div>
          </form>
        ) : (
          <div className="markdown mb-12">
            <ReactMarkdown>{assignment?.description ?? ""}</ReactMarkdown>
          </div>
        )}

        <h2 className="mb-4 text-2xl">Archivos adjuntos</h2>

        <div className="mb-8">
          <EmptyStateWrapper
            EmptyComponent={<EmptyStateAttachments />}
            NonEmptyComponent={
              <AttachmentsTable
                attachments={attachmentsQuery.data ?? []}
                onAttachmentDeleted={handleOnAttachmentDelete}
              />
            }
            data={attachmentsQuery.data}
            isLoading={attachmentsQuery.isLoading}
          />
        </div>

        <div className="mt-6 w-full">
          <UploadAssigmentsDropzone
            assignmentId={assignmentId}
            onFileUploaded={() => attachmentsQuery.refetch()}
          />
        </div>
      </section>

      {assignmentQuery.data?.dueDate && (
        <EditDateModal
          assignmentId={assignmentId}
          initialDueDate={assignmentQuery.data.dueDate}
          isOpen={isEditDueDateModalOpen}
          onCancel={toggleIsEditDueDateModalOpen}
          onComplete={() => {
            toggleIsEditDueDateModalOpen();
            assignmentQuery.refetch();
          }}
        />
      )}
    </>
  );
};
