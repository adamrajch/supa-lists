import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { supabase } from "../../client";
import DeleteMovieFromListModal from "./deleteMovieFromListModal";

export default function MovieCard(props: any) {
  const { movie, list, lists } = props;

  const toast = useToast();

  const baseUrl = "https://image.tmdb.org/t/p/original/";
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (!movie) {
    onClose();
  }
  async function createMedia(id) {
    console.log(props);
    // if (media.some((t) => t.title === show.titile)) {
    //   return;
    // }

    const { data, error } = await supabase.from("movie").insert([
      {
        title: movie.title,
        user_id: props.user.id,
        score: movie.score,
        synopsis: movie.synopsis,
        image_url: movie.image_url,
        backdrop_url: movie.backdrop_path,
        runtime: movie.runtime,
        release_date: movie.release_date,
        budget: movie.budget,
        revenue: movie.revenue,
        genres: movie.genres,
      },
    ]);

    if (error) {
      console.log("movie error: ", error);
      toast({
        title: "Could not add movie to list",
        description: "nani",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const newD = data;
    const addedMedia = addShowToList(id, newD[0]);
    console.log("created media:", data);
    // toast({
    //   title: "Added to list",
    //   description: "This show was added to your list",
    //   status: "success",
    //   duration: 3000,
    //   isClosable: true,
    // });
    props.fetchLists();
    return data;
  }

  async function addShowToList(id, newD) {
    const { data, error } = await supabase.from("movielist").insert([
      {
        movie_recs_id: id,
        movie_id: newD.id,
      },
    ]);
    if (error) {
      console.log(error);
    }
    return data;
  }
  async function addMovieToList(id) {
    const { data, error } = await supabase.from("movielist").insert([
      {
        movie_recs_id: id,
        movie_id: movie.id,
      },
    ]);
    if (error) {
      console.log(error);
    }
    onClose();
    props.fetchLists();
    return data;
  }

  return (
    <>
      <Image
        maxH={["150px", "250px"]}
        objectFit="contain"
        mr="10px"
        // w="100%"
        // transition="transform 450ms"
        opacity={1}
        key={movie.id}
        src={`${baseUrl}${movie.image_url}`}
        alt={movie.name}
        border="2px solid transparent"
        borderRadius="1em"
        _hover={{
          border: "2px solid gold",
          cursor: "pointer",
          transform: "scale(1.04)",
          transition: "transform 350ms ease-in-out",
        }}
        onClick={onOpen}
      />
      <Modal
        size="5xl"
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay mt={0} />
        <ModalContent
          bgColor="black"
          borderRadius={["none", "1em"]}
          border="2px solid purple"
        >
          <ModalCloseButton />
          <ModalBody
            mt={[0, 3]}
            mb={3}
            pt={[0, 3]}
            px={[0, 3]}
            bgColor="black"
            borderRadius="1em"
          >
            {movie && (
              <Flex
                bgColor="black"
                textAlign="left"
                flexDir={["column", "row"]}
              >
                <Image
                  maxH={["250px", "540px"]}
                  display={["block", "none"]}
                  objectFit="contain"
                  opacity={1}
                  key={movie.id}
                  src={`${baseUrl}${movie.backdrop_url}`}
                  alt={movie.name}
                />
                <Image
                  maxH={["250px", "540px"]}
                  display={["none", "block"]}
                  objectFit="contain"
                  opacity={1}
                  key={movie.id}
                  src={`${baseUrl}${movie.image_url}`}
                  alt={movie.name}
                />
                <Container maxW="3xl">
                  <VStack align="flex-start" spacing={3}>
                    <Heading>{movie.title}</Heading>
                    <Flex justify="space-between" w="100%">
                      <HStack>
                        <Text color="gray.500">
                          {movie.release_date.slice(0, 4)}
                        </Text>
                        <Text color="gray.500">{`${movie.runtime}min`}</Text>
                      </HStack>
                      <Text color="gray.500" fontSize="lg">
                        Score{" "}
                        <Text color="white" as="span">{`${movie.score}`}</Text>
                      </Text>
                    </Flex>

                    <Text fontSize="xl">Overview</Text>
                    <Text>{movie.synopsis}</Text>
                    <Grid templateColumns="repeat(5,1fr)" w="100%">
                      <GridItem colSpan={2}>
                        <Text color="gray.600" w={["100%", "30%"]}>
                          Genre
                        </Text>
                      </GridItem>
                      <GridItem colSpan={3}>
                        <Text as="span">{movie.genres}</Text>
                      </GridItem>
                      {movie.budget > 0 && movie.budget !== 0 && (
                        <GridItem colSpan={2}>
                          <Text as="span" color="gray.600">
                            Budget
                          </Text>
                        </GridItem>
                      )}
                      {movie.budget > 0 && movie.budget !== 0 && (
                        <GridItem colSpan={3}>
                          <Text as="span">{`$${movie.budget.toLocaleString()}`}</Text>
                        </GridItem>
                      )}

                      {movie.revenue !== 0 && (
                        <GridItem colSpan={2}>
                          <Text as="span" color="gray.600">
                            Revenue
                          </Text>
                        </GridItem>
                      )}
                      {movie.revenue !== 0 && (
                        <GridItem colSpan={3}>
                          <Text as="span">
                            {` ${movie.revenue.toLocaleString()}`}
                          </Text>
                        </GridItem>
                      )}
                    </Grid>
                    <HStack>
                      <Menu>
                        <MenuButton as={Button} rightIcon={<AddIcon />}>
                          Add To List
                        </MenuButton>
                        <MenuList>
                          {lists.length === 0 ? (
                            <MenuItem>Download</MenuItem>
                          ) : (
                            <>
                              {lists
                                .filter((l) => l.id !== list.id)
                                .map((list) => {
                                  return (
                                    <MenuItem
                                      key={list.id}
                                      onClick={() => {
                                        createMedia(list.id), onClose();
                                      }}
                                    >
                                      {list.title}
                                    </MenuItem>
                                  );
                                })}
                            </>
                          )}
                        </MenuList>
                      </Menu>
                      <DeleteMovieFromListModal movie={movie} list={list} />
                    </HStack>
                  </VStack>
                </Container>
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
