import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

import { ClassroomScreen } from "../../../components/screens/classroom/ClassroomScreen";

import DashboardLayout from "@/layouts/DashboardLayout";
import { UnstableGetServerSession } from "@/libs/UnstableGetServerSession";

const ClassroomPage: NextPage = () => {
  const router = useRouter();
  const classroomId = router.query.classroomId as string;

  return (
    <>
      <Head>
        <title>Cursos y tutorías</title>
        <meta content="all of the classrooms you've created as a teacher" name="description" />
      </Head>

      <DashboardLayout>
        <ClassroomScreen classroomId={classroomId} />
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

export default ClassroomPage;
