import classNames from "classnames";
import React from "react";

import { PaperCheckIcon } from "../../common/Icons/PaperCheckIcon";
import { PeopleIcon } from "../../common/Icons/PeopleIcon";
import { PencilSquare } from "../../common/Icons/PencilSquare";
import { useSession } from "../../../libs/useSession";

import { TabName, useMessageStore } from "./store";

const links = [
  {
    name: "Bandeja de entrada",
    tab: TabName.INBOX,
    icon: <PaperCheckIcon />,
  },
  {
    name: "Enviados",
    tab: TabName.SENT,
    icon: <PencilSquare />,
  },
  {
    name: "Contactos",
    tab: TabName.CONTACTS,
    icon: <PeopleIcon />,
  },
];

export const SideNavigation = () => {
  const selectedTab = useMessageStore((state) => state.selectedTab);
  const setSelectedTab = useMessageStore((state) => state.setSelectedTab);
  const session = useSession();

  if (!session.data) return null;

  return (
    <aside aria-label="Sidebar" className="w-full">
      <ul className="flex w-full items-center justify-around">
        {links.map((link) => (
          <li key={link.name} className="w-full" onClick={() => setSelectedTab(link.tab)}>
            <div
              className={classNames(
                "relative flex w-full cursor-pointer items-center justify-center rounded-lg p-2 text-base font-normal hover:bg-secondary/5",
                link.tab === selectedTab
                  ? "bg-secondary/10 text-secondary"
                  : "bg-secondary/0 text-gray-900",
              )}
            >
              {link.icon}
              <span className="ml-3">{link.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};
