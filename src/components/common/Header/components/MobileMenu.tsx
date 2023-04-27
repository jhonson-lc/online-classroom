import Link from "next/link";

export const MobileMenu = ({ isLoggedIn, hasRole }: { isLoggedIn: boolean; hasRole: boolean }) => {
  return (
    <div className="sm:hidden" id="mobile-menu">
      <div className="space-y-1 px-2 pb-3 pt-2">
        {isLoggedIn && (
          <>
            {hasRole && (
              <>
                <a
                  aria-current="page"
                  className="link-secondary block rounded-md px-3 py-2 text-base font-medium"
                  href="#"
                >
                  Dashboard
                </a>
                <a
                  className="link-secondary block rounded-md px-3 py-2 text-base font-medium"
                  href="#"
                >
                  Assignments
                </a>
                <a
                  className="link-secondary block rounded-md px-3 py-2 text-base font-medium"
                  href="#"
                >
                  Students
                </a>
              </>
            )}
            {!hasRole && (
              <Link
                aria-current="page"
                className="link-secondary block rounded-md px-3 py-2 text-base font-medium"
                href="/welcome"
              >
                Finish Setup
              </Link>
            )}
          </>
        )}
        {!isLoggedIn && (
          <a className="link-secondary block rounded-md px-3 py-2 text-base font-medium" href="#">
            Pricing
          </a>
        )}
      </div>
    </div>
  );
};
