'use client';

import { Box, Grid, Text, Flex, useColorMode } from '@chakra-ui/react';
import Banner from 'views/admin/profile/components/Banner';
import General from 'views/admin/profile/components/General';
import Projects from 'views/admin/profile/components/Projects';
import { useQuery } from '@tanstack/react-query';
import { getUserProfileByName } from 'api/profile/profile';
import { RingLoader } from 'react-spinners';
import { ProfileData } from '../page';
import { profile } from 'console';
import React from 'react';

export default function ProfileOverviewOther({
  params,
}: {
  params: any;
}) {
  const {profileName} = params 

  const { data, isLoading } = useQuery<{ data: ProfileData }>({
    queryKey: ['profileInfo', profileName],
    queryFn: () => getUserProfileByName(profileName),
  });
  const profileData = data?.data;
  const { colorMode } = useColorMode();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {/* Top Banner */}
      <Flex
        bg={colorMode === 'light' ? 'white' : 'navy.700'}
        color={colorMode === 'light' ? 'gray.900' : 'white'}
        justify="center"
        align="center"
        p="15px"
        textAlign="center"
        mb="15px"
      >
        <Text fontSize="m" fontWeight="bold">
          Please join the Discord server for further communication regarding
          Opencode&apos;25. Discord server link: {' '}
          <a
            href="https://bit.ly/oc-discord"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'underline' }}
          >
            https://bit.ly/oc-discord
          </a>
        </Text>
      </Flex>
      {/* Main Fields */}
      <Grid
        templateColumns={{
          base: '1fr',
          lg: '1.34fr 1fr 1.62fr',
        }}
        templateRows={{
          base: 'repeat(3, 1fr)',
          lg: '1fr',
        }}
        gap={{ base: '20px', xl: '20px' }}
      >
        <Banner
          gridArea="1 / 4 / 4 / 1"
          banner={profileData?.avatarUrl}
          avatar={profileData?.avatarUrl}
          name={profileData?.name}
          githubUrl={profileData?.githubId}
          prMerged={profileData.prMerged || 0}
          prContributed={profileData?.PR?.length}
          pointsEarned={profileData.points || 0}
        />
      </Grid>
      <Grid
        mb="20px"
        templateColumns={{
          base: '1fr',
          lg: 'repeat(2, 1fr)',
          '2xl': '1.34fr 1.62fr 1fr',
        }}
        templateRows={{
          base: '1fr',
        }}
        gap={{ base: '20px', xl: '20px' }}
      >
        {profileData?.PR ? (
          <Projects PRs={profileData.PR} />
        ) : (
          <div className="flex justify-center items-center text-xl">
            Sign in to view recent PRs
          </div>
        )}
        <General
          name={profileData?.name}
          githubId={profileData?.githubId}
          college={profileData?.college}
          discordId={profileData?.discordId}
          email={profileData?.email}
          gridArea={{ base: '2 / 1 / 3 / 2', lg: '1 / 2 / 2 / 3' }}
          minH="365px"
          pe="20px"
        />
      </Grid>
    </Box>
  );
}
