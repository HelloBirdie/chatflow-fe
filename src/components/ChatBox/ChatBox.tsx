import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';
import { HStack, Icon, IconButton } from '@chakra-ui/react';

import { RiChat3Line } from 'react-icons/ri';

import 'react-chat-widget/lib/styles.css';
import ChatMessageContainer from '../ChatMessageContainer/ChatMessageContainer';
import ChatMessageInput from '../ChatMessageInput/ChatMessageInput';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { AiOutlineExpand, AiOutlineMinus } from 'react-icons/ai';

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
  width: 400px;
  height: 80vh;
  opacity: 0;
  background-color: white;
  z-index: 1000;
  border-radius: 12px;
  overflow: hidden;

  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.16);

  /* transition: 0.2s; */

  transition: all 0.2s ease-in-out;
  transform-origin: right bottom;
  transform: scale3d(0, 0, 1);

  &.active {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
  .chat-header {
    justify-content: space-between;
    padding: 0 5px;
    button {
      color: #767676;
      font-size: 18px;
      :hover {
        background-color: white;
        color: #0042d9;
      }
      :active {
        background-color: white;
        color: #0042d9;
      }
    }
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
        <HStack className="chat-header">
          <IconButton
            aria-label="expand chat box"
            icon={<AiOutlineExpand />}
            variant="ghost"
          />
          <IconButton
            aria-label="close chat box"
            icon={<AiOutlineMinus />}
            variant="ghost"
            onClick={() => setShowChat(false)}
          />
        </HStack>
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
