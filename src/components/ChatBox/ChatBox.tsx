import React, { useState } from 'react';
import styled from 'styled-components';

import 'react-chat-widget/lib/styles.css';
import ChatMessageContainer from '../ChatMessageContainer/ChatMessageContainer';
import ChatMessageInput from '../ChatMessageInput/ChatMessageInput';

const ChatBoxToggleButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  z-index: 1000;
  cursor: pointer;

  border: 0px;

  // add the surrounding shadow
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.213);

  transition: 0.2s;

  // if chatbox is shown, smaller button
  &.active {
    width: 60px;
    height: 60px;
  }
`;

const ChatBoxContainer = styled.div`
  position: absolute;
  bottom: 90px;
  right: 20px;
  width: 400px;
  height: 80vh;
  background-color: white;
  z-index: 1000;
  border-radius: 12px;

  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.213);

  transition: 0.2s;

  &.active {
    width: 0px;
    height: 0px;
    opacity: 0;
  }
`;

const ChatBox = () => {
  const [showChat, setShowChat] = useState(false);
  return (
    <div>
      <ChatBoxContainer className={showChat ? 'active' : ''}>
        <ChatMessageContainer />
        <ChatMessageInput />
      </ChatBoxContainer>
      <ChatBoxToggleButton
        onClick={() => setShowChat(!showChat)}
        className={showChat ? 'active' : ''}
      >
        💬
      </ChatBoxToggleButton>
    </div>
  );
};

export default ChatBox;
