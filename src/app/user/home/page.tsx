'use client';

import { useState } from 'react';
import { FetchedData } from 'api/profile/profile';
import { FetchedEvents } from 'api/events/events';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Box, useColorModeValue,Button,Text } from '@chakra-ui/react';
import { useAuth } from 'contexts/AuthContext.js';
import { useEffect } from 'react';
import EventCard from '../../../components/eventCard/eventCard';
import { RingLoader } from 'react-spinners';
import testImage from '../../../img/avatars/avatar3.png'
import Image from 'next/image';
import Link from 'next/link';

export default function Dashboard() {
  const[GitData,setGitData] = useState([])
  const router = useRouter();

  const handleLeaderboardclick = (eventName: string) => {
    router.push(`/user/leaderboard/${encodeURIComponent(eventName)}`);
  };

  const auth = useAuth();
  
  
  useEffect(() => {
    auth.check_login();
  }, [auth]);

  const { data: userData } = useQuery({
    queryKey: ['userInfo'],
    queryFn: FetchedData,
  });

  const { data: eventData, isLoading } = useQuery({
    queryKey: ['EventInfo'],
    queryFn: FetchedEvents,
  });

  const events = eventData?.data;

  useEffect(() => {
    const querystring = window.location.search;
    const urlParam = new URLSearchParams(querystring);
    const TokenParam = urlParam.get('token');
    if(TokenParam === null){
      auth.check_login();
    }
    else localStorage.setItem('token',TokenParam);
    const GitDatalocal = localStorage.getItem('GithubData');

    const ParseData = JSON.parse(GitDatalocal);
    setGitData(ParseData?.data);
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
      {events?.map((event: any,index :number) => (
       
       <Box pt={{ base: '180px', md: '80px', xl: '80px' }} key={index}>

<Box
      key={event.name}
      position="relative"
      h="80vh"
      overflow="hidden"
    >
     
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        bgGradient="linear(to-b, rgba(0,0,0,0.6), rgba(0,0,0,0.9))"
        zIndex="1"
      />

     
      <Image
        src={event.logoImageURL}
        alt={event.name}
        objectFit="cover"
        width={10000}
        height={1000} 
       
      />

      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        textAlign="center"
        zIndex="2"
        color="white"
      >
        <Text fontSize="4xl" fontWeight="bold" mb="4">
          {event.name}
        </Text>
        <Text fontSize="xl">
          {event.description}
        </Text>
      </Box>

      
      <Box
        position="absolute"
        bottom="8"
        left="50%"
        transform="translateX(-50%)"
        zIndex="2"
        textAlign="center"
      >
        {auth.isLoggedIn?
        
         <Button colorScheme="teal" mr="4">
          Registered
         </Button>
        :
        <Link href= {`${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/sign-in`}>
        <Button colorScheme="teal" mr="4">
        Login
        </Button></Link>}
        <Button colorScheme="teal" mr="4" onClick={()=>handleLeaderboardclick(event.name)}>
          Leaderboard
        </Button>
      </Box>
    </Box>
     </Box>
      ))}
    </>
  );
}
