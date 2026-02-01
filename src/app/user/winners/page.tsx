'use client';

import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Icon,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { FetchedEvents } from 'api/events/events';
import { FetchedLeaderboard } from 'api/leaderboard/leaderboard';
import { useEffect, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { FaCrown, FaTrophy } from 'react-icons/fa';
import { MdAutoGraph, MdEmojiEvents, MdStars } from 'react-icons/md';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

type LeaderboardRow = {
  position: number | string;
  name: string;
  prmerged: number | string;
  githubid: string;
  points: number | string;
  avatarUrl?: string;
};

type ProgressSeries = {
  participantId: string;
  name: string;
  avatarUrl?: string | null;
  data: { date: string; points: number }[];
};

const trophyGlow = {
  1: '#F6C343',
  2: '#CBD5E0',
  3: '#ED8936',
};

async function fetchParticipantProgress(githubId: string, eventName: string) {
  const token = localStorage.getItem('token');
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/leaderboard/progress/${encodeURIComponent(
    githubId,
  )}?eventName=${encodeURIComponent(eventName)}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch progress');
  const json = await res.json();
  return json.data as ProgressSeries;
}

export default function WinnersPage() {
  const cardBg = useColorModeValue('white', 'gray.900');
  const softBg = useColorModeValue('gray.50', 'rgba(15,23,42,0.6)');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedText = useColorModeValue('gray.500', 'gray.400');
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.200');
  const glow = useColorModeValue('rgba(124,58,237,0.16)', 'rgba(124,58,237,0.32)');

  const { data: eventData, isLoading: eventsLoading } = useQuery({
    queryKey: ['events'],
    queryFn: FetchedEvents,
  });

  const eventNames = useMemo(() => {
    const names = (eventData?.data || []).map((e: any) => e.name);
    if (names.length) return names;
    return [process.env.NEXT_PUBLIC_EVENT_NAME || 'Opencode'];
  }, [eventData]);

  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [selectedWinner, setSelectedWinner] = useState<LeaderboardRow | null>(null);

  const { data: leaderboardData, isLoading: leaderboardLoading } = useQuery({
    queryKey: ['leaderboard', selectedEvent],
    queryFn: () => FetchedLeaderboard(selectedEvent),
    enabled: !!selectedEvent,
  });

  const topThree = useMemo(() => {
    const list = (leaderboardData || []) as LeaderboardRow[];
    return list.slice(0, 3);
  }, [leaderboardData, selectedWinner]);

  useEffect(() => {
    if (!selectedEvent && eventNames.length) {
      setSelectedEvent(eventNames[0]);
    }
  }, [eventNames, selectedEvent]);

  useEffect(() => {
    if (!selectedWinner && topThree.length) {
      setSelectedWinner(topThree[0]);
    }
  }, [topThree, selectedWinner]);

  const { data: progressData, isLoading: progressLoading } = useQuery({
    queryKey: ['progress', selectedWinner?.githubid, selectedEvent],
    queryFn: () => fetchParticipantProgress(selectedWinner!.githubid, selectedEvent),
    enabled: !!selectedWinner?.githubid && !!selectedEvent,
  });

  const stats = useMemo(() => {
    if (!progressData?.data?.length) return null;
    const points = progressData.data;
    const totalPoints = points[points.length - 1]?.points ?? 0;
    const activeDays = new Set(points.filter((p) => p.points > 0).map((p) => p.date)).size;
    return { totalPoints, activeDays };
  }, [progressData]);

  const chartData = useMemo(() => {
    if (!progressData?.data?.length) return null;
    return {
      labels: progressData.data.map((p) => p.date),
      datasets: [
        {
          label: 'Points',
          data: progressData.data.map((p) => p.points),
          borderColor: '#8B5CF6',
          backgroundColor: 'rgba(139,92,246,0.2)',
          fill: true,
          tension: 0.3,
          pointRadius: 3,
        },
      ],
    };
  }, [progressData]);

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: { ticks: { color: '#A0AEC0' }, grid: { display: false } },
        y: { ticks: { color: '#A0AEC0' }, grid: { color: 'rgba(148,163,184,0.15)' } },
      },
    }),
    [],
  );

  return (
    <Box position="relative" minH="100vh">
      {/* Ambient art */}
      <Box
        position="absolute"
        top="-120px"
        right="-120px"
        w="320px"
        h="320px"
        bg={glow}
        filter="blur(120px)"
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="-160px"
        left="-120px"
        w="360px"
        h="360px"
        bg={glow}
        filter="blur(140px)"
        zIndex={0}
      />

      <Box position="relative" zIndex={1} pt={{ base: '90px', md: '70px' }}>
        <Flex direction="column" gap="24px">
          <Flex align="center" justify="space-between" wrap="wrap" gap="12px">
            <Box>
              <Flex align="center" gap="10px">
                <Icon as={MdStars} color="purple.400" w={6} h={6} />
                <Text fontSize={{ base: '28px', md: '36px' }} fontWeight="900" color={textColor}>
                  Winners
                </Text>
              </Flex>
              <Text fontSize="14px" color={mutedText}>
                Celebrate the top performers and track their progress.
              </Text>
            </Box>
            <Flex gap="8px" flexWrap="wrap">
              {eventNames.map((name) => (
                <Button
                  key={name}
                  size="sm"
                  onClick={() => setSelectedEvent(name)}
                  bg={selectedEvent === name ? 'purple.500' : softBg}
                  color={selectedEvent === name ? 'white' : textColor}
                  _hover={{ bg: selectedEvent === name ? 'purple.600' : 'purple.50' }}
                  border="1px solid"
                  borderColor={borderColor}
                >
                  {name}
                </Button>
              ))}
            </Flex>
          </Flex>

          {/* Top 3 */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing="18px">
            {leaderboardLoading &&
              [0, 1, 2].map((s) => (
                <Skeleton key={s} h="180px" borderRadius="20px" />
              ))}
            {topThree.map((winner, idx) => {
              const rank = idx + 1;
              const isActive = selectedWinner?.githubid === winner.githubid;
              return (
                <Box
                  key={winner.githubid}
                  p="18px"
                  borderRadius="22px"
                  bg={cardBg}
                  border="1px solid"
                  borderColor={isActive ? 'purple.400' : borderColor}
                  boxShadow={isActive ? '0 0 0 2px rgba(124,58,237,0.2)' : 'lg'}
                  cursor="pointer"
                  onClick={() => setSelectedWinner(winner)}
                  transition="all 0.2s"
                  _hover={{ transform: 'translateY(-4px)', borderColor: 'purple.300' }}
                >
                  <Flex align="center" justify="space-between" mb="12px">
                    <Flex align="center" gap="10px">
                      <Avatar src={winner.avatarUrl} name={winner.name} />
                      <Box>
                        <Text fontWeight="800" color={textColor} noOfLines={1}>
                          {winner.name}
                        </Text>
                        <Text fontSize="12px" color={mutedText}>
                          @{winner.githubid}
                        </Text>
                      </Box>
                    </Flex>
                    <Box textAlign="right">
                      <Badge
                        bg={trophyGlow[rank] || 'purple.500'}
                        color="black"
                        borderRadius="full"
                        px="8px"
                        py="2px"
                        fontWeight="800"
                      >
                        #{rank}
                      </Badge>
                    </Box>
                  </Flex>

                  <Flex justify="space-between" align="center">
                    <Flex align="center" gap="6px">
                      <Icon as={FaTrophy} color={trophyGlow[rank] || '#8B5CF6'} />
                      <Text fontWeight="800" color={textColor}>
                        {winner.points}
                      </Text>
                      <Text fontSize="12px" color={mutedText}>
                        points
                      </Text>
                    </Flex>
                    <Flex align="center" gap="6px">
                      <Icon as={MdEmojiEvents} color="purple.400" />
                      <Text fontWeight="700" color={textColor}>
                        {winner.prmerged}
                      </Text>
                      <Text fontSize="12px" color={mutedText}>
                        PRs
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              );
            })}
          </SimpleGrid>

          {/* Progress */}
          <Box
            bg={cardBg}
            borderRadius="24px"
            border="1px solid"
            borderColor={borderColor}
            p={{ base: '18px', md: '22px' }}
          >
            <Flex align="center" justify="space-between" mb="16px" flexWrap="wrap" gap="12px">
              <Flex align="center" gap="10px">
                <Icon as={MdAutoGraph} color="purple.400" w={5} h={5} />
                <Text fontSize="18px" fontWeight="800" color={textColor}>
                  Winner Progress
                </Text>
              </Flex>
              {stats && (
                <Flex gap="14px" flexWrap="wrap">
                  <Badge borderRadius="full" px="10px" py="4px" bg="purple.50" color="purple.700">
                    {stats.totalPoints} total points
                  </Badge>
                  <Badge borderRadius="full" px="10px" py="4px" bg="blue.50" color="blue.700">
                    {stats.activeDays} active days
                  </Badge>
                </Flex>
              )}
            </Flex>

            <Box h={{ base: '260px', md: '320px' }}>
              {progressLoading && <Skeleton h="100%" borderRadius="20px" />}
              {!progressLoading && chartData && <Line data={chartData} options={chartOptions} />}
              {!progressLoading && !chartData && (
                <Flex align="center" justify="center" h="100%">
                  <Text color={mutedText}>No progress data available.</Text>
                </Flex>
              )}
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
