import React from "react";

import { Header } from "../components/common/Header/Header";

interface Props {
  children: React.ReactNode;
}

export const HeaderLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />

      <main className={"container mx-auto flex h-[80vh] flex-col"}>{children}</main>
    </>
  );
};
