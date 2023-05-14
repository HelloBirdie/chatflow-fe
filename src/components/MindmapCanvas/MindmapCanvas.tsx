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
import { useSelector } from 'react-redux';

import { useDroppable } from '@dnd-kit/core';
import { isEqual } from 'lodash';

import 'reactflow/dist/style.css';
import MindmapNode from '../MindmapNode/MindmapNode';
import { getLayoutedElements } from '@/utils/mindmapUtils';

enum BackgroundVariant {
  Lines = 'lines',
  Dots = 'dots',
  Cross = 'cross',
}

const proOptions = { hideAttribution: true };

const MindmapCanvas = () => {
  const reduxNodes = useSelector((state: any) => state.nodes.nodes);
  const reduxEdges = useSelector((state: any) => state.edges.edges);
  const [nodes, setNodes, onNodesChange] = useNodesState(reduxNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(reduxEdges);
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
    setEdges(reduxEdges);
  }, [reduxNodes, reduxEdges]);

  useLayoutEffect(() => {
    const layoutedElements = getLayoutedElements(nodes, edges);
    if (!isEqual(nodes, layoutedElements.nodes)) {
      setNodes(layoutedElements.nodes);
    }
    if (!isEqual(edges, layoutedElements.edges)) {
      setEdges(layoutedElements.edges);
    }
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
