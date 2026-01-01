'use client';

import {
  Box,
  Flex,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import {
  fetchEventWinners,
  fetchWeeklyLeaderboards,
} from 'api/milestones/milestones';
import { useState } from 'react';
import { FaTrophy } from 'react-icons/fa';
import { MdEmojiEvents, MdLeaderboard } from 'react-icons/md';
import { RingLoader } from 'react-spinners';
import { EventWinnersCard } from './components/EventWinnerCard';
import { WeeklyLeaderboardCard } from './components/WeeklyLeaderboard';

// ... Keep your interfaces ...
interface EventWinner {
  name: string;
  avatar: string;
  username: string;
  userId: string;
  score?: number;
}
interface EventData {
  eventName: string;
  winners: Record<number, EventWinner[]>;
  eventImage?: string;
}

export default function Milestones() {
  const [selectedTab, setSelectedTab] = useState(0);

  // Show only first week for now

  
  const WEEKS_TO_SHOW = [true,true, false, false, false];
  const SHOW_EVENTS = true;
  
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  const { data: leaderboardData, isLoading: leaderboardLoading } = useQuery({
    queryKey: ['weeklyLeaderboards'],
    queryFn: fetchWeeklyLeaderboards,
  });

  const { data: eventWinnersData, isLoading: eventWinnersLoading } = useQuery({
    queryKey: ['eventWinners'],
    queryFn: fetchEventWinners,
  });

  const isLoading = leaderboardLoading || eventWinnersLoading;

  if (isLoading) {
    return (
      <Flex justify="center" align="center" h="100vh" bg={bgColor}>
        <RingLoader color="#805AD5" />
      </Flex>
    );
  }

  const weeks = leaderboardData?.data || {};
  const weeklyData = Object.values(weeks).filter((_, index) => WEEKS_TO_SHOW[index]);
  const eventWinnersRaw = eventWinnersData?.data || {};
  const events: EventData[] = Object.entries(eventWinnersRaw).map(
    ([eventName, winners]) => ({
      eventName,
      winners: winners as Record<number, EventWinner[]>,
    }),
  );

  return (
    <Box
      minH="100vh"
      bg={bgColor}
      pt={{ base: '120px', md: '100px' }}
      overflowX="hidden" /* IMPORTANT: Prevents horizontal scrollbar due to carousel overflow */
    >
      <Box maxW="100%" mx="auto">
        {' '}
        {/* Allow full width for carousel rendering */}
        {/* Header */}
        <Box mb="40px" textAlign="center" px="20px">
          <Flex align="center" justify="center" mb="12px">
            <Icon
              as={FaTrophy}
              w="32px"
              h="32px"
              color="purple.500"
              mr="12px"
            />
            <Text
              fontSize={{ base: '28px', md: '40px' }}
              fontWeight="900"
              color={textColor}
            >
              Milestones
            </Text>
          </Flex>
          <Text fontSize={{ base: '14px', md: '18px' }} color={mutedColor}>
            Celebrating the champions of our community.
          </Text>
        </Box>
        {/* Tabs */}
        <Tabs
          index={selectedTab}
          onChange={setSelectedTab}
          variant="soft-rounded"
          colorScheme="purple"
          isLazy
          align="center"
        >
          <TabList
            mb="50px"
            bg={useColorModeValue('white', 'gray.800')}
            p="1"
            borderRadius="full"
            shadow="sm"
            display="inline-flex"
          >
            <Tab fontWeight="700" borderRadius="full" px={6}>
              <Icon as={MdLeaderboard} mr="8px" /> Weekly Leaders
            </Tab>
            <Tab fontWeight="700" borderRadius="full" px={6}>
              <Icon as={MdEmojiEvents} mr="8px" /> Event Winners
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel p="0">
              {weeklyData.length > 0 ? (
                // Wrapper Box to contain the carousel but allow visuals to spill over
                <Box w="100%" h="600px" display="flex" alignItems="center">
                  <WeeklyLeaderboardCard
                    weeks={weeklyData.map((weekData: any) => ({
                      week: weekData.week,
                      data: weekData.leaderboard.map((user: any) => ({
                        ...user,
                        userId:
                          user.userId ||
                          user.id ||
                          `${weekData.week}-${user.rank}`,
                      })),
                    }))}
                  />
                </Box>
              ) : (
                <Text textAlign="center">No data available.</Text>
              )}
            </TabPanel>

            <TabPanel p="0">
              {events.length > 0 ? (
                <Box w="100%" h="550px" display="flex" alignItems="center">
                  <EventWinnersCard events={events} />
                </Box>
              ) : (
                <Text textAlign="center">No data available.</Text>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}
