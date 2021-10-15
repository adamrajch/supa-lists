import { Center, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { supabase } from "../../client";

export default function Home(): ReactElement {
  const router = useRouter();
  async function fetchUser() {
    const profileData = await supabase.auth.user();
    if (profileData) {
      router.push("/dashboard/lists/movies");
    } else {
      router.push("/login");
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Center h="100vh">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  );
}
