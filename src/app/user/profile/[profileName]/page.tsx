'use client';

import {
  Box,
  Grid,
  Text,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { RingLoader } from 'react-spinners';
import React from 'react';

import Banner from 'views/admin/profile/components/Banner';
import General from 'views/admin/profile/components/General';
import Projects from 'views/admin/profile/components/Projects';
import { getUserProfileByName } from 'api/profile/profile';
import { ProfileData } from '../page';

export default function ProfileOverviewOther() {
  const { profileName } = useParams<{ profileName: string }>();

  const { data, isLoading } = useQuery<{ data: ProfileData }>({
    queryKey: ['profileInfo', profileName],
    queryFn: () => getUserProfileByName(profileName),
    enabled: !!profileName,
  });

  const profileData = data?.data;

  // Theme tokens
  const pageBg = useColorModeValue('gray.50', '#0b1437');
  const cardBg = useColorModeValue('white', 'navy.800');
  const mutedText = useColorModeValue('gray.600', 'gray.400');
  const discordBg = useColorModeValue('purple.50', 'rgba(117,81,255,0.08)');
  const discordBorder = useColorModeValue('purple.100', 'whiteAlpha.100');
  const shadow = useColorModeValue(
    '0 16px 32px rgba(0,0,0,0.08)',
    '0 16px 32px rgba(0,0,0,0.45)'
  );

  if (isLoading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <RingLoader color="#755FFF" />
      </Flex>
    );
  }

  return (
    <Box
      pt={{ base: '110px', md: '100px' }}
      px={{ base: '16px', md: '28px' }}
      pb="40px"
      bg={pageBg}
      minH="100vh"
    >
      {/* Discord Notice (compact, non-intrusive) */}
      <Flex
        bg={discordBg}
        border="1px solid"
        borderColor={discordBorder}
        borderRadius="14px"
        px="18px"
        py="12px"
        mb="24px"
        justify="center"
        textAlign="center"
      >
        <Text fontSize="sm" fontWeight="600" color={mutedText}>
          Join the Discord for OpenCode’25 updates:{' '}
          <Box
            as="a"
            href="https://bit.ly/oc-discord"
            target="_blank"
            rel="noopener noreferrer"
            color="purple.500"
            fontWeight="700"
            textDecoration="underline"
            ml="4px"
          >
            bit.ly/oc-discord
          </Box>
        </Text>
      </Flex>

      {/* Top Section: Profile Summary */}
      <Grid
        templateColumns={{
          base: '1fr',
          lg: '1.3fr 1fr',
        }}
        gap="20px"
        mb="24px"
      >
        {/* Profile Banner */}
        <Box
          bg={cardBg}
          borderRadius="18px"
          p="20px"
          boxShadow={shadow}
        >
          <Banner
            banner={profileData?.avatarUrl}
            avatar={profileData?.avatarUrl}
            name={profileData?.name}
            githubUrl={profileData?.githubId}
            prMerged={profileData?.prMerged || 0}
            prContributed={profileData?.PR?.length || 0}
            pointsEarned={profileData?.points || 0}
          />
        </Box>

        {/* General Info */}
        <Box
          bg={cardBg}
          borderRadius="18px"
          p="20px"
          boxShadow={shadow}
        >
          <General
            name={profileData?.name}
            githubId={profileData?.githubId}
            college={profileData?.college}
            discordId={profileData?.discordId}
            email={profileData?.email}
          />
        </Box>
      </Grid>

      {/* Bottom Section: Projects */}
      <Box
        bg={cardBg}
        borderRadius="18px"
        p="20px"
        boxShadow={shadow}
      >
        {profileData?.PR && profileData.PR.length > 0 ? (
          <Projects PRs={profileData.PR} />
        ) : (
          <Flex
            justify="center"
            align="center"
            minH="160px"
          >
            <Text color={mutedText} fontWeight="600">
              No recent pull requests yet
            </Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
}
