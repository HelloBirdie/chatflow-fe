import { IEdge } from '@/interfaces/edge';
import { INode } from '@/interfaces/node';
import dagre from '@dagrejs/dagre';

export const generateEdgesFromNodes = (nodes: INode[] | []): IEdge[] => {
  const edges: IEdge[] = [];
  nodes.forEach((node) => {
    if (node.parentNode) {
      edges.push({
        id: `e${node.id}-${node.parentNode}`,
        source: node.parentNode,
        target: node.id,
      });
    }
  });
  return edges;
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export const getLayoutedElements = (
  nodes: INode[],
  edges: IEdge[],
  direction = 'LR',
) => {
  const nodeWidth = 172;
  const nodeHeight = 36;
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};
