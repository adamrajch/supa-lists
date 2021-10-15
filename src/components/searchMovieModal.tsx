import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import Banner from "./movieBanner";
import requests from "./movieConstants";
import MovieRow from "./movieRow";
import SearchMovie from "./searchMovie";
export default function SearchMovieModal({ lists, user, fetchLists }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Button leftIcon={<AddIcon />} variant="outline" onClick={onOpen}>
        Search Movies
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
          <ModalBody
            p={0}
            overflowX="hidden"
            overflowY="hidden"
            css={{
              "&::-webkit-scrollbar": {
                width: " 0.7em",
                // display: "none",
              },
              "&:: -webkit-scrollbar-track": {
                backgroundColor: "#121129",
                borderRadius: "0px",
              },
              "&:: -webkit-scrollbar-thumb": {
                backgroundColor: "#6c63ff",
                borderRadius: "80px",
              },
            }}
          >
            <Box>
              <Banner />
              <SearchMovie lists={lists} user={user} fetchLists={fetchLists} />
              <Box>
                {requests.map((m) => (
                  <MovieRow
                    key={m.url}
                    title={m.title}
                    fetchUrl={`https://api.themoviedb.org/3${m.url}`}
                    lists={lists}
                    user={user}
                    fetchLists={fetchLists}
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
