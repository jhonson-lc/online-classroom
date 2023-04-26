import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import student from "../assets/student.jpeg";
import feynman from "../assets/richard-feynman.jpeg";
import { reloadSession } from "../utils/reloadSession";
import { unstable_getServerSession } from "../libs/unstable_getServerSession";
import { Button, Variant } from "../components/common/Button/Button";
import { HeaderLayout } from "../layouts/HeaderLayout";

import { authOptions } from "./api/auth/[...nextauth]";

import { api } from "@/utils/api";

const Welcome: NextPage = () => {
  const router = useRouter();
  const { mutateAsync: setRoleAsTeacher } = api.User.setRole.useMutation("auth.setRoleAsTeacher");
  const { mutateAsync: setRoleAsStudent } = api.User.setRole.useMutation("auth.setRoleAsStudent");

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
        <title>sign up</title>
        <meta
          content="sign up now for a teacher or a student account in order to access the website"
          name="description"
        />
      </Head>

      <HeaderLayout>
        <main className="container m-auto">
          <div className="mx-auto flex h-full flex-col items-center justify-center p-4">
            <h1 className="text-4xl text-gray-900 dark:text-white">Welcome to classroom!</h1>
            <p className="text-gray-900 dark:text-white">
              Before we start, click what type of user you want to be:
            </p>

            <div className="mb-4 mt-10 hidden gap-8 sm:grid sm:grid-cols-2">
              <Image
                alt="A picture of Richard Feynman(well known physics professor) teaching"
                className="object-cover"
                height="300"
                src={feynman}
              />
              <Image alt="A person studying" className="object-cover" height="300" src={student} />
            </div>

            <div className="hidden w-full grid-cols-2 gap-8 sm:grid">
              <div className="relative flex flex-col items-center justify-center rounded">
                <Button variant={Variant.Primary} onClick={setTeacherRole}>
                  I&apos;m a teacher
                </Button>
              </div>
              <div className="relative flex flex-col items-center justify-center rounded">
                <Button variant={Variant.Primary} onClick={setStudentRole}>
                  I&apos;m a student
                </Button>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:hidden">
              <Image
                alt="A picture of Richard Feynman(well known physics professor) teaching"
                className="object-cover object-top"
                height={150}
                src={feynman}
                width={300}
              />
              <Button variant={Variant.Primary} onClick={setTeacherRole}>
                I&apos;m a teacher
              </Button>

              <Image
                alt="A person studying"
                className="object-cover"
                height={150}
                src={student}
                width={300}
              />

              <Button variant={Variant.Primary}>I&apos;m a student</Button>
            </div>
          </div>
        </main>
      </HeaderLayout>
    </>
  );
};

export default Welcome;

export async function getServerSideProps(context: any) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  console.log(session);

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else if (session?.user?.role) {
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
