import React, { ReactNode } from 'react';
import ChatBoxContext from './ChatBoxContext';

type ChatBoxContextProviderProps = {
  children: ReactNode;
};

const ChatBoxContextProvider = ({ children }: ChatBoxContextProviderProps) => {
  const [conversationPairs, setConversationPairs] = React.useState<any[]>([]);

  return (
    <ChatBoxContext.Provider
      value={{ conversationPairs, setConversationPairs }}
    >
      {children}
    </ChatBoxContext.Provider>
  );
};

export default ChatBoxContextProvider;
