import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

import { AssignmentScreen } from "@/components/screens/assignments/AssignmentScreen";
import DashboardLayout from "@/layouts/DashboardLayout";
import { UnstableGetServerSession } from "@/libs/UnstableGetServerSession";

const ClassroomAssignmentPage: NextPage = () => {
  const router = useRouter();
  const assignmentId = router.query.assignmentId as string;

  return (
    <>
      <Head>
        <title>Tarea {assignmentId}</title>
        <meta content="all of the classrooms you've created as a teacher" name="description" />
      </Head>

      <DashboardLayout>
        <AssignmentScreen assignmentId={assignmentId} />
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

export default ClassroomAssignmentPage;
