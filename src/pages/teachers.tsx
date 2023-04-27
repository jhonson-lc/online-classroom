import { NextPage } from "next";

import { MainHeading } from "@/components/common/MainHeading";
import DashboardLayout from "@/layouts/DashboardLayout";

const Messages: NextPage = () => {
  return (
    <DashboardLayout>
      <MainHeading title="Profesores" />
      <span>Lista de profesores</span>
    </DashboardLayout>
  );
};

export default Messages;
