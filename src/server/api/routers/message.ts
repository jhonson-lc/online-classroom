import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const message = createTRPCRouter({
  createMessage: publicProcedure
    .input(
      z.object({
        receiverId: z.string(),
        subject: z.string(),
        message: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const authorId = ctx.session?.user?.id as string;
      const message = await ctx.prisma.messages.create({
        data: {
          subject: input.subject,
          message: input.message,
          author: {
            connect: {
              id: authorId,
            },
          },
          receiver: {
            connect: {
              id: input.receiverId,
            },
          },
        },
      });

      return message;
    }),
  getMessages: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id as string;
    const messages = await ctx.prisma.messages.findMany({
      where: {
        OR: [
          {
            authorId: userId,
          },
          {
            receiverId: userId,
          },
        ],
      },
      include: {
        author: true,
        receiver: true,
      },
    });

    return messages;
  }),

  deleteMessage: publicProcedure
    .input(
      z.object({
        messageId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const message = await ctx.prisma.messages.delete({
        where: {
          id: input.messageId,
        },
      });

      return message;
    }),
});
