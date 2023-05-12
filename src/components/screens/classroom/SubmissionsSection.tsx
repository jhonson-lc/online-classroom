import { useForm } from "react-hook-form";
import { useToggle } from "react-use";

import { Button, Variant } from "../../common/Button/Button";
import { LinkButton, LinkButtonVariant } from "../../common/Button/LinkButton";
import { DownloadIcon } from "../../common/Icons/DownloadIcon";
import { Table } from "../../common/Table/Table";

import { FormGroup } from "@/components/common/form/FormGroup";
import { api } from "@/utils/api";

const GradeEditable = ({ submission, onUpdate }: { submission: any; onUpdate: any }) => {
  const [isEditing, toggleIsEditing] = useToggle(false);

  const { register, handleSubmit } = useForm<{ grade: number }>();

  const updateGradeMutation = api.Submission.updateGrade.useMutation();

  const handleGradeSave = async ({ grade }: { grade: any }) => {
    await updateGradeMutation.mutateAsync({
      grade: parseInt(grade),
      submissionId: submission.id,
    });
    toggleIsEditing();
    onUpdate();
  };

  return (
    <>
      {isEditing ? (
        <form onSubmit={handleSubmit(handleGradeSave)}>
          <FormGroup label="Nota" name="grade">
            <span className="flex items-start gap-2">
              <input
                className="focus:ring-primary-500 mb-2 rounded-md bg-slate-100 p-2 focus:border-transparent focus:outline-none focus:ring-2"
                id="grade"
                {...register("grade", { required: true, valueAsNumber: true })}
              />
              <Button type="submit" variant={Variant.Primary}>
                Guardar
              </Button>
            </span>
          </FormGroup>
        </form>
      ) : (
        <LinkButton variant={LinkButtonVariant.Primary} onClick={toggleIsEditing}>
          {submission.grade === null ? "N/A" : submission.grade}
        </LinkButton>
      )}
    </>
  );
};

export const SubmissionsSection = ({ classroomId }: { classroomId: string }) => {
  const submissionsQuery = api.Submission.getSubmissionForClassroom.useQuery({
    classroomId,
  });
  return (
    <section className="mt-6">
      {submissionsQuery.data && (
        <Table
          headers={["Estudiante", "Nota", "Tarea", "Número de tarea", "Acciones"]}
          rows={submissionsQuery.data.map((submission) => [
            submission.studentName,
            <>
              <GradeEditable submission={submission} onUpdate={submissionsQuery.refetch} />
            </>,
            submission.assignmentName,
            submission.assignmentNumber,
            <>
              <a
                className="link flex gap-2"
                download={submission.fileName}
                href={`/api/download-submission?submissionId=${submission.id}`}
                rel="noreferrer"
                target="_blank"
              >
                <DownloadIcon />
                Descargar
              </a>
            </>,
          ])}
        />
      )}
    </section>
  );
};
