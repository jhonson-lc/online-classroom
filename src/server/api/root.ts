import { user } from "./routers/user";
import { student } from "./routers/student";
import { auth } from "./routers/auth";
import { classroom } from "./routers/classroom";
import { submission } from "./routers/submission";
import { assignment } from "./routers/Assignment";

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
  Classroom: classroom,
  Submission: submission,
  Assignment: assignment,
});

// export type definition of API
export type AppRouter = typeof appRouter;
