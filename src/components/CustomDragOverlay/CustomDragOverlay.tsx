import React from 'react';
import styled from 'styled-components';
import ConversationPair from '../ConversationPair/ConversationPair';
import { IConversationPair } from '@/interfaces/conversationPair';
import { Card, CardBody, VStack, HStack, Icon } from '@chakra-ui/react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { BsChatSquareDots } from 'react-icons/bs';

const CardContainer = styled.div`
  position: absolute;
  opacity: 0.8;
  z-index: 2000;
  rotate: -5deg;

  .card {
    padding: 10px;
  }

  .not-in-chatbox {
    cursor: copy;
  }

  .message-skeleton {
    width: 120px;
    padding: 5px;
    border-radius: 5px;
    background-color: #fafafa;
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
    <CardContainer>
      <Card className={inChatBox ? 'card' : 'card not-in-chatbox'}>
        <VStack>
          <HStack className="message-skeleton">
            <Icon
              className="message-icon"
              as={AiOutlineQuestionCircle}
              w={3}
              h={3}
              color="#0042D9"
            />
          </HStack>
          <HStack className="message-skeleton">
            <Icon
              className="message-icon"
              as={BsChatSquareDots}
              w={3}
              h={3}
              color="#2BA245"
            />
          </HStack>
        </VStack>
        {/* <div>Question: {userMessageContent}</div>
          <div>Answer: {aiMessageContent}</div>
          {!inChatBox ? <div>Add to mindmap</div> : null} */}
      </Card>
    </CardContainer>
  );
};

export default CustomDragOverlay;
