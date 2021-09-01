import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { supabase } from "../../client";

export default function DeleteMovieListModal({ list, fetchLists }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function deleteList() {
    console.log(list.id);
    const deleteData = await deleteRelation();
    console.log(deleteData);
    const { data, error } = await supabase
      .from("movie_recs")
      .delete()
      .eq("id", list.id);

    if (error) {
      console.log(error);
    }
    console.log(data);
    fetchLists();
    onClose();
  }

  async function deleteRelation() {
    const { data, error } = await supabase
      .from("movielist")
      .delete()
      .in("movie_recs_id", [list.id]);

    if (error) {
      console.log("delete relationship: ", error);
    }
    return data;
  }
  return (
    <Box w="100%">
      <Button
        leftIcon={<DeleteIcon />}
        variant="ghost"
        onClick={onOpen}
        w="100%"
      >
        Delete
      </Button>
      <Modal
        size="md"
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay mt={0} />
        <ModalContent bg="black">
          {/* <ModalCloseButton /> */}
          <ModalBody mt={3}>
            <Box>Are you sure you want to delete this list?</Box>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={3}>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="green" onClick={() => deleteList()}>
                Delete
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
