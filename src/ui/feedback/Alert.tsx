import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import React from "react";

interface Props {
  status?: "error" | "warning" | "info" | "success";
  title: string;
  copy: string;
  steps?: string;
}

const ComponentName: React.FC<Props> = ({ status = "error", title, copy, steps }) => {
  return (
    <Alert
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      status={status}
      textAlign="center"
      variant="subtle"
    >
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription fontSize="sm" lineHeight={1.2}>
        {copy}
        <p className="mt-1 text-xs text-gray-500">{steps}</p>
      </AlertDescription>
    </Alert>
  );
};

export default ComponentName;
