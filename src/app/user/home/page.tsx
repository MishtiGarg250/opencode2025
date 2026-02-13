'use client';

import { Box, Button, Image } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  const handleLeaderboardClick = () => {
    router.push('/user/leaderboard/opencode');
  };

  return (
    <Box pt={{ base: '90px', md: '80px', xl: '80px' }}>
      <Box
        position="relative"
        minH={{ base: '37vh', md: '80vh' }}
        overflow="hidden"
        borderRadius={{ base: '16px', md: '20px' }}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bgGradient="linear(to-b, rgba(0,0,0,0.1), rgba(0,0,0.3,0.9))"
        />
        <Image
          src="/img/dashboards/opencodeBG.png"
          alt="OpenCode"
          objectFit="cover"
          width="100%"
          height="100%"
        />
        <Box
          position="absolute"
          bottom={{ base: '3', md: '8' }}
          left="50%"
          transform="translateX(-50%)"
          zIndex="2"
          textAlign="center"
          w={{ base: '100%', sm: 'auto' }}
          px={{ base: '16px', sm: '0' }}
        >
          <Button
            w={{ base: '100%', sm: 'auto' }}
            colorScheme="teal"
            onClick={handleLeaderboardClick}
            bg="linear-gradient(to right, #001f3f, #003366)"
            _hover={{ bg: 'linear-gradient(to right, #001a33, #001f3f)' }}
            color="white"
          >
            OpenCode Leaderboard
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
