import { NextApiRequest, NextApiResponse } from "next";

import { AWS } from "@/libs/aws";
import { BUCKET_NAME, getObjectKey } from "@/server/api/routers/submission";
import { prisma } from "@/server/db";
const s3 = new AWS.S3();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const submissionId = req.query.submissionId as string;

  const submission = await prisma.submission.findUnique({
    where: {
      id: submissionId,
    },
  });

  const downloadUrl = await s3.getSignedUrlPromise("getObject", {
    Bucket: BUCKET_NAME,
    Key: getObjectKey({
      studentId: submission?.studentId as string,
      submissionId,
    }),
    ResponseContentDisposition: `attachment; filename="${submission?.filename}"`,
  });

  res.redirect(downloadUrl);
};

export default handler;
