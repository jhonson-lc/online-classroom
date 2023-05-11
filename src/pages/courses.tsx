import type { NextPage } from "next";
import Head from "next/head";

import DashboardLayout from "@/layouts/DashboardLayout";
import { BrowseClassroomsScreen } from "@/components/screens/browse-classrooms/BrowseClassroomsScreen";

const Courses: NextPage = () => {
  return (
    <>
      <Head>
        <title>Encuentra un curso o tutoría | Plataforma de educación virtual</title>
        <meta
          content="sign up now for a teacher or a student account in order to access the website"
          name="description"
        />
      </Head>

      <DashboardLayout>
        <BrowseClassroomsScreen />
      </DashboardLayout>
    </>
  );
};

export default Courses;
