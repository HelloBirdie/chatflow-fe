import React from 'react';
import ChatMessage from '../ChatMessage/ChatMessage';
import { IConversationPair } from '@/interfaces/conversationPair';
import styled from 'styled-components';

const CustomContainer = styled.div`
  position: relative;
  padding: 10px 10px;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
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
  return (
    <CustomContainer>
      <ChatMessage content={userMessage.content} isUser={true} />
      <ChatMessage content={aiMessage.content} isUser={false} />
    </CustomContainer>
  );
};

export default ConversationPair;
