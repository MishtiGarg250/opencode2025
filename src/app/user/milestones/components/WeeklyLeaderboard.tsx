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
  change?: number;
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
  const podiumContainerBg = useColorModeValue('white', 'gray.900');

  const sortedWeeks = [...weeks].sort((a, b) => b.week - a.week);
  const isSingleWeek = sortedWeeks.length === 1;

  // COMPACT PODIUM SIZES
  const getPodiumStyles = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          bg: '#EAC94B',
          shadow: '0px 6px 12px rgba(234, 201, 75, 0.4)',
          height: '110px', // Reduced from 160px
        };
      case 2:
        return {
          bg: '#A0AEC0',
          shadow: '0px 6px 12px rgba(160, 174, 192, 0.4)',
          height: '80px', // Reduced from 120px
        };
      case 3:
        return {
          bg: '#ED8936',
          shadow: '0px 6px 12px rgba(237, 137, 54, 0.4)',
          height: '60px', // Reduced from 100px
        };
      default:
        return { bg: 'purple.500', shadow: 'none', height: '50px' };
    }
  };

  return (
    <AutoCarousel>
      {sortedWeeks.map((week) => {
        if (!week?.data) return null;

        const topThree = week.data.slice(0, 3);
        const rest = week.data.slice(3);

        const first = topThree.find((u) => u.rank === 1);
        const second = topThree.find((u) => u.rank === 2);
        const third = topThree.find((u) => u.rank === 3);

        const podiumDisplay = [second, first, third].filter(
          Boolean,
        ) as LeaderboardUser[];

        return (
          <Box
            key={week.week}
            bg={cardBg}
            borderRadius="24px"
            boxShadow="xl"
            overflow="hidden"
            border="1px solid"
            borderColor={useColorModeValue('gray.100', 'gray.700')}
            h={isSingleWeek ? { base: '600px', md: '620px' } : '540px'}
            display="flex"
            flexDirection="column"
            w="100%"
            maxW={
              isSingleWeek
                ? { base: '92vw', md: '520px', xl: '620px' }
                : '100%'
            }
            mx={isSingleWeek ? 'auto' : '0'}
          >
            {/* Header */}
            <Flex
              bgGradient="linear(to-r, #4c51bf, #667eea)"
              py={isSingleWeek ? '16px' : '12px'}
              px={isSingleWeek ? '24px' : '20px'} // Reduced vertical padding
              justify="space-between"
              align="center"
              color="white"
            >
              <Box>
                <Text
                  fontSize="10px"
                  fontWeight="700"
                  opacity={0.8}
                  letterSpacing="1px"
                >
                  WEEKLY CHAMPION
                </Text>
                <Text fontSize="20px" fontWeight="900">
                  Week {week.week}
                </Text>
              </Box>
              <Icon as={FaTrophy} w={5} h={5} color="yellow.300" />
            </Flex>

            {/* Podium Section - COMPACT VERSION */}
            <Box
              bg={podiumContainerBg}
              pt={isSingleWeek ? '30px' : '25px'}
              pb={isSingleWeek ? '20px' : '15px'}
              px={isSingleWeek ? '16px' : '10px'}
              flexShrink={0}
            >
              <Flex justify="center" align="flex-end" gap={isSingleWeek ? '12px' : '8px'}>
                {podiumDisplay.map((user) => {
                  const style = getPodiumStyles(user.rank);
                  const isFirst = user.rank === 1;

                  return (
                    <VStack
                      key={user.rank}
                      spacing={0}
                      cursor="pointer"
                      onClick={() =>
                        router.push(`/user/profile/${user.userId}`)
                      }
                      zIndex={isFirst ? 2 : 1}
                      w="30%"
                    >
                      {/* Avatar Group */}
                      <Box position="relative" mb="-12px" zIndex={2}>
                        {isFirst && (
                          <MotionBox
                            initial={{ y: 0 }}
                            animate={{ y: -5 }}
                            transition={{
                              repeat: Infinity,
                              repeatType: 'reverse',
                              duration: 1,
                            }}
                            position="absolute"
                            top="-22px"
                            left="0"
                            right="0"
                            textAlign="center"
                          >
                            <Icon
                              as={FaCrown}
                              color="yellow.400"
                              w={4}
                              h={4}
                              filter="drop-shadow(0 2px 2px rgba(0,0,0,0.2))"
                            />
                          </MotionBox>
                        )}

                        <Avatar
                          src={user.avatar}
                          size={isFirst ? 'lg' : 'md'} // Smaller avatars
                          border="3px solid white"
                          boxShadow="md"
                        />
                        <Badge
                          position="absolute"
                          bottom="0"
                          left="50%"
                          transform="translateX(-50%)"
                          borderRadius="full"
                          bg="white"
                          color="gray.800"
                          boxShadow="sm"
                          fontSize="10px"
                          px={1.5}
                        >
                          {user.rank}
                        </Badge>
                      </Box>

                      {/* Solid Block Podium */}
                      <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        w="100%"
                        h={style.height}
                        bg={style.bg}
                        borderTopRadius="10px"
                        borderBottomRadius="4px"
                        boxShadow={style.shadow}
                        pt="12px"
                        transition="transform 0.2s"
                        _hover={{ transform: 'translateY(-2px)' }}
                      >
                        <Text
                          color="white"
                          fontWeight="800"
                          fontSize={
                            isSingleWeek
                              ? isFirst
                                ? '16px'
                                : '14px'
                              : isFirst
                                ? '14px'
                                : '12px'
                          }
                          textAlign="center"
                          lineHeight="1.1"
                          px={1}
                          noOfLines={1}
                        >
                          {user.name.split(' ')[0]}
                        </Text>
                        <Text
                          color="whiteAlpha.900"
                          fontWeight="700"
                          fontSize={isSingleWeek ? '12px' : '11px'}
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

            {/* Rest of the List (Now has more room) */}
            <Box
              flex="1"
              overflowY="auto"
              px="12px"
              pb="12px"
              pt="4px"
              css={{
                '&::-webkit-scrollbar': { width: '4px' },
                '&::-webkit-scrollbar-thumb': {
                  background: '#CBD5E0',
                  borderRadius: '4px',
                },
              }}
            >
              <VStack spacing={isSingleWeek ? '10px' : '6px'}>
                {rest.map((user, index) => (
                  <Flex
                    key={`${user.userId || user.username || user.name}-${user.rank}-${user.score}-${index}`}
                    w="full"
                    p={isSingleWeek ? '12px' : '8px'} // Reduced padding for list items
                    borderRadius="10px"
                    bg={useColorModeValue('gray.50', 'whiteAlpha.100')}
                    align="center"
                    _hover={{ bg: 'purple.50' }}
                  >
                    <Text
                      w="20px"
                      fontWeight="800"
                      color="gray.400"
                      fontSize="12px"
                    >
                      {user.rank}
                    </Text>
                    <Avatar src={user.avatar} size="xs" mr="10px" />
                    <Box flex="1">
                      <Text fontWeight="700" fontSize="13px" noOfLines={1}>
                        {user.name}
                      </Text>
                    </Box>
                    <Text fontWeight="700" fontSize="13px" color="purple.600">
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
