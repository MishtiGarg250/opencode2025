'use client';

import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import ColumnsTable, { type RowObj } from 'views/admin/dataTables/components/ColumnsTable';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';
import { FaUsers } from 'react-icons/fa';
import LeaderboardLoader from 'components/common/LeaderboardLoader';
import { FetchedLeaderboard } from '../../../../api/leaderboard/leaderboard';

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
    return <LeaderboardLoader />;
  }

  const tableDataColumns: RowObj[] = (LeadData || []).map((item) => ({
    position: String(item.position),
    name: item.name,
    prmerged: Number(item.prmerged),
    githubid: item.githubid,
    points: Number(item.points),
    avatarUrl: item.avatarUrl,
    prDetailsURL: item.prDetailsURL,
  }));

  const participantCount = tableDataColumns.length;

  return (
    <Box
      pt={{ base: '110px', md: '90px' }}
      px={{ base: '16px', md: '32px' }}
      maxW="1400px"
      mx="auto"
    >
      {/* Header */}
      <Flex
        justify="space-between"
        align={{ base: 'flex-start', md: 'center' }}
        mb={{ base: '20px', md: '28px' }}
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: '18px', md: '14px' }}
      >
        {/* Title */}
        <Box position="relative" w="fit-content">
          <Text
            fontSize={{ base: '30px', sm: '36px', md: '44px' }}
            fontWeight="900"
            letterSpacing="-1.4px"
            color={textColor}
            lineHeight="1"
          >
            OPENCODE
          </Text>

          <Flex
            position="absolute"
            right="0"
            bottom={{ base: '-4px', md: '-6px' }}
            align="center"
            gap="6px"
          >
            <Box
              w={{ base: '22px', md: '28px' }}
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
          px={{ base: '14px', md: '18px' }}
          py={{ base: '10px', md: '12px' }}
          bg={glassBg}
          borderRadius="16px"
          backdropFilter="blur(16px)"
          boxShadow="0 10px 30px rgba(0,0,0,0.08)"
          w={{ base: '100%', sm: 'auto' }}
          justify={{ base: 'center', sm: 'flex-start' }}
        >
          <Box
            p="10px"
            borderRadius="full"
            bg="purple.100"
            color="purple.600"
            fontSize="14px"
          >
            <FaUsers />
          </Box>

          <Box textAlign={{ base: 'center', sm: 'left' }}>
            <Text
              fontSize="11px"
              color={mutedText}
              fontWeight="600"
              letterSpacing="0.6px"
            >
              TOTAL PARTICIPANTS
            </Text>
            <Text
              fontSize={{ base: '20px', md: '22px' }}
              fontWeight="800"
              color={textColor}
            >
              {participantCount}
            </Text>
          </Box>
        </Flex>
      </Flex>

      {/* Leaderboard Table */}
      <ColumnsTable
        tableData={tableDataColumns}
        eventName={decodeURIComponent(eventName ?? '')}
      />
    </Box>
  );
}