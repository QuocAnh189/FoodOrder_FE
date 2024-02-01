'use client';
import { useRef } from 'react';

//chakra-ui
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button
} from '@chakra-ui/react';

interface Props {
  isOpen: any;
  onClose: any;
  handleUpdateCategory: () => void;
  editedCategory: string;
  setEditedCategory: (value: string) => void;
}

const ModalUpdate = (props: Props) => {
  const {
    isOpen,
    onClose,
    handleUpdateCategory,
    editedCategory,
    setEditedCategory
  } = props;

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>First name</FormLabel>
            <Input
              value={editedCategory}
              onChange={e => setEditedCategory(e.target.value)}
              ref={initialRef}
              placeholder="First name"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleUpdateCategory} colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalUpdate;
