import { useSession } from "next-auth/react";
import Link from "next/link";

const Logo = () => {
  const session = useSession();

  return (
    <Link
      href={
        session.data ? (session.data?.user?.role === "teacher" ? "/classrooms" : "/dashboard") : "/"
      }
    >
      WDJ Classroom
    </Link>
  );
};

export default Logo;
