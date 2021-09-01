import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { supabase } from "../../client";
import requests from "./animeConstants";
import AnimeRow from "./animeRow";
export default function SearchShowModal(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [media, setMedia] = useState([]);
  const [anime, setAnime] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.length > 0) {
      fetchAnime(query);
    }
  };
  async function fetchMedia() {
    const { data } = await supabase.from("media").select();
    setMedia(data);
  }
  const fetchAnime = async (query) => {
    setLoading(true);
    const temp = await fetch(
      `https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&limit=10`
    ).then((res) => res.json());

    if (temp.results && temp.results.length) {
      setAnime(temp.results);
    }

    console.log(temp.results);
    setLoading(false);
  };

  async function createMedia(id, show) {
    if (media.some((t) => t.title === show.titile)) {
      return;
    }
    const status = show.end_date ? "completed" : "ongoing";

    const { data, error } = await supabase.from("media").insert([
      {
        title: show.title,
        user_id: props.user.id,
        score: show.score,
        synopsis: show.synopsis,
        image_url: show.image_url,
        episodes: show.episodes,
        rated: show.rated,
        genre: "anime",
        status: status,
      },
    ]);

    if (error) {
      console.log("media error: ", error);
      toast({
        title: "Could not add show to list",
        description: "nani",
        status: "error",
        duration: 1500,
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
      duration: 1500,
      isClosable: true,
    });
    return data;
  }

  async function addShowToList(id, newD) {
    const { data, error } = await supabase.from("showlist").insert([
      {
        list_id: id,
        media_id: newD.id,
      },
    ]);
    if (error) {
      console.log(error);
    }
    return data;
  }
  return (
    <Box>
      <Button leftIcon={<AddIcon />} variant="outline" onClick={onOpen}>
        Add Anime
      </Button>
      <Modal
        size="full"
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay mt={0} mb={0} />
        <ModalContent bg="black" mt={0} overflowY="hidden">
          <ModalCloseButton />
          <ModalBody mt={3} overflowX="hidden" overflowY="hidden">
            <Box w={["100%", "50%"]} margin="auto" my={2}>
              <Flex align="center" justify="center">
                <InputGroup size="sm" maxW="70%">
                  <InputRightElement>
                    <Icon
                      as={BsSearch}
                      onClick={(e) => handleSearch(e)}
                      _hover={{ cursor: "pointer" }}
                    />
                  </InputRightElement>
                  <Input
                    rounded="md"
                    placeholder="Search Anime"
                    _placeholder={{
                      opacity: 1,
                      color: "gray.400",
                    }}
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch(e);
                      }
                    }}
                  />
                </InputGroup>

                {query.length > 0 && (
                  <Button
                    mx={2}
                    size="sm"
                    leftIcon={<CloseIcon />}
                    onClick={() => {
                      setQuery(""), setAnime([]);
                    }}
                    _hover={{ cursor: "pointer" }}
                    mr={2}
                  >
                    Clear
                  </Button>
                )}
              </Flex>
            </Box>

            <Box>
              {loading ? (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              ) : (
                <Box>
                  {anime.length ? (
                    <>
                      <AnimeRow
                        title="Search Results"
                        lists={props.lists}
                        fetchUrl={null}
                        mediaList={anime}
                        createMedia={createMedia}
                      />
                    </>
                  ) : (
                    <Box>No anime found, try a different search</Box>
                  )}
                </Box>
              )}

              <Box overflowX="hidden" overflowY="hidden">
                {requests.map((m) => (
                  <AnimeRow
                    key={m.genre}
                    title={m.genre}
                    fetchUrl={`https://api.jikan.moe/v3/genre/anime${m.url}`}
                    lists={props.lists}
                    createMedia={createMedia}
                  />
                ))}
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
