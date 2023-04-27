import { GetServerSidePropsContext } from "next";

import { getMockRole } from "../pages/api/mock-role";

import { getMockUser } from "./mockUser";

import { env } from "@/env.mjs";
import { getServerAuthSession } from "@/server/auth";

export const UnstableGetServerSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  if (env.NEXT_PUBLIC_MOCK_NEXT_AUTH === "true") {
    return {
      user: getMockUser(await getMockRole()),
    };
  } else {
    return getServerAuthSession(ctx);
  }
};
