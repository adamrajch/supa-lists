import { Flex } from "@chakra-ui/react";
import React from "react";
import { MobileTopBar } from "./mobiletopbar";
import { Sidebar } from "./sidebar";
export default function Layout({ children, user }: any): JSX.Element {
  return (
    <Flex
      minH="100vh"
      h="100%"
      flexDirection="column"
      overflow="hidden"
      position="relative"
    >
      <MobileTopBar />
      <Flex flex="1">
        <Sidebar
          display={{ base: "none", md: "flex" }}
          user={user}
          h="full"

          // overflowY="hidden"
        />
        <Flex
          // h="100%"

          h="100vh"
          // h="full"
          // mx={{ base: "4px", lg: 25 }}
          align="center"
          flexDir="column"
          pt={6}
          // flexGrow={1}
          w="100%"
          // w="full"
          overflowY="scroll"
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "&::MsOverflowStyle": "none" /* IE and Edge */,
            " &::scrollbarWidth": "none" /* Firefox */,
          }}
          // maxW={}
          // overflow={["hidden",]}
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}
