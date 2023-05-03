import React, { useRef, useState } from 'react';
import {
  Flex,
  Textarea,
  InputGroup,
  IconButton,
  Icon,
  Spacer,
} from '@chakra-ui/react';

import ResizeTextarea from 'react-textarea-autosize';

import { FiSend } from 'react-icons/fi';

const ChatMessageInput = () => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleMessageChange = (event: any) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    // Add your logic to send the message here
    console.log('Message sent:', message);
    setMessage('');
  };

  return (
    <Flex padding="3" pr="2">
      <InputGroup display={'flex'} alignItems={'end'}>
        <Textarea
          minH="unset"
          mr={1}
          ref={textareaRef}
          maxRows={8}
          bg={'gray.100'}
          variant={'none'}
          resize={'none'}
          placeholder="Type your message here..."
          value={message}
          onChange={handleMessageChange}
          as={ResizeTextarea}
        />
        <IconButton
          bg={'transparent'}
          size={'md'}
          icon={<Icon as={FiSend} />}
          onClick={handleSendMessage}
          aria-label="Send message"
        />
      </InputGroup>
    </Flex>
  );
};

export default ChatMessageInput;
