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
import { Toast } from '@chakra-ui/react';

import { useEffect,useState } from 'react';
import { FetchedEvents } from 'app/api/events/events';
import { useQuery ,useMutation} from '@tanstack/react-query';
import { getUserPRDetails } from 'app/api/admin/admin';
import { RingLoader } from 'react-spinners';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { EditPRPoints } from 'app/api/admin/admin';
import { useToast } from '@chakra-ui/react'



export default function Dashboard() {

  const toast = useToast();
  const [githubId, setGithubId] = useState('');
  const [eventName, setEventName] = useState('');
  const [selectedPrDetails, setSelectedPrDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changePointData, setChangePointData] = useState(null);
const [incrementPoints, setIncrementPoints] = useState('');


const handleIncrementPointsChange = (e) => {
  setIncrementPoints(e.target.value);
};
  const handleOpenModal = (prDetails:any) => {
    setSelectedPrDetails(prDetails);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPrDetails(null);
    setIncrementPoints('');
    setIsModalOpen(false);
  };
 
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

  const pointUpdate = useMutation({
    mutationFn:EditPRPoints,
    onSuccess:()=>{
      console.log("Success");
      // Show a success toast
      toast({
        title: 'Points Updated',
        description: 'PR points were successfully updated.',
        status: 'success',
        duration: 10000,
        isClosable: true,
      });

      setIsModalOpen(false);

      

    },
    onError:()=>{
      console.log("Error");
      toast({
        title: 'Points not Updated',
        description: 'PR points were successfully updated.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  })


  

  const handleChangePoints = () => {
    if (incrementPoints == '') {
      toast({
        title: 'Enter a point to increment!',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  
   
    if (selectedPrDetails) {
      const { repoName, prNumber, issueNumber } = selectedPrDetails;
      const incrementPointsAsNumber = parseInt(incrementPoints, 10) || 0; // Assuming it's an integer
  
      const prUpdateData = {
        repoName,
        prNumber,
        issueNumber,
        pointIncrement: incrementPointsAsNumber,
        githubId: githubId,
        eventName: eventName,
      };
  
   
      setChangePointData(prUpdateData);
      setChangePointData((prevData:any) => {
        handleSubmit(prevData);
      });
  
     
    }
  };
  
  const { data: eventData } = useQuery({
    queryKey: ['EventInfo'],
    queryFn: FetchedEvents,
  });

  const handleSubmit = (data:any) => {
  
   console.log(data)
    pointUpdate.mutate(data);

  }
 

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
      
  
      const prUpdateData = userPrDeatils;
      setuserPrDetails(prUpdateData);
  
  
      console.log(prUpdateData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

 

  if(!eventData){
    return  <div className="flex justify-center items-center h-screen">
    <RingLoader color="#36d7b7" />
  </div>
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
  <FormLabel color={textColor}>Github ID</FormLabel>
  <Input placeholder='First name' color={textColor} value={githubId} onChange={(e) => setGithubId(e.target.value)}/>
  
 
</FormControl>

  <FormControl marginLeft="10px">
    <FormLabel>All Events</FormLabel>
    <Select placeholder='Select Event'value={eventName} onChange={(e) => setEventName(e.target.value)}>
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
        <Th>Issue Number</Th>
        <Th>Points</Th>
        <Th>RepoName</Th>
        <Th>Status</Th>
        <Th>Action</Th>
      </Tr>
    </Thead>
    <Tbody>
    {userPrDetails?.map((pr, index) => (
    <Tr key={index}>
      <Td>{pr.prTitle}</Td>
      <Td>{pr.prNumber}</Td>
      <Td>{pr.issueNumber}</Td>
      <Td>{pr.points}</Td>
      <Td>{pr.repoName}</Td>
      <Td>{pr.status}</Td>
      <Td>
      <Button onClick={() => handleOpenModal(pr)}>View Details</Button>

      </Td>
      
    </Tr>
  ))}
     
    </Tbody>



  </Table>

  <Modal isOpen={isModalOpen} onClose={handleCloseModal} >
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>PR Details</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <form>
        <FormControl mb={4}>
          <FormLabel>PR Title</FormLabel>
          <Input
            type="text"
            value={selectedPrDetails?.prTitle || ''}
            color={textColor} isReadOnly
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>PR Number</FormLabel>
          <Input
            type="text"
            value={selectedPrDetails?.prNumber || ''}
            color={textColor} isReadOnly
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Increment Points</FormLabel>
          <Input
            type="number"
            placeholder='Enter Point to Increment'
            color={textColor} onChange={handleIncrementPointsChange} required
          />
        </FormControl>
       
      </form>
    </ModalBody>
    <ModalFooter>
      <Button colorScheme="blue" mr={3} type="submit" onClick={handleCloseModal}>
        Close
      </Button>
      <Button colorScheme="blue" mr={3} type="submit" onClick={handleChangePoints}>
        Change Points
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
</TableContainer>
      </Box>
    </>
  );
}
