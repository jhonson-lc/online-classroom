import type { NextPage } from "next";
import Head from "next/head";

import { BrowseClassroomsScreen } from "../components/screens/browse-classrooms/BrowseClassroomsScreen";
import { HeaderLayout } from "../layouts/HeaderLayout";

const BrowseClassroomsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Find a Classroom</title>
        <meta
          content="sign up now for a teacher or a student account in order to access the website"
          name="description"
        />
      </Head>

      <HeaderLayout>
        <BrowseClassroomsScreen />
      </HeaderLayout>
    </>
  );
};

export default BrowseClassroomsPage;
