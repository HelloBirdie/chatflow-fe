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
  MarkerType,
  ConnectionLineType,
} from 'reactflow';
import { useDispatch, useSelector } from 'react-redux';

import { useDroppable } from '@dnd-kit/core';
import { isEqual, cloneDeep } from 'lodash';

import 'reactflow/dist/style.css';
import MindmapNode from '../MindmapNode/MindmapNode';
import { getLayoutedElements } from '@/utils/mindmapUtils';
import { setNodes as reduxSetNodes } from '@/redux/actions/nodeActions';
import { setEdges as reduxSetEdges } from '@/redux/actions/edgeActions';

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
  const [nodes, setNodes, onNodesChange] = useNodesState(reduxNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(reduxEdges);
  const [showMiniMap, setShowMiniMap] = useState(false);

  const nodeTypes = useMemo(() => ({ mindmapNode: MindmapNode }), []);

  const onConnect = useCallback(
    // (params: any) => setEdges((eds) => addEdge(params, eds)),
    (params: any) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'smoothstep',
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 13,
              height: 13,
            },
            style: {
              strokeWidth: 1.4,
            },
          },
          eds,
        ),
      ),
    [setEdges],
  );

  const { setNodeRef } = useDroppable({
    id: 'mindmapCanvas',
  });

  useEffect(() => {
    if (!isEqual(reduxNodes, nodes)) {
      setNodes(cloneDeep(reduxNodes));
    }
    if (!isEqual(reduxEdges, edges)) {
      setEdges(cloneDeep(reduxEdges));
    }
  }, [reduxNodes, reduxEdges]);

  useEffect(() => {
    // const layoutedElements = getLayoutedElements(nodes, edges);
    // if (!isEqual(nodes, layoutedElements.nodes)) {
    //   setNodes(layoutedElements.nodes);
    // }
    // if (!isEqual(edges, layoutedElements.edges)) {
    //   setEdges(layoutedElements.edges);
    // }
    // dispatch(reduxSetNodes(cloneDeep(nodes)));
    // dispatch(reduxSetEdges(cloneDeep(edges)));
  }, [nodes, edges]);

  return (
    <div style={{ width: '100vw', height: '100vh' }} ref={setNodeRef}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineStyle={{ strokeWidth: '1.4' }}
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
        <Background
          variant={BackgroundVariant.Dots}
          gap={12}
          size={1}
          color="#C0C9DC"
          style={{ backgroundColor: '#F2F3F7' }}
        />
      </ReactFlow>
    </div>
  );
};

export default MindmapCanvas;
