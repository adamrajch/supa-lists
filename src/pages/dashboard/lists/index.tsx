import { SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AddListModal } from "@components/addListModal";
import { ShowCard } from "@components/card";
import Layout from "@components/dashboard/layout";
import DeleteListModal from "@components/deleteListModal";
import EditModal from "@components/editModal";
import SearchShowModal from "@components/searchShowModal";
import Link from "next/link";
import React, { ReactElement, useEffect, useState } from "react";
import { supabase } from "../../../../client";

export default function Lists(): ReactElement {
  const [lists, setLists] = useState([]);

  const [user, setUser] = useState(null);

  async function fetchUser() {
    const profileData = await supabase.auth.user();
    setUser(profileData);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchLists();
      subscribeLists();
      subscribeMedia();
      // const mySubscription = supabase
      //   .from(`lists:user_id=eq.${user.id}`)
      //   .on("*", () => fetchLists())
      //   .subscribe();

      // const mediaSub = supabase
      //   .from(`media:user_id=eq.${user.id}`)
      //   .on("*", (payload) => {
      //     console.log("Change received!", payload);
      //     fetchLists();
      //   })
      //   .subscribe();
      // return () => {
      //   supabase.removeSubscription(mySubscription),
      //     supabase.removeSubscription(mediaSub);
      // };
    }
    console.log("hello:", user);
  }, [user]);

  function subscribeLists() {
    const listSub = supabase
      .from(`lists:user_id=eq.${user.id}`)
      .on("*", (payload) => {
        console.log("Change received!", payload);
        fetchLists();
      })
      .subscribe();
    // return () => supabase.removeSubscription(listSub);
  }

  function subscribeMedia() {
    console.log("subscribing to media");
    const mediaSub = supabase
      .from(`media`)
      .on("*", (payload) => {
        console.log("Change received!", payload);
        fetchLists();
      })
      .subscribe();

    // return () => supabase.removeSubscription(mediaSub);
  }

  async function fetchLists() {
    const { data, error } = await supabase
      .from("lists")
      .select(
        `  id, title, genre, media(id, title, image_url, episodes, rated, synopsis, score, status, genre)`
      )
      .eq("user_id", user.id)
      .order("id", { ascending: true });
    if (error) {
      console.log(error);
    }
    console.log("refetching lists: ", data);
    setLists(data);
  }

  async function editList({ title, origTitle }) {
    const { data, error } = await supabase
      .from("lists")
      .update({ title })
      .match({ title: origTitle });
    console.log(data);
    if (error) {
      console.log("update error: ", error);
    }
  }
  async function addList({ title, genre }) {
    const { data, error } = await supabase
      .from("lists")
      .insert({ title: title, genre: genre, user_id: user.id });
    if (error) {
      console.log(error);
      return;
    }
  }
  return (
    <Layout>
      <Container maxW="4xl" h="100%" px={2}>
        <VStack>
          <Heading fontSize="3xl">Anime Recs</Heading>
          <HStack spacing={2}>
            <AddListModal addList={addList} />
            <SearchShowModal lists={lists} user={user} />
          </HStack>

          {lists.map((list) => {
            return (
              <Box
                key={list.id}
                px={4}
                my={3}
                // bgColor="brand.800"
                borderRadius="1rem"
                w="100%"
              >
                <HStack
                  align="center"
                  spacing={3}
                  w="100%"
                  fontSize={["lg", "3xl"]}
                  justify="space-between"
                >
                  <Heading fontSize={["lg", "3xl"]}>
                    <Link href={`/dashboard/lists/${list.id}`}>
                      {list.title}
                    </Link>
                  </Heading>
                  <Flex align="center">
                    <Text fontSize={["md", "lg"]} color="gray.400">
                      {`${list.media.length} / 10`}{" "}
                    </Text>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="options"
                        icon={<SettingsIcon />}
                        variant="ghost"
                      />
                      <MenuList>
                        <EditModal list={list} editList={editList} />
                        <DeleteListModal list={list} fetchLists={fetchLists} />
                      </MenuList>
                    </Menu>
                  </Flex>
                </HStack>

                {list.media && list.media.length > 0 ? (
                  <HStack
                    spacing={2}
                    px={2}
                    py={2}
                    overflowY="hidden"
                    overflowX="scroll"
                  >
                    {/* <Flex> */}
                    {list.media.map((show, i) => {
                      return (
                        <ShowCard
                          key={i}
                          show={show}
                          list={list}
                          fetchLists={fetchLists}
                        />
                      );
                    })}
                  </HStack>
                ) : (
                  <HStack spacing={2} py={1}>
                    <SearchShowModal lists={lists} user={user} />
                  </HStack>
                )}
              </Box>
            );
          })}
        </VStack>
      </Container>
    </Layout>
  );
}
