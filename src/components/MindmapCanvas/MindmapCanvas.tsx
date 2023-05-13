import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
  ControlButton,
} from 'reactflow';
import { useSelector } from 'react-redux';

import { useDroppable } from '@dnd-kit/core';

import 'reactflow/dist/style.css';
import MindmapNode from '../MindmapNode/MindmapNode';

enum BackgroundVariant {
  Lines = 'lines',
  Dots = 'dots',
  Cross = 'cross',
}

// const initialNodes = [
//   {
//     id: '1',
//     type: 'mindmapNode',
//     position: { x: 0, y: 0 },
//     data: { conversationPairId: 1, userMessage: 'Hello', aiMessage: 'Hi' },
//   },
//   {
//     id: '2',
//     type: 'mindmapNode',
//     position: { x: 0, y: 100 },
//     data: { conversationPairId: 2, userMessage: 'Hello', aiMessage: 'Hi' },
//   },
//   {
//     id: '3',
//     type: 'mindmapNode',
//     position: { x: 100, y: 100 },
//     data: { conversationPairId: 3, userMessage: 'Hello', aiMessage: 'Hi' },
//   },
//   {
//     id: '4',
//     type: 'mindmapNode',
//     position: { x: 200, y: 100 },
//     data: { conversationPairId: 4, userMessage: 'Hello', aiMessage: 'Hi' },
//   },
// ];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const proOptions = { hideAttribution: true };

const MindmapCanvas = () => {
  const reduxNodes = useSelector((state: any) => state.nodes.nodes);
  const [nodes, setNodes, onNodesChange] = useNodesState(reduxNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showMiniMap, setShowMiniMap] = useState(false);

  const nodeTypes = useMemo(() => ({ mindmapNode: MindmapNode }), []);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const { setNodeRef } = useDroppable({
    id: 'mindmapCanvas',
  });

  useEffect(() => {
    setNodes(reduxNodes);
  }, [reduxNodes]);

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
