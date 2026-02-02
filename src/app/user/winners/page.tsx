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
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
);

/* ================= TYPES ================= */

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

/* ================= SOFT, PREMIUM COLORS ================= */
/*
  Designed to look good on dark + light backgrounds
  Rank 1 → Gold-Pink
  Rank 2 → Royal Purple
  Rank 3 → Calm Blue
  Rank 4 → Emerald Green
  Rank 5 → Warm Orange
*/

const RANK_COLORS = [
     '#F5C542', // gold
  '#C0C7D1', // silver
   '#CD7F32', // bronze
  '#4ADE80', // soft green
   '#60A5FA', // soft blue

];

/* ================= MOCK DATA ================= */

const OVERALL_WINNERS: Winner[] = [
  { position: 1, name: 'Ishan Raj Singh', githubid: 'ishanrajsingh', points: 5110, prmerged: 195 },
  { position: 2, name: 'Apoorv Mittal', githubid: 'Apoorv012', points: 4585, prmerged: 177 },
  { position: 3, name: 'Prashant Kumar Dwivedi', githubid: 'dwivediprashant', points: 4485, prmerged: 171 },
];

const COLLEGE_WINNERS: Winner[] = [
  { position: 1, name: 'Krishna Sikheriya', githubid: 'Krishna200608', points: 3095, prmerged: 48 },
  { position: 2, name: 'Vishva Modh', githubid: 'ViMo018', points: 2590, prmerged: 41 },
  { position: 2, name: 'Ibrahim Raza Beg', githubid: 'PHOX-9', points: 2590, prmerged: 36 },
  { position: 3, name: 'Omdeep', githubid: 'amicoded19', points: 1160, prmerged: 29 },
  { position: 4, name: 'Khushi Shorey', githubid: 'khushishorey', points: 1100, prmerged: 22 },
];

/* ================= API ================= */

async function fetchProgress(githubId: string) {
  const res = await fetch(
    `https://events.geekhaven.in/back/api/v1/leaderboard/progress/${githubId}?eventName=Opencode`,
  );
  const json = await res.json();
  return json.data.data as RawPoint[];
}

/* ================= HELPERS ================= */

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
  raw
    .sort((a, b) => +new Date(a.date) - +new Date(b.date))
    .forEach((r) => map.set(r.date.slice(0, 10), r.points));

  let current = 0;
  return labels.map((d) => {
    if (map.has(d)) current = map.get(d)!;
    return current;
  });
}


/* ================= PODIUM ================= */

function Podium({ winners }: { winners: Winner[] }) {
  const text = useColorModeValue('gray.800', 'white');
  const muted = useColorModeValue('gray.500', 'gray.400');

  const order = winners.length === 3
    ? [winners[1], winners[0], winners[2]]
    : [winners[3], winners[1], winners[0], winners[2], winners[4]];

  const heights = winners.length === 3
    ? ['160px', '210px', '140px']
    : ['120px', '170px', '230px', '160px', '130px'];

  return (
    <Box
  width="100vw"
  position="relative"
  left="50%"
  right="50%"
  marginLeft="-50vw"
  marginRight="-50vw"
>
    <Box  display="flex"  justifyContent="center">
     <Box
      display="grid"

     gridTemplateColumns={`repeat(${order.length}, 120px)`}
      justifyContent="center"
      alignItems="end"
      columnGap="18px"

      mt="32px">
      {order.map((w, i) => (
        <Box key={w.githubid} textAlign="center">
          <Avatar
            src={`https://github.com/${w.githubid}.png`}
            size={w.position === 1 ? 'xl' : 'lg'}
            border={`4px solid ${RANK_COLORS[w.position - 1]}`}
            mb="8px"
          />
          <Text fontWeight="800" color={text}>
            {w.name}
          </Text>
          <Text fontSize="12px" color={muted} mb="8px">
            @{w.githubid}
          </Text>
          <Box
            h={heights[i]}
            w="110px"
            bg={RANK_COLORS[w.position - 1]}
            borderRadius="16px 16px 0 0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="22px"
            fontWeight="900"
            color="white"
            boxShadow="xl"
          >
            #{w.position}
          </Box>
        </Box>
      ))}
    </Box>
    </Box>
    </Box>
  );
}

function WinnersHeader() {
  const titleColor = useColorModeValue('gray.900', 'white');
  const subtitleColor = useColorModeValue('gray.600', 'gray.400');
  const dividerColor = useColorModeValue('gray.200', 'whiteAlpha.200');

  return (
    <Stack spacing="12px" align="center" mt="20px">

      

      <Text
        fontSize={{ base: '32px', md: '40px' }}
        fontWeight="900"
        letterSpacing="-0.02em"
        color={titleColor}
        textAlign="center"
      >
        Winners
      </Text>

    
      <Text
        fontSize="14px"
        color={subtitleColor}
        textAlign="center"
        maxW="420px"
      >
        Celebrating the top performers and their journey through Opencode
      </Text>
      <Box
        h="2px"
        w="120px"
        bg={dividerColor}
        borderRadius="full"
        mt="6px"
      />
    </Stack>
  );
}


/* ================= PAGE ================= */

export default function WinnersPodiumComparisonPage() {
  const [tab, setTab] = useState(0);
  const users = tab === 0 ? OVERALL_WINNERS : COLLEGE_WINNERS;

  const labels = useMemo(
    () => buildDateRange('2025-12-26', '2026-01-31'),
    [],
  );

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
        borderColor: RANK_COLORS[i],
        backgroundColor: `${RANK_COLORS[i]}33`,
        fill: true,
        tension: 0.35,
        pointRadius: 2,
      })),
    };
  }, [query.data, users, labels]);

  return (
    <Box minH="100vh" pt="40px">
      <Stack spacing="36px">
        <WinnersHeader />

        <Tabs index={tab} onChange={setTab} variant="soft-rounded" colorScheme="purple">
          <TabList>
            <Tab>Overall</Tab>
            <Tab>College</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Podium winners={OVERALL_WINNERS.slice(0, 3)} />
            </TabPanel>
            <TabPanel>
              <Podium winners={COLLEGE_WINNERS.slice(0, 5)} />
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Box h="380px">
          {query.isLoading && <Skeleton h="100%" />}
          {!query.isLoading && chartData && (
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } },
                scales: { x: { ticks: { maxTicksLimit: 8 } } },
              }}
            />
          )}
        </Box>
      </Stack>
    </Box>
  );
}
