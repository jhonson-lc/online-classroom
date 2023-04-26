import { EmptyStateWrapper } from "../../common/EmptyStateWrapper";
import { MainHeading } from "../../common/MainHeading";

import { EmptyStateDashboard } from "./EmptyStateDashboard";
import { EnrolledList } from "./EnrolledList";

import { api } from "@/utils/api";

export const DashboardScreen = () => {
  const enrolledClassroomsQuery = api.Student.getClassrooms.useQuery();

  const { data: classrooms, isLoading } = enrolledClassroomsQuery;

  return (
    <div>
      <MainHeading title="Your Classrooms" />

      <EmptyStateWrapper
        EmptyComponent={<EmptyStateDashboard />}
        NonEmptyComponent={<EnrolledList classrooms={classrooms ?? []} />}
        data={classrooms}
        isLoading={isLoading}
      />
    </div>
  );
};
