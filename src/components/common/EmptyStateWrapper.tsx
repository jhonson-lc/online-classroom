import React, { ReactNode } from "react";
import { isEmpty } from "lodash";

import { Spinner } from "./Icons/Spinner";

export const EmptyStateWrapper = ({
  isLoading,
  data,
  EmptyComponent,
  NonEmptyComponent,
}: {
  isLoading: boolean;
  data: any;
  EmptyComponent: ReactNode;
  NonEmptyComponent: ReactNode;
}) => {
  return (
    <div>
      {isLoading ? (
        <div className="grid h-[500px] w-full place-items-center">
          <Spinner />
        </div>
      ) : isEmpty(data) ? (
        EmptyComponent
      ) : (
        NonEmptyComponent
      )}
    </div>
  );
};
