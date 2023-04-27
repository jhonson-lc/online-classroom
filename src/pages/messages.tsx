import { NextPage } from "next";

import { MainHeading } from "@/components/common/MainHeading";
import DashboardLayout from "@/layouts/DashboardLayout";

const Messages: NextPage = () => {
  return (
    <DashboardLayout>
      <MainHeading title="Mensajes" />
      <span>Lista de mensajes</span>
    </DashboardLayout>
  );
};

export default Messages;
