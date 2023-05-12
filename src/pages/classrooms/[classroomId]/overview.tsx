import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { ClassroomOverviewScreen } from "../../../components/screens/classroom-overview/ClassroomOverviewScreen";

import DashboardLayout from "@/layouts/DashboardLayout";

const ClassroomOverviewPage: NextPage = () => {
  const router = useRouter();
  const classroomId = router.query.classroomId as string;

  return (
    <>
      <Head>
        <title>Visión general del curso</title>
        <meta content="all of the classrooms you've created as a teacher" name="description" />
      </Head>

      <DashboardLayout>
        <ClassroomOverviewScreen classroomId={classroomId} />
      </DashboardLayout>
    </>
  );
};

export default ClassroomOverviewPage;
