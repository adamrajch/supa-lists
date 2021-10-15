import { SearchIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuList,
  VStack,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { AddMovieListModal } from "./addMovieListModal";
import DeleteMovieListModal from "./deleteMovieListModal";
import EditMovieListModal from "./editMovieListModal";
import MovieCard from "./movieCard";

export default function MovieRecList(props: any): ReactElement {
  const { lists, user, list, fetchLists } = props;
  console.log(lists);
  return (
    <VStack mt={3}>
      <Container maxW="4xl">
        <HStack w="100%" align="center" justify="space-between">
          <Heading fontSize={["2xl", "4xl"]}>My Lists</Heading>
          <HStack>
            <Button
              leftIcon={<SearchIcon />}
              colorScheme="teal"
              variant="outline"
              onClick={() => props.handleTabsChange(1)}
              size="sm"
            >
              Search
            </Button>

            <AddMovieListModal user={user} fetchLists={props.fetchLists} />
          </HStack>
        </HStack>
      </Container>
      <Container maxW="4xl" h="100%">
        {lists.map((list) => {
          return (
            <Box key={list.id} px={1} my={3} borderRadius="1rem" w="100%">
              <HStack
                align="center"
                spacing={3}
                w="100%"
                justify="space-between"
              >
                <Heading fontSize={["lg", "3xl"]}>
                  <Link href={`/dashboard/lists/${list.id}`}>{list.title}</Link>
                </Heading>

                <HStack>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="options"
                      icon={<SettingsIcon />}
                      variant="ghost"
                    />
                    <MenuList>
                      <EditMovieListModal
                        list={list}
                        fetchLists={props.fetchLists}
                      />
                      <DeleteMovieListModal
                        list={list}
                        fetchLists={props.fetchLists}
                      />
                    </MenuList>
                  </Menu>
                </HStack>
              </HStack>

              <Flex
                overflowY="hidden"
                overflowX="scroll"
                py={["6px", "8px"]}
                px="4px"
              >
                {list.movie.map((movie) => {
                  return (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      list={list}
                      lists={lists}
                      fetchLists={props.fetchLists}
                      user={user}
                    />
                  );
                })}
              </Flex>
            </Box>
          );
        })}
      </Container>
    </VStack>
  );
}
