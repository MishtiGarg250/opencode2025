'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import trophyAnimation from 'assets/lottie/Trophy.json';
import Lottie from 'lottie-react';

export default function LeaderboardLoader() {
  return (
    <Box
      position="fixed"
      inset={0}
      zIndex={2000}
      bg="rgb(8, 6, 21)"
      color="white"
    >
      <Flex direction="column" align="center" justify="center" h="100%" gap={4}>
        <Box w={{ base: '200px', md: '260px' }}>
          <Lottie animationData={trophyAnimation} loop />
        </Box>
        <Text
          fontSize={{ base: 'md', md: 'lg' }}
          fontWeight="600"
          opacity={0.85}
        >
          Loading leaderboard…
        </Text>
      </Flex>
    </Box>
  );
}
