import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  z-index: 2000;
  border: 1px solid black;
  border-radius: 8px;
  padding: 10px;
`;

const CustomDragOverlay = () => {
  return (
    <Wrapper>
      <div>Question: </div>
      <div>Answer: </div>
    </Wrapper>
  );
};

export default CustomDragOverlay;
