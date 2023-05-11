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
  return <div>{isLoading ? <Spinner /> : isEmpty(data) ? EmptyComponent : NonEmptyComponent}</div>;
};
