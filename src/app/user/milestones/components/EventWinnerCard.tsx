'use client';

import {
  Avatar,
  Badge,
  Box,
  Flex,
  Icon,
  Progress,
  Text,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { MdEmojiEvents, MdStar } from 'react-icons/md';
import { AutoCarousel } from '../../../../components/ui/AutoCarousel';

interface Event {
  eventName: string;
  winners: Record<number, any[]>;
  eventImage?: string;
}

export function EventWinnersCard({ events }: { events: Event[] }) {
  const router = useRouter();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');

  // 🔑 breakpoint switch
  const isMobile = useBreakpointValue({ base: true, md: false });

  const getRankStyle = (rank: number) => {
    if (rank === 1) return { icon: 'yellow.400', label: 'Gold' };
    if (rank === 2) return { icon: 'gray.400', label: 'Silver' };
    if (rank === 3) return { icon: 'orange.400', label: 'Bronze' };
    return { icon: 'purple.400', label: 'Winner' };
  };

  const renderCard = (event: Event, eventIdx: number) => (
    <Box
      key={`${event.eventName}-${eventIdx}`}
      bg={cardBg}
      p={{ base: '16px', md: '24px' }}
      borderRadius={{ base: '20px', md: '30px' }}
      boxShadow="xl"
      border="1px solid"
      borderColor={borderColor}
      minH={{ base: '380px', md: '450px' }}
      display="flex"
      flexDirection="column"
      overflow="hidden"
    >
      {/* Header */}
      <Flex
        align="center"
        mb={{ base: '14px', md: '20px' }}
        pb={{ base: '12px', md: '16px' }}
        borderBottom="1px dashed"
        borderColor="gray.200"
      >
        <Flex
          w={{ base: '32px', md: '40px' }}
          h={{ base: '32px', md: '40px' }}
          bg="purple.100"
          borderRadius="10px"
          align="center"
          justify="center"
          mr="12px"
          flexShrink={0}
        >
          <Icon as={MdEmojiEvents} color="purple.600" w={5} h={5} />
        </Flex>

        <Box overflow="hidden">
          <Text
            fontSize="10px"
            fontWeight="700"
            color="purple.500"
            textTransform="uppercase"
            letterSpacing="0.08em"
          >
            Event Champion
          </Text>
          <Text
            fontSize={{ base: '15px', md: '18px' }}
            fontWeight="800"
            noOfLines={1}
          >
            {event.eventName}
          </Text>
        </Box>
      </Flex>

      {/* Content */}
      <Box
        flex="1"
        overflowY="auto"
        pr="2px"
        css={{
          '&::-webkit-scrollbar': { width: '3px' },
          '&::-webkit-scrollbar-thumb': {
            background: '#CBD5E0',
            borderRadius: '4px',
          },
        }}
      >
        {Object.entries(event.winners).map(([rank, users]) => {
          const styles = getRankStyle(Number(rank));

          return (
            <Box key={rank} mb={{ base: '14px', md: '20px' }}>
              <Flex align="center" mb="8px">
                <Icon as={MdStar} color={styles.icon} mr="6px" />
                <Text
                  fontWeight="700"
                  fontSize="12px"
                  color="gray.500"
                  textTransform="uppercase"
                >
                  {styles.label}
                </Text>
              </Flex>

              {users.map((u, i) => (
                <Box
                  key={u.userId ? `${u.userId}-${i}` : `user-${rank}-${i}`}
                  p={{ base: '10px', md: '12px' }}
                  borderRadius="14px"
                  bg={useColorModeValue('white', 'whiteAlpha.50')}
                  border="1px solid"
                  borderColor={useColorModeValue('gray.100', 'gray.600')}
                  mb="8px"
                  cursor="pointer"
                  onClick={() =>
                    u.userId && router.push(`/user/profile/${u.userId}`)
                  }
                >
                  <Flex align="center">
                    <Avatar
                      src={u.avatar}
                      size={{ base: 'xs', md: 'sm' }}
                      mr="10px"
                    />

                    <Box flex="1" overflow="hidden">
                      <Text fontWeight="700" fontSize="13px" noOfLines={1}>
                        {u.name}
                      </Text>
                      <Text fontSize="11px" color="gray.500" noOfLines={1}>
                        @{u.username}
                      </Text>
                    </Box>

                    {u.score && (
                      <Badge
                        colorScheme="purple"
                        borderRadius="6px"
                        fontSize="10px"
                      >
                        {u.score}
                      </Badge>
                    )}
                  </Flex>

                  {/* Progress only on desktop */}
                  {!isMobile && u.score && (
                    <Box mt="6px">
                      <Progress
                        value={Math.min((u.score % 100) + 40, 100)}
                        size="xs"
                        borderRadius="full"
                        colorScheme={
                          Number(rank) === 1
                            ? 'yellow'
                            : Number(rank) === 2
                            ? 'gray'
                            : 'orange'
                        }
                      />
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          );
        })}
      </Box>
    </Box>
  );


  if (isMobile) {
    return (
      <Flex direction="column" gap="16px">
        {events.map(renderCard)}
      </Flex>
    );
  }

  return <AutoCarousel>{events.map(renderCard)}</AutoCarousel>;
}
