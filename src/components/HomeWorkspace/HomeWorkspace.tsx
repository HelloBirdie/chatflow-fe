import { useEffect, useState } from 'react';
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
import { ICard } from '@/interfaces/card';

const HomeWorkspace = () => {
  // TODO: call API to obtain formData
  const [formData, setFormData] = useState<ICard[]>([
    {
      id: '2',
      name: 'Charlotte Shit Exhibition',
      icon: '1f4a9',
      date: 953078400,
    },
    {
      id: '3',
      name: 'Jack Featured Gay Porns',
      icon: '1f44d',
      date: 956102400,
    },
    {
      id: '4',
      name: 'Sky AI Research Notes',
      icon: '1f979',
      date: 958089600,
    },
    {
      id: '1',
      name: 'Adeline Hair Ties Show',
      icon: '1f496',
      date: 945475200,
    },
    {
      id: '5',
      name: 'Lin Haidilao Recipes',
      icon: '1f958',
      date: 959385600,
    },
    {
      id: '6',
      name: 'Lin Haidilao Recipes',
      icon: '1f958',
      date: 955385600,
    },
    {
      id: '7',
      name: 'Lin Haidilao Recipes',
      icon: '1f958',
      date: 919385600,
    },
    {
      id: '8',
      name: 'Lin Haidilao Recipes',
      icon: '1f958',
      date: 959345600,
    },
    {
      id: '9',
      name: 'Lin Haidilao Recipes',
      icon: '1f958',
      date: 929385600,
    },
  ]);
  const [list, setList] = useState<ICard[]>([...formData]);
  const [tabIndex, setTabIndex] = useState(0);
  const [query, setQuery] = useState<string>('');

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
    setTabIndex(index);
    index === 0 &&
      setList(
        list.sort((a, b) => {
          return b.date - a.date;
        }),
      );
    index === 1 &&
      setList(
        list.sort((a, b) => {
          return a.name.localeCompare(b.name);
        }),
      );
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
                <CardButton />
                {list.map((item) => {
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
                <CardButton />
                {list.map((item) => {
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
