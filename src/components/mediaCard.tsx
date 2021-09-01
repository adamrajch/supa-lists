import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
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
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { supabase } from "../../client";

export function MediaCard(props: any) {
  const { show, lists } = props;
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  async function createMedia(id, show) {
    console.log(props);
    // if (media.some((t) => t.title === show.titile)) {
    //   return;
    // }
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
    <Box
      onClick={onOpen}
      my={3}
      border="2px solid transparent"
      _hover={{
        border: "2px solid grey",
        cursor: "pointer",
      }}
    >
      <Box
        bgImage={show.image_url}
        minH="300px"
        position="relative"
        minW="200px"
      >
        <Box
          height="100%"
          background="linear-gradient(0deg, rgba(0,0,0,.75) 0%, rgba(255,255,255,0) 100%)"
          minH="300px"
          zIndex="3"
        />
        <Box
          py={3}
          px={2}
          position="absolute"
          zIndex="4"
          bottom="0"
          width="100%"
        >
          <Text as="b" fontSize="xl">
            {show.title}
          </Text>
        </Box>
      </Box>

      <Modal
        size="4xl"
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay mt={0} />
        <ModalContent bg="black">
          {/* <ModalHeader>{show.title}</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody mt={3}>
            <Flex flexDir={["column", "row"]}>
              <Image
                src={show.image_url}
                maxH={["250px", "540px"]}
                objectFit="contain"
              />
              <VStack justify="center" align="center">
                <Flex justify="space-between" w="100%">
                  <Heading flexGrow={1}>{show.title}</Heading>
                  {/* <Button onClick={() => createMedia()}>Create Show</Button> */}
                </Flex>

                <HStack spacing={2} justify="flex-start">
                  <Text>{`${show.episodes} eps`}</Text>
                  <Divider
                    orientation="vertical"
                    colorScheme="blue"
                    w="1px"
                    bgColor="blue"
                  />
                  <Text>{show.rated}</Text>
                  <Divider orientation="vertical" />
                  <Text>{show.type}</Text>
                  <Divider orientation="vertical" />
                  <Text>{show.end_date ? "Completed" : null}</Text>
                </HStack>
                <Container>
                  {/* <details>
                    <summary>Synopsis</summary>
                    <Text>
                      {show.synopsis.replace("[Written by MAL Rewrite]", "")}
                    </Text>
                  </details> */}
                  <Text fontSize={["sm", "md"]}>
                    {show.synopsis.replace("[Written by MAL Rewrite]", "")}
                  </Text>
                </Container>
                <Menu>
                  <MenuButton as={Button} rightIcon={<AddIcon />}>
                    Add To List
                  </MenuButton>
                  <MenuList>
                    {lists.length === 0 ? (
                      <MenuItem>Download</MenuItem>
                    ) : (
                      <>
                        {lists.map((list) => (
                          <MenuItem
                            key={list.id}
                            onClick={() => {
                              props.createMedia(list.id, show), onClose();
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
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
