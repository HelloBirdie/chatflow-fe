import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, PopoverArrow, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import {
  Icon,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  HStack,
  Tooltip,
} from '@chakra-ui/react';
import { IoIosMore } from 'react-icons/io';
import { MdOutlineReadMore } from 'react-icons/md';
import { BsPalette, BsTags, BsSticky, BsTrash } from 'react-icons/bs';

const NodeOperationBarContainer = styled.div`
  .node-operation-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    font-size: 12px;
    color: #a0a0a0;
    height: 15px;
    line-height: 15px;

    .operations,
    .find-in-chat {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      :hover {
        color: #0042d9;
      }
      &.active {
        color: #0042d9;
      }
    }

    .operation-buttons-bar {
      button {
        font-size: 12px;
        transition: all 0.1s ease-in-out;
        min-width: 1.5rem;
        min-height: 1rem;
        height: 1.5rem;
        padding: 5px;
        margin: 0;
        border-radius: 0;
        svg {
          stroke-width: 0.2;
        }
        :hover {
          background-color: #f4f4f5;
        }
        :active {
          background-color: #e5e5e8;
        }
      }
    }
  }
`;

const MindmapNodeOpBar = ({ setTagReadMode }: { setTagReadMode: Function }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showOperationsBar, setShowOperationsBar] = useState(false);
  const handleOperationsBarOpen = () => {
    setShowOperationsBar(true);
    onOpen();
  };

  const handleOperationsBarClose = () => {
    setShowOperationsBar(false);
    onClose();
  };

  const handleAddTags = () => {
    setTagReadMode(false);
  };

  return (
    <NodeOperationBarContainer>
      <div className="node-operation-bar">
        <div>
          <Popover
            placement="top-start"
            isOpen={isOpen}
            onOpen={handleOperationsBarOpen}
            onClose={handleOperationsBarClose}
          >
            <PopoverTrigger>
              <Icon
                className={
                  showOperationsBar ? 'operations active' : 'operations'
                }
                as={IoIosMore}
                w={4}
                h={4}
              />
            </PopoverTrigger>
            <PopoverContent
              className="relative bottom-8"
              width={'auto'}
              overflow={'hidden'}
              border={'none'}
              boxShadow="md"
            >
              <PopoverBody p="0">
                <HStack className="h-auto operation-buttons-bar text-gray-700">
                  
                      <IconButton
                        aria-label="choose color"
                        icon={<BsPalette />}
                        variant="ghost"
                      />
                   
                        <SimpleGrid
                          minChildWidth="60px"
                          spacing="5px"
                          style={{ position: 'absolute' }}
                        >
                          <Box bg="tomato" height="10px"></Box>
                          <Box bg="tomato" height="10px"></Box>
                          <Box bg="tomato" height="10px"></Box>
                          <Box bg="tomato" height="10px"></Box>
                          <Box bg="tomato" height="10px"></Box>
                          <Box bg="tomato" height="10px"></Box>
                          <Box bg="tomato" height="10px"></Box>
                          <Box bg="tomato" height="10px"></Box>
                        </SimpleGrid>
                
                  <Tooltip label="Add tags" placement="top">
                    <IconButton
                      aria-label="add tag"
                      icon={<BsTags />}
                      variant="ghost"
                      onClick={handleAddTags}
                    />
                  </Tooltip>
                  <Tooltip label="Add notes" placement="top">
                    <IconButton
                      aria-label="add note"
                      icon={<BsSticky />}
                      variant="ghost"
                    />
                  </Tooltip>
                  <Tooltip label="Delete" placement="top">
                    <IconButton
                      aria-label="delete node"
                      icon={<BsTrash />}
                      variant="ghost"
                    />
                  </Tooltip>
                </HStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Icon className="find-in-chat" as={MdOutlineReadMore} w={4} h={4} />
        </div>
      </div>
    </NodeOperationBarContainer>
  );
};

export default MindmapNodeOpBar;
