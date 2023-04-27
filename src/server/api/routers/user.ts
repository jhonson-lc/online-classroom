import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const user = createTRPCRouter({
  getUser: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        enrolledIn: true,
      },
    });
    return user;
  }),

  updateUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        phone: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id, name, email } = input;

      const user = await ctx.prisma.user.update({
        where: { id },
        data: {
          name,
          email,
        },
      });
      return user;
    }),

  updateDisplayName: publicProcedure
    .input(
      z.object({
        displayName: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { displayName } = input;

      const userId = ctx.session?.user?.id;

      const user = await ctx.prisma.user.update({
        where: { id: userId },
        data: {
          displayName,
        },
      });
      return user;
    }),
});
