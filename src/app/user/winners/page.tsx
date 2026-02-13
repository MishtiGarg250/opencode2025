'use client';

import {
  Avatar,
  Box,
  Flex,
  Skeleton,
  Stack,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  useColorModeValue,
  Container,
  SimpleGrid,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { FaCodeBranch, FaUsers, FaCrown, FaTrophy, FaMedal, FaStar, FaAward } from 'react-icons/fa';

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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

// --- UNIFIED COLOR THEME ---
const RANK_COLORS = [
  '#FFD700', // Gold
  '#C0C0C0', // Silver
  '#CD7F32', // Bronze
  '#4A5568', // 4th
  '#718096', // 5th
];

type Winner = {
  position: number;
  name: string;
  githubid: string;
  points: number;
  prmerged: number;
};

type RawPoint = {
  date: string;
  points: number;
};

const OVERALL_WINNERS: Winner[] = [
  { position: 1, name: 'Ishan Raj Singh', githubid: 'ishanrajsingh', points: 5110, prmerged: 195 },
  { position: 2, name: 'Apoorv Mittal', githubid: 'Apoorv012', points: 4585, prmerged: 177 },
  { position: 3, name: 'Prashant Kumar Dwivedi', githubid: 'dwivediprashant', points: 4485, prmerged: 171 },
];

const COLLEGE_WINNERS: Winner[] = [
  { position: 1, name: 'Krishna Sikheriya', githubid: 'Krishna200608', points: 3095, prmerged: 48 },
  { position: 2, name: 'Vishva Modh', githubid: 'ViMo018', points: 2590, prmerged: 41 },
  { position: 2, name: 'Ibrahim Raza Beg', githubid: 'PHOX-9', points: 2590, prmerged: 36 },
  { position: 3, name: 'Omdeep', githubid: 'omicoded19', points: 1160, prmerged: 29 },
  { position: 4, name: 'Khushi Shorey', githubid: 'khushishorey', points: 1100, prmerged: 22 },
];

// --- DECORATIVE COMPONENTS ---

function WinnersBackground() {
  return (
    <Box
      position="absolute"
      inset={0}
      zIndex={0}
      pointerEvents="none"
      bgImage="url('/Logo/opencodelogo.png')"
      bgRepeat="no-repeat"
      bgSize={{ base: '300px', md: '500px' }}
      bgPosition="center"
      opacity={0.08}
      filter="blur(1px)"
    />
  );
}

function VictorySideIcons() {
  const iconColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');
  
  const FloatingIcon = ({ icon: IconComp, top, side, size }: any) => (
    <Box
      position="absolute"
      top={top}
      {...(side === 'left' ? { left: '5%' } : { right: '5%' })}
      fontSize={`${size}px`}
      color={iconColor}
      display={{ base: 'none', xl: 'block' }}
      pointerEvents="none"
    >
      <IconComp />
    </Box>
  );

  return (
    <>
      <FloatingIcon icon={FaCrown} top="15%" side="left" size={60} />
      <FloatingIcon icon={FaStar} top="45%" side="left" size={40} />
      <FloatingIcon icon={FaTrophy} top="20%" side="right" size={60} />
      <FloatingIcon icon={FaMedal} top="50%" side="right" size={40} />
    </>
  );
}

function StatCircle({ icon: Icon, title, value }: { icon: any; title: string; value: string }) {
  const bg = useColorModeValue('whiteAlpha.900', 'whiteAlpha.100');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.300');

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      w={{ base: '140px', md: '160px' }}
      h={{ base: '140px', md: '160px' }}
      borderRadius="full"
      bg={bg}
      backdropFilter="blur(10px)"
      border="1px solid"
      borderColor={borderColor}
      boxShadow="2xl"
      mx="auto"
    >
      <Box color="purple.400" fontSize="24px" mb={2}><Icon /></Box>
      <Text fontSize="20px" fontWeight="900">{value}</Text>
      <Text fontSize="10px" fontWeight="bold" color="gray.500" textAlign="center" px={2} textTransform="uppercase">
        {title}
      </Text>
    </Flex>
  );
}

function Podium({ winners }: { winners: Winner[] }) {
  const order = winners.length === 3 
    ? [winners[1], winners[0], winners[2]] 
    : [winners[3], winners[1], winners[0], winners[2], winners[4]];

  const heights = winners.length === 3 
    ? ['120px', '180px', '100px'] 
    : ['80px', '130px', '200px', '110px', '70px'];

  return (
    <Flex align="flex-end" justify="center" gap={{ base: '6px', md: '16px' }} py={6}>
      {order.map((w, i) => (
        <Stack key={w.githubid} align="center" spacing={2}>
          <Avatar
            src={`https://github.com/${w.githubid}.png`}
            size={{ base: 'sm', md: w.position === 1 ? 'xl' : 'lg' }}
            border="3px solid"
            borderColor={RANK_COLORS[w.position - 1]}
          />
          <Box
            w={{ base: '50px', md: '100px' }}
            h={heights[i]}
            bg={RANK_COLORS[w.position - 1]}
            borderRadius="12px 12px 2px 2px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="lg"
          >
            <Text color="white" fontWeight="900" fontSize={{ base: 'md', md: '2xl' }}>#{w.position}</Text>
          </Box>
          <Text fontWeight="bold" fontSize="10px" textAlign="center" noOfLines={1} maxW={{ base: '50px', md: '100px' }}>
            {w.name.split(' ')[0]}
          </Text>
        </Stack>
      ))}
    </Flex>
  );
}

