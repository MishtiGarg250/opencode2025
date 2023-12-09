'use client';

import { Box, Grid } from '@chakra-ui/react';
import AdminLayout from 'layouts/admin';
import { useState,useEffect } from 'react';
// Custom components
import Banner from 'views/admin/profile/components/Banner';
import General from 'views/admin/profile/components/General';
import Notifications from 'views/admin/profile/components/Notifications';
import Projects from 'views/admin/profile/components/Projects';
import Storage from 'views/admin/profile/components/Storage';
import Upload from 'views/admin/profile/components/Upload';

// Assets
import banner from 'img/auth/banner.png';
import avatar from 'img/avatars/avatar4.png';


// const GitDatanew = localStorage.getItem('GithubData');
// const Parseata = JSON.parse(GitDatanew);
// const profilename = Parseata.data.name;
// const githubusername= Parseata.data.githubUsername;
// const repos = Parseata.data.repositories;
// console.log(repos);


export default function ProfileOverview() {

  const[TempData,setTempData] = useState(' ');

  useEffect(() => {
    const GitDatalocal = localStorage.getItem('GithubData');
    const ParseData = JSON.parse(GitDatalocal);
    setTempData(ParseData.data);
  }, []);
  
  console.log(TempData)
  interface TempDatatype {
    name: string;
    githubId: string;
    college: string;
    discordId: string;
    email: string;
   
  }


  return (
    localStorage.getItem('GithubData') === null ? <Box 
    pt={{ base: '130px', md: '80px', xl: '80px' }}><a href='localhost:4000/auth/sign-in'><h1>SIGN IN (click) TO VIEW YOUR PROFILE</h1></a></Box> : 

    <Box 
    pt={{ base: '130px', md: '80px', xl: '80px' }}>
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
          banner={`url(${TempData.avatarUrl})`}
          avatar={TempData.avatarUrl}
          name= {TempData.name}
          githubUrl={TempData.githubId}
          prMerged={TempData.prMerged || 0}
          prContributed={TempData.PR?.length}
          pointsEarned={TempData.pointsEarned || 0}
          
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
        
        <Projects
          name={JSON.parse(localStorage.getItem('GithubData')).data.githubId}
        />
        <General
        name={TempData.name}
        githubId={TempData.githubId}
        college={TempData.college}
        discordId={TempData.discordId}
        email={TempData.email}
          gridArea={{ base: '2 / 1 / 3 / 2', lg: '1 / 2 / 2 / 3' }}
          minH="365px"
          pe="20px"
        />
        
      </Grid>
    </Box>
  );
}
