import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

import { EditAssignmentScreen } from "@/components/screens/edit-assignments/EditAssignmentScreen";
import DashboardLayout from "@/layouts/DashboardLayout";
import { UnstableGetServerSession } from "@/libs/UnstableGetServerSession";

const ClassroomPage: NextPage = () => {
  const router = useRouter();
  const classroomId = router.query.classroomId as string;
  const assignmentId = router.query.assignmentId as string;

  return (
    <>
      <Head>
        <title>Cursos y tutorías</title>
        <meta content="Todas las clases que puedas crear" name="description" />
      </Head>

      <DashboardLayout>
        <EditAssignmentScreen assignmentId={assignmentId} classroomId={classroomId} />
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
