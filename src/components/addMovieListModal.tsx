import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { supabase } from "../../client";

export function AddMovieListModal(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("anime");
  async function handleSave() {
    const { data, error } = await supabase
      .from("movie_recs")
      .insert({ title: title, user_id: props.user.id });
    if (error) {
      console.log(error);
      return;
    }
    props.fetchLists();
    onClose();
  }

  function handleChange(e) {
    e.preventDefault();
    if (title.length < 25) {
      setTitle(e.target.value);
    }
  }
  return (
    <Box>
      <Button
        leftIcon={<AddIcon />}
        variant="outline"
        onClick={onOpen}
        size="sm"
      >
        Add List
      </Button>
      <Modal
        size="md"
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay mt={0} />
        <ModalContent bg="black">
          <ModalCloseButton />
          <ModalBody mt={3}>
            <form>
              <VStack spacing={4} mt={3}>
                <FormControl>
                  <Input
                    placeholder="give your list a name"
                    variant="flushed"
                    value={title}
                    onChange={(e) => handleChange(e)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSave();
                      }
                    }}
                  />
                </FormControl>
              </VStack>
            </form>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={3}>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="green" onClick={() => handleSave()}>
                Save
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
