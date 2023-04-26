/* eslint-disable react-hooks/rules-of-hooks */
import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";

import { MobileMenu } from "./components/MobileMenu";
import { LoggedInLinks } from "./components/LoggedInLinks";
import MobileMenuButton from "./components/MobileMenuButton";
import Logo from "./components/Logo";
import LoggedOutLinks from "./components/LoggedOutLinks";
import LoggedOutSection from "./components/LoggedOutSection";
import { LoggedInSection } from "./components/LoggedInSection";

export const Header: React.FC = () => {
  const session = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoggedIn = !!session.data;
  const userMetadata = session.data?.user;

  return (
    <header className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <MobileMenuButton setIsMobileMenuOpen={setIsMobileMenuOpen} />
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Logo />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <nav className="flex space-x-4">
                {isLoggedIn ? <LoggedInLinks role={"student"} /> : <LoggedOutLinks />}
              </nav>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isLoggedIn ? (
              <LoggedInSection image={userMetadata?.image} />
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
