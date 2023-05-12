import { DateTime } from "luxon";
import React from "react";
import ReactMarkdown from "react-markdown";

import { Badge, BadgeVariant } from "../../common/Badge";
import { MainHeading } from "../../common/MainHeading";
import { EmptyStateAttachments } from "../edit-assignments/EmptyStateAttachments";
import { AttachmentsTable } from "../edit-assignments/AttachmentsTable";
import { SubmissionsTable } from "../classroom/SubmissionsTable";

import UploadSubmissionDropzone from "./UploadSubmissionDropzone";

import { api } from "@/utils/api";
import { EmptyStateWrapper } from "@/components/common/EmptyStateWrapper";

export const AssignmentScreen = ({ assignmentId }: { assignmentId: string }) => {
  const assignmentQuery = api.Classroom.getAssignment.useQuery({
    assignmentId,
  });

  const submissionQuery = api.Submission.getSubmission.useQuery({
    assignmentId,
  });

  const attachmentsQuery = api.Assignment.getAttachments.useQuery({
    assignmentId,
  });

  const formattedDueDate = assignmentQuery.data?.dueDate
    ? DateTime.fromISO(assignmentQuery.data?.dueDate).toLocaleString(DateTime.DATE_MED)
    : "N/A";

  const timeRemaining = assignmentQuery.data?.dueDate
    ? DateTime.now() < DateTime.fromISO(assignmentQuery.data?.dueDate)
      ? DateTime.fromISO(assignmentQuery.data?.dueDate).diffNow().toFormat(`d' días' hh' horas'`)
      : "Expirado"
    : "N/A";

  const isSubmissionSubmitted = !!submissionQuery.data;
  return (
    <section>
      <MainHeading
        subTitle={`Finaliza el ${formattedDueDate}`}
        title={`Tarea #${assignmentQuery.data?.number ?? ""}`}
      >
        <>
          {isSubmissionSubmitted ? (
            <Badge variant={BadgeVariant.Success}>Enviado</Badge>
          ) : (
            <Badge variant={BadgeVariant.Error}>No enviado</Badge>
          )}
        </>
      </MainHeading>

      <div className="markdown mb-12">
        <ReactMarkdown>{assignmentQuery.data?.description ?? ""}</ReactMarkdown>
      </div>

      <h2 className="mb-4 text-sm font-medium">Archivos adjuntos</h2>

      <div className="mb-8">
        <EmptyStateWrapper
          EmptyComponent={<EmptyStateAttachments />}
          NonEmptyComponent={<AttachmentsTable attachments={attachmentsQuery.data ?? []} />}
          data={attachmentsQuery.data}
          isLoading={attachmentsQuery.isLoading}
        />
      </div>

      <h2 className="mb-4 text-sm font-medium">Entrega</h2>
      <section className="flex flex-col space-y-2 text-xs">
        <div className="inline-flex space-x-4">
          <h3 className="min-w-[150px]">Nota</h3>
          <span className="text-secondary">{submissionQuery.data?.grade ?? "No calificado"}</span>
        </div>
        <div className="inline-flex space-x-4">
          <h3 className="min-w-[150px]">Tiempo restante</h3>
          <span className="text-secondary">{timeRemaining}</span>
        </div>
        <div className="inline-flex space-x-4">
          <h3 className="min-w-[150px]">Archivo enviado</h3>
          {submissionQuery.data ? (
            <div>
              <EmptyStateWrapper
                EmptyComponent={<EmptyStateAttachments />}
                NonEmptyComponent={<SubmissionsTable submission={submissionQuery.data ?? []} />}
                data={submissionQuery.data}
                isLoading={attachmentsQuery.isLoading}
              />
            </div>
          ) : (
            <span className="text-secondary">-</span>
          )}
        </div>
      </section>
      <div className="mt-6 w-full">
        <UploadSubmissionDropzone assignmentId={assignmentId} />
      </div>
    </section>
  );
};
