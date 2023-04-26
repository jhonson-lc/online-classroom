import {
  FormLabel as ChakraFormLabel,
  Text,
  BoxProps,
  Stack,
  FormLabelProps,
  Badge,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";

import HelpCircleIcon from "../icons/HelpCircle";

interface Props extends BoxProps {
  isRequired?: boolean;
  name?: string;
  note?: string;
  info?: string | React.ReactNode;
  props?: FormLabelProps;
}

const FormLabel: React.FC<Props> = ({ isRequired, name, children, note, info, props }) => {
  const [isInfoOpen, toggleInfo] = React.useState(false);

  function handleToggleInfo() {
    toggleInfo(!isInfoOpen);
  }

  return (
    <Stack>
      <ChakraFormLabel
        alignItems="center"
        display="flex"
        htmlFor={name}
        m={0}
        pos="relative"
        {...props}
      >
        <Text fontSize="sm" fontWeight={500}>
          {children}
        </Text>
        {note && (
          <Text color="gray.400" fontSize="xs" marginLeft={1}>
            {note}
          </Text>
        )}
        {info && (
          <HelpCircleIcon
            color="gray.600"
            cursor="pointer"
            marginLeft={1}
            size={16}
            onMouseEnter={handleToggleInfo}
            onMouseLeave={handleToggleInfo}
          />
        )}
        {isRequired ? (
          <Badge
            backgroundColor="primary.50"
            color="primary.500"
            h={3}
            lineHeight={0.75}
            ml={2}
            p={1}
            rounded="sm"
          >
            *
          </Badge>
        ) : null}
      </ChakraFormLabel>
      {info && (
        <Tooltip isOpen={isInfoOpen} label={info} placement="right">
          {""}
        </Tooltip>
      )}
    </Stack>
  );
};

export default FormLabel;
