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
    transition: all 0.2s ease-in-out;
    opacity: 0;
    &.shown {
      opacity: 1;
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
    background-color: #ededed;
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
        <DragGrip position={{ top: '10px', left: '10px' }} />
      </div>
      <ChatMessage content={userMessage.content} isUser={true} />
      <ChatMessage content={aiMessage.content} isUser={false} />
    </CustomContainer>
  );
};

export default ConversationPair;
