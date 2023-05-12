import Image from "next/image";
import { useRef, useState } from "react";

import { useClickOutside } from "../hooks/useClickOutside";
// import { BellIcon } from "../../Icons/BellIcon";

import AccountMenu from "./AccountMenu";

import { api } from "@/utils/api";

export const LoggedInSection = ({ image }: { image: string }) => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const openAccountMenuButtonRef = useRef<HTMLButtonElement>(null);

  const userQuery = api.User.getUser.useQuery();

  function toggleAccountMenu() {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  }

  function closeAccountMenu() {
    setIsAccountMenuOpen(false);
  }

  useClickOutside({
    ref: openAccountMenuButtonRef,
    onClose: closeAccountMenu,
  });

  const user = userQuery.data;
  let displayName = "Nombre de usuario";
  if (user) {
    displayName = user.displayName ?? user.name ?? "";
  }

  return (
    <>
      <div className="mr-3 text-white" />

      {/* <button
        className="rounded-full p-1 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        type="button"
      >
        <span className="sr-only">View notifications</span>
        <BellIcon />
      </button> */}

      <div className="relative ml-3">
        <div className="flex items-end justify-between">
          <div className="flex flex-col items-start justify-center text-primary">
            <span className="pr-4 text-xs font-semibold">{displayName}</span>
            <span className="pr-4 text-[10px] font-medium">
              {user?.role === "teacher" ? "Profesor" : "Estudiante"}
            </span>
          </div>
          <button
            ref={openAccountMenuButtonRef}
            aria-expanded="false"
            aria-haspopup="true"
            className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            id="user-menu-button"
            type="button"
            onClick={toggleAccountMenu}
          >
            <span className="sr-only">Open user menu</span>
            <Image
              alt=""
              className="h-8 w-8 rounded-full"
              height="50"
              referrerPolicy="no-referrer"
              src={image ?? ""}
              width="50"
            />
          </button>
        </div>
        {isAccountMenuOpen && <AccountMenu />}
      </div>
    </>
  );
};
