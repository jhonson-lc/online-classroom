import { EmptyStateDashboard } from "./EmptyStateDashboard";
import { EnrolledList } from "./EnrolledList";

import { MainHeading } from "@/components/common/MainHeading";
import { EmptyStateWrapper } from "@/components/common/EmptyStateWrapper";
import { api } from "@/utils/api";

export const DashboardScreen = () => {
  const enrolledClassroomsQuery = api.Student.getClassrooms.useQuery();

  const { data: classrooms, isLoading } = enrolledClassroomsQuery;
  return (
    <main>
      <MainHeading title="Tus cursos" />
      <EmptyStateWrapper
        EmptyComponent={<EmptyStateDashboard />}
        NonEmptyComponent={<EnrolledList classrooms={classrooms ?? []} />}
        data={classrooms}
        isLoading={isLoading}
      />
    </main>
  );
};
