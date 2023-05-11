import classNames from "classnames";
import React from "react";

import { PaperCheckIcon } from "../../common/Icons/PaperCheckIcon";
import { PeopleIcon } from "../../common/Icons/PeopleIcon";
import { PencilSquare } from "../../common/Icons/PencilSquare";
import { useSession } from "../../../libs/useSession";
import { Roles } from "../../../server/utils/constants";

import { useClassroomStore } from "./store";

export enum TabName {
  Assignment,
  Students,
  Submissions,
}

const studentLinks = [
  {
    name: "Asignaciones",
    tab: TabName.Assignment,
    icon: <PaperCheckIcon />,
  },
  {
    name: "Estudiantes",
    tab: TabName.Students,
    icon: <PeopleIcon />,
  },
];

const teacherLinks = [
  {
    name: "Asignaciones",
    tab: TabName.Assignment,
    icon: <PaperCheckIcon />,
  },
  {
    name: "Estudiantes",
    tab: TabName.Students,
    icon: <PeopleIcon />,
  },
  {
    name: "Notas",
    tab: TabName.Submissions,
    icon: <PencilSquare />,
  },
];

export const SideNavigation = () => {
  const selectedTab = useClassroomStore((state) => state.selectedTab);
  const setSelectedTab = useClassroomStore((state) => state.setSelectedTab);
  const session = useSession();

  if (!session.data) return null;

  const links = session.data.user?.role === Roles.Teacher ? teacherLinks : studentLinks;

  return (
    <aside aria-label="Sidebar" className="w-full">
      <ul className="flex w-full items-center justify-around">
        {links.map((link) => (
          <li key={link.name} className="w-full" onClick={() => setSelectedTab(link.tab)}>
            <div
              className={classNames(
                "relative flex w-full cursor-pointer items-center justify-center rounded-lg p-2 text-base font-normal hover:bg-gray-100",
                link.tab === selectedTab ? "bg-slate-100 text-blue-700" : "text-gray-900",
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
