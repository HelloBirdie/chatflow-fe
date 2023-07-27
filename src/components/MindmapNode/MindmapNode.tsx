import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDroppable } from '@dnd-kit/core';
import { Handle, Position } from 'reactflow';
import { Icon, MenuButton } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { BsChatSquareDots } from 'react-icons/bs';
import { GoTriangleUp } from 'react-icons/go';
import MindmapNodeFooter from '../MindmapNodeFooter/MindmapNodeFooter';
import MindmapNodeOpBar from '../MindmapNodeOpBar/MindmapNodeOpBar';

const NodeContainer = styled.div`
  border: 0px;
  padding: 10px;
  padding-top: 5px;
  border-radius: 8px;
  font-size: 10px;
  max-width: 320px;
  min-width: 120px;
  box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.1);
  // background-color: white;
  transition: all 0.2s ease-in-out;
  box-sizing: content-box;
  border: 1px solid transparent;

  :hover {
    box-shadow: 0px 3px 12px 0px rgba(50, 50, 50, 0.1);
  }

  &.mindmap-node-selected {
    border: 1px solid #0042d9;
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

interface IPalette {
  id: string;
  color: string;
  selected: boolean;
}

const MindmapNode = ({ id, data, selected }: MindmapNodeProps) => {
  const [nodePalette, setNodePalette] = useState<IPalette[]>([
    { id: '#ffffff', color: '#ffffff', selected: true },
    { id: '#fcf1a6', color: '#fcf1a6', selected: false },
    { id: '#f6cac7', color: '#f6cac7', selected: false },
    { id: '#fae1f1', color: '#fae1f1', selected: false },
    { id: '#c7dbed', color: '#c7dbed', selected: false },
    { id: '#e6eafd', color: '#e6eafd', selected: false },
    { id: '#d3e1a0', color: '#d3e1a0', selected: false },
    { id: '#a1c698', color: '#a1c698', selected: false },
  ]);
  const [nodeBgColor, setNodeBgColor] = useState('#ffffff');
  const [showUserMessageExpandIcon, setShowUserMessageExpandIcon] =
    useState(false);
  const [showAiMessageExpandIcon, setShowAiMessageExpandIcon] = useState(false);
  const [userMessageExpanded, setUserMessageExpanded] = useState(false);
  const [aiMessageExpanded, setAiMessageExpanded] = useState(false);
  const userMessageRef = useRef(null);
  const aiMessageRef = useRef(null);
  const [isTagReadMode, setTagReadMode] = React.useState(true);
  const { isOver, setNodeRef } = useDroppable({
    id: 'mindmap-node-' + data.conversationPairId,
    data: { data },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  //TODO: remove this
  const nodeRef = useRef(null);

  const updateColor = (id: string) => {
    setNodePalette((prevPalette: IPalette[]) => {
      const newPalette = prevPalette.map((obj: IPalette) => {
        if (obj.id === id) {
          setNodeBgColor(obj.color);
          return { ...obj, selected: true };
        }
        return { ...obj, selected: false };
      });
      return newPalette;
    });
  };

  // useEffect(() => {
  //   if (nodeRef.current) {
  //     const { clientWidth, clientHeight } = nodeRef.current;
  //     console.log(clientWidth, clientHeight);
  //   }
  // }, []);

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
      style={{ backgroundColor: nodeBgColor }}
    >
      {/* Node Operations Bar */}
      <MindmapNodeOpBar
        nodePalette={nodePalette}
        updateColor={updateColor}
        setTagReadMode={setTagReadMode}
      />

      {/* Node Content */}
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

        {/* Node Footer */}
        <MindmapNodeFooter
          isTagReadMode={isTagReadMode}
          setTagReadMode={setTagReadMode}
        />
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
