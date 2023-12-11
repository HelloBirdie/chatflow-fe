import { IMesssageAdd } from '@/interfaces/message';
export interface IMessage {
  id: number;
  text: string;
  senderId: number;
  aiMessage: boolean;
  createdTime: string;
  updatedTime: string;
}

export interface IMessageSlim {
  id: number;
  text: string;
}

export interface IMesssageAdd {
  isAiMessage: boolean;
  mindmapId: number;
  text: string;
}
