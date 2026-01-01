'use client';

import { Box, Flex, Text } from '@chakra-ui/react';

interface WinterClusterProps {
  /** Top offset (px or responsive object) */
  top?: string | number;
  /** Right offset (px or responsive object) */
  right?: string | number;
  /** Hide on mobile */
  hideOnMobile?: boolean;
}

export default function WinterCluster({
  top = '130px',
  right = '75px',
  hideOnMobile = false,
}: WinterClusterProps) {
  return (
    <Box
      position="absolute"
      top={top}
      right={right}
      zIndex={1}
      pointerEvents="none"
      display={hideOnMobile ? { base: 'none', md: 'block' } : 'block'}
    >
      
      <Flex
        position="absolute"
        top="0"
        right="0"
        w="72px"
        h="72px"
        borderRadius="full"
        bg="white"
        align="center"
        justify="center"
        boxShadow="0 0 60px rgba(128,90,213,0.65)"
        opacity={0.9}
      >
        <Text fontSize="28px">❄️</Text>
      </Flex>

    
      <Flex
        position="absolute"
        top="56px"
        right="72px"
        w="36px"
        h="36px"
        borderRadius="full"
        bg="white"
        align="center"
        justify="center"
        opacity={0.7}
        boxShadow="0 0 30px rgba(128,90,213,0.4)"
      >
        <Text fontSize="16px">❄️</Text>
      </Flex>

      <Flex
        position="absolute"
        top="-24px"
        right="48px"
        w="28px"
        h="28px"
        borderRadius="full"
        bg="white"
        align="center"
        justify="center"
        opacity={0.6}
        boxShadow="0 0 24px rgba(128,90,213,0.35)"
      >
        <Text fontSize="14px">❄️</Text>
      </Flex>

      {/* Ambient micro dot */}
      <Box
        position="absolute"
        top="40px"
        right="-18px"
        w="12px"
        h="12px"
        borderRadius="full"
        bg="white"
        opacity={0.25}
        boxShadow="0 0 18px rgba(255,255,255,0.4)"
      />
    </Box>
  );
}
