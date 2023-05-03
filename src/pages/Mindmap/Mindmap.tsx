import React from 'react';
import MindmapCanvas from '@/components/MindmapCanvas/MindmapCanvas';
import ChatBox from '../../components/ChatBox/ChatBox';

import MindMapHeaderBar from '../../components/MindMapHeaderBar/MindMapHeaderBar';

const Mindmap = () => {
  return (
    <div>
      <MindMapHeaderBar />
      <ChatBox />
      <MindmapCanvas />
    </div>
  );
};

export default Mindmap;
