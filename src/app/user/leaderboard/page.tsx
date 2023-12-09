'use client';
import CheckTable from 'views/admin/dataTables/components/CheckTable';
import ColumnsTable from 'views/admin/dataTables/components/ColumnsTable';
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
  Link,
} from '@chakra-ui/react';
import tableDataColumns from 'views/admin/dataTables/variables/tableDataColumns';
import React from 'react';
import AdminLayout from 'layouts/admin';
import { useRouter } from 'next/navigation';
import NFT from '../../../components/card/NFT'
import { FetchedEvents } from 'app/api/events/events';
import { useQuery } from '@tanstack/react-query';
import testImage from '../../../img/avatars/avatar3.png'
import { RingLoader } from 'react-spinners';



export default function DataTables() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  
  
  const { data: eventData,isLoading } = useQuery({
    queryKey: ['EventInfo'],
    queryFn: FetchedEvents,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#36d7b7" />
      </div>
    );
  }


  const events = eventData?.data;



 
  if (!eventData) {
    return <div>No event data available</div>;
  }
  
  return (

    
    <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>

    

 
  
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: 'repeat(2, 1fr)', '2xl': '1fr 0.46fr' }}
        gap={{ base: '20px', xl: '20px' }}
        display={{ base: 'block', xl: 'grid' }}
      >
        <Flex
          flexDirection="column"
          gridArea={{ xl: '1 / 1 / 2 / 3', '2xl': '1 / 3 / 2 / 2' }}
        >
       
          <Flex direction="column">
            <Flex
              mt="25px"
              mb="20px"
              justifyContent="space-between"
              direction={{ base: 'column', md: 'row' }}
              align={{ base: 'start', md: 'center' }}
            >
              <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
               Events
              </Text>

                 
            </Flex>
          
    
       
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
              
          {console.log(events.logoUrl)}
            {events.map((event : any) => (


        <NFT
        name={event.name}
        des={event.description}
        key={event.name}
        image={event.logoUrl || testImage  }
        download={`/user/leaderboard/${event.name}`}
      />
        
        ))} 
             
            </SimpleGrid>
          
          </Flex>
        </Flex>
       
      </Grid>
    </Box>
  );
}
