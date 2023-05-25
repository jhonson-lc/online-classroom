import { NextPage } from "next";

import { MainHeading } from "@/components/common/MainHeading";
import DashboardLayout from "@/layouts/DashboardLayout";
import MessageScreen from "@/components/screens/message/MessageScreen";
import { UnstableGetServerSession } from "@/libs/UnstableGetServerSession";
import { useSession } from "@/libs/useSession";

const Messages: NextPage = () => {
  const session = useSession();
  const userData = session.data?.user;

  if (!userData) return null;

  return (
    <DashboardLayout>
      <MainHeading title="Mensajería" />
      <MessageScreen role={userData.role} />
    </DashboardLayout>
  );
};

export async function getServerSideProps(context: any) {
  const session = await UnstableGetServerSession(context);

  if (!session?.user) {
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

export default Messages;
