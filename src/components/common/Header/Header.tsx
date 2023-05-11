import { signIn } from "next-auth/react";
import React, { useState } from "react";

import { MobileMenu } from "./components/MobileMenu";
import MobileMenuButton from "./components/MobileMenuButton";
import LoggedOutSection from "./components/LoggedOutSection";
import { LoggedInSection } from "./components/LoggedInSection";

import { useSession } from "@/libs/useSession";

export const Header: React.FC = () => {
  const session = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoggedIn = !!session.data;
  const userMetadata = session.data?.user;

  return (
    <header className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-[100px] items-center justify-end">
          <div className="inset-y-0 left-0 flex items-center sm:hidden">
            <MobileMenuButton setIsMobileMenuOpen={setIsMobileMenuOpen} />
          </div>
          <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isLoggedIn ? (
              <LoggedInSection image={userMetadata?.image ?? ""} />
            ) : (
              <LoggedOutSection signIn={signIn} />
            )}
          </div>
        </div>
      </div>
      {isMobileMenuOpen && <MobileMenu hasRole={false} isLoggedIn={isLoggedIn} />}
    </header>
  );
};
