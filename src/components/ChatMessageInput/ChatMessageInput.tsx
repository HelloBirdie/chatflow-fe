import React, { useRef, useState, useContext } from 'react';
import {
  Flex,
  Textarea,
  InputGroup,
  IconButton,
  Icon,
  useToast,
} from '@chakra-ui/react';

import ResizeTextarea from 'react-textarea-autosize';

import { FiSend } from 'react-icons/fi';

import { addMessage } from '@/services/messageService';

import ChatBoxContext from '../ChatBox/ChatBoxContext';

const ChatMessageInput = () => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const toast = useToast();
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  // get the context containing the conversation pairs
  const { conversationPairs, setConversationPairs } =
    useContext(ChatBoxContext);

  const handleMessageChange = (event: any) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    // Add your logic to send the message here
    if (!message) {
      return;
    }
    setIsWaitingForResponse(true);

    // add the message to the conversation pairs
    const newConversationPair = {
      id: -1,
      userMessage: {
        id: -1,
        content: message,
        sender: 'user',
        timestamp: new Date().toISOString(),
      },
      aiMessage: {
        id: -1,
        content: 'waiting ...',
        sender: 'ai',
        timestamp: new Date().toISOString(),
      },
    };

    setConversationPairs([...conversationPairs, newConversationPair]);

    console.log('Message sent:', message);

    const response: any = await addMessage({
      mindmapId: 5,
      isAiMessage: false,
      text: message,
    });
    if (response.data && response.status === 200) {
      console.log(response.data);
      const newConversationPair = {
        id: response.data.id,
        userMessage: {
          id: response.data.userMessage.id,
          content: response.data.userMessage.text,
          sender: 'user',
          timestamp: response.data.userMessage.createdTime,
        },
        aiMessage: {
          id: response.data.aiMessage.id,
          content: response.data.aiMessage.text,
          sender: 'ai',
          timestamp: response.data.aiMessage.createdTime,
        },
      };
      // pop the last conversation pair
      // get the last conversation pair
      const lastConversationPair =
        conversationPairs[conversationPairs.length - 1];
      if (lastConversationPair.id === -1) {
        conversationPairs.pop();
      }
      // add the new conversation pair
      setConversationPairs([...conversationPairs, newConversationPair]);

      setMessage('');
    } else {
      console.log('Error sending message');

      // alert toast
      toast({
        title: 'Error sending message',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
    setIsWaitingForResponse(false);
  };

  return (
    <Flex padding="3" pr="2">
      <InputGroup display={'flex'} alignItems={'end'}>
        <Textarea
          minH="unset"
          mr={1}
          ref={textareaRef}
          maxRows={8}
          minRows={1}
          bg="#f1f0f1"
          transition="height none"
          variant={'none'}
          resize={'none'}
          placeholder="Type your message here..."
          value={message}
          onChange={handleMessageChange}
          cacheMeasurements={true}
          as={ResizeTextarea}
        />
        <IconButton
          bg={'transparent'}
          size={'md'}
          icon={<Icon as={FiSend} />}
          onClick={handleSendMessage}
          aria-label="Send message"
          // _hover={{ bg: '#f1f0f1' }}
          isDisabled={!message}
          isLoading={isWaitingForResponse}
        />
      </InputGroup>
    </Flex>
  );
};

export default ChatMessageInput;
