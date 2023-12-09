'use client';
import { Card, CardHeader, CardBody } from '@material-tailwind/react';
import { useState } from 'react';
import { FetchedData } from 'app/api/profile/profile';
import { FetchedEvents } from 'app/api/events/events';
import { useMutation, useQuery } from '@tanstack/react-query';

import { Box, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useAuth } from 'contexts/AuthContext.js';
import { use } from 'react';
import { useEffect } from 'react';
import { MdLeaderboard } from 'react-icons/md';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import testImg from '../../img/avatars/avatar2.png'
import Image from 'next/image';
const EventCard = ({ btnStatus, name, des, image, onLeaderboardClick }) => {
  return (
    <>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <div className="w-full  p-4 ">
          <Card
            shadow={false}
            className="relative grid h-[85vh] w-full  items-end justify-center overflow-hidden text-center 
        "
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="absolute inset-0 m-0 h-full w-full rounded-md bg-cover bg-center"
            >
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/100 via-black/30">
              
     <LazyLoadImage
    alt={name}
    effect="blur"
    width="600px"
    height="400px"
    src={image} // Adjust the path to your image
  />
              </div>
            </CardHeader>
            <CardBody className="relative py-14 px-6 md:px-12">
              {/* <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"/> */}
              <h3 className="  text-3xl font-bold text-white">{name}</h3>
              <div className=" gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                {des}
              </div>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 my-7"
              >
                {/* {auth.isLoggedIn ? 'Yayy! Successfully Registered' : 'Register now'} */}
                {btnStatus}
              </button>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 my-7"
                onClick={() => onLeaderboardClick(name)}
              >
                {/* {auth.isLoggedIn ? 'Yayy! Successfully Registered' : 'Register now'} */}
                Leaderboard
              </button>
            </CardBody>
          </Card>
        </div>
      </Box>
    </>
  );
};

export default EventCard;
