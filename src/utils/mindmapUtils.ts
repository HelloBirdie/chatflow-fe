import { IEdge } from '@/interfaces/edge';
import { INode } from '@/interfaces/node';

export const generateEdgesFromNodes = (nodes: INode[] | []): IEdge[] => {
  const edges: IEdge[] = [];
  nodes.forEach((node) => {
    if (node.parentNode) {
      edges.push({
        id: `e${node.id}-${node.parentNode}`,
        source: node.id,
        target: node.parentNode,
      });
    }
  });
  return edges;
};
