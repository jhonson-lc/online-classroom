import type { NextPage } from "next";
import Head from "next/head";

import { ProfileScreen } from "../components/screens/profile/ProfileScreen";

import DashboardLayout from "@/layouts/DashboardLayout";

const ProfilePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Perfil | Plataforma de educación virtual</title>
        <meta content="Perfil de usuario" name="description" />
      </Head>

      <DashboardLayout>
        <ProfileScreen />
      </DashboardLayout>
    </>
  );
};

export default ProfilePage;
