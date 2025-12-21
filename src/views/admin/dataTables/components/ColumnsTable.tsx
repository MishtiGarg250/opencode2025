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
import { gsap } from "gsap";
import Flip from "gsap/Flip";
import { FaTrophy } from "react-icons/fa";
import Snowfall from "react-snowfall";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import Card from "components/card/Card";
import LeaderboardGraph from "./LeadearboardGraph";
import { NextAvatar } from "components/image/Avatar";

gsap.registerPlugin(Flip);

type RowObj = {
  position: number;
  name: string;
  avatarUrl: string;
  githubid: string;
  prmerged: number;
  points: number;
};

const columnHelper = createColumnHelper<RowObj>();



function MobileLeaderboard({ data }: { data: RowObj[] }) {
  return (
    <Flex direction="column" gap="14px">
      {data.map((user) => (
        <Flex
          key={user.githubid}
          align="center"
          justify="space-between"
          p="14px"
          borderRadius="18px"
          bg="rgba(255,255,255,0.08)"
          backdropFilter="blur(14px)"
        >
          {/* LEFT */}
          <Flex align="center" gap="12px">
            <Text fontWeight="800" fontSize="18px">
              {user.position}
            </Text>

            <NextAvatar
              src={user.avatarUrl}
              h="44px"
              w="44px"
            />

            <Box>
              <Text fontWeight="700" fontSize="15px">
                {user.name}
              </Text>
              <Text fontSize="12px" color="gray.400">
                @{user.githubid}
              </Text>
            </Box>
          </Flex>

          
          <Flex align="center" gap="6px">
            <Text fontWeight="800" color="purple.400">
              {user.points}
            </Text>
            <FaTrophy color="#FFB547" />
          </Flex>
        </Flex>
      ))}
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

  const isMobile = useBreakpointValue({ base: true, md: false });

  const glassBg = useColorModeValue(
    "rgba(255,255,255,0.7)",
    "rgba(15,23,42,0.7)"
  );
  const rowHover = useColorModeValue(
    "rgba(117,81,255,0.08)",
    "rgba(117,81,255,0.15)"
  );

  const columns = [
    columnHelper.accessor("position", {
      header: "RANK",
      cell: (info) => {
        const pos = info.getValue();
        return (
          <Flex justify="center">
            {pos <= 3 ? (
              <Box bg="#FFB547" p="8px" borderRadius="full">
                <FaTrophy size={14} />
              </Box>
            ) : (
              <Text fontWeight="700">{pos}</Text>
            )}
          </Flex>
        );
      },
    }),

    columnHelper.accessor("name", {
      header: "NAME",
      cell: (info) => (
        <Text fontWeight="700">{info.getValue()}</Text>
      ),
    }),

    columnHelper.accessor("githubid", {
      header: "GITHUB",
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
      header: "PRS",
      cell: (info) => (
        <Box
          px="12px"
          py="4px"
          bg="purple.100"
          color="purple.700"
          borderRadius="full"
          fontWeight="700"
        >
          {info.getValue()}
        </Box>
      ),
    }),

    columnHelper.accessor("points", {
      header: "POINTS",
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
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => row.githubid,
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
  }, [tableData, sorting, isMobile, showProgress]);

  return (
    <>
      <Card
        w="100%"
        px="20px"
        py="20px"
        borderRadius="20px"
        bg={glassBg}
        backdropFilter="blur(18px)"
      >
        {/* HEADER */}
        <Flex justify="space-between" mb="20px">
          <Box>
            <Text fontSize="28px" fontWeight="800">
              Leaderboard
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
            {showProgress ? "Show Graph" : "Show Leaderboard"}
          </Button>
        </Flex>

        {/* CONTENT */}
        {showProgress ? (
          isMobile ? (
            <MobileLeaderboard data={tableData} />
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
                            header.getContext()
                          )}
                        </Th>
                      ))}
                    </Tr>
                  ))}
                </Thead>

                <Tbody ref={tbodyRef}>
                  {table.getRowModel().rows.map((row) => (
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
            </Box>
          )
        ) : (
          <LeaderboardGraph
            eventName={decodeURIComponent(eventName)}
            topN={5}
            startDate="2024-12-26"
            endDate="2025-01-25"
          />
        )}
      </Card>

    
      {!isMobile && (
        <Box position="fixed" inset={0} pointerEvents="none" zIndex={1}>
          <Snowfall snowflakeCount={110} />
        </Box>
      )}
    </>
  );
}
