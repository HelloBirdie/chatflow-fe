import React from 'react';
import styled from 'styled-components';
import { Spinner } from '@chakra-ui/react';

const MyContainer = styled.div`
  width: 100%;
  display: flex;

  &.user-message {
    justify-content: flex-end;
    margin-bottom: 10px;
  }

  p {
    flex-shrink: 0;
    width: fit-content;
    max-width: 80%;
    padding: 10px 15px;
    border-radius: 8px;

    &.user-message {
      background-color: #0042d9;
      color: white;
    }

    &.ai-message {
      background-color: #f1f0f1;
    }
  }
`;

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  messageId: number;
}

const ChatMessage = (props: ChatMessageProps) => {
  const { content, isUser, messageId } = props;
  return (
    <MyContainer className={isUser ? 'user-message' : 'ai-message'}>
      {(isUser || messageId !== -1) && (
        <p className={isUser ? 'user-message' : 'ai-message'}>{content}</p>
      )}
      {!isUser && messageId === -1 && (
        <p className={isUser ? 'user-message' : 'ai-message'}>
          <span className="flex align-middle">
            <Spinner color="blue.100" />
          </span>
        </p>
      )}
    </MyContainer>
  );
};

export default ChatMessage;
