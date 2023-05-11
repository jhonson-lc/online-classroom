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
          <FormGroup label="Grade" name="grade">
            <span className="flex gap-2">
              <input id="grade" {...register("grade", { required: true, valueAsNumber: true })} />

              <Button type="submit" variant={Variant.Primary}>
                Save
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
    <section>
      {submissionsQuery.data && (
        <Table
          headers={["Student", "Grade", "Assignment Name", "Assignment Number", "actions"]}
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
                Download
              </a>
            </>,
          ])}
        />
      )}
    </section>
  );
};
