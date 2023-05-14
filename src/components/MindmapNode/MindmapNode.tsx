import React from 'react';
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
  data: {
    conversationPairId: number;
    userMessage: string;
    aiMessage: string;
    isParent: boolean;
  };
}

const MindmapNode = ({ data }: MindmapNodeProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'mindmap-node-' + data.conversationPairId,
    data: { data },
  });

  return (
    <NodeContainer
      ref={setNodeRef}
      className={isOver ? 'mindmap-node-drag-hovered' : ''}
    >
      <Handle type="target" position={Position.Left} />
      <p>{data.userMessage}</p>
      <hr />
      <p>{data.aiMessage}</p>
      <Handle type="source" position={Position.Right} />
    </NodeContainer>
  );
};

export default MindmapNode;
