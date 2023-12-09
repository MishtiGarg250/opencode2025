'use client';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Select
} from '@chakra-ui/react'
import {
  Box,
  useColorModeValue,Text, Flex
} from '@chakra-ui/react';

import { useEffect,useState } from 'react';
import { FetchedEvents } from 'app/api/events/events';
import { useQuery } from '@tanstack/react-query';
import { getUserPRDetails } from 'app/api/admin/admin';
import { RingLoader } from 'react-spinners';


export default function Dashboard() {
  const [githubId, setGithubId] = useState('');
  const [eventName, setEventName] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);
  const [userPrDetails,setuserPrDetails] = useState([])

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorBrand = useColorModeValue('brand.500', 'white');
const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  useEffect(() => {
    const querystring = window.location.search;
    const urlParam = new URLSearchParams(querystring);
    const TokenParam = urlParam.get('token');
    if(TokenParam===null){
      window.location.assign('localhost:3000/auth/sign-in')
    }
    else localStorage.setItem('token',TokenParam);
  }, []);

  interface Event{
    name:string;
  }

  const { data: eventData } = useQuery({
    queryKey: ['EventInfo'],
    queryFn: FetchedEvents,
  });

 

  const { data: userPrDeatils,refetch,isLoading,isError } = useQuery({
    queryKey: ['userPrDeatilsInfo'],
    queryFn:()=> getUserPRDetails(githubId,eventName),
    enabled:false
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#36d7b7" />
      </div>
    );
  }

  const handlePrClick = async () => {
    try {
      await refetch(); 
      
  
      const updatedData = userPrDeatils;
      setuserPrDetails(updatedData);
  
      setButtonClicked(true);
      console.log(updatedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if(!eventData){
    return <div> No data</div>
  }


  const Events =  eventData.data ;



  return (
    <>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
               Change Points
              </Text>

              <Flex
              mt="25px"
              mb="20px"
              justifyContent="space-between"
              direction={{ base: 'column', md: 'row' }}
              align={{ base: 'start', md: 'center' }}
            >

                <FormControl isRequired>
  <FormLabel color={textColor}>First name</FormLabel>
  <Input placeholder='First name' color={textColor} value={githubId} onChange={(e) => setGithubId(e.target.value)}/>
  
 
</FormControl>

  <FormControl marginLeft="10px">
    <FormLabel>Country</FormLabel>
    <Select placeholder='Select country'value={eventName} onChange={(e) => setEventName(e.target.value)}>
    {
  Events.map((e:Event,key:number)=>{
    return <option key={key} value={e.name}>{e.name}</option>
  })
}

      
    </Select>
  </FormControl>



              </Flex>
              <Button onClick={handlePrClick}>View PRS</Button>


              <TableContainer>
  <Table variant='simple'>
    <TableCaption>All PR Details</TableCaption>
    <Thead>
      <Tr>
        <Th>PR Title</Th>
        <Th>PR Number</Th>
        <Th>Points</Th>
        <Th>RepoName</Th>
        <Th>Status</Th>
      </Tr>
    </Thead>
    <Tbody>
    {userPrDetails?.map((pr, index) => (
    <Tr key={index}>
      <Td>{pr.prTitle}</Td>
      <Td>{pr.prNumber}</Td>
      <Td>{pr.points}</Td>
      <Td>{pr.repoName}</Td>
      <Td>{pr.status}</Td>
    </Tr>
  ))}
     
    </Tbody>

  </Table>
</TableContainer>
      </Box>
    </>
  );
}
