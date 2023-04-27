/* eslint-disable react-hooks/rules-of-hooks */
import { useSession as useNextAuthSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { getMockUser } from "./mockUser";

import { env } from "@/env.mjs";

export const useSession = () => {
  if (env.NEXT_PUBLIC_MOCK_NEXT_AUTH === "true") {
    const [mockRole, setMockRole] = useState<string | null>(null);

    useEffect(() => {
      fetch("/api/mock-role")
        .then((response) => response.json())
        .then(({ role }) => {
          setMockRole(role);
        });
    }, []);

    if (!mockRole) {
      return {
        data: undefined,
        status: "loading",
      };
    } else {
      return {
        data:
          mockRole === "unauthenticated"
            ? null
            : {
                user: getMockUser(mockRole),
              },
        status: mockRole === "unauthenticated" ? "unauthenticated" : "authenticated",
      };
    }
  } else {
    return useNextAuthSession();
  }
};
