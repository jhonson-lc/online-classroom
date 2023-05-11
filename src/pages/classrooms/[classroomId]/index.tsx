import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

import { ClassroomScreen } from "../../../components/screens/classroom/ClassroomScreen";

import DashboardLayout from "@/layouts/DashboardLayout";

const ClassroomPage: NextPage = () => {
  const router = useRouter();
  const classroomId = router.query.classroomId as string;

  return (
    <>
      <Head>
        <title>Classrooms</title>
        <meta content="all of the classrooms you've created as a teacher" name="description" />
      </Head>

      <DashboardLayout>
        <ClassroomScreen classroomId={classroomId} />
      </DashboardLayout>
    </>
  );
};

export default ClassroomPage;
