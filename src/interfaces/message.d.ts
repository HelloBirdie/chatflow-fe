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
