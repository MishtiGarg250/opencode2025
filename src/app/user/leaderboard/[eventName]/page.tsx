'use client';

import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import ColumnsTable from 'views/admin/dataTables/components/ColumnsTable';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';
import { RingLoader } from 'react-spinners';
import { FetchedLeaderboard } from '../../../../api/leaderboard/leaderboard';
import { FaUsers } from 'react-icons/fa';

export default function EventName() {
  const { eventName } = useParams<{ eventName: string }>();

  const textColor = useColorModeValue('gray.800', 'white');
  const mutedText = useColorModeValue('gray.500', 'gray.400');
  const glassBg = useColorModeValue(
    'rgba(255,255,255,0.7)',
    'rgba(15,23,42,0.7)'
  );

  const { data: LeadData, isLoading } = useQuery({
    queryKey: ['LeadInfo', eventName],
    queryFn: () => FetchedLeaderboard(eventName),
    refetchInterval: 10000,
    enabled: !!eventName,
  });

  if (isLoading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <RingLoader color="#7551FF" />
      </Flex>
    );
  }

  type RowObj = {
    position: number;
    name: string;
    prmerged: number;
    githubid: string;
    points: number;
    avatarUrl: string;
    prDetailsURL: string;
  };

  const tableDataColumns: RowObj[] = (LeadData || []).map((item) => ({
    position: item.position,
    name: item.name,
    prmerged: item.prmerged,
    githubid: item.githubid,
    points: item.points,
    avatarUrl: item.avatarUrl,
    prDetailsURL: item.prDetailsURL,
  }));

  const participantCount = tableDataColumns.length;

  return (
    <Box pt={{ base: '120px', md: '90px' }} px={{ base: 4, md: 8 }}>
      
      {/* Header */}
      <Flex
        justify="space-between"
        align="center"
        mb="28px"
        flexWrap="wrap"
        gap="14px"
      >
        {/* Left Title Section */}
        <Box position="relative" display="inline-block">
  <Text
    fontSize={{ base: '34px', md: '44px' }}
    fontWeight="900"
    letterSpacing="-1.6px"
    color={textColor}
  >
    OPENCODE
  </Text>

  {/* Right-side underline with dot */}
  <Flex
    position="absolute"
    right="0"
    bottom="-6px"
    align="center"
    gap="6px"
  >
    <Box
      w="28px"
      h="3px"
      bg="purple.500"
      borderRadius="full"
    />
    <Box
      w="6px"
      h="6px"
      bg="purple.500"
      borderRadius="full"
    />
  </Flex>
</Box>


        {/* Participants Card */}
        <Flex
          align="center"
          gap="12px"
          px="18px"
          py="12px"
          bg={glassBg}
          borderRadius="16px"
          backdropFilter="blur(16px)"
          boxShadow="0 10px 30px rgba(0,0,0,0.08)"
        >
          <Box
            p="10px"
            borderRadius="full"
            bg="purple.100"
            color="purple.600"
          >
            <FaUsers />
          </Box>

          <Box>
            <Text
              fontSize="11px"
              color={mutedText}
              fontWeight="600"
            >
              TOTAL PARTICIPANTS
            </Text>
            <Text
              fontSize="22px"
              fontWeight="800"
              color={textColor}
            >
              {participantCount}
            </Text>
          </Box>
        </Flex>
      </Flex>

      {/* Leaderboard */}
      <ColumnsTable
        tableData={tableDataColumns}
        eventName={decodeURIComponent(eventName ?? '')}
      />
    </Box>
  );
}
