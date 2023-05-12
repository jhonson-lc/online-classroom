import { NextApiRequest, NextApiResponse } from "next";

import { AWS } from "@/libs/aws";
import { prisma } from "@/server/db";
import { getObjectKey } from "@/server/api/routers/Assignment";
import { BUCKET_NAME } from "@/server/api/routers/submission";
const s3 = new AWS.S3();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const attachmentId = req.query.attachmentId as string;

  const attachment = await prisma.attachment.findUnique({
    where: {
      id: attachmentId,
    },
  });

  const downloadUrl = await s3.getSignedUrlPromise("getObject", {
    Bucket: BUCKET_NAME,
    Key: getObjectKey({
      assignmentId: attachment?.assignmentId as string,
      attachmentId: attachment?.id as string,
    }),
    ResponseContentDisposition: `attachment; filename="${attachment?.filename}"`,
  });

  res.redirect(downloadUrl);
};

export default handler;
