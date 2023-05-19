import React, { useRef } from 'react';
import styled from 'styled-components';
import { useDroppable } from '@dnd-kit/core';
import { Handle, Position } from 'reactflow';

const NodeContainer = styled.div`
  border: 1px solid black;
  padding: 10px;
  border-radius: 8px;
  max-width: 300px;
  &.mindmap-node-drag-hovered {
    background-color: #e8e8e8;
  }
`;

interface MindmapNodeProps {
  id: string;
  data: {
    conversationPairId: number;
    userMessage: string;
    aiMessage: string;
    isParent: boolean;
  };
}

const MindmapNode = ({ id, data }: MindmapNodeProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'mindmap-node-' + data.conversationPairId,
    data: { data },
  });

  //TODO: remove this
  const nodeRef = useRef(null);

  // useEffect(() => {
  //   if (nodeRef.current) {
  //     const { clientWidth, clientHeight } = nodeRef.current;
  //     console.log(clientWidth, clientHeight);
  //   }
  // }, []);

  return (
    <NodeContainer
      ref={setNodeRef}
      className={isOver ? 'mindmap-node-drag-hovered' : ''}
    >
      <div ref={nodeRef}>
        <Handle type="target" position={Position.Left} />
        <p>{data.userMessage}</p>
        <hr />
        <p>{data.aiMessage}</p>
        <Handle type="source" position={Position.Right} />
      </div>
    </NodeContainer>
  );
};

export default MindmapNode;
