import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  .row {
    display: flex;
    margin-bottom: 3px;
    .dot {
      display: inline-block;
      background-color: white;
      height: 3px;
      width: 3px;
      border-radius: 2px;
      margin: 0 2px;
    }
  }
`;

const DragGrip = () => {
  return (
    <Wrapper>
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
