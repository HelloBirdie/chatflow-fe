import React from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { Card, VStack, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import CardModal from '../CardModal/CardModal';

const CardButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Card
      variant="filled"
      w="225px"
      h="270px"
      color="white"
      backgroundColor="#0042D9"
      _hover={{ bg: '#0036B4', cursor: 'pointer' }}
      _active={{ bg: '#002782' }}
      onClick={onOpen}
    >
      <VStack gap="10" className="justify-center items-center flex-1">
        <AddIcon boxSize={6} />
        <Text fontSize="lg">Create a mindmap</Text>
      </VStack>
      <CardModal title="Create a mindmap" isOpen={isOpen} onClose={onClose} />
    </Card>
  );
};

export default CardButton;
