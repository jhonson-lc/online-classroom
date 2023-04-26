import { RiHomeLine } from "react-icons/ri";
import { MdOutlineClass } from "react-icons/md";
import { TbFolders, TbSettings2 } from "react-icons/tb";
import { FiMessageSquare } from "react-icons/fi";
import { BsFiles, BsPeople } from "react-icons/bs";

import { ILink } from "./types";

export const LINKS_SIDEBAR_TEACHER: ILink[] = [
  {
    id: "competiciones",
    name: "Competiciones",
    icon: RiHomeLine,
    href: "/",
  },
  {
    id: "cuenta",
    name: "Cuenta",
    icon: RiHomeLine,
    href: "/account",
  },
];

export const LINKS_SIDEBAR_STUDENT: ILink[] = [
  {
    id: "general",
    name: "General",
    icon: RiHomeLine,
    href: `/`,
  },
  {
    id: "my-classes",
    name: "Mis clases",
    icon: MdOutlineClass,
    href: "/my-classes",
  },
  {
    id: "courses",
    name: "Cursos y Tutorías",
    icon: TbFolders,
    href: "/courses",
  },
  {
    id: "messages",
    name: "Mensajes",
    icon: FiMessageSquare,
    href: "/messages",
  },
  {
    id: "instractors",
    name: "Instructores",
    icon: BsPeople,
    href: "/instractors",
  },
  {
    id: "reportes",
    name: "Reportes",
    icon: BsFiles,
    href: "/reports",
  },
  {
    id: "settings",
    name: "Configuración",
    icon: TbSettings2,
    href: "/settings",
  },
];
