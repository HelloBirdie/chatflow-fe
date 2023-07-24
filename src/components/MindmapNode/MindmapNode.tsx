import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDroppable } from '@dnd-kit/core';
import { Handle, Position } from 'reactflow';
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
import { useDisclosure } from '@chakra-ui/react';
import { IoIosMore } from 'react-icons/io';
import { MdOutlineReadMore } from 'react-icons/md';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import {
  BsChatSquareDots,
  BsPalette,
  BsTags,
  BsSticky,
  BsTrash,
} from 'react-icons/bs';
import { GoTriangleUp } from 'react-icons/go';

const NodeContainer = styled.div`
  border: 0px;
  padding: 10px;
  padding-top: 5px;
  border-radius: 8px;
  font-size: 10px;
  max-width: 320px;
  min-width: 120px;
  box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.1);
  background-color: white;
  transition: all 0.2s ease-in-out;
  box-sizing: content-box;
  border: 1px solid transparent;

  :hover {
    box-shadow: 0px 3px 12px 0px rgba(50, 50, 50, 0.1);
  }

  &.mindmap-node-selected {
    border: 1px solid #0042d9;
  }

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
        min-width: 1.8rem;
        min-height: 1rem;
        height: 1.8rem;
        padding: 5px;
        margin: 0;
        border-radius: 0;
        :hover {
          background-color: #f4f4f5;
        }
        :active {
          background-color: #e5e5e8;
        }
      }
    }
  }

  .message {
    padding: 5px;
    border-radius: 5px;
    border: #e5e5e8 1px solid;
    background-color: #fafafa;
    display: flex;
    transition: all 0.2s ease-in-out;

    &.show-expand-icon {
      position: relative;
      padding-bottom: 15px;
    }

    .message-icon {
      margin-right: 5px;
      margin-top: 1px;
    }

    .message-text {
      transition: all 0.2s ease-in-out;
      height: auto;
    }

    .expand-icon {
      position: absolute;
      bottom: 3px;
      right: 5px;
      cursor: pointer;
    }

    &.expanded {
      .message-text {
        -webkit-box-orient: vertical;
        display: -webkit-box;
        -webkit-line-clamp: 6;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
      }

      .expand-icon {
        transform: rotate(180deg);
      }
    }

    &.user-message {
      margin-bottom: 10px;
    }
  }

  .handle {
    background-color: #e5e5e8;
    width: 8px;
    height: 8px;
    border: 2px #7b9bfe solid;
    background-color: #f0f1f6;

    &.left {
      left: -4px;
    }

    &.right {
      right: -4px;
    }
  }
`;

interface MindmapNodeProps {
  id: string;
  data: {
    conversationPairId: number;
    userMessage: string;
    aiMessage: string;
    isParent: boolean;
  };
  selected: boolean;
}

const MindmapNode = ({ id, data, selected }: MindmapNodeProps) => {
  const [showUserMessageExpandIcon, setShowUserMessageExpandIcon] =
    useState(false);
  const [showAiMessageExpandIcon, setShowAiMessageExpandIcon] = useState(false);
  const [userMessageExpanded, setUserMessageExpanded] = useState(false);
  const [aiMessageExpanded, setAiMessageExpanded] = useState(false);
  const userMessageRef = useRef(null);
  const aiMessageRef = useRef(null);
  const [showOperationsBar, setShowOperationsBar] = useState(false);
  const { isOver, setNodeRef } = useDroppable({
    id: 'mindmap-node-' + data.conversationPairId,
    data: { data },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  //TODO: remove this
  const nodeRef = useRef(null);

  // useEffect(() => {
  //   if (nodeRef.current) {
  //     const { clientWidth, clientHeight } = nodeRef.current;
  //     console.log(clientWidth, clientHeight);
  //   }
  // }, []);

  const handleOperationsBarOpen = () => {
    setShowOperationsBar(true);
    onOpen();
  };

  const handleOperationsBarClose = () => {
    setShowOperationsBar(false);
    onClose();
  };

  useEffect(() => {
    if (userMessageRef.current && aiMessageRef.current) {
      const { clientHeight: userClientHeight } = userMessageRef.current;
      const { clientHeight: aiClientHeight } = aiMessageRef.current;

      console.log(userClientHeight, aiClientHeight);
      if (userClientHeight > 110) {
        setShowUserMessageExpandIcon(true);
      }
      if (aiClientHeight > 110) {
        setShowAiMessageExpandIcon(true);
      }
    }
  }, []);

  return (
    <NodeContainer
      ref={setNodeRef}
      className={selected ? 'mindmap-node-selected' : ''}
    >
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
              className="relative bottom-9"
              width={'auto'}
              overflow={'hidden'}
              border={'none'}
              boxShadow="md"
            >
              <PopoverBody p="0">
                <HStack className="h-auto operation-buttons-bar text-gray-800">
                  <Tooltip label="Choose color" placement="top">
                    <IconButton
                      aria-label="choose color"
                      icon={<BsPalette />}
                      variant="ghost"
                    />
                  </Tooltip>
                  <Tooltip label="Add tags" placement="top">
                    <IconButton
                      aria-label="add tag"
                      icon={<BsTags />}
                      variant="ghost"
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
      <div ref={nodeRef}>
        <div
          className={`message user-message ${
            showUserMessageExpandIcon ? 'show-expand-icon' : ''
          } ${userMessageExpanded ? 'expanded' : ''}`}
          ref={userMessageRef}
        >
          <Icon
            className="message-icon"
            as={AiOutlineQuestionCircle}
            w={3}
            h={3}
            color="#0042D9"
          />

          <p className="message-text">{data.userMessage}</p>
          {showUserMessageExpandIcon && (
            <Icon
              className={
                'expand-icon' + (userMessageExpanded ? ' expanded' : '')
              }
              as={GoTriangleUp}
              w={3}
              h={3}
              color="#a0a0a0"
              onClick={() => {
                setUserMessageExpanded(!userMessageExpanded);
              }}
            />
          )}
        </div>
        <div
          className={`message ai-message ${
            showAiMessageExpandIcon ? 'show-expand-icon' : ''
          } ${aiMessageExpanded ? 'expanded' : ''}`}
          ref={aiMessageRef}
        >
          <Icon
            className="message-icon"
            as={BsChatSquareDots}
            w={3}
            h={3}
            color="#2BA245"
          />

          <p className="message-text">{data.aiMessage}</p>

          {showAiMessageExpandIcon && (
            <Icon
              className={'expand-icon' + (aiMessageExpanded ? ' expanded' : '')}
              as={GoTriangleUp}
              w={3}
              h={3}
              color="#a0a0a0"
              onClick={() => {
                setAiMessageExpanded(!aiMessageExpanded);
              }}
            />
          )}
        </div>
        <Handle
          type="target"
          position={Position.Left}
          className="handle left"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="handle right"
        />
      </div>
    </NodeContainer>
  );
};

export default MindmapNode;
