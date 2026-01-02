'use client';

import { Box } from '@chakra-ui/react';

interface WinterDustProps {
  top?: string | number;
  left?: string | number;
  hideOnMobile?: boolean;
}

export default function WinterDust({
  top = '120px',
  left = '80px',
  hideOnMobile = false,
}: WinterDustProps) {
  return (
    <Box
      position="absolute"
      top={top}
      left={left}
      zIndex={1}
      pointerEvents="none"
      display={hideOnMobile ? { base: 'none', md: 'block' } : 'block'}
    >
      {/* Soft glow */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="140px"
        h="140px"
        bg="white"
        opacity={0.05}
        filter="blur(90px)"
        borderRadius="full"
      />

      {/* Floating dot */}
      <Box
        position="absolute"
        top="20px"
        left="40px"
        w="8px"
        h="8px"
        borderRadius="full"
        bg="white"
        opacity={0.6}
        boxShadow="0 0 12px rgba(255,255,255,0.6)"
      />

      <Box
        position="absolute"
        top="60px"
        left="10px"
        w="5px"
        h="5px"
        borderRadius="full"
        bg="white"
        opacity={0.4}
      />
    </Box>
  );
}
