import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import DeleteShowFromListModal from "./deleteShowFromListModal";

export function ShowCard(props: any) {
  const { show } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!show) {
    onClose();
  }
  return (
    <Box
      onClick={onOpen}
      border="2px solid transparent"
      borderRadius="1em"
      _hover={{
        border: "2px solid gold",
        cursor: "pointer",
        transform: "scale(1.04)",
        transition: "transform 0.18s ease-in-out",
      }}
      display="block"
      minH="250px"
      minW="170px"
    >
      <Box
        bgImage={show.image_url}
        minH="250px"
        position="relative"
        maxW="170px"
        borderRadius="1em"
      >
        <Box
          height="100%"
          background="linear-gradient(0deg, rgba(0,0,0,.75) 0%, rgba(255,255,255,0) 100%)"
          minH="250px"
          zIndex="3"
          borderRadius="1em"
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
          <ModalCloseButton />
          <ModalBody mt={3}>
            <Flex justify="center" align="center" flexDir={["column", "row"]}>
              <Image src={show.image_url} objectFit="contain" />
              <VStack justify="center" align="center">
                <Flex justify="space-between" w="100%">
                  <Heading flexGrow={1}>{show.title}</Heading>
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
                  <Text>{show.status}</Text>
                </HStack>
                <Container>
                  <Text fontSize={["sm", "md"]}>
                    {show.synopsis.replace("[Written by MAL Rewrite]", "")}
                  </Text>
                </Container>
                <DeleteShowFromListModal
                  show={show}
                  list={props.list}
                  fetchLists={props.fetchLists}
                />
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
