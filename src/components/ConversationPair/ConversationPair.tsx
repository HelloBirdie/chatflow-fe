import React from 'react';
import ChatMessage from '../ChatMessage/ChatMessage';
import { IConversationPair } from '@/interfaces/conversationPair';
import { useDraggable } from '@dnd-kit/core';
import styled from 'styled-components';
import DragGrip from '../DragGrip/DragGrip';

const CustomContainer = styled.div`
  position: relative;
  padding: 10px 10px;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  cursor: default;

  :hover {
    background-color: #d8d8d8;
  }

  .drag-grip-wrapper {
    cursor: grab;
    position: absolute;
    top: 5px;
    padding: 5px 3px;
    border-radius: 3px;
    transition: all 0.2s ease-in-out;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    &.shown {
      opacity: 1;
    }

    :hover {
      .dot {
        background-color: #0042d9;
      }
    }
  }
  .message {
    margin: 10px 0px;
  }
`;

interface IConversationPairProps {
  conversationPair: IConversationPair;
}

const ConversationPair = (props: IConversationPairProps) => {
  const { conversationPair } = props;
  const { userMessage, aiMessage } = conversationPair;
  const [isConversationHovered, setIsConversationHovered] =
    React.useState<boolean>(false);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: conversationPair.id,
    data: { conversationPair },
  });
  const style = transform
    ? {
        // transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: 0.5,
        backgroundColor: '#D8D8D8',
      }
    : undefined;

  return (
    <CustomContainer
      onMouseEnter={() => {
        setIsConversationHovered(true);
      }}
      onMouseLeave={() => {
        setIsConversationHovered(false);
      }}
      ref={setNodeRef}
      style={style}
    >
      <div
        className={`drag-grip-wrapper ${isConversationHovered ? 'shown' : ''}`}
        {...listeners}
        {...attributes}
      >
        <DragGrip />
      </div>
      <ChatMessage content={userMessage.content} isUser={true} />
      <ChatMessage content={aiMessage.content} isUser={false} />
    </CustomContainer>
  );
};

export default ConversationPair;
