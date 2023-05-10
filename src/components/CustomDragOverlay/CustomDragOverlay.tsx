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

  &.not-in-chatbox {
    border: 3px solid red;
  }
`;

interface ICustomDragOverlayProps {
  conversationPair: IConversationPair | null;
  inChatBox: boolean;
}

const CustomDragOverlay = ({
  conversationPair,
  inChatBox,
}: ICustomDragOverlayProps) => {
  if (!conversationPair) {
    return null;
  }

  const { userMessage, aiMessage } = conversationPair;
  const userMessageContent = userMessage.content;
  const aiMessageContent = aiMessage.content;
  return (
    <Wrapper className={inChatBox ? '' : 'not-in-chatbox'}>
      <div>Question: {userMessageContent}</div>
      <div>Answer: {aiMessageContent}</div>
      {!inChatBox ? <div>Add to mindmap</div> : null}
    </Wrapper>
  );
};

export default CustomDragOverlay;
