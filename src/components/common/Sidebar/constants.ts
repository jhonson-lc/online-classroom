import { RiHomeLine } from "react-icons/ri";
import { MdOutlineClass } from "react-icons/md";
import { TbFolders, TbSettings2 } from "react-icons/tb";
import { FiMessageSquare } from "react-icons/fi";
import { BsFiles, BsPeople } from "react-icons/bs";

import { ILink } from "./types";

export const LOGGED_IN_LINKS: Record<string, ILink[]> = {
  teacher: [
    {
      id: "my-classes",
      name: "Mis clases",
      icon: MdOutlineClass,
      href: "/classrooms",
    },
    {
      id: "messages",
      name: "Mensajes",
      icon: FiMessageSquare,
      href: "/messages",
    },
    {
      id: "settings",
      name: "Configuración",
      icon: TbSettings2,
      href: "/profile",
    },
  ],
  student: [
    {
      id: "general",
      name: "General",
      icon: RiHomeLine,
      href: `/dashboard`,
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
      id: "teachers",
      name: "Profesores",
      icon: BsPeople,
      href: "/teachers",
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
      href: "/profile",
    },
  ],
};
