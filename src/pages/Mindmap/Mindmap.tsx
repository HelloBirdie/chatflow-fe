import React, { useEffect, useState } from 'react';
import MindmapCanvas from '@/components/MindmapCanvas/MindmapCanvas';
import ChatBox from '../../components/ChatBox/ChatBox';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import _ from 'lodash';
import CustomDragOverlay from '@/components/CustomDragOverlay/CustomDragOverlay';

import MindMapHeaderBar from '../../components/MindMapHeaderBar/MindMapHeaderBar';
import { IConversationPair } from '@/interfaces/conversationPair';
import { useDispatch } from 'react-redux';
import { setNodes } from '@/redux/actions/nodeActions';
import { INode } from '@/interfaces/node';

const initialNodes: INode[] = [
  {
    id: '1',
    type: 'mindmapNode',
    position: { x: 0, y: 0 },
    data: { conversationPairId: 1, userMessage: 'Hello', aiMessage: 'Hi' },
  },
  {
    id: '2',
    type: 'mindmapNode',
    position: { x: 0, y: 100 },
    data: { conversationPairId: 2, userMessage: 'Hello', aiMessage: 'Hi' },
  },
  {
    id: '3',
    type: 'mindmapNode',
    position: { x: 100, y: 100 },
    data: { conversationPairId: 3, userMessage: 'Hello', aiMessage: 'Hi' },
  },
  {
    id: '4',
    type: 'mindmapNode',
    position: { x: 200, y: 100 },
    data: { conversationPairId: 4, userMessage: 'Hello', aiMessage: 'Hi' },
  },
];

const Mindmap = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggingConversationPair, setDraggingConversationPair] =
    useState<IConversationPair | null>(null);

  const debouncedHandleDragMove = _.debounce(handleDragMove, 15);

  const [inChatBox, setInChatBox] = useState(true);

  const chatBoxRef = React.useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNodes = () => {
      dispatch(setNodes(initialNodes));
    };

    fetchNodes();
  }, []);

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
        onDragMove={debouncedHandleDragMove}
      >
        <DragOverlay
          style={{
            position: 'absolute',
            zIndex: 2000,
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
      if (!inChatBox) {
        setInChatBox(true);
      }
    } else {
      if (inChatBox) {
        setInChatBox(false);
      }
    }
  }
};

export default Mindmap;
