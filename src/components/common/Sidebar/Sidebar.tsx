import { signOut } from "next-auth/react";
import NextLink from "next/link";
import React from "react";

import Logo from "../Header/components/Logo";

import { LOGGED_IN_LINKS } from "./constants";

interface Props {
  role: string;
}

const handleClick = async () => {
  signOut();
};

const Sidebar: React.FC<Props> = ({ role }) => {
  const links = LOGGED_IN_LINKS[role];

  if (!links) return null;

  return (
    <nav className="relative flex h-full min-h-[110vh] flex-col justify-start border-2 bg-white p-2">
      <div className="border-b-2 py-6 pl-6 text-[24px] font-[900] text-neutral-900">
        <Logo />
      </div>
      <ul className="flex flex-1 flex-col gap-1 py-6">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <div key={link.id}>
              <div className="rounded-md border-none">
                <NextLink legacyBehavior passHref href={link.href}>
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
