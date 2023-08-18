import { useCallback, useEffect, useState } from 'react';
import { addMindmap, getAllMindmaps } from '@/services/mindmapService';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Center,
  VStack,
  Wrap,
  Input,
} from '@chakra-ui/react';
import MindmapCard from '../MindmapCard/MindmapCard';
import CardButton from '../CardButton/CardButton';
import { ICard, ICardAdd } from '@/interfaces/card';
import { m } from 'framer-motion';

const HomeWorkspace = () => {
  const [mindmaps, setMindmaps] = useState<ICard[]>([
    {
      aiModel: 'chatgpt-3',
      createTime: '2023-08-18T13:07:01.650008Z',
      iconCode: '1f4d1',
      id: '21',
      name: "AI6126 - Review",
      updateTime: '2023-08-18T13:07:01.650008Z'
    },
    {
      aiModel: 'chatgpt-3',
      createTime: '2023-08-17T13:06:44.166735Z',
      iconCode: '203c-fe0f',
      id: '20',
      name: "Java Quiz",
      updateTime: '2023-08-17T13:06:44.166735Z'
    },
    {
      aiModel: 'chatgpt-3',
      createTime: '2023-08-16T13:07:01.650008Z',
      iconCode: '1f4a1',
      id: '19',
      name: "My mindmap",
      updateTime: '2023-08-16T13:07:01.650008Z'
    },
    {
      aiModel: 'chatgpt-3',
      createTime: '2023-08-14T13:07:01.650008Z',
      iconCode: '1f4ac',
      id: '18',
      name: "Tiktok Interview",
      updateTime: '2023-08-14T13:07:01.650008Z'
    }
  ]);
  const [sortBy, setSortBy] = useState('date');
  const [query, setQuery] = useState<string>('');

  // useEffect(() => {
  //   getMindmaps();
  // }, []);

  // const getMindmaps = async () => {
  //   try {
  //     const response = await getAllMindmaps();
  //     console.log(response.data);
  //     setMindmaps(response.data);
  //     if (response.data) sortMindmaps(response.data, sortBy);
  //     console.log(response.data)
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const sortMindmaps = (fetchedData: ICard[], sortKey: string) => {
    if (!fetchedData) return;
    const sortedMindmaps = fetchedData.sort((a, b) => {
      if (sortKey === 'date') {
        console.log('date');
        return (
          new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime()
        );
      } else if (sortKey === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    setMindmaps(sortedMindmaps);
    setSortBy(sortKey);
  };

  const updateCards = debounce();
  function debounce() {
    let timeout: ReturnType<typeof setTimeout>;
    return (text: string) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setQuery(text);
      }, 500);
    };
  }

  const handleTabsChange = (index: number) => {
    if (!mindmaps) return;
    if (index === 0) {
      sortMindmaps(mindmaps, 'date');
    } else if (index === 1) {
      sortMindmaps(mindmaps, 'name');
    }
  };

  const onSubmit = async (formData: ICardAdd) => {
    try {
      const response = await addMindmap(formData);
      console.log('Response:::::', response);
      // getMindmaps();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <VStack className="w-screen flex-1">
      <VStack className="flex-1 mt-4" w="1000px">
        <Tabs
          variant="unstyled"
          style={{ width: 'inherit' }}
          size="sm"
          position="relative"
          onChange={handleTabsChange}
        >
          {/* Tab Headings */}
          <Center>
            <TabList
              bg="#EEEEEE"
              borderRadius="6px"
              justifyContent="space-around"
              p="4px"
            >
              <Tab _selected={{ bg: 'white', borderRadius: '6px' }}>Date</Tab>
              <Tab _selected={{ bg: 'white', borderRadius: '6px' }}>Name</Tab>
            </TabList>
            <Input
              placeholder="Search"
              focusBorderColor="#0042D9"
              position="absolute"
              right="1.8rem"
              w="200px"
              onChange={(e) => {
                updateCards(e.target.value);
              }}
            />
          </Center>
          {/* Content */}
          <TabPanels p="2rem 0">
            {/* Date Panel */}
            <TabPanel p="0">
              <Wrap spacing="1.5rem">
                <CardButton onSubmit={onSubmit} />
                {mindmaps &&
                  mindmaps.map((item) => {
                    if (
                      query === '' ||
                      item.name.toLowerCase().includes(query.toLowerCase())
                    ) {
                      return (
                        <MindmapCard key={item.id} item={item}></MindmapCard>
                      );
                    }
                  })}
              </Wrap>
            </TabPanel>
            {/* Name Panel */}
            <TabPanel p="0">
              <Wrap spacing="1.5rem">
                <CardButton onSubmit={onSubmit} />
                {mindmaps &&
                  mindmaps.map((item) => {
                    if (
                      query === '' ||
                      item.name.toLowerCase().includes(query.toLowerCase())
                    ) {
                      return (
                        <MindmapCard key={item.id} item={item}></MindmapCard>
                      );
                    }
                  })}
              </Wrap>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </VStack>
  );
};

export default HomeWorkspace;
