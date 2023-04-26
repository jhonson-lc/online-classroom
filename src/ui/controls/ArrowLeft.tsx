import { Text } from "@chakra-ui/react";
import React from "react";

const ArrowLeft = ({ prevSlide }: { prevSlide: () => any }) => {
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
      left="0"
      mt="-22px"
      p="16px"
      pos="absolute"
      top="50%"
      transition="0.6s ease"
      userSelect="none"
      w="auto"
      onClick={prevSlide}
    >
      &#10094;
    </Text>
  );
};

export default ArrowLeft;
