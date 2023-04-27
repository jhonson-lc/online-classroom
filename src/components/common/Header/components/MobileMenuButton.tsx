import React, { useRef } from "react";

import { useClickOutside } from "../hooks/useClickOutside";

const MobileMenuButton = ({
  setIsMobileMenuOpen,
}: {
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const openNavigationMenuButtonRef = useRef<HTMLButtonElement>(null);

  function toggleMobileMenu() {
    setIsMobileMenuOpen((isOpen) => !isOpen);
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  useClickOutside({
    ref: openNavigationMenuButtonRef,
    onClose: closeMobileMenu,
  });

  return (
    <button
      ref={openNavigationMenuButtonRef}
      aria-controls="mobile-menu"
      aria-expanded="false"
      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
      type="button"
      onClick={toggleMobileMenu}
    >
      <span className="sr-only">Open main menu</span>
      <svg
        aria-hidden="true"
        className="block h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg
        aria-hidden="true"
        className="hidden h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

export default MobileMenuButton;
