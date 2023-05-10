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

  const [inChatBox, setInChatBox] = useState(true);

  const chatBoxRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      style={{
        overflow: 'hidden',
        height: '100vh',
        width: '100vw',
        position: 'relative',
      }}
    >
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragMove={handleDragMove}
      >
        <DragOverlay
          style={{
            position: 'absolute',
            zIndex: 2000,
            cursor: 'grabbing',
          }}
          modifiers={[restrictToWindowEdges]}
        >
          {isDragging ? (
            <CustomDragOverlay
              conversationPair={draggingConversationPair}
              inChatBox={inChatBox}
            />
          ) : null}
        </DragOverlay>
        <MindMapHeaderBar />

        <ChatBox ref={chatBoxRef} />
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

  function handleDragMove(e: any) {
    const { clientX: xSource, clientY: ySource } = e.activatorEvent;
    const { x: xOffset, y: yOffset } = e.delta;
    const { windowX, windowY } = {
      windowX: xSource + xOffset,
      windowY: ySource + yOffset,
    };
    // // TODO: debounce
    // if (topElement) {
    //   console.log('Element at (' + windowX + ',' + windowY + '):', topElement);
    // } else {
    //   console.log('No element at (' + windowX + ',' + windowY + ')');
    // }
    // const { id: overId } = e.over;
    // console.log(overId);

    // console.log(chatBoxRef.current?.getBoundingClientRect());

    const { chatBoxTop, chatBoxBottom, chatBoxLeft, chatBoxRight } = {
      chatBoxTop: chatBoxRef.current?.getBoundingClientRect().top,
      chatBoxBottom: chatBoxRef.current?.getBoundingClientRect().bottom,
      chatBoxLeft: chatBoxRef.current?.getBoundingClientRect().left,
      chatBoxRight: chatBoxRef.current?.getBoundingClientRect().right,
    };

    if (!chatBoxTop || !chatBoxBottom || !chatBoxLeft || !chatBoxRight) return;

    if (
      windowX > chatBoxLeft &&
      windowX < chatBoxRight &&
      windowY > chatBoxTop &&
      windowY < chatBoxBottom
    ) {
      console.log('In chat box');
      setInChatBox(true);
    } else {
      console.log('Not in chat box');
      setInChatBox(false);
    }
  }
};

export default Mindmap;
