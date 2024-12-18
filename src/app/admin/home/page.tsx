'use client';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from '@chakra-ui/react';
import { Box, useColorModeValue, Text, Flex } from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { FetchedEvents } from 'api/events/events.js';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getUserPRDetails } from 'api/admin/admin.js';
import { RingLoader } from 'react-spinners';
import { useAuth } from '../../../contexts/AuthContext.js';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { EditPRPoints } from 'api/admin/admin.js';
import { useToast } from '@chakra-ui/react';
import { fetchLoggedInBasicDetails } from 'api/profile/profile.js';

export default function Dashboard() {
  const toast = useToast();
  const [githubId, setGithubId] = useState('');
  const [eventName, setEventName] = useState('');
  const [selectedPrDetails, setSelectedPrDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [incrementPoints, setIncrementPoints] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleIncrementPointsChange = (e: any) => {
    setIncrementPoints(e.target.value);
  };
  const handleOpenModal = (prDetails: any) => {
    setSelectedPrDetails(prDetails);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPrDetails(null);
    setIncrementPoints('');
    setIsModalOpen(false);
  };

  const [userPrDetails, setuserPrDetails] = useState([]);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const auth = useAuth();

  useEffect(() => {
    const querystring = window.location.search;
    const urlParam = new URLSearchParams(querystring);
    const token = urlParam.get('token');
    if (token === null) {
      auth.check_login();
    } else {
      localStorage.setItem('token', token);
      fetchLoggedInBasicDetails();
    }
  }, [auth]);

  const pointUpdate = useMutation({
    mutationFn: EditPRPoints,
    onSuccess: () => {
      console.log('Success');

      toast({
        title: 'Points Updated',
        description: 'PR points were successfully updated.',
        status: 'success',
        duration: 10000,
        isClosable: true,
      });

      setIsModalOpen(false);
    },
    onError: () => {
      console.log('Error');
      toast({
        title: 'Points not Updated',
        description: 'PR points were successfully updated.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleChangePoints = () => {
    if (incrementPoints === '') {
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
      const incrementPointsAsNumber = parseInt(incrementPoints, 10);

      const prUpdateData = {
        repoName,
        prNumber,
        issueNumber,
        pointIncrement: incrementPointsAsNumber,
        githubId,
        eventName,
      };

      console.log(prUpdateData);

      pointUpdate.mutate(prUpdateData);
    }
  };

  const { data: eventData } = useQuery<{ data: Array<{ name: string }> }>({
    queryKey: ['EventInfo'],
    queryFn: FetchedEvents,
  });

  const { data: userPrDeatils, refetch } = useQuery({
    queryKey: ['userPrDeatilsInfo'],
    queryFn: () => getUserPRDetails(githubId, eventName),
    enabled: false,
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
      setIsLoading(true);
      await refetch();
      setuserPrDetails(userPrDeatils);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  if (!eventData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#36d7b7" />
      </div>
    );
  }

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
            <Input
              placeholder="First name"
              color={textColor}
              value={githubId}
              onChange={(e) => setGithubId(e.target.value)}
            />
          </FormControl>

          <FormControl marginLeft="10px">
            <FormLabel>All Events</FormLabel>
            <Select
              placeholder="Select Event"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            >
              {eventData.data.map((e) => (
                <option key={e.name} value={e.name}>
                  {e.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Flex>
        <Button onClick={handlePrClick}>View PRS</Button>

        <TableContainer>
          <Table variant="simple">
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
                    <Button onClick={() => handleOpenModal(pr)}>
                      View Details
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
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
                      color={textColor}
                      isReadOnly
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>PR Number</FormLabel>
                    <Input
                      type="text"
                      value={selectedPrDetails?.prNumber || ''}
                      color={textColor}
                      isReadOnly
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Increment Points</FormLabel>
                    <Input
                      type="number"
                      placeholder="Enter Point to Increment"
                      color={textColor}
                      onChange={handleIncrementPointsChange}
                      required
                    />
                  </FormControl>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  type="submit"
                  onClick={handleCloseModal}
                >
                  Close
                </Button>
                <Button
                  colorScheme="blue"
                  mr={3}
                  type="submit"
                  onClick={handleChangePoints}
                >
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
