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
} from '@chakra-ui/react';
import { use, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from '@chakra-ui/react';
import { Box, useColorModeValue, Text, Flex } from '@chakra-ui/react';

import { useState } from 'react';
import { FetchedEvents } from 'api/events/events';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getUserPRDetails } from 'api/admin/admin';
import { getUserIssueDetails } from 'api/events/events';
import { RingLoader } from 'react-spinners';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { EditPRPoints } from 'api/admin/admin';
import { useToast } from '@chakra-ui/react';
import { eventNames } from 'process';

export default function Dashboard() {
    const router = useRouter();
    const params = useSearchParams();
    const repoName = params.get('repoName');
    const profileName = params.get('profileName');
    
  

  const toast = useToast();

  interface issues{
    title: string;
    issueNumber: number;
    status: string;
    currentPoints: number;
  }
  interface IssueData {
    repoName: string;
    
    issues: issues[]; // Update this with the actual type of PR array
   
  }

  
  const [userIssueDetails, setuserIssueDetails] = useState<IssueData | undefined>(undefined);

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  

  interface Event {
    name: string;
  }

  const { data: UserIssueDetils, isLoading } = useQuery({
    queryKey: ['profileInfo'],
    queryFn: () => getUserIssueDetails(profileName, "Opencode'23", repoName),
  });

  useEffect(() => {
    if (UserIssueDetils) {
      setuserIssueDetails(UserIssueDetils);
      console.log(UserIssueDetils)
    }
  }, [UserIssueDetils]);
  
  

  if (isLoading ) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#36d7b7" />
      </div>
    );
  }
  


  

 
  return (
    
    <>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        

        
        

        <TableContainer>
          <Table variant="simple">
            <TableCaption>All PR Details</TableCaption>
            <Thead>
              <Tr>
                <Th>Issue Title</Th>
                <Th>Issue Number</Th>
                <Th>Status</Th>
                <Th>Current Points</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userIssueDetails?.issues?.map((pr, index) => (
                <Tr key={index}>
                  <Td>{pr.title}</Td>
                  <Td>{pr.issueNumber}</Td>
                  <Td>{pr.status}</Td>
                  <Td>{pr.currentPoints}</Td>
                  
                </Tr>
              ))}
            </Tbody>
          </Table>

          
        </TableContainer>
      </Box>
    </>
  );
}
