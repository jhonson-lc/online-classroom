import { user } from "./routers/user";
import { student } from "./routers/student";
import { auth } from "./routers/auth";

import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  User: user,
  Student: student,
  Auth: auth,
});

// export type definition of API
export type AppRouter = typeof appRouter;
