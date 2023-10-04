import React, { useRef, useState } from 'react';
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

const ChatMessageInput = () => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const toast = useToast();

  const handleMessageChange = (event: any) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    // Add your logic to send the message here
    if (!message) {
      return;
    }

    console.log('Message sent:', message);
    const response = await addMessage({
      mindmapId: 5,
      isAiMessage: false,
      text: message,
    });
    if (response && response.status === 200) {
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
        />
      </InputGroup>
    </Flex>
  );
};

export default ChatMessageInput;
