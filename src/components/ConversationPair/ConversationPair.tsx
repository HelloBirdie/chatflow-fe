import React from 'react';
import ChatMessage from '../ChatMessage/ChatMessage';
import { IConversationPair } from '@/interfaces/conversationPair';
import styled from 'styled-components';
import DragGrip from '../DragGrip/DragGrip';

const CustomContainer = styled.div`
  position: relative;
  padding: 10px 10px;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;

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
      background-color: #d4d4d4;
    }
  }
  .message {
    margin: 10px 0px;

    &.user-message {
      background-color: green;
      display: flex;
      width: 100%;
      justify-content: flex-end;
      padding: 0;
    }
  }

  :hover {
    background-color: #f3f3f3;
  }
`;

interface IConversationPairProps {
  conversationPair: IConversationPair;
}

const ConversationPair = (props: IConversationPairProps) => {
  const { conversationPair } = props;
  const { userMessage, aiMessage } = conversationPair;
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  return (
    <CustomContainer
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <div className={`drag-grip-wrapper ${isHovered ? 'shown' : ''}`}>
        <DragGrip />
      </div>
      <ChatMessage content={userMessage.content} isUser={true} />
      <ChatMessage content={aiMessage.content} isUser={false} />
    </CustomContainer>
  );
};

export default ConversationPair;
