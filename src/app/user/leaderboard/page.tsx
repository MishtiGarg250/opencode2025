'use client';

import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  SimpleGrid,
  Container,
  Icon,
} from '@chakra-ui/react';
import React from 'react';
import { MdExplore } from 'react-icons/md';
import NFT from '../../../components/card/NFT';

const SECTIONS = [
  {
    name: 'Opencode25',
    description: 'A month-long open source event focused on community growth.',
    image: '/img/dashboards/opencodeBG.png',
    path: '/user/leaderboard/Opencode',
    ctaLabel: 'Open Leaderboard',
  },
];

export default function DataTables() {
  // Theme-aware colors
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const subtitleColor = useColorModeValue('secondaryGray.600', 'secondaryGray.400');
  const pageBg = useColorModeValue('gray.50', 'navy.900');

  return (
    <Box 
      minH="100vh" 
      bg={pageBg} 
      pt={{ base: '100px', md: '120px', xl: '100px' }}
      pb="50px"
    >
      <Container maxW="container.xl">
        {/* Header Section */}
        <Flex
          direction="column"
          mb="40px"
          px={{ base: '10px', md: '20px' }}
          textAlign={{ base: 'center', md: 'left' }}
        >
          <Flex 
            align="center" 
            justify={{ base: 'center', md: 'start' }} 
            mb="8px"
          >
            <Icon 
              as={MdExplore} 
              w="24px" 
              h="24px" 
              color="brand.500" 
              me="10px" 
            />
            <Text
              color={textColor}
              fontSize={{ base: '2xl', md: '3xl' }}
              fontWeight="800"
              letterSpacing="tight"
            >
              Explore Events
            </Text>
          </Flex>
          <Text
            color={subtitleColor}
            fontSize="md"
            fontWeight="500"
            maxW="600px"
          >
            Discover active competitions, track your progress on the leaderboard, 
            and contribute to the open-source ecosystem.
          </Text>
        </Flex>

        {/* Responsive Grid for Cards */}
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={{ base: '20px', md: '30px' }}
          px={{ base: '10px', md: '0px' }}
        >
          {SECTIONS.map((section) => (
            <Box
              key={section.name}
              transition="transform 0.3s ease, box-shadow 0.3s ease"
              _hover={{
                transform: 'translateY(-8px)',
                zIndex: 1,
              }}
            >
              <NFT
                name={section.name}
                des={section.description}
                image={section.image}
                download={section.path}
                ctaLabel={section.ctaLabel}
                // Ensure your NFT component accepts a 'ctaLabel' prop 
                // and applies it to its button/action element.
              />
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}