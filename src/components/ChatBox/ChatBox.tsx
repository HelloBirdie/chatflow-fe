import React, { useState } from 'react';
import styled from 'styled-components';

import 'react-chat-widget/lib/styles.css';

const ChatBoxToggleButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid black;
  z-index: 1000;
  cursor: pointer;

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
  border: 1px solid black;
  z-index: 1000;

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
      <ChatBoxContainer className={showChat ? 'active' : ''}></ChatBoxContainer>
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
