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

export default function DeleteShowFromListModal({
  list,
  show,
  fetchLists,
}: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function deleteShow() {
    const deleteData = await deleteRelation();
    const { data, error } = await supabase
      .from("media")
      .delete()
      .match({ id: show.id });

    if (error) {
      console.log(error);
    }
    console.log(data);

    onClose();
  }

  async function deleteRelation() {
    const { data, error } = await supabase
      .from("showlist")
      .delete()
      .in("media_id", [show.id]);

    if (error) {
      console.log("delete relationship: ", error);
    }
    return data;
  }
  return (
    <Box>
      <Button
        leftIcon={<DeleteIcon />}
        variant="outline"
        onClick={onOpen}
        colorScheme="red"
        w="100%"
      >
        Delete from list
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
            <Box>
              Are you sure you want to delete this show from {list.title}?
            </Box>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={3}>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="green" onClick={() => deleteShow()}>
                Delete
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
