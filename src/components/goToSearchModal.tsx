import { Box } from "@chakra-ui/react";
import React from "react";

export function GoToSearchModal(props: any) {
  return (
    <Box
      h="250px"
      w="168px"
      onClick={() => props.handleTabsChange}
      my={3}
      border="2px solid transparent"
      _hover={{
        border: "2px solid grey",
        cursor: "pointer",
      }}
      bg="pink"
    ></Box>
  );
}
