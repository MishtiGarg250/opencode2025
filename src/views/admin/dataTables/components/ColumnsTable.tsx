"use client";

import {
  Flex,
  Box,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Link,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import * as React from "react";

import { FaTrophy } from "react-icons/fa";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import Card from "components/card/Card";
import LeaderboardGraph from "./LeadearboardGraph";
import { NextAvatar } from "components/image/Avatar";
import Snowfall from 'react-snowfall';
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);
export type RowObj = {
	position: string;
	name: string;
    avatarUrl: string;
	githubid: string;
	prmerged: number;
	points: number;
	prDetailsURL: string;
};
 
const columnHelper = createColumnHelper<RowObj>();



function MobileLeaderboard({
  table,
}: {
  table: any;
}) {
  if(!table) return null;
  const rows = table.getPaginationRowModel().rows;

  return (
    <Flex direction="column" gap="16px">
      {/* LIST */}
      {rows.map((row: any) => {
        const user = row.original as RowObj;

        return (
          <Flex
            key={user.githubid}
            align="center"
            justify="space-between"
            p="14px"
            borderRadius="18px"
            bg="rgba(255,255,255,0.08)"
            backdropFilter="blur(14px)"
          >
            <Link href={`/user/profile/${user.githubid}`}>
              <Flex align="center" gap="12px">
                <Text fontWeight="800">{user.position}</Text>

                <NextAvatar
                  src={user.avatarUrl}
                  h="44px"
                  w="44px"
                />

                <Box>
                  <Text fontWeight="700">{user.name}</Text>
                  <Text fontSize="12px" color="gray.400">
                    @{user.githubid}
                  </Text>
                </Box>
              </Flex>
            </Link>

            <Flex align="center" gap="6px">
              <Text fontWeight="800" color="purple.400">
                {user.points}
              </Text>
              <FaTrophy color="#FFB547" />
            </Flex>
          </Flex>
        );
      })}

      
      <Flex direction="column" gap="8px" mt="8px">
        <Text fontSize="12px" color="gray.400" textAlign="center">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </Text>

        <Flex gap="10px">
          <Button
            flex="1"
            size="sm"
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
            borderRadius="full"
          >
            Prev
          </Button>

          <Button
            flex="1"
            size="sm"
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
            borderRadius="full"
          >
            Next
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}





export default function ColumnTable({
  tableData,
  eventName,
}: {
  tableData: RowObj[];
  eventName: string;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [showProgress, setShowProgress] = React.useState(true);

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 50,
  });

  const isMobile = useBreakpointValue({ base: true, md: false });

  const glassBg = useColorModeValue(
    "rgba(255,255,255,0.7)",
    "rgba(15,23,42,0.7)"
  );
  const rowHover = useColorModeValue(
    "rgba(117,81,255,0.08)",
    "rgba(117,81,255,0.15)"
  );
  const prsBorder = useColorModeValue("purple.300", "purple.400");



  const columns = [
    
    columnHelper.accessor("position", {
      header: "RANK",
      cell: (info) => {
        const value = info.getValue();
        const pos = typeof value === "string" ? parseInt(value, 10) : value;
        const display = Number.isNaN(Number(pos)) ? value : pos;
        return (
          <Flex justify="center">
            {typeof pos === "number" && pos <= 3 ? (
              <Box bg="#FFB547" p="8px" borderRadius="full">
                <FaTrophy size={14} />
              </Box>
            ) : (
              <Text fontWeight="700">{display}</Text>
            )}
          </Flex>
        );
      },
    }),

    
    columnHelper.accessor("name", {
  header: () => (
    <Text textAlign="left">NAME</Text>
  ),
  cell: (info) => (
    <Text fontWeight="700" textAlign="left">
      {info.getValue()}
    </Text>
  ),
}),


  
    columnHelper.accessor("githubid", {
  header: () => (
    <Text textAlign="left">GITHUB</Text>
  ),
  cell: (info) => (
    <Link href={`/user/profile/${info.getValue()}`}>
      <Flex align="center" gap="10px">
        <NextAvatar
          src={info.row.original.avatarUrl}
          h="40px"
          w="40px"
        />
        <Text fontWeight="700">{info.getValue()}</Text>
      </Flex>
    </Link>
  ),
}),


    
    columnHelper.accessor("prmerged", {
  header: () => (
    <Flex justify="center">
      <Text>PRS</Text>
    </Flex>
  ),
  cell: (info) => (
    <Flex justify="center">
      <Box
        h="36px"
        w="36px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="2px solid"
        borderColor="purple.400"
        borderRadius="full"
        fontWeight="800"
        color="purple.400"
      >
        {info.getValue()}
      </Box>
    </Flex>
  ),
}),



    columnHelper.accessor("points", {
  header: () => (
    <Flex justify="flex-end">
      <Text>POINTS</Text>
    </Flex>
  ),
  cell: (info) => (
    <Flex justify="flex-end" gap="6px">
      <Text fontWeight="800" color="purple.500">
        {info.getValue()}
      </Text>
      <FaTrophy color="#FFB547" />
    </Flex>
  ),
}),

  ];



  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => String(row.githubid),
  });

  

  const tbodyRef = React.useRef<HTMLTableSectionElement | null>(null);
  const prevFlipStateRef = React.useRef<Flip.FlipState | null>(null);

  React.useLayoutEffect(() => {
    if (!tbodyRef.current || isMobile || !showProgress) return;

    const rows = Array.from(
      tbodyRef.current.querySelectorAll("tr[data-row-id]")
    );

    const state = Flip.getState(rows);
    if (prevFlipStateRef.current) {
      Flip.from(prevFlipStateRef.current, {
        duration: 0.6,
        stagger: 0.02,
        ease: "power2.out",
        absolute: true,
      });
    }
    prevFlipStateRef.current = state;
  }, [pagination.pageIndex, sorting, isMobile, showProgress]);

 

  return (
    <>
      <Card
        flexDirection="column"
        w="100%"
        px="20px"
        py="20px"
        borderRadius="20px"
        bg={glassBg}
        backdropFilter="blur(18px)"
        zIndex={10}
      >
        {/* HEADER */}
        <Flex justify="space-between" mb="20px">
          <Box>
            <Text fontSize="28px" fontWeight="800">
              {showProgress ? "Leaderboard" : "Progress"}
            </Text>
            <Text fontSize="14px" color="gray.500">
              Code. Compete. Conquer.
            </Text>
          </Box>

          <Button
            size="sm"
            borderRadius="full"
            onClick={() => setShowProgress(!showProgress)}
          >
            {showProgress ? "Progress" : "Leaderboard"}
          </Button>
        </Flex>

        {/* CONTENT */}
        {showProgress ? (
          isMobile ? (
            <MobileLeaderboard
              table={table}
            />
          ) : (
            <Box overflowX="auto">
              <Table variant="unstyled" minW="720px">
                <Thead>
                  {table.getHeaderGroups().map((hg) => (
                    <Tr key={hg.id}>
                      {hg.headers.map((header) => (
                        <Th key={header.id} fontSize="11px" color="gray.400">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </Th>
                      ))}
                    </Tr>
                  ))}
                </Thead>

                <Tbody ref={tbodyRef}>
                  {table.getPaginationRowModel().rows.map((row) => (
                    <Tr
                      key={row.id}
                      data-row-id={row.id}
                      _hover={{ bg: rowHover }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <Td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              
              <Flex mt="16px" justify="space-between" align="center">
                <Text fontSize="13px" color="gray.400">
                  Page {pagination.pageIndex + 1} of {table.getPageCount()}
                </Text>

                <Flex gap="8px">
                  <Button
                    size="sm"
                    onClick={() => table.previousPage()}
                    isDisabled={!table.getCanPreviousPage()}
                  >
                    Prev
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => table.nextPage()}
                    isDisabled={!table.getCanNextPage()}
                  >
                    Next
                  </Button>
                </Flex>
              </Flex>
            </Box>
          )
        ) : (
          <LeaderboardGraph
            eventName={decodeURIComponent(eventName)}
            topN={5}
          />
        )}
      </Card>

    
      <Box position="fixed" inset={0} pointerEvents="none" zIndex={1}>
  <Snowfall snowflakeCount={110} />
</Box>

    </>
  );
} 