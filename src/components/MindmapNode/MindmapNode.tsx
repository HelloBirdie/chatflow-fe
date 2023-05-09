import React from 'react';
import styled from 'styled-components';

const NodeContainer = styled.div`
  border: 1px solid black;
  padding: 10px;
  border-radius: 8px;
  :hover {
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
  console.log(data);
  return (
    <NodeContainer>
      <p>{data.userMessage}</p>
      <hr />
      <p>{data.aiMessage}</p>
    </NodeContainer>
  );
};

export default MindmapNode;
