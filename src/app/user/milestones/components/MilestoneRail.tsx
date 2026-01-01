'use client';

import { Box, Flex, Icon } from '@chakra-ui/react';
import { FaTrophy, FaStar, FaFlagCheckered, FaUsers, FaFire } from 'react-icons/fa';
import { MdCelebration } from 'react-icons/md';

interface MilestoneRailProps {
  top?: string | number;
  left?: string | number;
  height?: string | number;
  hideOnMobile?: boolean;
}

export default function MilestoneRail({
  top = '160px',
  left = '80px',
  height = '440px',
  hideOnMobile = true,
}: MilestoneRailProps) {
  return (
    <Box
      position="absolute"
      top={top}
      left={left}
      h={height}
      w="2px"
      bg="white"
      opacity={0.15}
      borderRadius="full"
      zIndex={1}
      pointerEvents="none"
      display={hideOnMobile ? { base: 'none', md: 'block' } : 'block'}
    >
      <RailNode top="0%">
        <Icon as={FaUsers} />
      </RailNode>
      <RailNode top="20%">
        <Icon as={FaFire} />
      </RailNode>

      <RailNode top="40%">
        <Icon as={MdCelebration} />
      </RailNode>
      <RailNode top="60%">
        <Icon as={FaTrophy} />
      </RailNode>
      <RailNode top="80%">
        <Icon as={FaFlagCheckered} />
      </RailNode>
      <RailNode top="100%">
        <Icon as={FaStar} />
      </RailNode>
      
    </Box>
  );
}

function RailNode({
  children,
  top,
}: {
  children: React.ReactNode;
  top: string;
}) {
  return (
    <Flex
      position="absolute"
      top={top}
      left="50%"
      transform="translateX(-50%)"
      align="center"
      justify="center"
      w="34px"
      h="34px"
      borderRadius="full"
      border="2px solid"
      borderColor="purple.300"
      bg="gray.900"
      boxShadow="0 0 18px rgba(128,90,213,0.4)"
      zIndex={2}
    >
      <Flex
        w="22px"
        h="22px"
        borderRadius="full"
        bg="purple.500"
        align="center"
        justify="center"
        color="white"
        fontSize="12px"
      >
        {children}
      </Flex>
    </Flex>
  );
}

