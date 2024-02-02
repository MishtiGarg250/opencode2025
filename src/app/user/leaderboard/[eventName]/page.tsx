'use client';
import { Box, SimpleGrid } from '@chakra-ui/react';
import ColumnsTable from 'views/admin/dataTables/components/ColumnsTable';
import { useQuery } from '@tanstack/react-query';
// import tableDataColumns from 'views/admin/dataTables/variables/tableDataColumns';
import React from 'react';
import { FetchedLeaderboard } from '../../../../api/leaderboard/leaderboard';
import { RingLoader } from 'react-spinners';

export default function EventName({
  params,
}: {
  params: { eventName: string };
}) {
  const eventName = params.eventName;

  const { data: LeadData, isLoading } = useQuery({
    queryKey: ['LeadInfo'],
    queryFn: () => FetchedLeaderboard(eventName),
  });

  console.log(LeadData);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#36d7b7" />
      </div>
    );
  }

  type RowObj = {
    position: number;
    name: string;
    prmerged: string;
    githubid: string;
    points: string;
    avatarUrl: string;
    prDetailsURL: string;
  };

  const tableDataColumns: RowObj[] = LeadData.map((item, index) => {
    return {
      key:index,
      position: item.position,
      name: item.name,
      prmerged: item.prmerged,
      githubid: item.githubid,
      points: item.points,
      avatarUrl: item.avatarUrl,
      prDetailsURL: item.prDetailsURL,
    };
  });

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <ColumnsTable tableData={tableDataColumns} eventName={params.eventName} />
      <SimpleGrid columns={3} spacing={4}></SimpleGrid>
    </Box>
  );
}
