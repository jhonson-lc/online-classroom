import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "../trpc";

import { Roles } from "@/server/utils/constants";

export const auth = createTRPCRouter({
  setRoleAsTeacher: publicProcedure.input(z.object({}).nullish()).mutation(async ({ ctx }) => {
    if (ctx.session?.user.role) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "you can not change your role once it has been set",
      });
    }

    await ctx.prisma.user.update({
      where: {
        id: ctx.session?.user.id,
      },
      data: {
        role: Roles.Teacher,
      },
    });
    return "role updated";
  }),
  setRoleAsStudent: publicProcedure.input(z.object({}).nullish()).mutation(async ({ ctx }) => {
    if (ctx.session?.user.role) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "you can not change your role once it has been set",
      });
    }

    await ctx.prisma.user.update({
      where: {
        id: ctx.session?.user?.id,
      },
      data: {
        role: Roles.Student,
      },
    });
    return "role updated";
  }),
});
