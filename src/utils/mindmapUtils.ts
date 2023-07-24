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
        type: 'smoothstep',
        markerEnd: {
          type: 'arrowclosed',
        },
      });
    }
  });
  return edges;
};

export const getLayoutedElements = (
  nodes: any,
  edges: any,
  direction = 'LR',
) => {
  if (nodes.length === 0 || edges.length === 0) {
    return { nodes: [], edges: [] };
  }
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction, ranker: 'tight-tree' });

  nodes.forEach((node: any) => {
    const nodeWidth = node.width || 180;
    const nodeHeight = node.height || 40;
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge: any) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node: any) => {
    const nodeWidth = node.width || 180;
    const nodeHeight = node.height || 40;
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
