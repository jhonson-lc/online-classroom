import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { ClassroomsScreen } from "../../components/screens/classrooms/ClassroomsScreen";

import { UnstableGetServerSession } from "@/libs/UnstableGetServerSession";
import DashboardLayout from "@/layouts/DashboardLayout";
import { prisma } from "@/server/db";

const Classrooms: NextPage = () => {
  return (
    <>
      <Head>
        <title>Classrooms</title>
        <meta content="all of the classrooms you've created as a teacher" name="description" />
      </Head>

      <DashboardLayout>
        <ClassroomsScreen />
      </DashboardLayout>
    </>
  );
};

export default Classrooms;

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
