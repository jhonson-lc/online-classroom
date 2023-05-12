import React, { useState } from "react";
import { signIn } from "next-auth/react";

import MobileMenuButton from "@/components/common/Header/components/MobileMenuButton";
import { MobileMenu } from "@/components/common/Header/components/MobileMenu";
import Logo from "@/components/common/Header/components/Logo";
import { useSession } from "@/libs/useSession";
import LoggedOutHome from "@/components/common/Header/components/LoggedOutHome";

interface Props {
  children: React.ReactNode;
}

export const HeaderLayout: React.FC<Props> = ({ children }) => {
  const session = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoggedIn = !!session.data;

  return (
    <>
      <header className="py-4 text-primary">
        <div className="mx-auto max-w-7xl px-2">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <MobileMenuButton setIsMobileMenuOpen={setIsMobileMenuOpen} />
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center text-2xl font-bold">
                <Logo />
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <LoggedOutHome signIn={signIn} />
            </div>
          </div>
        </div>
        {isMobileMenuOpen && <MobileMenu hasRole={false} isLoggedIn={isLoggedIn} />}
      </header>
      <main className={"container mx-auto flex h-[80vh] flex-col"}>{children}</main>
    </>
  );
};
