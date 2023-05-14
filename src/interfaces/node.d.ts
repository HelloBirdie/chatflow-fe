export interface INode {
  id: string;
  type: string;
  position: { x: number; y: number };
  parentNode: string | null;
  data: INodeData;
  targetPosition?: string;
  sourcePosition?: string;
}

export interface INodeData {
  conversationPairId: number;
  userMessage: string;
  aiMessage: string;
  isParent: boolean;
}
