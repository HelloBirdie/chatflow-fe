import { VStack } from '@chakra-ui/react';
import HomeHeaderBar from '@/components/HomeHeaderBar/HomeHeaderBar';
import HomeWorkspace from '@/components/HomeWorkspace/HomeWorkspace';

const Home = () => {
  return (
    <div
      style={{
        overflow: 'auto',
        height: '100vh',
        width: '100vw',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <VStack className='min-h-screen'>
        <HomeHeaderBar />
        <HomeWorkspace />
      </VStack>
    </div>
  );
};

export default Home;
