import { useEffect, useRef, useState } from 'react';
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
  Input
} from '@chakra-ui/react';
import MindmapCard from '../MindmapCard/MindmapCard';
import CardButton from '../CardButton/CardButton';
import { ICard, ICardAdd } from '@/interfaces/card';
import { m } from 'framer-motion';
import useDebounce from '@/hooks/useDebounce';

const HomeWorkspace = () => {
  const [mindmaps, setMindmaps] = useState<ICard[]>();
  const [sortBy, setSortBy] = useState('date');
  const [query, setQuery] = useState<string>('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getMindmaps();
  }, []);

  const getMindmaps = async () => {
    try {
      const response = await getAllMindmaps();
      setMindmaps(response.data);
      if (response.data) sortMindmaps(response.data, sortBy);
      console.log(response.data)
    } catch (err) {
      console.error(err);
    }
  };

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

  const debouncedQuery = useDebounce(function () {
    setQuery(searchRef.current?.value as string);
  }, 2000);

  const handleCardsChange = debouncedQuery;

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
      getMindmaps();
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
              ref={searchRef}
              placeholder="Search"
              focusBorderColor="#0042D9"
              position="absolute"
              right="1.8rem"
              w="200px"
              onChange={handleCardsChange}
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
