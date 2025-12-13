'use client';
import { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import { useEffect } from 'react';
import { Image, Box, SimpleGrid } from '@chakra-ui/react';

import { redirect } from 'next/navigation';

import { Button, ButtonGroup } from '@chakra-ui/react';
import NFT from '../../../components/card/NFT';
import axios from 'axios';

var eventData = [];


// helper to decode JWT payload (browser)
function parseJwt(token) {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

const deleteHandler = async (eventName) => {
  const token = localStorage.getItem('token');
  const payload = parseJwt(token);

  // require admin role before calling backend
  if (!payload?.roles?.isAdmin) {
    console.error('Only admin can create events');
    // show UI feedback if needed
    return;
  }

  await axios
    .delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/delete/${eventName}`,
      { headers: {
        Authorization: `Bearer ${token}`,
      } },
    )
    .then(() => {
      alert('Event Deleted Successfully');
      window.location.reload();
    })
    .catch((error) => {
      console.error(error);
    });
};

export default function Viewevents() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  

  /*THIS WILL HAVE TO BE CHANGED ONCE DATABASE ACCESS IS RECIEVED*/
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/events/`)
      .then((response) => {
        eventData = response.data;
        console.log(eventData);
        setDataLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  if (!dataLoaded) {
    return <div>Loading...</div>; // or any loading indicator
  }


  const token = localStorage.getItem('token');
  const payload = parseJwt(token);

  // require admin role before calling backend
  if (!payload?.roles?.isAdmin) {
    console.error('Only admin can create events');
    redirect('/user/home')
    // show UI feedback if needed
    return;
  }

  if (!eventData) {
    return (
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <h1>NO DATA FOUND</h1>
      </Box>
    );
  }
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={{ base: '20px', md: '28px', lg: '36px' }}
        justifyItems="center"
        px={{ base: '12px', md: '20px', lg: '40px' }}
      >
        {eventData.data.map((item, i) => (
          <Box key={i} w={{ base: '320px', md: '360px', lg: '420px' }}>
            <NFT
              name={item.name}
              des={item.description}
              image={item.logoImageURL}
              download={`/admin/viewevents/${encodeURIComponent(item.name)}`}
            />
            <Box mt={3} display="flex" justifyContent="center">
              <Button colorScheme="red" size="sm" onClick={() => deleteHandler(item.name)}>
                DELETE EVENT
              </Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
