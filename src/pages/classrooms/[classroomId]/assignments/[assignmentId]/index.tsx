import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

import { AssignmentScreen } from "@/components/screens/assignments/AssignmentScreen";
import DashboardLayout from "@/layouts/DashboardLayout";

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

export default ClassroomAssignmentPage;
