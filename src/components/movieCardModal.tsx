import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
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
import React, { useEffect, useState } from "react";
import { supabase } from "../../client";
export function MovieCardModal(props: any) {
  const { isLargeRow, movie, lists } = props;
  const [mov, setMov] = useState(null);
  const toast = useToast();
  const baseUrl = "https://image.tmdb.org/t/p/original/";
  async function createMedia(id) {
    console.log(props);
    // if (media.some((t) => t.title === show.titile)) {
    //   return;
    // }

    const genres = [];
    mov.genres.forEach((element) => {
      genres.push(element.name);
    });

    const { data, error } = await supabase.from("movie").insert([
      {
        title: mov.title,
        user_id: props.user.id,
        score: mov.vote_average,
        synopsis: mov.overview,
        image_url: mov.poster_path,
        backdrop_url: mov.backdrop_path,
        runtime: mov.runtime,
        release_date: mov.release_date,
        budget: mov.budget,
        revenue: mov.revenue,
        genres: genres.join(),
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
    toast({
      title: "Added to list",
      description: "This show was added to your list",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
  useEffect(() => {
    async function fetchData() {
      const request = await fetch(movieDetailUrl).then((res) => res.json());
      setMov(request);

      return request;
    }
    fetchData();
  }, []);
  return (
    <>
      <Image
        maxH={isLargeRow ? "250px" : "100px"}
        objectFit="contain"
        mr="10px"
        w="100%"
        transition="transform 450ms"
        _hover={{ transform: "scale(1.08)" }}
        opacity={1}
        key={movie.id}
        src={`${baseUrl}${
          isLargeRow ? movie.poster_path : movie.backdrop_path
        }`}
        alt={movie.name}
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
          {/* <ModalHeader>{show.title}</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody
            mt={[0, 3]}
            mb={3}
            pt={[0, 3]}
            px={[0, 3]}
            bgColor="black"
            borderRadius="1em"
          >
            {mov && (
              <Flex
                bgColor="black"
                textAlign="left"
                flexDir={["column", "row"]}
              >
                <Image
                  maxH={["250px", "540px"]}
                  objectFit="contain"
                  display={["none", "block"]}
                  opacity={1}
                  key={mov.id}
                  src={`${baseUrl}${mov.poster_path}
                `}
                  alt={mov.name}
                />
                <Image
                  maxH={["250px", "540px"]}
                  display={["block", "none"]}
                  objectFit="contain"
                  opacity={1}
                  key={movie.id}
                  src={`${baseUrl}${movie.backdrop_path}`}
                  alt={movie.name}
                />
                <Container maxW="3xl">
                  <VStack align="flex-start" spacing={3}>
                    <Heading>{mov.title}</Heading>

                    <Flex justify="space-between" w="100%">
                      <HStack>
                        <Text color="gray.500">
                          {mov.release_date.slice(0, 4)}
                        </Text>
                        <Text color="gray.500">{`${mov.runtime}min`}</Text>
                      </HStack>

                      <Text color="gray.500" fontSize="lg" pr={2}>
                        Score{" "}
                        <Text
                          color="white"
                          as="span"
                        >{`${mov.vote_average}`}</Text>
                      </Text>
                    </Flex>

                    <Text fontSize="xl">Overview</Text>
                    <Text>{mov.overview}</Text>
                    <Grid templateColumns="repeat(5,1fr)" w="100%">
                      {mov.genres.length > 0 && (
                        <GridItem colSpan={2}>
                          <Text color="gray.600" w={["100%", "30%"]}>
                            Genre
                          </Text>
                        </GridItem>
                      )}
                      {mov.genres.length > 0 && (
                        <GridItem colSpan={3}>
                          <Box>
                            {mov.genres.map((genre, i) => (
                              <Text as="span" key={genre.id}>
                                <span>
                                  {i == mov.genres.length - 1
                                    ? `${genre.name}`
                                    : `${genre.name}, `}
                                </span>
                              </Text>
                            ))}
                          </Box>
                        </GridItem>
                      )}

                      {mov.budget > 0 && mov.budget !== 0 && (
                        <GridItem colSpan={2}>
                          <Text as="span" color="gray.600">
                            Budget
                          </Text>
                        </GridItem>
                      )}
                      {mov.budget > 0 && mov.budget !== 0 && (
                        <GridItem colSpan={3}>
                          <Text as="span">{`$${mov.budget.toLocaleString()}`}</Text>
                        </GridItem>
                      )}

                      {mov.revenue !== 0 && (
                        <GridItem colSpan={2}>
                          <Text as="span" color="gray.600">
                            Revenue
                          </Text>
                        </GridItem>
                      )}
                      {mov.revenue !== 0 && (
                        <GridItem colSpan={3}>
                          <Text as="span">
                            {` $${mov.revenue.toLocaleString()}`}
                          </Text>
                        </GridItem>
                      )}
                    </Grid>
                    <Menu>
                      <MenuButton as={Button} rightIcon={<AddIcon />}>
                        Add To List
                      </MenuButton>
                      <MenuList>
                        {props.lists.length === 0 ? (
                          <MenuItem>Download</MenuItem>
                        ) : (
                          <>
                            {lists.map((list) => (
                              <MenuItem
                                key={list.id}
                                onClick={() => {
                                  createMedia(list.id), onClose();
                                }}
                              >
                                {list.title}
                              </MenuItem>
                            ))}
                          </>
                        )}
                      </MenuList>
                    </Menu>
                  </VStack>
                </Container>
              </Flex>
            )}
          </ModalBody>
          {/* <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}
