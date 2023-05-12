import { Submission } from "@prisma/client";

import { DownloadIcon } from "../../common/Icons/DownloadIcon";
import { Table } from "../../common/Table/Table";

import { LinkButton, LinkButtonVariant } from "@/components/common/Button/LinkButton";
import { TrashIcon } from "@/components/common/Icons/TrashIcon";

export const SubmissionsTable = ({ submission }: { submission: Submission }) => {
  const submissions: Submission[] = [submission];
  const handleDeleteSubmission = () => {
    console.log("Delete submission");
  };
  return (
    <section>
      <div>
        <div>
          <Table
            rows={submissions.map((submission) => [
              submission.filename,
              <>
                <a
                  className="link flex gap-2 text-secondary"
                  download={submission.filename}
                  href={`/api/download-submission?submissionId=${submission.id}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <DownloadIcon />
                  Descargar
                </a>
              </>,
              <>
                <LinkButton variant={LinkButtonVariant.Danger} onClick={handleDeleteSubmission}>
                  <TrashIcon /> Eliminar
                </LinkButton>
              </>,
            ])}
          />
        </div>
      </div>
    </section>
  );
};
