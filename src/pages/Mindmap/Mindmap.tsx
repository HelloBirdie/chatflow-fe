import React, { useState } from 'react';
import MindmapCanvas from '@/components/MindmapCanvas/MindmapCanvas';
import ChatBox from '../../components/ChatBox/ChatBox';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import CustomDragOverlay from '@/components/CustomDragOverlay/CustomDragOverlay';

import MindMapHeaderBar from '../../components/MindMapHeaderBar/MindMapHeaderBar';
import { IConversationPair } from '@/interfaces/conversationPair';

const Mindmap = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggingConversationPair, setDraggingConversationPair] =
    useState<IConversationPair | null>(null);

  return (
    <div
      style={{
        overflow: 'hidden',
        height: '100vh',
        width: '100vw',
        position: 'relative',
      }}
    >
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <DragOverlay
          style={{
            position: 'absolute',
            zIndex: 2000,
          }}
          modifiers={[restrictToWindowEdges]}
        >
          {isDragging ? (
            <CustomDragOverlay conversationPair={draggingConversationPair} />
          ) : null}
        </DragOverlay>
        <MindMapHeaderBar />
        <ChatBox />
        <MindmapCanvas />
      </DndContext>
    </div>
  );
  function handleDragStart(e: any) {
    const { conversationPair } = e.active.data.current;
    setDraggingConversationPair(conversationPair);
    setIsDragging(true);
  }

  function handleDragEnd(e: any) {
    console.log(e);
    setIsDragging(false);
  }
};

export default Mindmap;
