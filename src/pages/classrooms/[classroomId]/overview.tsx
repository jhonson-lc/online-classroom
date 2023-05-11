import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { ClassroomOverviewScreen } from "../../../components/screens/classroom-overview/ClassroomOverviewScreen";
import { HeaderLayout } from "../../../layouts/HeaderLayout";

const ClassroomOverviewPage: NextPage = () => {
  const router = useRouter();
  const classroomId = router.query.classroomId as string;

  return (
    <>
      <Head>
        <title>Classroom Overview</title>
        <meta content="all of the classrooms you've created as a teacher" name="description" />
      </Head>

      <HeaderLayout>
        <ClassroomOverviewScreen classroomId={classroomId} />
      </HeaderLayout>
    </>
  );
};

export default ClassroomOverviewPage;
