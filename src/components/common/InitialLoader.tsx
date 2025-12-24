'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import seoRankingAnimation from 'assets/lottie/SeoRanking.json';
import trophyAnimation from 'assets/lottie/Trophy.json';
import Lottie from 'lottie-react';

type InitialLoaderProps = {
  isExiting?: boolean;
  onComplete?: () => void;
  variant?: 'seo' | 'trophy';
};

export default function InitialLoader({
  isExiting = false,
  onComplete,
  variant = 'seo',
}: InitialLoaderProps) {
  const animationData =
    variant === 'trophy' ? trophyAnimation : seoRankingAnimation;
  const message =
    variant === 'trophy' ? 'Loading leaderboard…' : 'Loading the experience…';
  return (
    <Box
      position="fixed"
      inset={0}
      zIndex={2000}
      bg="rgb(8, 6, 21)"
      color="white"
      opacity={isExiting ? 0 : 1}
      transform={isExiting ? 'scale(0.98)' : 'scale(1)'}
      transition="opacity 350ms ease, transform 350ms ease"
    >
      <Flex direction="column" align="center" justify="center" h="100%" gap={4}>
        <Box w={{ base: '200px', md: '260px' }}>
          <Lottie
            animationData={animationData}
            loop={false}
            onComplete={onComplete}
          />
        </Box>
        <Text
          fontSize={{ base: 'md', md: 'lg' }}
          fontWeight="600"
          opacity={0.85}
        >
          {message}
        </Text>
      </Flex>
    </Box>
  );
}
