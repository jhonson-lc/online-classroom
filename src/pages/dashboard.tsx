import type { GetServerSideProps, NextPage } from "next";

import { DashboardScreen } from "@/components/screens/dashboard/DashboardScreen";
import DashboardLayout from "@/layouts/DashboardLayout";
import { UnstableGetServerSession } from "@/libs/UnstableGetServerSession";
import { prisma } from "@/server/db";

const DashboardPage: NextPage = () => {
  return (
    <>
      <DashboardLayout>
        <DashboardScreen />
      </DashboardLayout>
    </>
  );
};

export default DashboardPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await UnstableGetServerSession(context);
  const user = await prisma.user.findUnique({ where: { id: session?.user?.id } });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else if (!user?.role) {
    return {
      redirect: {
        destination: "/welcome",
        permanent: false,
      },
    };
  } else {
    return { props: {} };
  }
};
