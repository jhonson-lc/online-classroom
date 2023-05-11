const Sidebar = () => {
  return (
    <div
      className="relative flex h-full min-h-[100vh] w-[240px] max-w-sm animate-pulse flex-col justify-center rounded border-2 bg-white"
      role="status"
    >
      <div className="flex h-[100px] items-center justify-center border-b-2 text-[24px] font-[900] text-neutral-900">
        <div className="mb-2 h-2.5 w-32 rounded-full bg-gray-200" />
      </div>
      <ul className="flex flex-1 flex-col gap-4 py-6">
        {Array.from({ length: 5 }).map((link, i) => {
          return (
            <div key={i}>
              <div className="mt-4 flex items-center space-x-3">
                <svg
                  aria-hidden="true"
                  className="h-14 w-14 text-gray-200"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    fillRule="evenodd"
                  />
                </svg>
                <div>
                  <div className="mb-2 h-2.5 w-32 rounded-full bg-gray-200" />
                </div>
              </div>
            </div>
          );
        })}
      </ul>

      <div className="sticky bottom-0 border-t-2">
        <div className="flex cursor-pointer flex-row items-center justify-center gap-2 p-4  text-red-600">
          <div className="mb-2 h-2.5 w-32 rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
