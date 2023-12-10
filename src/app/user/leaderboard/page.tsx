'use client';
import {
  Box,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
} from '@chakra-ui/react';
import React from 'react';
import NFT from '../../../components/card/NFT';
import { FetchedEvents } from 'api/events/events';
import { useQuery } from '@tanstack/react-query';
import { RingLoader } from 'react-spinners';

export default function DataTables() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  const { data: eventData, isLoading } = useQuery({
    queryKey: ['EventInfo'],
    queryFn: FetchedEvents,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#36d7b7" />
      </div>
    );
  }

  const events = eventData?.data;

  if (!eventData) {
    return <div>No event data available</div>;
  }

  return (
    <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: 'repeat(2, 1fr)', '2xl': '1fr 0.46fr' }}
        gap={{ base: '20px', xl: '20px' }}
        display={{ base: 'block', xl: 'grid' }}
      >
        <Flex
          flexDirection="column"
          gridArea={{ xl: '1 / 1 / 2 / 3', '2xl': '1 / 3 / 2 / 2' }}
        >
          <Flex direction="column">
            <Flex
              mt="25px"
              mb="20px"
              justifyContent="space-between"
              direction={{ base: 'column', md: 'row' }}
              align={{ base: 'start', md: 'center' }}
            >
              <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
                Events
              </Text>
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
              {events.map((event: any) => (
                <NFT
                  name={event.name}
                  des={event.description}
                  key={event.name}
                  image={event.logoImageURL}
                  download={`/user/leaderboard/${event.name}`}
                />
              ))}
            </SimpleGrid>
          </Flex>
        </Flex>
      </Grid>
    </Box>
  );
}
