import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Box,
  PopoverArrow,
  PopoverFooter,
  SimpleGrid,
  Wrap,
  useDisclosure,
} from '@chakra-ui/react';
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

    .popover-content {
      bottom: 33px;
      &.bottom-with-color {
        bottom: 85px;
      }
    }

    .color-panel {
      display: none;
      &.active {
        display: block;
      }
    }

    .color-box {
      border: 0.3px solid #d8d8d8;
      border-radius: 50%;
      cursor: pointer;
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
        &.active {
          background-color: #e5e5e8;
        }
      }
    }
  }
`;

interface IPalette {
  id: string;
  color: string;
  selected: boolean;
}

interface Props {
  nodePalette: IPalette[];
  updateColor: Function;
  setTagReadMode: Function;
}

const MindmapNodeOpBar = ({
  nodePalette,
  updateColor,
  setTagReadMode,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showOperationsBar, setShowOperationsBar] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const handleOperationsBarOpen = () => {
    setShowOperationsBar(true);
    onOpen();
  };

  const handleOperationsBarClose = () => {
    setShowOperationsBar(false);
    setShowColor(false);
    onClose();
  };

  const handleSelectColor = () => {
    setShowColor((preShowColor) => !preShowColor);
  };

  const handleUpdateColor = (id: string) => {
    updateColor(id);
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
              className={
                showColor
                  ? 'popover-content bottom-with-color'
                  : 'popover-content'
              }
              width={'auto'}
              overflow={'hidden'}
              border={'none'}
              boxShadow="md"
            >
              <PopoverBody
                p="0.5rem"
                className={showColor ? 'color-panel active' : 'color-panel'}
              >
                <SimpleGrid spacing="8px" columns={4}>
                  {nodePalette.map((colorBox) => {
                    return (
                      <Box
                        key={colorBox.id}
                        bg={colorBox.color}
                        height="14px"
                        width="14px"
                        onClick={() => handleUpdateColor(colorBox.id)}
                        className="color-box"
                        style={{
                          boxShadow: colorBox.selected
                            ? '0px 0px 1.5px 2px #e5e5e8'
                            : 'none',
                        }}
                      ></Box>
                    );
                  })}
                </SimpleGrid>
              </PopoverBody>
              <PopoverFooter p="0">
                <HStack className="h-auto operation-buttons-bar text-gray-700">
                  <Tooltip label="Select color" placement="top">
                    <IconButton
                      aria-label="select color"
                      icon={<BsPalette />}
                      variant="ghost"
                      className={showColor ? 'active' : ''}
                      onClick={handleSelectColor}
                    />
                  </Tooltip>
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
              </PopoverFooter>
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
