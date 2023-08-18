import React from 'react';
import moment from 'moment';
import { Emoji } from 'emoji-picker-react';
import {
  useDisclosure,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  HStack,
} from '@chakra-ui/react';
import { DragHandleIcon } from '@chakra-ui/icons';
import { GoKebabHorizontal } from 'react-icons/go';
import { ICard } from '@/interfaces/card';
import CardModal from '../CardModal/CardModal';

interface Props {
  item: ICard;
}

const MindmapCard = ({ item }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dateObject = new Date(item.updateTime);
  const year = dateObject.getUTCFullYear();
  const month = String(dateObject.getUTCMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getUTCDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const handleEdit = () => {
    onOpen();
  };
  const handleDuplicate = () => {};
  const handleDelete = () => {};
  return (
    <Card
      variant="outline"
      w="225px"
      h="270px"
      _hover={{
        background: '#f4f4f5',
        cursor: 'pointer',
      }}
      _active={{
        background: '#e5e5e8',
      }}
      onClick={() => {
        window.location.href = '/mindmap';
      }}
    >
      <CardHeader>
        <HStack justify="space-between">
          <IconButton
            variant="unstyled"
            aria-label="Drag card"
            icon={<DragHandleIcon />}
            color="gray.800"
            size="sm"
            style={{ transform: 'rotate(90deg)' }}
          ></IconButton>
          <Menu isLazy autoSelect={false}>
            <MenuButton
              variant="outline"
              as={IconButton}
              aria-label="Options"
              icon={<GoKebabHorizontal />}
              color="gray.800"
              size="sm"
              style={{ transform: 'rotate(90deg)' }}
            />
            <MenuList>
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDuplicate}>Duplicate</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </CardHeader>
      <CardBody gap="4" className="flex flex-col justify-center items-center">
        <Emoji unified={item.iconCode} size={36}></Emoji>
        <Text fontSize="md" align="center">
          {item.name}
        </Text>
      </CardBody>
      <CardFooter className="justify-center items-center">
        <Text fontSize="xs" color="gray.500" align="center">
          {formattedDate}
        </Text>
      </CardFooter>
      {/* <CardModal
        title="Edit the mindmap"
        isOpen={isOpen}
        onClose={onClose}
        // id={item.id}
        name={item.name}
        icon={item.iconCode}
      /> */}
    </Card>
  );
};

export default MindmapCard;
