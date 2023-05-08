import React from 'react';
import { Container } from '@chakra-ui/react';
import ChatMessage from '../ChatMessage/ChatMessage';
import { mockMessages } from './mockMessages';
import ConversationPair from '../ConversationPair/ConversationPair';
import { IConversationPair } from '@/interfaces/conversationPair';

const ChatMessageContainer = () => {
  const [conversationPairs, setConversationPairs] = React.useState<
    IConversationPair[] | []
  >([]);

  React.useEffect(() => {
    // fetch the conversation pairs
    const conversationPairs: IConversationPair[] = mockMessages;
    setConversationPairs(conversationPairs);
  }, []);

  return (
    <Container height={'100%'} overflow={'scroll'} paddingTop={'10px'}>
      {conversationPairs.map((conversationPair: IConversationPair) => {
        return (
          <ConversationPair
            key={conversationPair.id}
            conversationPair={conversationPair}
          />
        );
      })}
    </Container>
  );
};

export default ChatMessageContainer;
