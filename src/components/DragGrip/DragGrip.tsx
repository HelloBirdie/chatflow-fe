import React from 'react';
import { Interface } from 'readline';
import styled from 'styled-components';

interface DragGripProps {
  position: {
    top: string;
    left: string;
  };
}

const Wrapper = styled.div<DragGripProps>`
  position: absolute;
  top: ${(props) => props.position.top};
  left: ${(props) => props.position.left};

  cursor: grab;
  .row {
    display: flex;
    margin-bottom: 1px;
    .dot {
      display: inline-block;
      background-color: #777777;
      height: 3px;
      width: 3px;
      border-radius: 2px;
      margin-right: 2px;
    }
  }
`;

const DragGrip = (props: DragGripProps) => {
  const { position } = props;
  return (
    <Wrapper position={position}>
      <div className="row">
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <div className="row">
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <div className="row">
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </Wrapper>
  );
};

export default DragGrip;
