import { IconType } from "react-icons";

export type ILinkChild = {
  id: string;
  name: string;
  href: string;
};

export type ILink = {
  id: string;
  name: string;
  icon: IconType;
  href?: string;
  ILinkChild?: ILinkChild[];
};
