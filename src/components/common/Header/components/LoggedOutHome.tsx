import Link from "next/link";

import { useSession } from "@/libs/useSession";

const LoggedOutHome = ({ signIn }: { signIn: () => void }) => {
  const session = useSession();
  const userMetadata = session?.data?.user;
  return (
    <div className="relative ml-3">
      {!userMetadata && (
        <a
          className="link-secondary rounded-md px-3 py-2 text-sm font-medium"
          href="#"
          id="user-menu-item-2"
          role="menuitem"
          tabIndex={-1}
          onClick={() => signIn()}
        >
          Registrar / Iniciar sesión
        </a>
      )}
      {userMetadata && (
        <Link
          className="mb-2 inline-flex w-auto items-center justify-center rounded-2xl border-2 border-primary bg-transparent px-4 py-2 text-sm text-primary"
          href={`${userMetadata.role === "teacher" ? "/classrooms" : "/dashboard"}`}
        >
          Ir a consola
          <svg
            className="ml-1 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              fillRule="evenodd"
            />
          </svg>
        </Link>
      )}
    </div>
  );
};

export default LoggedOutHome;
