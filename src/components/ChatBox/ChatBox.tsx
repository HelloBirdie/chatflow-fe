import React, { useState } from 'react';
import { Widget } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

const ChatBox = () => {
  const [showChat, setShowChat] = useState(false);
  return (
    <div>
      {showChat && (
        <div
          style={{
            position: 'absolute',
            bottom: '95px',
            right: '20px',
            width: '400px',
            height: '80vh',
            backgroundColor: 'white',
            border: '1px solid black',
            zIndex: 1000,
          }}
        ></div>
      )}
      <button
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          width: '70px',
          height: '70px',
          backgroundColor: 'white',
          border: '1px solid black',
          zIndex: 1000,
          cursor: 'pointer',
        }}
        onClick={() => setShowChat(!showChat)}
      >
        💬
      </button>
    </div>
  );
};

export default ChatBox;
