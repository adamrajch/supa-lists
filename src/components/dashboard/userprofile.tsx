import { SettingsIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { supabase } from "../../../client";

export const UserProfile = ({ user }: any) => {
  const router = useRouter();

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }
  const placeholder = {
    username: "Loading...",
  };

  return (
    <>
      {user ? (
        <Menu>
          <MenuButton as={Button} rightIcon={<SettingsIcon />}>
            {user.email}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => router.push("/dashboard/profile")}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => signOut()}>Logout</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <>{placeholder.username}</>
      )}
    </>
  );
};
