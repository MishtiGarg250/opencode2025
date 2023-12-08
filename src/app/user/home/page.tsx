'use client';
import { Card, CardHeader, CardBody } from '@material-tailwind/react';

import { useState } from 'react';
import { FetchedData } from 'app/api/profile/profile';
import { FetchedEvents } from 'app/api/events/events';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { useAuth } from 'contexts/AuthContext.js';
import { use } from 'react';
import { useEffect } from 'react';
import EventCard from 'components/eventCard/eventCard';

export default function Dashboard() {
  const router = useRouter();

  const handleLeaderboardclick = (eventName: string) => {
    router.push(`/user/leaderboard/${encodeURIComponent(eventName)}`);
  };

  const [GitData, setGitData] = useState({});
  const auth = useAuth();
  useEffect(() => {
    auth.check_login();
  }, []);

  const { data: userData } = useQuery({
    queryKey: ['userInfo'],
    queryFn: FetchedData,
  });

  const { data: eventData } = useQuery({
    queryKey: ['EventInfo'],
    queryFn: FetchedEvents,
  });

  const events = eventData?.data;

  useEffect(() => {
    const querystring = window.location.search;
    const urlParam = new URLSearchParams(querystring);
    const TokenParam = urlParam.get('token');
    if(TokenParam===null){
      window.location.assign('localhost:3000/auth/sign-in')
    }
    else localStorage.setItem('token',TokenParam);
    const GitDatalocal = localStorage.getItem('GithubData');

    const ParseData = JSON.parse(GitDatalocal);
    setGitData(ParseData?.data);
  }, []);

  if (!eventData) {
    return <div>No event data available</div>;
  }

  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  return (
    <>
      {events.map((event: any) => (
        <EventCard
          key={event.name}
          btnStatus={
            'Register'
          }
          name={event.name}
          des={event.description}
          image={event.logoUrl}
          onLeaderboardClick={handleLeaderboardclick}
        />
      ))}
    </>
  );
}
