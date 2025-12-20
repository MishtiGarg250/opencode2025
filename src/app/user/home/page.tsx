'use client';

import { useState } from 'react';
import { FetchedEvents } from 'api/events/events';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Box, Button, Text } from '@chakra-ui/react';
import { useAuth } from 'contexts/AuthContext.js';
import { useEffect } from 'react';
import { RingLoader } from 'react-spinners';
import { Image } from '@chakra-ui/react';
import Link from 'next/link';
import axios from 'axios';
import { fetchLoggedInBasicDetails } from 'api/profile/profile';

export default function Dashboard() {
  const router = useRouter();

  const handleLeaderboardclick = (eventName: string) => {
    router.push(`/user/leaderboard/${encodeURIComponent(eventName)}`);
  };

  const auth = useAuth();

  useEffect(() => {
    auth.check_login();
  }, [auth]);

  const { data: eventData, isLoading } = useQuery({
    queryKey: ['EventInfo'],
    queryFn: FetchedEvents,
  });

  const events = eventData?.data;
  console.log(events)

  useEffect(() => {
    const querystring = window.location.search;
    const urlParam = new URLSearchParams(querystring);
    const TokenParam = urlParam.get('token');

    if (TokenParam === null) {
      auth.check_login();
    } 
    else {
      localStorage.setItem('token', TokenParam);
    }
    if (localStorage.getItem('token')) {
      fetchLoggedInBasicDetails();
      axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/events/register?eventName=${encodeURIComponent(`${process.env.NEXT_PUBLIC_EVENT_NAME}`)}`,{},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    }
  }, [auth]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <>
      {events?.map((event: any, index: number) => (
      <Box pt={{ base: '110px', md: '80px', xl: '80px' }} key={index}  borderRadius="100px" >
      <Box key={event.name} position="relative" h={{ base: '80vh', md: '80vh' }} overflow="hidden"  borderRadius="10px">
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bgGradient="linear(to-b, rgba(0,0,0,0.1), rgba(0,0,0.3,0.9))"
        />
        <Image
          src="/img/dashboards/opencodeBG.png"
          alt={event.name}
          objectFit="cover"
          width="100%"
          height="100%"
        />
        <Box
          position="absolute"
          top={{ base: '70%', md: '70%' }}
          left="50%"
          transform="translate(-50%, -50%)"
          textAlign="center"
          zIndex="2"
          color="white"
        >
          <Text fontSize={{ base: '2xl', md: '4xl' }} fontWeight="bold" mb="4">
            {event.name}
          </Text>
          <Text fontSize={{ base: 'md', md: 'xl' }}>{event.description}</Text>
        </Box>
        <Box
          position="absolute"
          bottom="8"
          left="50%"
          transform="translateX(-50%)"
          zIndex="2"
          textAlign="center"
        >
          {!auth.isLoggedIn && (
            <Link href="/auth/sign-in">
              <Button colorScheme="teal" mb={{ base: '4', md: '0' }} mr={{ base: '0', md: '4' }} 
               bg="linear-gradient(to right, #001f3f, #003366)"
               _hover={{ bg: 'linear-gradient(to right, #001a33, #001f3f)' }}
               color="white">
                Join Now
              </Button>
            </Link>
          )}
          <Button
  colorScheme="teal"
  onClick={() => handleLeaderboardclick(event.name)}
  bg="linear-gradient(to right, #001f3f, #003366)"
  _hover={{ bg: 'linear-gradient(to right, #001a33, #001f3f)' }}
  color="white"
>
            Leaderboard
          </Button>
        </Box>
      </Box>
    </Box>
      ))}
    </>
  );
}
