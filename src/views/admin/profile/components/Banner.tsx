'use client';

// Chakra imports
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { NextAvatar } from 'components/image/Avatar';

export default function Banner(props: {
  banner?: string;
  avatar: string;
  name: string;
  githubUrl: string;
  prMerged: number;
  prContributed?: number;
  pointsEarned: number;
  [x: string]: any;
}) {
  const {
    avatar,
    name,
    githubUrl,
    prMerged,
    prContributed,
    pointsEarned,
    ...rest
  } = props;

  const textPrimary = useColorModeValue('gray.800', 'white');
  const textSecondary = useColorModeValue('gray.500', 'gray.400');
  const avatarBorder = useColorModeValue('white', 'navy.700');
  const hintColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <Card
      p="24px"
      alignItems="center"
      textAlign="center"
      {...rest}
    >
      {/* Avatar */}
      <NextAvatar
        src={avatar}
        name={name}
        h="130px"
        w="130px"
        mb="14px"
        border="4px solid"
        borderColor={avatarBorder}
        boxShadow="0 16px 40px rgba(0,0,0,0.25)"
      />

      {/* Name */}
      <Text
        color={textPrimary}
        fontWeight="800"
        fontSize="xl"
        lineHeight="1.2"
      >
        {name}
      </Text>

      {/* GitHub */}
      <Text
        color={textSecondary}
        fontSize="sm"
        mb="20px"
      >
        {githubUrl}
      </Text>

      {/* Stats */}
      <Flex
        w="100%"
        maxW="360px"
        justify="space-between"
        mb="8px"
      >
        <Box>
          <Text
            color={textPrimary}
            fontSize="28px"
            fontWeight="800"
          >
            {prMerged}
          </Text>
          <Text
            color={textSecondary}
            fontSize="sm"
          >
            PRs Merged
          </Text>
        </Box>

        <Box>
          <Text
            color={textPrimary}
            fontSize="28px"
            fontWeight="800"
          >
            {pointsEarned}
          </Text>
          <Text
            color={textSecondary}
            fontSize="sm"
          >
            Points Earned
          </Text>
        </Box>
      </Flex>

      {/* Empty state hint */}
      {prMerged === 0 && pointsEarned === 0 && (
        <Text
          mt="12px"
          fontSize="sm"
          color={hintColor}
        >
          Start contributing to see your stats grow!!
        </Text>
      )}
    </Card>
  );
}
