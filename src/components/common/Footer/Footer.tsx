import { Roles } from "../../../server/utils/constants";
import { Button } from "../Button/Button";

import { env } from "@/env.mjs";

const becomeRole = (role: string) => {
  fetch("/api/mock-role", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      role,
    }),
  }).then(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    location.reload();
  });
};

export const Footer = () => {
  return (
    <>
      <footer className="bg-gray-50 p-4 shadow  dark:bg-gray-900">
        <div className="container mx-auto md:flex md:items-center md:justify-between md:p-6">
          <span className="text-sm text-gray-500 dark:text-gray-50 sm:text-center">
            © 2022 <a className="hover:underline">WDJ</a>. All Rights Reserved.
          </span>
          <ul className="mt-3 flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-50 sm:mt-0">
            <li>
              <a className="mr-4 hover:underline md:mr-6 " href="#">
                About
              </a>
            </li>
            <li>
              <a className="mr-4 hover:underline md:mr-6" href="#">
                Terms of Service
              </a>
            </li>
            <li>
              <a className="mr-4 hover:underline md:mr-6" href="#">
                Privacy Policy
              </a>
            </li>
            <li>
              <a className="hover:underline" href="#">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>

      {env.NEXT_PUBLIC_MOCK_NEXT_AUTH === "true" && (
        <div className="bg-red-200">
          <div className="container mx-auto flex items-center gap-2 text-black">
            DEVELOPMENT ROLE SWITCHER:
            <Button
              onClick={() => {
                becomeRole(Roles.Student);
              }}
            >
              student
            </Button>
            <Button
              onClick={() => {
                becomeRole(Roles.Teacher);
              }}
            >
              teacher
            </Button>
            <Button
              onClick={() => {
                becomeRole("unauthenticated");
              }}
            >
              unauthenticated
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
