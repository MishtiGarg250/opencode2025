'use client';

import {
  Avatar,
  Box,
  Flex,
  Grid,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { RingLoader } from 'react-spinners';

import { getUserProfileByName } from 'api/profile/profile';
import Banner from 'views/admin/profile/components/Banner';
import DiscordBanner from 'views/admin/profile/components/DiscordBanner';
import General from 'views/admin/profile/components/General';
import Projects from 'views/admin/profile/components/Projects';
import { ProfileData } from '../page';

export default function ProfileOverviewOther() {
  const { profileName } = useParams<{ profileName: string }>();

  const { data, isLoading } = useQuery<{ data: ProfileData }>({
    queryKey: ['profileInfo', profileName],
    queryFn: () => getUserProfileByName(profileName),
    enabled: !!profileName,
  });

  const profile = data?.data;
  console.log(profile);

  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const pageBg = useColorModeValue('gray.50', '#0b1437');
  const cardBg = useColorModeValue('white', 'navy.800');
  const muted = useColorModeValue('gray.500', 'gray.400');

  const shadowHero = useColorModeValue(
    '0 18px 40px rgba(0,0,0,0.12)',
    '0 18px 40px rgba(0,0,0,0.45)',
  );
  const shadowSoft = useColorModeValue(
    '0 10px 24px rgba(0,0,0,0.08)',
    '0 10px 24px rgba(0,0,0,0.35)',
  );

  if (isLoading) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg={pageBg}>
        <RingLoader color="#755FFF" size={52} />
      </Flex>
    );
  }

  return (
    <Box
      minH="100vh"
      bg={pageBg}
      pt={{ base: '92px', md: '100px' }}
      px={{ base: '14px', md: '28px' }}
      pb="40px"
      maxW="1400px"
      mx="auto"
    >

    

      {/* 2. Use the Component here */}
      <DiscordBanner />

      {!isDesktop && (
        <>
          <Box
            bg={cardBg}
            borderRadius="22px"
            p="18px"
            boxShadow={shadowHero}
            mb="22px"
          >
            <Flex direction="column" align="center">
              <Avatar src={profile?.avatarUrl} size="xl" mb="10px" />

              <Text fontSize="20px" fontWeight="800">
                {profile?.name}
              </Text>
              <Text fontSize="13px" color={muted}>
                @{profile?.githubId}
              </Text>

              <Flex gap="12px" mt="16px">
                <StatPill label="PRs Merged" value={profile?.prMerged ?? 0} />
                <StatPill label="Points" value={profile?.points ?? 0} />
              </Flex>
            </Flex>
          </Box>

          <Box
            bg={cardBg}
            borderRadius="20px"
            p="16px"
            boxShadow={shadowSoft}
            mb="22px"
          >
            <Text fontWeight="800" mb="14px">
              General Information
            </Text>

            <Grid templateColumns="1fr" gap="12px">
              <Info label="College" value={profile?.college} />
              <Info label="Email" value={profile?.email} />
              <Info label="Discord ID" value={profile?.discordId} />
              <Info label="GitHub" value={`@${profile?.githubId}`} />
              <Info
                label="Gender"
                value={profile?.gender == 'male' ? 'Male' : 'Female'}
              />
              <Info label="Year" value={profile?.year} />
            </Grid>
          </Box>

          <Box bg={cardBg} borderRadius="20px" p="16px" boxShadow={shadowSoft}>
            <Projects PRs={profile?.PR || []} />
          </Box>
        </>
      )}

      {isDesktop && (
        <>
          <Grid templateColumns="1.3fr 1fr" gap="24px" mb="24px">
            <Box
              bg={cardBg}
              borderRadius="20px"
              p="24px"
              boxShadow={shadowHero}
            >
              <Banner
                banner={profile?.avatarUrl}
                avatar={profile?.avatarUrl}
                name={profile?.name}
                githubUrl={profile?.githubId}
                prMerged={profile?.prMerged || 0}
                prContributed={profile?.PR?.length || 0}
                pointsEarned={profile?.points || 0}
              />
            </Box>

            <Box
              bg={cardBg}
              borderRadius="20px"
              p="24px"
              boxShadow={shadowSoft}
            >
              <General
                name={profile?.name}
                githubId={profile?.githubId}
                college={profile?.college}
                discordId={profile?.discordId}
                email={profile?.email}
                gender={profile?.gender}
                year={profile?.year}
              />
            </Box>
          </Grid>

          <Box bg={cardBg} borderRadius="20px" p="24px" boxShadow={shadowSoft}>
            <Projects PRs={profile?.PR || []} />
          </Box>
        </>
      )}
    </Box>
  );
}

function StatPill({ label, value }: { label: string; value: number }) {
  return (
    <Box
      px="16px"
      py="10px"
      borderRadius="16px"
      bg="purple.500"
      color="white"
      minW="110px"
      textAlign="center"
    >
      <Text fontSize="18px" fontWeight="800">
        {value}
      </Text>
      <Text fontSize="11px" opacity={0.85}>
        {label}
      </Text>
    </Box>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <Box>
      <Text fontSize="10px" color="gray.400" mb="2px">
        {label.toUpperCase()}
      </Text>
      <Text fontSize="14px" fontWeight="600">
        {value || '—'}
      </Text>
    </Box>
  );
}
