import { Flex } from "@chakra-ui/layout";
import { Button, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { supabase } from "../../client";

export default function Header({ user }: any): ReactElement {
  const router = useRouter();
  async function signOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }
  return (
    <Flex align="center" justify="space-between" mx="auto" my="1rem" w="90%">
      <Heading>Supa Lists</Heading>
      <Button colorScheme="teal" onClick={signOut}>
        Logout
      </Button>
    </Flex>
  );
}
