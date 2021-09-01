import { AddIcon, Icon, SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuList,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { AddMovieListModal } from "./addMovieListModal";
import DeleteMovieListModal from "./deleteMovieListModal";
import EditMovieListModal from "./editMovieListModal";
import MovieCard from "./movieCard";

export default function MovieRecList(props: any): ReactElement {
  const { lists, user, list } = props;
  console.log(lists);
  return (
    <VStack mt={3}>
      <SimpleGrid columns={[2, 3]} w="100%">
        <Box display={["none", "block"]} />
        <Heading fontSize={["2xl", "4xl"]}>Movie Recs</Heading>
        <AddMovieListModal user={user} fetchLists={props.fetchLists} />
      </SimpleGrid>

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
                {/* <Text fontSize="xl">{`${list.movie.length} / 10`} </Text> */}
                <HStack>
                  <Icon
                    as={AddIcon}
                    onClick={() => props.handleTabsChange(1)}
                  />
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
