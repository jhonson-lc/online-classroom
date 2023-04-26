import Head from "next/head";
import React from "react";
import { useSession } from "next-auth/react";

import { Header } from "@/components/common/Header/Header";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import {
  LINKS_SIDEBAR_STUDENT,
  LINKS_SIDEBAR_TEACHER,
} from "@/components/common/Sidebar/constants";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  const session = useSession();
  const userRole = session.data?.user.role ?? "student";

  return (
    <>
      <Head>
        <title>Admin - </title>
        <meta content="Admin" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main className="flex w-full">
        <section className="w-full max-w-[17%]">
          {userRole === "teacher" ? (
            <Sidebar listOfLinks={LINKS_SIDEBAR_TEACHER} />
          ) : (
            <Sidebar listOfLinks={LINKS_SIDEBAR_STUDENT} />
          )}
        </section>
        <section className="flex w-full flex-col">
          <Header />
          <div className="h-full w-full">{children}</div>
        </section>
      </main>
    </>
  );
};

export default DashboardLayout;
