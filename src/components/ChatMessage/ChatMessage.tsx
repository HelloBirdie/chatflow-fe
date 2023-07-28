import React from 'react';
import styled from 'styled-components';

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
}

const ChatMessage = (props: ChatMessageProps) => {
  const { content, isUser } = props;
  return (
    <MyContainer className={isUser ? 'user-message' : 'ai-message'}>
      <p className={isUser ? 'user-message' : 'ai-message'}>{content}</p>
    </MyContainer>
  );
};

export default ChatMessage;
