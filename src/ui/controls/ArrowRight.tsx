import { Text } from "@chakra-ui/react";
import React from "react";

const ArrowRight = ({ nextSlide }: { nextSlide: () => any }) => {
  return (
    <Text
      _hover={{
        opacity: 0.8,
        bg: "black",
      }}
      borderRadius="0 3px 3px 0"
      color="white"
      cursor="pointer"
      fontSize="18px"
      fontWeight="bold"
      mt="-22px"
      p="16px"
      pos="absolute"
      right="0"
      top="50%"
      transition="0.6s ease"
      userSelect="none"
      w="auto"
      onClick={nextSlide}
    >
      &#10095;
    </Text>
  );
};

export default ArrowRight;
