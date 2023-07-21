import React, { Fragment } from 'react';
import { useState } from 'react';
import moment from 'moment';
import { ICard } from '@/interfaces/card';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Input,
  Button,
  Center,
} from '@chakra-ui/react';
import EmojiPicker from 'emoji-picker-react';
import { Emoji } from 'emoji-picker-react';
import { nanoid } from '@reduxjs/toolkit';

interface Props {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  id?: string;
  name?: string;
  icon?: string;
}

const CardModal = ({
  title,
  isOpen,
  onClose,
  id = nanoid(),
  name = 'My mindmap',
  icon = '1f4a1',
}: Props) => {
  const initialRef = React.useRef(null);
  const [formData, setFormData] = useState<ICard>({
    id: id,
    name: name,
    icon: icon,
    date: moment().unix(),
  });

  const isError = formData.name === '';

  const onEmojiClick = (emojiObject: any) => {
    setFormData((prevData) => ({ ...prevData, icon: emojiObject.unified }));
  };

  const handleFocus = (e: any) => {
    e.target.select();
  };

  const handleInputChange = (e: any) =>
    setFormData((prevData) => ({ ...prevData, name: e.target.value }));

  const handleClose = () => {
    setFormData((prevData) => ({
      ...prevData,
      name: name,
      icon: icon,
    }));
    onClose();
  };

  return (
    // <Popover isLazy>
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      closeOnOverlayClick={false}
      initialFocusRef={initialRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Icon</FormLabel>
            <Popover isLazy>
              <PopoverTrigger>
                <Center
                  w="48px"
                  h="48px"
                  _hover={{
                    bg: '#F4F4F5',
                    cursor: 'pointer',
                    borderRadius: '0.375rem',
                  }}
                >
                  <Emoji unified={formData.icon} size={36}></Emoji>
                </Center>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBody>
                  <EmojiPicker
                    width="100%"
                    height="350px"
                    lazyLoadEmojis={true}
                    previewConfig={{ showPreview: false }}
                    onEmojiClick={onEmojiClick}
                    emojiVersion="1.0"
                  />
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </FormControl>

          <FormControl mt={4} isInvalid={isError}>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Mindmap name"
              focusBorderColor="#0042D9"
              value={formData.name}
              ref={initialRef}
              onFocus={handleFocus}
              onChange={handleInputChange}
            />
            {isError && <FormErrorMessage>Name is required.</FormErrorMessage>}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            mr={3}
            color="#FFFFFF"
            backgroundColor="#0042D9"
            _hover={{ bg: '#0036B4', cursor: 'pointer' }}
            _active={{ bg: '#002782' }}
          >
            Save
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    // </Popover>
  );
};

export default CardModal;
