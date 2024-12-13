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
import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserIssueDetails } from 'api/events/events';
import { RingLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';

export default function Dashboard() {
  const params = useSearchParams();
  const repoName = params.get('repoName');
  const profileName = params.get('profileName');

  interface issues {
    title: string;
    issueNumber: number;
    status: string;
    currentPoints: number;
  }
  interface IssueData {
    repoName: string;

    issues: issues[]; // Update this with the actual type of PR array
  }

  const [userIssueDetails, setuserIssueDetails] = useState<
    IssueData | undefined
  >(undefined);

  const { data: UserIssueDetils, isLoading } = useQuery({
    queryKey: ['profileInfo'],
    queryFn: () =>
      getUserIssueDetails(
        profileName,
        process.env.NEXT_PUBLIC_EVENT_NAME,
        repoName,
      ),
  });

  useEffect(() => {
    if (UserIssueDetils) {
      setuserIssueDetails(UserIssueDetils);
      console.log(UserIssueDetils);
    }
  }, [UserIssueDetils]);

  if (isLoading) {
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
