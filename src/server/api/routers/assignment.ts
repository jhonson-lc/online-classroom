import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const assignment = createTRPCRouter({
  updateDescription: publicProcedure
    .input(
      z.object({
        description: z.string(),
        assignmentId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.assignment.update({
        where: {
          id: input.assignmentId,
        },
        data: {
          description: input.description,
        },
      });
    }),
  updateTitle: publicProcedure
    .input(
      z.object({
        title: z.string(),
        assignmentId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.assignment.update({
        where: {
          id: input.assignmentId,
        },
        data: {
          name: input.title,
        },
      });
    }),
  updateDueDate: publicProcedure
    .input(
      z.object({
        dueDate: z.string(),
        assignmentId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.assignment.update({
        where: {
          id: input.assignmentId,
        },
        data: {
          dueDate: input.dueDate,
        },
      });
    }),
  getDownloadUrl: publicProcedure
    .input(
      z.object({
        attachmentId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const attachment = await ctx.prisma.attachment.findUnique({
        where: {
          id: input.attachmentId,
        },
      });

      const downloadUrl = await s3.getSignedUrlPromise("getObject", {
        Bucket: BUCKET_NAME,
        Key: getObjectKey({
          assignmentId: attachment?.assignmentId,
          attachmentId: attachment?.id,
        }),
      });

      return downloadUrl;
    }),
  deleteAssignment: publicProcedure
    .input(
      z.object({
        assignmentId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // TODO: add auth
      await ctx.prisma.assignment.delete({
        where: {
          id: input.assignmentId,
        },
      });
    }),
  deleteAttachment: publicProcedure
    .input(
      z.object({
        attachmentId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // TODO: add auth
      await ctx.prisma.attachment.delete({
        where: {
          id: input.attachmentId,
        },
      });
    }),
  createPresignedUrl: publicProcedure
    .input(
      z.object({
        assignmentId: z.string(),
        filename: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const attachment = await ctx.prisma.attachment.create({
        data: {
          filename: input.filename,
          assignmentId: input.assignmentId,
        },
      });

      const presignedPost = await new Promise((resolve, reject) => {
        s3.createPresignedPost(
          {
            Fields: {
              key: getObjectKey({
                assignmentId: input.assignmentId,
                attachmentId: attachment.id,
              }),
            },
            Conditions: [
              ["starts-with", "$Content-Type", ""],
              ["content-length-range", 0, 1000000],
            ],
            Expires: 30,
            Bucket: "online-classroom-uploads",
          },
          (err, signed) => {
            if (err) return reject(err);
            resolve(signed);
          },
        );
      });

      return presignedPost as {
        url: string;
        fields: object;
      };
    }),
  getAttachments: publicProcedure
    .input(
      z.object({
        assignmentId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const assignment = await ctx.prisma.assignment.findUnique({
        where: {
          id: input.assignmentId,
        },
        include: {
          attachments: true,
        },
      });

      return assignment?.attachments;
    }),
});
