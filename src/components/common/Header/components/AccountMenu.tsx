import { signOut } from "next-auth/react";
import Link from "next/link";

const AccountMenu = () => {
  return (
    <div className="bg-bgSecondary absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 text-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-50">
      <Link className="link-primary block px-4 py-2 text-sm hover:underline" href="/profile">
        Profile
      </Link>
      <a
        className="link-primary block px-4 py-2 text-sm hover:underline"
        href="#"
        onClick={() => signOut()}
      >
        Sign out
      </a>
    </div>
  );
};

export default AccountMenu;
