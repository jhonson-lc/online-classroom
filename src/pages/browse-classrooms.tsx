import type { NextPage } from "next";
import Head from "next/head";

import DashboardLayout from "@/layouts/DashboardLayout";
import { BrowseClassroomsScreen } from "@/components/screens/browse-classrooms/BrowseClassroomsScreen";

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

export default BrowseClassrooms;
