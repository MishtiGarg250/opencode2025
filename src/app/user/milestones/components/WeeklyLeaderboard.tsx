'use client';

import {
  Avatar,
  Badge,
  Box,
  Flex,
  Icon,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FaCrown, FaTrophy } from 'react-icons/fa';
import { AutoCarousel } from '../../../../components/ui/AutoCarousel';

const MotionBox = motion(Box);

interface LeaderboardUser {
  rank: number;
  name: string;
  score: number;
  avatar: string;
  username: string;
  userId: string;
}

interface WeeklyLeaderboardCardProps {
  weeks: {
    week: number;
    data: LeaderboardUser[];
  }[];
}

export function WeeklyLeaderboardCard({ weeks }: WeeklyLeaderboardCardProps) {
  const router = useRouter();

  const cardBg = useColorModeValue('white', 'gray.800');
  const podiumBg = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const muted = useColorModeValue('gray.500', 'gray.400');

  const sortedWeeks = [...weeks].sort((a, b) => b.week - a.week);
  const isSingleWeek = sortedWeeks.length === 1;

  const podiumStyle = (rank: number) => {
    if (rank === 1)
      return { bg: '#EAC94B', h: '110px', shadow: 'lg', elevate: true };
    if (rank === 2)
      return { bg: '#A0AEC0', h: '82px', shadow: 'md' };
    if (rank === 3)
      return { bg: '#ED8936', h: '68px', shadow: 'md' };
    return { bg: 'purple.500', h: '60px' };
  };

  return (
    <AutoCarousel>
      {sortedWeeks.map((week) => {
        if (!week?.data) return null;

        const [first, second, third] = [
          week.data.find((u) => u.rank === 1),
          week.data.find((u) => u.rank === 2),
          week.data.find((u) => u.rank === 3),
        ];

        const podium = [second, first, third].filter(Boolean) as LeaderboardUser[];
        const rest = week.data.slice(3);

        return (
          <Box
            key={week.week}
            bg={cardBg}
            borderRadius="26px"
            boxShadow="xl"
            border="1px solid"
            borderColor={borderColor}
            overflow="hidden"
            h={isSingleWeek ? '620px' : '540px'}
            maxW={isSingleWeek ? '620px' : '100%'}
            mx="auto"
            display="flex"
            flexDirection="column"
          >
            {/* Header */}
            <Flex
              bgGradient="linear(to-r, #4c51bf, #667eea)"
              px="22px"
              py="14px"
              align="center"
              justify="space-between"
              color="white"
            >
              <Box>
                <Text
                  fontSize="10px"
                  letterSpacing="0.14em"
                  opacity={0.85}
                  fontWeight="700"
                >
                  WEEKLY LEADERBOARD
                </Text>
                <Text fontSize="20px" fontWeight="900">
                  Week {week.week}
                </Text>
              </Box>
              <Icon as={FaTrophy} color="yellow.400" />
            </Flex>

            {/* Podium */}
            <Box bg={podiumBg} px="16px" pt="28px" pb="20px">
              <Flex justify="center" align="flex-end" gap="12px">
                {podium.map((user) => {
                  const style = podiumStyle(user.rank);
                  const isFirst = user.rank === 1;

                  return (
                    <VStack
                      key={user.rank}
                      spacing={0}
                      w="32%"
                      cursor="pointer"
                      zIndex={isFirst ? 2 : 1}
                      onClick={() =>
                        router.push(`/user/profile/${user.userId}`)
                      }
                    >
                      {/* Avatar */}
                      <Box position="relative" mb="-10px">
                        {isFirst && (
                          <MotionBox
                            animate={{ y: [-2, 2, -2] }}
                            transition={{ repeat: Infinity, duration: 1.6 }}
                            position="absolute"
                            top="-22px"
                            left="50%"
                            transform="translateX(-50%)"
                          >
                            <Icon
                              as={FaCrown}
                              color="yellow.400"
                              w={4}
                              h={4}
                              filter="drop-shadow(0 2px 2px rgba(0,0,0,0.25))"
                            />
                          </MotionBox>
                        )}

                        <Avatar
                          src={user.avatar}
                          size={isFirst ? 'lg' : 'md'}
                          border="3px solid white"
                          boxShadow="md"
                        />

                        <Badge
                          position="absolute"
                          bottom="-4px"
                          left="50%"
                          transform="translateX(-50%)"
                          borderRadius="full"
                          fontSize="10px"
                          bg="white"
                          color="gray.700"
                          px={2}
                        >
                          #{user.rank}
                        </Badge>
                      </Box>

                      {/* Podium Block */}
                      <Flex
                        w="100%"
                        h={style.h}
                        bg={style.bg}
                        borderRadius="12px"
                        align="center"
                        justify="center"
                        direction="column"
                        boxShadow={style.shadow}
                        pt="14px"
                        _hover={{ transform: 'translateY(-2px)' }}
                        transition="all 0.2s"
                      >
                        <Text
                          color="white"
                          fontWeight="900"
                          fontSize={isFirst ? '16px' : '14px'}
                          noOfLines={1}
                          textAlign="center"
                          px={1}
                        >
                          {user.name.split(' ')[0]}
                        </Text>
                        <Text
                          color="whiteAlpha.900"
                          fontSize="12px"
                          fontWeight="700"
                          mt="4px"
                        >
                          {user.score}
                        </Text>
                      </Flex>
                    </VStack>
                  );
                })}
              </Flex>
            </Box>

            {/* List */}
            <Box
              flex="1"
              overflowY="auto"
              px="14px"
              py="12px"
              css={{
                '&::-webkit-scrollbar': { width: '4px' },
                '&::-webkit-scrollbar-thumb': {
                  background: '#CBD5E0',
                  borderRadius: '4px',
                },
              }}
            >
              <VStack spacing="8px">
                {rest.map((user, i) => (
                  <Flex
                    key={`${user.userId}-${user.rank}-${i}`}
                    w="full"
                    align="center"
                    p="10px"
                    borderRadius="12px"
                    bg={useColorModeValue('gray.50', 'whiteAlpha.100')}
                    _hover={{ bg: 'purple.500' }}
                  >
                    <Text
                      w="26px"
                      fontWeight="800"
                      fontSize="12px"
                      color={muted}
                        _hover={{ bg: 'purple.50' }}
                    >
                      #{user.rank}
                    </Text>
                    <Avatar src={user.avatar} size="xs" mr="10px" />
                    <Text
                      flex="1"
                      fontWeight="700"
                      fontSize="13px"
                      noOfLines={1}
                      
                    >
                      {user.name}
                    </Text>
                    <Text fontWeight="800" fontSize="13px" color="purple.600">
                      {user.score}
                    </Text>
                  </Flex>
                ))}
              </VStack>
            </Box>
          </Box>
        );
      })}
    </AutoCarousel>
  );
}
