'use client';

import { Box, Grid } from '@chakra-ui/react';

// Custom components
import Banner from 'views/admin/profile/components/Banner';
import General from 'views/admin/profile/components/General';

import Projects from 'views/admin/profile/components/Projects';

import { useQuery } from '@tanstack/react-query';

import { useEffect, useState } from 'react';
import { otherUserProfile } from 'api/profile/profile';
import { RingLoader } from 'react-spinners';

interface PullRequest {
  prNumber: number;
  status: string;
  title: string;
  issue: {
    issueNumber: number;
    currentPoints: number;
  };
}

interface ProfileData {
  name: string;
  email: string;
  college: string;
  avatarUrl: string;
  githubId: string;
  discordId: string;
  PR: PullRequest[]; // Update this with the actual type of PR array
  prMerged: number;
  pointsEarned: number;
}

export default function ProfileOverviewOther({
  params,
}: {
  params: { profileName: string };
}) {
  const [profileName, setProfileName] = useState('');
  useEffect(() => {
    const naam = JSON.parse(localStorage.getItem('GithubData'));
    if (naam) setProfileName(naam.data.githubId);
  }, []);

  const [TempData, setTempData] = useState<ProfileData | undefined>(undefined);

  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profileInfo'],
    queryFn: () => otherUserProfile(profileName),
  });

  useEffect(() => {
    if (profileData) {
      setTempData(profileData.data);
    }
  }, [profileData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
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
          banner={TempData?.avatarUrl}
          avatar={TempData?.avatarUrl}
          name={TempData?.name}
          githubUrl={TempData?.githubId}
          prMerged={TempData?.prMerged || 0}
          prContributed={TempData?.PR?.length}
          pointsEarned={TempData?.pointsEarned || 0}
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
        {TempData?.PR ? (
          <Projects name={profileName} />
        ) : (
          <div className="flex justify-center items-center text-xl">
            Sign in to view recent PRs
          </div>
        )}
        <General
          name={TempData?.name}
          githubId={TempData?.githubId}
          college={TempData?.college}
          discordId={TempData?.discordId}
          email={TempData?.email}
          gridArea={{ base: '2 / 1 / 3 / 2', lg: '1 / 2 / 2 / 3' }}
          minH="365px"
          pe="20px"
        />
      </Grid>
    </Box>
  );
}
