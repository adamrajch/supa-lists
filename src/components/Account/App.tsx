import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  StackDivider,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { HiCloudUpload } from "react-icons/hi";
import { supabase } from "../../../client";
import { FieldGroup } from "./FieldGroup";

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  console.log(session);
  useEffect(() => {
    getProfile();
    prof();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function prof() {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, username, avatar_url, website");
    console.log(profile);
  }

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true);
      const profile = supabase.auth.user();

      const updates = {
        id: profile.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      // const { error } = await supabase.from("profiles").upsert(updates, {
      //   returning: "minimal", // Don't return the value after inserting
      // });
      const { user, error } = await supabase.auth.update({
        data: { hello: "world" },
      });
      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Box px={{ base: "4", md: "10" }} py="16" maxWidth="3xl" mx="auto">
      <form
        id="settings-form"
        onSubmit={(e) => {
          e.preventDefault();
          // form submit logic
        }}
      >
        <Stack spacing="4" divider={<StackDivider />}>
          <Heading size="lg" as="h1" paddingBottom="4">
            Account Settings
          </Heading>
          <FieldGroup title="Personal Info">
            <VStack width="full" spacing="6">
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input type="text" maxLength={255} />
              </FormControl>

              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input type="email" isReadOnly value="joe@chakra-ui.com" />
              </FormControl>

              <FormControl id="bio">
                <FormLabel>Bio</FormLabel>
                <Textarea rows={5} />
                <FormHelperText>
                  Brief description for your profile. URLs are hyperlinked.
                </FormHelperText>
              </FormControl>
            </VStack>
          </FieldGroup>
          <FieldGroup title="Profile Photo">
            <Stack direction="row" spacing="6" align="center" width="full">
              <Avatar
                size="xl"
                name="Alyssa Mall"
                src="https://images.unsplash.com/photo-1488282396544-0212eea56a21?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              />
              <Box>
                <HStack spacing="5">
                  <Button leftIcon={<HiCloudUpload />}>Change photo</Button>
                  <Button variant="ghost" colorScheme="red">
                    Delete
                  </Button>
                </HStack>
                <Text
                  fontSize="sm"
                  mt="3"
                  color={useColorModeValue("gray.500", "whiteAlpha.600")}
                >
                  .jpg, .gif, or .png. Max file size 700K.
                </Text>
              </Box>
            </Stack>
          </FieldGroup>

          <FieldGroup title="Connect accounts">
            <HStack width="full">
              <Button variant="outline" leftIcon={<FaGithub />}>
                Connect Github
              </Button>
              <Button
                variant="outline"
                leftIcon={<Box as={FaGoogle} color="red.400" />}
              >
                Connect Google
              </Button>
            </HStack>
          </FieldGroup>
        </Stack>
        <FieldGroup mt="8">
          <HStack width="full">
            <Button type="submit" colorScheme="blue">
              Save Changes
            </Button>
            <Button variant="outline">Cancel</Button>
          </HStack>
        </FieldGroup>
      </form>
    </Box>
  );
}
