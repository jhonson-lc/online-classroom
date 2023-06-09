import type { NextPage } from "next";
import Head from "next/head";

import DashboardLayout from "@/layouts/DashboardLayout";
import { BrowseClassroomsScreen } from "@/components/screens/browse-classrooms/BrowseClassroomsScreen";
import { UnstableGetServerSession } from "@/libs/UnstableGetServerSession";

const BrowseClassrooms: NextPage = () => {
  return (
    <>
      <Head>
        <title>Encuentra un curso o tutoría | Plataforma de educación virtual</title>
        <meta
          content="Regístrese ahora para obtener una cuenta de profesor o de alumno y poder acceder al sitio web"
          name="description"
        />
      </Head>

      <DashboardLayout>
        <BrowseClassroomsScreen />
      </DashboardLayout>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const session = await UnstableGetServerSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return { props: {} };
  }
}

export default BrowseClassrooms;
