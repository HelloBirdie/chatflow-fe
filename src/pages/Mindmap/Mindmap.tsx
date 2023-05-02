import React from 'react';
import MindmapCanvas from '@/components/MindmapCanvas/MindmapCanvas';
import ChatBox from '../../components/ChatBox/ChatBox';

const Mindmap = () => {
  return (
    <div>
      <ChatBox />
      <MindmapCanvas />
    </div>
  );
};

export default Mindmap;
