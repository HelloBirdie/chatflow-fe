import React from 'react';
import styled from 'styled-components';
import ConversationPair from '../ConversationPair/ConversationPair';
import { IConversationPair } from '@/interfaces/conversationPair';

const Wrapper = styled.div`
  position: absolute;
  z-index: 2000;
  border: 1px solid black;
  border-radius: 8px;
  padding: 10px;
`;

interface ICustomDragOverlayProps {
  conversationPair: IConversationPair | null;
}

const CustomDragOverlay = ({ conversationPair }: ICustomDragOverlayProps) => {
  if (!conversationPair) {
    return null;
  }

  const { userMessage, aiMessage } = conversationPair;
  const userMessageContent = userMessage.content;
  const aiMessageContent = aiMessage.content;
  return (
    <Wrapper>
      <div>Question: {userMessageContent}</div>
      <div>Answer: {aiMessageContent}</div>
    </Wrapper>
  );
};

export default CustomDragOverlay;
