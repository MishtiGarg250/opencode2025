'use client';

import { Box, Button, Image } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { FetchedEvents } from 'api/events/events';
import { fetchLoggedInBasicDetails } from 'api/profile/profile';
import axios from 'axios';
import { useAuth } from 'contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { RingLoader } from 'react-spinners';

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
  console.log(events);

  useEffect(() => {
    const querystring = window.location.search;
    const urlParam = new URLSearchParams(querystring);
    const TokenParam = urlParam.get('token');

    if (TokenParam === null) {
      auth.check_login();
    } else {
      localStorage.setItem('token', TokenParam);
    }
    if (localStorage.getItem('token')) {
      fetchLoggedInBasicDetails();
      axios.post(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/api/v1/events/register?eventName=${encodeURIComponent(
          `${process.env.NEXT_PUBLIC_EVENT_NAME}`,
        )}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
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
        <Box pt={{ base: '90px', md: '80px', xl: '80px' }} key={index}>
          <Box
            key={event.name}
            position="relative"
            minH={{ base: '37vh', md: '80vh' }}
            overflow="hidden"
            borderRadius={{ base: '16px', md: '20px' }}
          >
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
              top={{ base: '62%', md: '70%' }}
              left="50%"
              transform="translate(-50%, -50%)"
              textAlign="center"
              zIndex="2"
              color="white"
              px={{ base: '16px', md: '0' }}
              maxW={{ base: '320px', md: '600px' }}
            >
              {/* <Text fontSize={{ base: '2xl', md: '4xl' }} fontWeight="bold" mb="3">
            {event.name}
          </Text>
          <Text fontSize={{ base: 'sm', md: 'xl' }}>{event.description}</Text> */}
            </Box>
            <Box
              position="absolute"
              bottom={{ base: '3', md: '8' }}
              left="50%"
              transform="translateX(-50%)"
              zIndex="2"
              textAlign="center"
              w={{ base: '100%', sm: 'auto' }}
              px={{ base: '16px', sm: '0' }}
            >
              {!auth.isLoggedIn && (
                <Link href="/auth/sign-in">
                  <Button
                    w={{ base: '100%', sm: 'auto' }}
                    colorScheme="teal"
                    mb={{ base: '3', sm: '0' }}
                    mr={{ base: '0', sm: '3' }}
                    bg="linear-gradient(to right, #001f3f, #003366)"
                    _hover={{
                      bg: 'linear-gradient(to right, #001a33, #001f3f)',
                    }}
                    color="white"
                  >
                    Join Now
                  </Button>
                </Link>
              )}
              <Button
                w={{ base: '100%', sm: 'auto' }}
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
