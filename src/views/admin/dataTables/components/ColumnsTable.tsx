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
import { isMaintainer, MAINTAINERS } from "constants/Maintainers";

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
const currentGithubID = JSON.parse(localStorage.getItem('user') ?? '{}')?.githubId;


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


  const isCurrentUser = (row: any) =>
    row.original.githubid === currentGithubID;

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
      header: () => <Text textAlign="left">GITHUB</Text>,

      cell: (info) => {
        const githubId = info.getValue();
        const isYou = githubId === currentGithubID;
        const maintainer = isMaintainer(githubId);

        return (
          <Link href={`/user/profile/${githubId}`}>
            <Flex align="center" gap="10px">

              <Box position="relative">
                <NextAvatar
                  src={info.row.original.avatarUrl}
                  h="40px"
                  w="40px"
                />

                {maintainer && (
                  <Box
                    position="absolute"
                    top="-12px"
                    right="-25px"
                    bg="yellow.400"
                    color="black"
                    fontSize="9px"
                    fontWeight="900"
                    px="6px"
                    py="2px"
                    borderRadius="full"
                  >
                    MENTOR
                  </Box>
                )}
              </Box>

              <Flex align="center" gap="6px">
                <Text fontWeight="700">{githubId}</Text>

                {isYou && (
                  <Box
                    px="8px"
                    py="2px"
                    fontSize="10px"
                    fontWeight="800"
                    borderRadius="full"
                    bg="purple.500"
                    color="white"
                  >
                    YOU
                  </Box>
                )}
              </Flex>
            </Flex>
          </Link>
        );
      },
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

  const reorderedData = React.useMemo(() => {
    if (!currentGithubID) return tableData;

    const currentUser = tableData.find(
      (u) => u.githubid === currentGithubID
    );

    if (!currentUser) return tableData;

    return [
      currentUser,
      ...tableData.filter((u) => u.githubid !== currentGithubID),
    ];
  }, [tableData, currentGithubID]);
  const table = useReactTable({
    data: reorderedData,
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => String(row.githubid),
  });



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
                      bg={isCurrentUser(row) ? "purple.800" : "transparent"}
                      color={isCurrentUser(row) ? "white" : "inherit"}
                      boxShadow={isCurrentUser(row) ? "0 0 0 2px rgba(183,148,244,0.6)" : "none"}
                      _hover={{
                        bg: isCurrentUser(row) ? "purple.600" : rowHover,
                      }}
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

function MobileLeaderboard({
  table,
}: {
  table: any;
}) {
  if (!table) return null;
  const rows = table.getPaginationRowModel().rows;

  return (
    <Flex direction="column" gap="16px">

      {rows.map((row: any) => {
        const user = row.original as RowObj;
        const value = user.position;
        const pos = typeof value === "string" ? parseInt(value, 10) : value;
        const display = Number.isNaN(Number(pos)) ? value : pos;

        return (
          <Flex
            key={user.githubid}
            align="center"
            justify="space-between"
            p="14px"
            borderRadius="18px"
            bg={
              user.githubid === currentGithubID
                ? "purple.800"
                : "rgba(255,255,255,0.08)"
            }
            color={user.githubid === currentGithubID ? "white" : "inherit"}
            boxShadow={
              user.githubid === currentGithubID
                ? "0 0 0 2px rgba(183,148,244,0.6)"
                : "none"
            }
          >
            <Link href={`/user/profile/${user.githubid}`}>
              <Flex align="center" gap="12px">
                <Flex justify="center">
                  {typeof pos === "number" && pos <= 3 ? (
                    <Box bg="#FFB547" p="8px" borderRadius="full">
                      <FaTrophy size={14} />
                    </Box>
                  ) : (
                    <Text fontWeight="700">{display}</Text>
                  )}
                </Flex>

                <Box position="relative">
                  <NextAvatar
                    src={user.avatarUrl}
                    h="44px"
                    w="44px"
                  />

                  {MAINTAINERS.has(user.githubid) && (
                    <Box
                      position="absolute"
                      top="-6px"
                      right="-6px"
                      bg="yellow.400"
                      color="black"
                      fontSize="8px"
                      fontWeight="900"
                      px="5px"
                      py="1px"
                      borderRadius="full"
                    >
                      M
                    </Box>
                  )}
                </Box>


                <Box>
                  <Flex align="center" gap="6px">
                    <Text fontWeight="700">{user.name}</Text>

                    {user.githubid === currentGithubID && (
                      <Box
                        px="6px"
                        py="1px"
                        fontSize="9px"
                        fontWeight="800"
                        borderRadius="full"
                        bg="white"
                        color="purple.600"
                      >
                        YOU
                      </Box>
                    )}
                  </Flex>

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