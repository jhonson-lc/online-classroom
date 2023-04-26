import { signOut } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { ILink } from "./types";

interface Props {
  listOfLinks: ILink[];
}

const handleClick = async () => {
  signOut();
};

const Sidebar: React.FC<Props> = ({ listOfLinks }) => {
  const router = useRouter();
  const { id, competition } = router.query;

  return (
    <nav className="relative flex h-full min-h-[110vh] flex-col justify-start border-2 bg-white p-2">
      <h2 className="border-b-2 py-6 pl-6 text-[34px] font-[900] text-neutral-900">
        Virtual Campus
      </h2>
      <ul className="flex flex-1 flex-col gap-1 py-6">
        {listOfLinks.map((link) => {
          const Icon = link.icon;
          return (
            <div key={link.id}>
              <div className="rounded-md border-none">
                <NextLink
                  legacyBehavior
                  passHref
                  href={
                    link.href
                      ? link.id === "competitions" || link.id === "competiciones"
                        ? `${link.href}`
                        : `/${id}/competencia/${competition}${link.href}`
                      : ""
                  }
                >
                  <a className="flex w-full items-center justify-start gap-4 p-4">
                    <Icon />
                    <span className="text-sm font-medium text-gray-900">{link.name}</span>
                  </a>
                </NextLink>
              </div>
            </div>
          );
        })}
      </ul>
      <div className="sticky bottom-0 border-t-2">
        <div
          className="flex cursor-pointer flex-row items-center gap-6 p-4  text-red-600"
          onClick={() => handleClick()}
        >
          <div>Cerrar Sessión</div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
