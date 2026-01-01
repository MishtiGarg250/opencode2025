'use client';

import { Box, Text,Flex } from '@chakra-ui/react';

export default function MobileWinterDecor() {
  return (
    <Box
      position="absolute"
      top="85px"
      right="16px"
      zIndex={1}
      pointerEvents="none"
      display={{ base: 'block', md: 'none' }}
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

    </Box>
  );
}
