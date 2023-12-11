import { IMessage } from './message';

export interface IConversationPair {
  id: number;
  mindmapId: number;
  userMessage: IMessage;
  aiMessage: IMessage;
  createdTime: string;
  updatedTime: string;
  nodeCount: number;
}
