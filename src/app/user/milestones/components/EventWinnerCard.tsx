'use client';

import {
  Avatar,
  Box,
  Flex,
  Icon,
  Progress,
  Text,
  useBreakpointValue,
  useColorModeValue,
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
  const isMobile = useBreakpointValue({ base: true, md: false });

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const surfaceBg = useColorModeValue('white', 'whiteAlpha.50');
  const surfaceBorder = useColorModeValue('gray.100', 'whiteAlpha.200');
  const mutedText = useColorModeValue('gray.600', 'gray.400');
  const labelText = useColorModeValue('purple.600', 'purple.300');
  const headerBorder = useColorModeValue('gray.200', 'whiteAlpha.300');
  const cardShadow = useColorModeValue(
    '0 24px 60px rgba(15,23,42,0.10)',
    '0 30px 70px rgba(0,0,0,0.45)',
  );

  const rankStyles = {
    1: {
      bg: useColorModeValue('yellow.50', 'rgba(234,201,75,0.12)'),
      border: useColorModeValue('yellow.200', 'rgba(234,201,75,0.4)'),
      icon: 'yellow.400',
      label: 'Gold',
      avatarBg: '#F6C343',
      avatarColor: '#1A202C',
      badgeBg: useColorModeValue('yellow.100', 'rgba(234,201,75,0.2)'),
    },
    2: {
      bg: useColorModeValue('gray.50', 'rgba(160,174,192,0.12)'),
      border: useColorModeValue('gray.200', 'rgba(160,174,192,0.4)'),
      icon: 'gray.400',
      label: 'Silver',
      avatarBg: '#CBD5E0',
      avatarColor: '#1A202C',
      badgeBg: useColorModeValue('gray.100', 'rgba(160,174,192,0.2)'),
    },
    3: {
      bg: useColorModeValue('orange.50', 'rgba(237,137,54,0.12)'),
      border: useColorModeValue('orange.200', 'rgba(237,137,54,0.4)'),
      icon: 'orange.400',
      label: 'Bronze',
      avatarBg: '#ED8936',
      avatarColor: '#1A202C',
      badgeBg: useColorModeValue('orange.100', 'rgba(237,137,54,0.2)'),
    },
    default: {
      bg: useColorModeValue('purple.50', 'rgba(128,90,213,0.12)'),
      border: useColorModeValue('purple.100', 'rgba(128,90,213,0.35)'),
      icon: 'purple.400',
      label: 'Winner',
      avatarBg: useColorModeValue('purple.500', 'purple.400'),
      avatarColor: 'white',
      badgeBg: useColorModeValue('purple.100', 'rgba(128,90,213,0.2)'),
    },
  };

  const getRankStyle = (rank: number) =>
    rankStyles[rank as 1 | 2 | 3] ?? rankStyles.default;

  const renderCard = (event: Event, eventIdx: number) => (
    <Box
      key={`${event.eventName}-${eventIdx}`}
      bg={cardBg}
      p={{ base: '20px', md: '26px' }}
      borderRadius="30px"
      boxShadow={cardShadow}
      border="1px solid"
      borderColor={borderColor}
      minH={{ base: '420px', md: '500px' }}
      display="flex"
      flexDirection="column"
      position="relative"
      overflow="hidden"
    >
      {/* Header */}
      <Flex
        align="center"
        mb="22px"
        pb="16px"
        borderBottom="1px dashed"
        borderColor={headerBorder}
      >
        <Flex
          w="40px"
          h="40px"
          bg={useColorModeValue('purple.100', 'whiteAlpha.200')}
          borderRadius="12px"
          align="center"
          justify="center"
          mr="14px"
          flexShrink={0}
        >
          <Icon
            as={MdEmojiEvents}
            color={useColorModeValue('purple.600', 'purple.300')}
            w={6}
            h={6}
          />
        </Flex>
        <Box overflow="hidden">
          <Text
            fontSize="10px"
            fontWeight="bold"
            color={labelText}
            textTransform="uppercase"
            letterSpacing="1px"
          >
            Event Champion
          </Text>
          <Text
            fontSize={{ base: '18px', md: '20px' }}
            fontWeight="800"
            lineHeight="1.1"
            noOfLines={1}
            title={event.eventName}
          >
            {event.eventName}
          </Text>
        </Box>
      </Flex>

      {/* Content */}
      <Box
        flex="1"
        overflowY="auto"
        pr="4px"
        css={{
          '&::-webkit-scrollbar': { width: '4px' },
          '&::-webkit-scrollbar-thumb': {
            background: '#E2E8F0',
            borderRadius: '4px',
          },
        }}
      >
        {Object.entries(event.winners).map(([rank, users]) => {
          const styles = getRankStyle(Number(rank));

          return (
            <Box
              key={rank}
              mb="18px"
              p={{ base: '12px', md: '14px' }}
              borderRadius="18px"
              bg={styles.bg}
              border="1px solid"
              borderColor={styles.border}
            >
              <Flex align="center" mb="10px" gap="8px">
                <Icon as={MdStar} color={styles.icon} />
                <Text
                  fontWeight="700"
                  fontSize="12px"
                  color={useColorModeValue('gray.600', 'gray.300')}
                  textTransform="uppercase"
                  letterSpacing="0.6px"
                >
                  {styles.label}
                </Text>
              </Flex>

              {users.map((u, i) => (
                <Box
                  key={u.userId ? `${u.userId}-${i}` : `user-${rank}-${i}`}
                  p={{ base: '12px', md: '14px' }}
                  borderRadius="16px"
                  bg={surfaceBg}
                  border="1px solid"
                  borderColor={surfaceBorder}
                  boxShadow="sm"
                  mb="10px"
                  cursor="pointer"
                  onClick={() =>
                    u.userId && router.push(`/user/profile/${u.userId}`)
                  }
                  _hover={{
                    borderColor: styles.border,
                    transform: 'translateY(-3px)',
                    boxShadow: 'md',
                  }}
                  transition="all 0.2s"
                >
                  <Flex align="center" gap="12px" mb="8px">
                    <Avatar
                      src={u.avatar}
                      name={u.name}
                      size="sm"
                      ring={2}
                      ringColor={styles.icon}
                      bg={styles.avatarBg}
                      color={styles.avatarColor}
                      border="2px solid"
                      borderColor={styles.border}
                    />
                    <Box flex="1" overflow="hidden">
                      <Text
                        fontWeight="700"
                        fontSize={{ base: '14px', md: '15px' }}
                        noOfLines={1}
                      >
                        {u.name}
                      </Text>
                      <Text
                        fontSize="13px"
                        color={mutedText}
                        fontWeight="600"
                        noOfLines={1}
                      >
                        {u.college ? u.college : `@${u.username}`}
                      </Text>
                    </Box>
                    {u.score && (
                      <Box
                        px="10px"
                        py="4px"
                        borderRadius="full"
                        bg={styles.badgeBg}
                        color={useColorModeValue('gray.700', 'white')}
                        fontSize="12px"
                        fontWeight="700"
                        border="1px solid"
                        borderColor={styles.border}
                        minW="72px"
                        textAlign="center"
                      >
                        {u.score}
                      </Box>
                    )}
                  </Flex>

                  {!isMobile && u.score && (
                    <Box mt="6px">
                      <Progress
                        value={Math.min((u.score % 100) + 40, 100)}
                        size="xs"
                        colorScheme={
                          Number(rank) === 1
                            ? 'yellow'
                            : Number(rank) === 2
                              ? 'gray'
                              : 'orange'
                        }
                        borderRadius="full"
                        hasStripe={Number(rank) === 1}
                        isAnimated={Number(rank) === 1}
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
