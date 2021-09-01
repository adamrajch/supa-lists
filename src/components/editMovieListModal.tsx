import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { supabase } from "../../client";

export default function EditMovieListModal(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState(props.list.title);
  const origTitle = props.list.title;

  async function handleSubmit() {
    if (origTitle !== title) {
      const { data, error } = await supabase
        .from("movie_recs")
        .update({ title })
        .match({ title: origTitle });
      console.log(data);
      if (error) {
        console.log("update error: ", error);
      }
      //   props.editList({ title, origTitle });
      props.fetchLists();
      onClose();
    }
  }
  return (
    <Box w="100%">
      <Button leftIcon={<EditIcon />} variant="ghost" onClick={onOpen} w="100%">
        Edit
      </Button>
      <Modal
        size="md"
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay mt={0} />
        <ModalContent bg="black">
          <ModalBody mt={3}>
            <Box mb={3}>
              <Heading fontSize="lg">Edit List</Heading>
            </Box>
            <form onSubmit={() => handleSubmit()}>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              <HStack spacing={3} justify="flex-end" mt={3}>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                  colorScheme="green"
                  type="button"
                  onClick={() => handleSubmit()}
                >
                  Save
                </Button>
              </HStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
