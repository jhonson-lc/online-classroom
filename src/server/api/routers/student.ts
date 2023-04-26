import { createTRPCRouter, publicProcedure } from "../trpc";

export const student = createTRPCRouter({
  getClassrooms: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        enrolledIn: true,
      },
    });
    return user?.enrolledIn;
  }),
});
