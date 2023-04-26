import { User } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
  };
};

export const user = createTRPCRouter({
  me: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
    const { id } = input;
    const user = await ctx.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("No se encontró el usuario, por favor intente de nuevo");
    }
    return filterUserForClient(user);
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
      return filterUserForClient(user);
    }),
});
