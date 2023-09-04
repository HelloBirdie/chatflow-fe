import React, { useState } from 'react';
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { FaChevronLeft, FaUndo, FaRedo } from 'react-icons/fa';
import { Tooltip } from '@chakra-ui/react';
import { Emoji, EmojiClickData } from 'emoji-picker-react';
import EmojiPicker from 'emoji-picker-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverBody,
  Center,
} from '@chakra-ui/react';

const MindMapHeaderBar = () => {
  const [active, setActive] = useState(0);
  const handleClick = (buttonNum: any) => () => {
    setActive(buttonNum);
  };

  const [formData, setFormData] = useState('203c-fe0f');

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    setFormData(emojiObject.unified);
  };

  return (
    <div
      style={{
        width: '100vw',
        backgroundColor: 'white',
        border: '1px solid rgba(192,201,220,0.5)',
        alignItems: 'center',
        zIndex: 1001,
      }}
    >
      <HStack
        className="h-16 w-screen justify-between flex-1"
        style={{ maxWidth: '100vw' }}
      >
        <HStack style={{ paddingLeft: '1vw' }}>
          <Tooltip label="Previous page">
            <IconButton
              aria-label="Previous page"
              size="sm"
              icon={<FaChevronLeft />}
              onClick={() => {
                window.location.href = '/';
              }}
            />
          </Tooltip>
          <Tooltip label="Change icon">
            <div>
              <Popover isLazy>
                <PopoverTrigger>
                  <Center
                    w="35px"
                    h="35px"
                    _hover={{
                      bg: '#F4F4F5',
                      cursor: 'pointer',
                      borderRadius: '0.375rem',
                    }}
                  >
                    <Emoji unified={formData} size={30}></Emoji>
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
            </div>
          </Tooltip>
          <Tooltip label="Rename">
            <Editable defaultValue="Java Quiz" fontSize="md">
              <EditablePreview />
              <EditableInput />
            </Editable>
          </Tooltip>
          <Tooltip label="Undo">
            <IconButton aria-label="Undo" size="sm" icon={<FaUndo />} />
          </Tooltip>
          <Tooltip label="Redo">
            <IconButton aria-label="Redo" size="sm" icon={<FaRedo />} />
          </Tooltip>
        </HStack>
        <ButtonGroup spacing={2} style={{ paddingRight: '1vw' }}>
          <Button
            onClick={handleClick(1)}
            variant={active == 1 ? 'outline' : 'ghost'}
            border={active == 1 ? '1px' : '0px'}
          >
            Flow
          </Button>
          <Button
            onClick={handleClick(2)}
            variant={active == 2 ? 'outline' : 'ghost'}
            border={active == 2 ? '1px' : '0px'}
          >
            Themes
          </Button>
          <Button
            onClick={handleClick(3)}
            variant={active == 3 ? 'outline' : 'ghost'}
            border={active == 3 ? '1px' : '0px'}
          >
            Settings
          </Button>
          <Button
            variant={'solid'}
            bg="#0042D9"
            color={'white'}
            _hover={{ bg: '#0036B4', cursor: 'pointer' }}
          >
            Publish
          </Button>
        </ButtonGroup>
      </HStack>
    </div>
  );
};

export default MindMapHeaderBar;
