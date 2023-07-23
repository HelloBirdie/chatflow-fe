import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@chakra-ui/react';

import { RiChat3Line } from 'react-icons/ri';

import 'react-chat-widget/lib/styles.css';
import ChatMessageContainer from '../ChatMessageContainer/ChatMessageContainer';
import ChatMessageInput from '../ChatMessageInput/ChatMessageInput';
import { ChevronDownIcon } from '@chakra-ui/icons';

const ChatBoxToggleButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #0042d9;
  color: white;
  z-index: 1000;
  cursor: pointer;

  border: 0px;

  // add the surrounding shadow
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    transition: all 0.2s ease-in-out;
    &.absolute {
      position: absolute;
    }
    &.show {
      opacity: 100;
      transform: scale(1);
      fill: white;
      &.arrow {
        rotate: 0deg;
      }
    }
    &.hide {
      opacity: 0;
      transform: scale(0);
      fill: transparent;
      &.arrow {
        rotate: -180deg;
      }
    }
  }
`;

const ChatBoxContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 90px;
  right: 20px;
  display: none;
  background-color: white;
  z-index: 1000;
  border-radius: 12px;
  overflow: hidden;

  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.16);

  /* transition: 0.2s; */

  transition: all 0.2s ease-in-out;

  &.active {
    display: flex;
    width: 400px;
    height: 80vh;
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
        className="duration-200 hover:scale-110 active:scale-95 ease-in-out"
      >
        {/* Chat icon shows when chatbox closes */}
        <Icon
          as={RiChat3Line}
          w={7}
          h={7}
          className={showChat ? 'hide' : 'show'}
        />
        {/* ArrowDown icon shows then chatbox shows */}
        <ChevronDownIcon
          w={7}
          h={7}
          className={`arrow absolute ${showChat ? 'show' : 'hide'}`}
        />
      </ChatBoxToggleButton>
    </div>
  );
});

// add display name for debugging purposes
ChatBox.displayName = 'ChatBox';

export default ChatBox;
