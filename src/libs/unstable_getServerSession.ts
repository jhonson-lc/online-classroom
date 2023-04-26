import { IncomingMessage, ServerResponse } from "http";

import { AuthOptions, getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

import { getMockRole } from "../pages/api/mock-role";

import { getMockUser } from "./mockUser";

export const UnstableGetServerSession = async (
  req: NextApiRequest | (IncomingMessage & { cookies: Partial<{ [key: string]: string }> }),
  res: ServerResponse<IncomingMessage> | NextApiResponse,
  authOptions: AuthOptions,
) => {
  if (process.env.NEXT_PUBLIC_MOCK_NEXT_AUTH) {
    return {
      user: getMockUser(await getMockRole()),
    };
  } else {
    return getServerSession(req, res, authOptions);
  }
};
