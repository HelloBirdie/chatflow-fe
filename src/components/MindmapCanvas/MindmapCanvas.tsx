import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
  ControlButton,
} from 'reactflow';
import { useDispatch, useSelector } from 'react-redux';

import { useDroppable } from '@dnd-kit/core';
import { isEqual, cloneDeep, set } from 'lodash';

import 'reactflow/dist/style.css';
import MindmapNode from '../MindmapNode/MindmapNode';
import { setNodes as reduxSetNodes } from '@/redux/actions/nodeActions';
import { setEdges as reduxSetEdges } from '@/redux/actions/edgeActions';

import dagre from '@dagrejs/dagre';

enum BackgroundVariant {
  Lines = 'lines',
  Dots = 'dots',
  Cross = 'cross',
}

const proOptions = { hideAttribution: true };

const MindmapCanvas = () => {
  const dispatch = useDispatch();
  const reduxNodes = useSelector((state: any) => state.nodes.nodes);
  const reduxEdges = useSelector((state: any) => state.edges.edges);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [showMiniMap, setShowMiniMap] = useState(false);
  const [updateFromLocalToRedux, setUpdateFromLocalToRedux] = useState(false);
  const [initialLayoutDone, setInitialLayoutDone] = useState(false);

  const nodeTypes = useMemo(() => ({ mindmapNode: MindmapNode }), []);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const { setNodeRef } = useDroppable({
    id: 'mindmapCanvas',
  });

  const getLayoutedElements = (nodes: any, edges: any, direction = 'LR') => {
    if (nodes.length === 0 || edges.length === 0) {
      return { nodes: [], edges: [] };
    }
    console.log(nodes);
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

  useEffect(() => {
    if (updateFromLocalToRedux) {
      setUpdateFromLocalToRedux(false);
      return;
    }
    setNodes(cloneDeep(reduxNodes));
    setEdges(cloneDeep(reduxEdges));
  }, [reduxNodes, reduxEdges]);

  useEffect(() => {
    // delete this useEffect when the initial layout is done
    if (initialLayoutDone) {
      return;
    }
    console.log(nodes);

    const layoutNodes = (nodes, edges) => {
      const layoutedElements = getLayoutedElements(nodes, edges);
      // if (!isEqual(nodes, layoutedElements.nodes)) {
      //   console.log('changed');
      //   setNodes(layoutedElements.nodes);
      // }
      // if (!isEqual(edges, layoutedElements.edges)) {
      //   setEdges(layoutedElements.edges);
      // }
      setUpdateFromLocalToRedux(true);
      setInitialLayoutDone(true);
      dispatch(reduxSetNodes(cloneDeep(layoutedElements.nodes)));
      dispatch(reduxSetEdges(cloneDeep(layoutedElements.edges)));
    };

    if (nodes.length !== 0 && nodes[0].width) {
      layoutNodes(nodes, edges);
    }

    // if (nodes.length !== 0 && edges.length !== 0) {
    //   // const layoutedElements = getLayoutedElements(nodes, edges);
    //   if (!isEqual(nodes, layoutedElements.nodes)) {
    //     setNodes(layoutedElements.nodes);
    //   }
    //   if (!isEqual(edges, layoutedElements.edges)) {
    //     setEdges(layoutedElements.edges);
    //   }
    //   dispatch(reduxSetNodes(cloneDeep(nodes)));
    //   dispatch(reduxSetEdges(cloneDeep(edges)));
    // }
  }, [nodes, edges]);

  return (
    <div style={{ width: '100vw', height: '100vh' }} ref={setNodeRef}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        proOptions={proOptions}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls style={{ display: 'flex', bottom: '10px' }}>
          <ControlButton
            onClick={() => setShowMiniMap(!showMiniMap)}
            title="Mini Map"
          >
            <div>🗺️</div>
          </ControlButton>
        </Controls>
        {showMiniMap && (
          <MiniMap
            position="bottom-left"
            style={{
              position: 'absolute',
              left: '0px',
              bottom: '40px',
            }}
          />
        )}
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default MindmapCanvas;
