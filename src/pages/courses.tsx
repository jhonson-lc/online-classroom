import type { NextPage } from "next";
import Head from "next/head";

import ClassroomsScreen from "@/components/screens/browse-classrooms/BrowseClassroomsScreen";
import DashboardLayout from "@/layouts/DashboardLayout";

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
        <ClassroomsScreen />
      </DashboardLayout>
    </>
  );
};

export default Courses;
