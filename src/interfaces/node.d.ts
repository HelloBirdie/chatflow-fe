export interface INode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: { conversationPairId: number; userMessage: string; aiMessage: string };
}
