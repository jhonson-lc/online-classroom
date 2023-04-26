import React from "react";
import { Switch as ChakraSwitch, SwitchProps } from "@chakra-ui/react";

const Switch: React.FC<SwitchProps> = (props) => {
  return <ChakraSwitch {...props} />;
};

export default Switch;
