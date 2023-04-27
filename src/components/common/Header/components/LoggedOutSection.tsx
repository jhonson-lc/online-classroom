const LoggedOutSection = ({ signIn }: { signIn: () => void }) => {
  return (
    <div className="relative ml-3">
      <a
        className="link-secondary rounded-md px-3 py-2 text-sm font-medium"
        href="#"
        id="user-menu-item-2"
        role="menuitem"
        tabIndex={-1}
        onClick={() => signIn()}
      >
        Register / Sign in
      </a>
    </div>
  );
};

export default LoggedOutSection;
