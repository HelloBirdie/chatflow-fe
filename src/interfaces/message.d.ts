import { IMesssageAdd } from '@/interfaces/message';
export interface IMessage {
  id: number;
  content: string;
  sender: string;
  timestamp: string;
}

export interface IMessageSlim {
  id: number;
  content: string;
}

export interface IMesssageAdd {
  isAiMessage: boolean;
  mindmapId: number;
  text: string;
}
