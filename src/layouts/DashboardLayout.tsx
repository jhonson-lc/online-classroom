import React from "react";

import { Header } from "@/components/common/Header/Header";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import { useSession } from "@/libs/useSession";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  const session = useSession();
  const userRole = session?.data?.user?.role;

  if (!userRole) return null;

  return (
    <>
      <main className="flex w-full">
        <section>
          {userRole === "teacher" ? <Sidebar role="teacher" /> : <Sidebar role="student" />}
        </section>
        <section className="flex w-full flex-col">
          <Header />
          <div className="h-full w-full p-6">{children}</div>
        </section>
      </main>
    </>
  );
};

export default DashboardLayout;
