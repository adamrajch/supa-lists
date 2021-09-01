import {
  Box,
  Divider,
  Flex,
  Spacer,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { Logo } from "./logo";
import { NavLink } from "./navlink";
import { SearchField } from "./searchfield";
import { UserProfile } from "./userprofile";

export const Sidebar = (props: any) => {
  const links = [
    { label: "Anime", href: "/dashboard/lists/" },
    { label: "Movies", href: "/dashboard/lists/movies" },
  ];
  return (
    <Flex
      bg="linear-gradient(#7f4cadc3, #1e5370)"
      direction="column"
      borderRightWidth="1px"
      width="64"
      {...props}
    >
      <Flex direction="column" flex="1" pt="5" pb="4" overflowY="auto" px="4">
        <Box mb="6">
          <Logo color={mode("blue.600", "blue.400")} h="6" />
        </Box>

        <Box mb="6">
          <SearchField />
        </Box>

        <Stack spacing="6" as="nav" aria-label="Sidebar Navigation">
          <Stack spacing="1">
            {links.map((link) => (
              <NavLink key={link.label} label={link.label} href={link.href} />
            ))}
          </Stack>

          <Divider />
        </Stack>
        <Spacer />
      </Flex>

      <UserProfile user={props.user} />
    </Flex>
  );
};
