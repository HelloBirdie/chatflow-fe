import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@chakra-ui/react';

import { RiChat3Line } from 'react-icons/ri';

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
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

  transition: all 0.2s ease-in-out;

  display: flex;
  justify-content: center;
  align-items: center;

  // if chatbox is shown, smaller button
  &.active {
    /* width: 60px;
    height: 60px; */
    transform: scale(1.15);
  }
`;

const ChatBoxContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 90px;
  right: 20px;
  width: 400px;
  height: 80vh;
  background-color: white;
  z-index: 1000;
  border-radius: 12px;
  overflow: hidden;

  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

  /* transition: 0.2s; */

  transition: all 0.2s ease-in-out;

  &.active {
    width: 0px;
    height: 0px;
    opacity: 0;
  }
`;

const ChatMessageInputContainer = styled.div`
  bottom: 0px;
  left: 0px;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.213);
`;

const ChatMessageContainerContainer = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
`;

const ChatBox = forwardRef((props: any, ref: any) => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div>
      <ChatBoxContainer className={showChat ? 'active' : ''} ref={ref}>
        <ChatMessageContainerContainer>
          <ChatMessageContainer />
        </ChatMessageContainerContainer>

        <ChatMessageInputContainer>
          <ChatMessageInput />
        </ChatMessageInputContainer>
      </ChatBoxContainer>
      <ChatBoxToggleButton
        onClick={() => setShowChat(!showChat)}
        className={showChat ? 'active' : ''}
      >
        <Icon as={RiChat3Line} w={6} h={6} />
      </ChatBoxToggleButton>
    </div>
  );
});

// add display name for debugging purposes
ChatBox.displayName = 'ChatBox';

export default ChatBox;
