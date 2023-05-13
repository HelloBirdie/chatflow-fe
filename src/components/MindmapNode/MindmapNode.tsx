import React from 'react';
import styled from 'styled-components';
import { useDroppable } from '@dnd-kit/core';

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
      <p>{data.userMessage}</p>
      <hr />
      <p>{data.aiMessage}</p>
    </NodeContainer>
  );
};

export default MindmapNode;
