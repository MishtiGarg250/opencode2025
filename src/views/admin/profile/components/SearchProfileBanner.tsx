'use client';

import {
  Box,
  Flex,
  Input,
  useColorModeValue,
} from '@chakra-ui/react';
import { Search } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchProfileBanner({ value, onChange }: Props) {
  const glassBg = useColorModeValue(
    'rgba(255,255,255,0.7)',
    'rgba(15,23,42,0.7)'
  );

  const borderColor = useColorModeValue(
    'whiteAlpha.700',
    'whiteAlpha.200'
  );

  const textColor = useColorModeValue('gray.800', 'gray.100');
  const placeholderColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <Flex
      align="center"
      gap="10px"
      px={{ base: '14px', md: '18px' }}
      py={{ base: '10px', md: '12px' }}
      bg={glassBg}
      borderRadius="16px"
      border="1px solid"
      borderColor={borderColor}
      backdropFilter="blur(16px)"
      boxShadow="0 10px 30px rgba(0,0,0,0.08)"
      w={{ base: '65%', sm: '260px', md: '340px' }}
      transition="all 0.2s ease"
      _focusWithin={{
        borderColor: 'purple.600',
        
      }}
    >
      <Box
        color="purple.500"
        display="flex"
        alignItems="center"
      >
        <Search size={18} />
      </Box>

      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search name or GitHub ID"
        variant="unstyled"
        fontSize="14px"
        fontWeight="500"
        color={textColor}
        _placeholder={{ color: placeholderColor }}
      />
    </Flex>
  );
}


