'use client';

import { Box, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

type AtmosphereProps = {
  children: ReactNode;
  paddingX?: { base: number | string; md: number | string } | number | string;
  paddingY?: { base: number | string; md: number | string } | number | string;
  tone?: 'violet' | 'midnight';
};

export default function Atmosphere({
  children,
  paddingX = { base: 4, md: 10 },
  paddingY = { base: 10, md: 14 },
  tone = 'violet',
}: AtmosphereProps) {
  const lightBase = tone === 'violet' ? '#f5f2ff' : '#f2f7ff';
  const darkBase = tone === 'violet' ? '#070b1f' : '#050814';
  const baseBg = useColorModeValue(lightBase, darkBase);

  const accentA = useColorModeValue(
    tone === 'violet' ? 'rgba(110, 75, 255, 0.16)' : 'rgba(46, 115, 255, 0.16)',
    tone === 'violet'
      ? 'rgba(130, 102, 255, 0.25)'
      : 'rgba(66, 147, 255, 0.22)',
  );
  const accentB = useColorModeValue(
    tone === 'violet'
      ? 'rgba(255, 255, 255, 0.8)'
      : 'rgba(255, 255, 255, 0.08)',
    tone === 'violet'
      ? 'rgba(255, 255, 255, 0.06)'
      : 'rgba(255, 255, 255, 0.06)',
  );
  const accentC = useColorModeValue(
    tone === 'violet'
      ? 'rgba(255, 121, 198, 0.22)'
      : 'rgba(95, 238, 255, 0.22)',
    tone === 'violet' ? 'rgba(255, 121, 198, 0.2)' : 'rgba(95, 238, 255, 0.18)',
  );

  return (
    <Box
      position="relative"
      minH="100vh"
      bg={baseBg}
      px={paddingX}
      py={paddingY}
      overflow="hidden"
    >
      {/* flowing streak */}
      <Box
        position="absolute"
        inset="-25% -40% auto"
        height={{ base: '60vh', md: '55vh' }}
        bgGradient={
          tone === 'violet'
            ? 'linear(to-r, rgba(96, 57, 255, 0.9), rgba(132, 70, 255, 0.6), rgba(255, 255, 255, 0.8))'
            : 'linear(to-r, rgba(29, 105, 255, 0.85), rgba(78, 205, 255, 0.65), rgba(255, 255, 255, 0.16))'
        }
        filter="blur(18px)"
        transform="rotate(-8deg)"
        borderRadius="50px"
      />

      {/* soft blob bottom-left */}
      <Box
        position="absolute"
        bottom="-18%"
        left="-10%"
        w={{ base: '60vw', md: '38vw' }}
        h={{ base: '60vw', md: '38vw' }}
        bg={accentA}
        filter="blur(30px)"
        borderRadius="40%"
      />

      {/* soft blob top-right */}
      <Box
        position="absolute"
        top="-12%"
        right="-8%"
        w={{ base: '52vw', md: '32vw' }}
        h={{ base: '52vw', md: '32vw' }}
        bg={accentC}
        filter="blur(32px)"
        borderRadius="45%"
      />

      {/* floating pebbles */}
      <Box
        position="absolute"
        top="16%"
        left="6%"
        w={{ base: '80px', md: '110px' }}
        h={{ base: '80px', md: '110px' }}
        bg={accentB}
        borderRadius="35%"
        transform="rotate(18deg)"
      />
      <Box
        position="absolute"
        top="30%"
        right="12%"
        w={{ base: '72px', md: '100px' }}
        h={{ base: '72px', md: '100px' }}
        bg={accentB}
        borderRadius="999px"
        opacity={0.85}
      />

      {/* content */}
      <Box position="relative" zIndex={1} maxW="1400px" mx="auto" width="100%">
        {children}
      </Box>
    </Box>
  );
}
