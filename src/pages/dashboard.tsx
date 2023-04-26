import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { DashboardScreen } from "@/components/screens/dashboard/DashboardScreen";
import DashboardLayout from "@/layouts/DashboardLayout";
import { authOptions } from "@/server/auth";
import { UnstableGetServerSession } from "@/libs/unstable_getServerSession";

const DashboardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>sign up</title>
        <meta
          content="sign up now for a teacher or a student account in order to access the website"
          name="description"
        />
      </Head>

      <DashboardLayout>
        <DashboardScreen />
      </DashboardLayout>
    </>
  );
};

export default DashboardPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await UnstableGetServerSession(context.req, context.res, authOptions);

  console.log("session", session);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else if (!session.user?.role) {
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
