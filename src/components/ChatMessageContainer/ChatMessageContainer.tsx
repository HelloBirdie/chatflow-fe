import React, { useContext, useEffect, useRef } from 'react';
import { Container } from '@chakra-ui/react';
import ChatMessage from '../ChatMessage/ChatMessage';
import { mockMessages } from './mockMessages';
import ConversationPair from '../ConversationPair/ConversationPair';
import { IConversationPair } from '@/interfaces/conversationPair';
import ChatBoxContext from '../ChatBox/ChatBoxContext';

const ChatMessageContainer = () => {
  const { conversationPairs, setConversationPairs } =
    useContext(ChatBoxContext);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // scroll to bottom of the container
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationPairs]);

  // React.useEffect(() => {
  //   // fetch the conversation pairs
  //   const conversationPairs: IConversationPair[] = mockMessages;
  //   setConversationPairs(conversationPairs);
  // }, []);

  return (
    <Container
      height={'100%'}
      overflow={'scroll'}
      paddingTop={'10px'}
      paddingBottom={'20px'}
    >
      {conversationPairs.map((conversationPair: IConversationPair) => {
        return (
          <ConversationPair
            key={conversationPair.id}
            conversationPair={conversationPair}
          />
        );
      })}
      <div ref={messagesEndRef} />
    </Container>
  );
};

export default ChatMessageContainer;
