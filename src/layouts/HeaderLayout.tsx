import React from "react";

import { Header } from "../components/common/Header/Header";

interface Props {
  children: React.ReactNode;
}

export const HeaderLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />

      <main className={"container mx-auto flex min-h-screen flex-col"}>{children}</main>
    </>
  );
};
