import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import student from "../../public/assets/student.svg";
import feynman from "../../public/assets/teacher.svg";
import { reloadSession } from "../utils/reloadSession";
import { UnstableGetServerSession } from "../libs/UnstableGetServerSession";
import { Button, Variant } from "../components/common/Button/Button";
import { HeaderLayout } from "../layouts/HeaderLayout";

import { api } from "@/utils/api";
import { prisma } from "@/server/db";

const Welcome: NextPage = () => {
  const router = useRouter();
  const { mutateAsync: setRoleAsTeacher } = api.Auth.setRoleAsTeacher.useMutation();
  const { mutateAsync: setRoleAsStudent } = api.Auth.setRoleAsStudent.useMutation();

  const setTeacherRole = async () => {
    await setRoleAsTeacher();
    reloadSession();
    router.push("/classrooms");
  };

  const setStudentRole = async () => {
    await setRoleAsStudent();
    reloadSession();
    router.push("/dashboard");
  };

  return (
    <>
      <Head>
        <title>Registrarse | Plataforma de educación virtual</title>
        <meta
          content="sign up now for a teacher or a student account in order to access the website"
          name="description"
        />
      </Head>

      <HeaderLayout>
        <main className="container m-auto">
          <div className="mx-auto flex flex-col items-center justify-center p-4">
            <h1 className="font-regular text-4xl text-gray-900">
              Bienvenido a la plataforma de educación virtual
            </h1>
            <p className="font-medium text-gray-900">
              Antes de empezar, necesitamos saber si eres un profesor o un estudiante
            </p>

            <div className="mb-4 mt-10 flex items-center justify-center gap-8">
              <div className="flex min-w-[200px] flex-col items-center gap-4 rounded-lg border-2 p-6">
                <Image
                  alt="A picture of Richard Feynman(well known physics professor) teaching"
                  className="object-cover object-top"
                  height={100}
                  src={feynman}
                />
                <Button variant={Variant.Primary} onClick={setTeacherRole}>
                  Soy profesor
                </Button>
              </div>
              <div className="flex min-w-[200px] flex-col items-center gap-4 rounded-lg border-2 p-6">
                <Image
                  alt="A picture of Richard Feynman(well known physics professor) teaching"
                  className="object-cover"
                  height={100}
                  src={student}
                />
                <Button variant={Variant.Primary} onClick={setStudentRole}>
                  Soy estudiante
                </Button>
              </div>
            </div>
          </div>
        </main>
      </HeaderLayout>
    </>
  );
};

export default Welcome;

export async function getServerSideProps(context: any) {
  const session = await UnstableGetServerSession(context);
  const user = await prisma.user.findUnique({ where: { id: session?.user?.id } });

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else if (user?.role) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  } else {
    return { props: {} };
  }
}
