import { useContext, useEffect, useRef, useState } from 'react';
import { Container, HStack, Spinner } from '@chakra-ui/react';
import ConversationPair from '../ConversationPair/ConversationPair';
import { IConversationPair } from '@/interfaces/conversationPair';
import ChatBoxContext from '../ChatBox/ChatBoxContext';
import { getAllConversationPairs } from '@/services/messageService';
import { useParams } from 'react-router-dom';
import useEffectOnce from '@/hooks/useEffectOnce';

interface IProps {
  hasNew: boolean;
  setHasNew: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatMessageContainer = ({ hasNew, setHasNew }: IProps) => {
  const { conversationPairs, setConversationPairs } =
    useContext(ChatBoxContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams<{ id: string }>();

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const fetchConversationPairs = async () => {
    try {
      setIsLoading(true);

      const response = await getAllConversationPairs({
        mindmapId: Number(id),
        page: currentPage,
        size: 10,
      });

      if (response.data) {
        const responseData = response.data as {
          content: IConversationPair[];
          totalPages: number;
        };
        const newMessages = responseData.content.reverse();
        setTotalPage(responseData.totalPages);

        const prevMessage = chatContainerRef.current
          ?.firstElementChild as HTMLElement;

        setConversationPairs((prevMessages: IConversationPair[]) => [
          ...newMessages,
          ...prevMessages,
        ]);
        setCurrentPage((prevPage: number) => prevPage + 1);
        setHasNew(currentPage === 0);
        console.log(response.data);

        if (prevMessage) {
          chatContainerRef.current!.scrollTo({
            top: prevMessage.offsetTop - 30,
            behavior: 'instant',
          });
        }
      } else {
        console.error('Response data is undefined.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffectOnce(() => {
    fetchConversationPairs();
  });

  const handleScroll = () => {
    if (
      chatContainerRef.current &&
      chatContainerRef.current.scrollTop === 0 &&
      currentPage < totalPage &&
      !isLoading
    ) {
      fetchConversationPairs();
    }
  };

  useEffect(() => {
    if (hasNew) {
      scrollToBottom();
    }

    chatContainerRef.current?.addEventListener('scroll', handleScroll);
    return () => {
      chatContainerRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [conversationPairs]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };
  return (
    <Container
      height={'100%'}
      overflow={'scroll'}
      paddingTop={'10px'}
      paddingBottom={'20px'}
      scrollBehavior={'smooth'}
      ref={chatContainerRef}
    >
      {isLoading && (
        <HStack justify={'center'}>
          <Spinner />
        </HStack>
      )}
      {conversationPairs.map((conversationPair: IConversationPair) => {
        return (
          <ConversationPair
            key={conversationPair.id}
            conversationPair={conversationPair}
          />
        );
      })}
    </Container>
  );
};

export default ChatMessageContainer;
