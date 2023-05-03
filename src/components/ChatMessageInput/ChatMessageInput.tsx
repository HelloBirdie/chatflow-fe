import React, { useRef, useState } from 'react';
import { Flex, Textarea, InputGroup, IconButton, Icon } from '@chakra-ui/react';

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
          minRows={1}
          bg={'gray.100'}
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
        />
      </InputGroup>
    </Flex>
  );
};

export default ChatMessageInput;