// --- MAIN PAGE ---

export default function WinnersPodiumComparisonPage() {
  const [tab, setTab] = useState(0);
  const users = tab === 0 ? OVERALL_WINNERS : COLLEGE_WINNERS;
  const pageBg = useColorModeValue('gray.50', 'gray.900');
  const tabListBg = useColorModeValue('whiteAlpha.600', 'blackAlpha.300');
  const chartCardBg = useColorModeValue('whiteAlpha.800', 'gray.800');
  const chartCardBorder = useColorModeValue('gray.100', 'whiteAlpha.100');
  const chartGridColor = useColorModeValue('#E2E8F0', '#2D3748');

  const labels = useMemo(() => buildDateRange('2025-12-26', '2026-01-31'), []);

  const query = useQuery({
    queryKey: ['progress', tab],
    queryFn: () => Promise.all(users.map((u) => fetchProgress(u.githubid))),
  });

  const chartData = useMemo(() => {
    if (!query.data) return null;
    return {
      labels,
      datasets: users.map((u, i) => ({
        label: u.name,
        data: normalizeProgress(query.data[i], labels),
        borderColor: RANK_COLORS[u.position - 1] || '#805AD5',
        backgroundColor: `${RANK_COLORS[u.position - 1] || '#805AD5'}22`,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
      })),
    };
  }, [query.data, users, labels]);

  return (
    <Box minH="100vh" py="40px" bg={pageBg} position="relative" overflow="hidden">
      <WinnersBackground />
      <VictorySideIcons />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <Stack spacing={12}>
          <Stack align="center" spacing={2}>
            <Text fontSize={{ base: '3xl', md: '5xl' }} fontWeight="900" letterSpacing="tight">
              Opencode Winners
            </Text>
            <Box h="4px" w="80px" bg="purple.500" borderRadius="full" />
            <Text color="gray.500" fontSize="sm">A month long journey of contribution and code</Text>
          </Stack>

          <Tabs index={tab} onChange={setTab} variant="soft-rounded" colorScheme="purple" align="center">
            <TabList mb={8} bg={tabListBg} p={1} borderRadius="full" display="inline-flex">
              <Tab fontWeight="bold" px={8}>Overall</Tab>
              <Tab fontWeight="bold" px={8}>IIIT Allahabad</Tab>
            </TabList>

            <TabPanels>
              {[OVERALL_WINNERS, COLLEGE_WINNERS].map((winnerList, idx) => (
                <TabPanel key={idx} p={0}>
                  <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={{ base: 6, lg: 10 }} alignItems="center">
                    <StatCircle icon={FaCodeBranch} title="Pull Requests" value="3,768" />
                    <Podium winners={winnerList} />
                    <StatCircle icon={FaUsers} title="Registrations" value="1,000+" />
                  </SimpleGrid>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>

          <Box 
            bg={chartCardBg}
            p={{ base: 4, md: 8 }} 
            borderRadius="3xl" 
            boxShadow="2xl" 
            h={{ base: '350px', md: '480px' }}
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor={chartCardBorder}
          >
            <Text fontWeight="800" mb={6} fontSize="lg">Performance Progression</Text>
            {query.isLoading ? <Skeleton h="100%" borderRadius="xl" /> : chartData && (
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { 
                    legend: { 
                      position: 'bottom',
                      labels: { padding: 25, usePointStyle: true, font: { size: 11, weight: 'bold' } } 
                    } 
                  },
                  scales: { 
                    x: { ticks: { maxTicksLimit: 8 }, grid: { display: false } },
                    y: { grid: { color: chartGridColor } }
                  },
                }}
              />
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

// --- LOGIC HELPERS ---
async function fetchProgress(githubId: string) {
  const res = await fetch(`https://events.geekhaven.in/back/api/v1/leaderboard/progress/${githubId}?eventName=Opencode`);
  const json = await res.json();
  return json.data.data as RawPoint[];
}

function buildDateRange(start: string, end: string) {
  const dates: string[] = [];
  let d = new Date(start);
  const endDate = new Date(end);
  while (d <= endDate) {
    dates.push(d.toISOString().slice(0, 10));
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

function normalizeProgress(raw: RawPoint[], labels: string[]) {
  const map = new Map<string, number>();
  raw.forEach((r) => map.set(r.date.slice(0, 10), r.points));
  let current = 0;
  return labels.map((d) => {
    if (map.has(d)) current = map.get(d)!;
    return current;
  });
}
