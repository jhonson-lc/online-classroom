import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import DashboardLayout from "@/layouts/DashboardLayout";

const ClassroomAssignmentPage: NextPage = () => {
  const router = useRouter();
  const classroomId = router.query.classroomId as string;
  const assignmentId = router.query.assignmentId as string;

  return (
    <>
      <Head>
        <title>Assignment {assignmentId}</title>
        <meta content="all of the classrooms you've created as a teacher" name="description" />
      </Head>

      <DashboardLayout>
        <span>
          Assignment {assignmentId} from classroom {classroomId}
        </span>
      </DashboardLayout>
    </>
  );
};

export default ClassroomAssignmentPage;
