import React from 'react';
import { Widget } from 'react-chat-widget';

const ChatBox = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '60px',
        right: '20px',
        width: '400px',
        height: '70vh',
        backgroundColor: 'white',
        border: '1px solid black',
        zIndex: 1000,
      }}
    >
      <Widget />
    </div>
  );
};

export default ChatBox;
