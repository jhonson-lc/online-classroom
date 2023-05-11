import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

import { EditAssignmentScreen } from "@/components/screens/edit-assignments/EditAssignmentScreen";
import DashboardLayout from "@/layouts/DashboardLayout";

const ClassroomPage: NextPage = () => {
  const router = useRouter();
  const classroomId = router.query.classroomId as string;
  const assignmentId = router.query.assignmentId as string;

  return (
    <>
      <Head>
        <title>Classrooms</title>
        <meta content="all of the classrooms you've created as a teacher" name="description" />
      </Head>

      <DashboardLayout>
        <EditAssignmentScreen assignmentId={assignmentId} classroomId={classroomId} />
      </DashboardLayout>
    </>
  );
};

export default ClassroomPage;
