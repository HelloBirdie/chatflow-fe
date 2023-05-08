import { IMessage } from './message';

export interface IConversationPair {
  id: number;
  userMessage: IMessage;
  aiMessage: IMessage;
}
