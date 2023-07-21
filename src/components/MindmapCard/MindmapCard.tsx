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
  const dateTimeString = moment.unix(item.date).format('YYYY-MM-DD');

  const handleEdit = () => {
    onOpen();
  };
  const handleDuplicate = () => {};
  const handleDelete = () => {};
  return (
    <Card variant="outline" w="225px" h="270px">
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
        <Emoji unified={item.icon} size={36}></Emoji>
        <Text fontSize="md" align="center">
          {item.name}
        </Text>
      </CardBody>
      <CardFooter className="justify-center items-center">
        <Text fontSize="xs" color="gray.500" align="center">
          {dateTimeString}
        </Text>
      </CardFooter>
      <CardModal
        title="Edit the mindmap"
        isOpen={isOpen}
        onClose={onClose}
        id={item.id}
        name={item.name}
        icon={item.icon}
      />
    </Card>
  );
};

export default MindmapCard;
