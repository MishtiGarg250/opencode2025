'use client';

import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { FaDiscord } from 'react-icons/fa';

export default function DiscordBanner() {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('navy.700', 'white');
  const subtitleColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <Link href="https://discord.gg/SxBATvUPnC" target="_blank">
      <Flex
        bg={bgColor}
        direction="row"
        justify="space-between"
        align="center"
        borderRadius="20px"
        p={{ base: '16px', md: '24px' }}
        mb="24px"
        boxShadow="lg"
        transition="all 0.3s ease"
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'xl',
        }}
        gap={{ base: '12px', md: '0px' }}
      >
        <Flex align="center" gap={{ base: '12px', md: '16px' }}>
          <Box
            bg="#5865F2"
            p={{ base: '10px', md: '12px' }}
            borderRadius="14px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="md"
            minW={{ base: '48px', md: '56px' }}
          >
            <Icon
              as={FaDiscord}
              w={{ base: '24px', md: '32px' }}
              h={{ base: '24px', md: '32px' }}
              color="white"
            />
          </Box>
          <Box>
            <Text
              fontSize={{ base: '16px', md: '22px' }}
              fontWeight="800"
              lineHeight="1.2"
              color={textColor}
            >
              Join Community
            </Text>
            {/* Desktop Text */}
            <Text
              fontSize={{ base: '11px', md: '14px' }}
              color={subtitleColor}
              mt="2px"
              display={{ base: 'none', sm: 'block' }}
            >
              Stay updated on issues & further communication
            </Text>
            {/* Mobile Text */}
            <Text
              fontSize="10px"
              color={subtitleColor}
              mt="2px"
              display={{ base: 'block', sm: 'none' }}
            >
              Stay updated on issues
            </Text>
          </Box>
        </Flex>

        <Box
          bg="#5865F2"
          color="white"
          px={{ base: '16px', md: '24px' }}
          py={{ base: '8px', md: '10px' }}
          borderRadius="full"
          fontWeight="700"
          fontSize={{ base: '12px', md: '14px' }}
          boxShadow="md"
          whiteSpace="nowrap"
          minW="fit-content"
          transition="all 0.2s"
          _hover={{
            transform: 'scale(1.05)',
            bg: '#4752C4',
          }}
        >
          Join Server
        </Box>
      </Flex>
    </Link>
  );
}
