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

type RowObj = {
  position: number;
  name: string;
  avatarUrl: string;
  githubid: string;
  prmerged: number;
  points: number;
};

const columnHelper = createColumnHelper<RowObj>();
gsap.registerPlugin(Flip);

export default function ColumnTable(props: {
  tableData: RowObj[];
  eventName: string;
}) {
  const { tableData, eventName } = props;

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [showProgress, setShowProgress] = React.useState(true);
  const [showText, setShowText] = React.useState("Show Progress");

  const textColor = useColorModeValue("gray.800", "white");
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
          <Flex align="center" justify="center">
            {pos <= 3 ? (
              <Box
                bg="#FFB547"
                color="white"
                p="8px"
                borderRadius="full"
                data-trophy
              >
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
      header: "GITHUB ID",
      cell: (info) => (
        <Link href={`/user/profile/${info.getValue()}`}>
          <Flex align="center">
            <NextAvatar
              src={info.row.original.avatarUrl}
              h="42px"
              w="42px"
              mr="12px"
            />
            <Text fontWeight="700">{info.getValue()}</Text>
          </Flex>
        </Link>
      ),
    }),

    columnHelper.accessor("prmerged", {
      header: "PR MERGED",
      cell: (info) => (
        <Box
          px="12px"
          py="4px"
          bg="purple.100"
          color="purple.700"
          borderRadius="full"
          fontSize="14px"
          fontWeight="700"
          textAlign="center"
          w="fit-content"
        >
          {info.getValue()}
        </Box>
      ),
    }),

    columnHelper.accessor("points", {
      header: "TOTAL POINTS",
      cell: (info) => (
        <Flex justify="flex-end" align="center" gap="8px">
          <Text fontSize="18px" fontWeight="800" color="purple.500">
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

  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const tbodyRef = React.useRef<HTMLTableSectionElement | null>(null);
  const prevFlipStateRef = React.useRef<Flip.FlipState | null>(null);
  const prevRankRef = React.useRef<Record<string, number>>({});

  React.useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  React.useLayoutEffect(() => {
    if (!showProgress || !tbodyRef.current) return;
    const rows = Array.from(
      tbodyRef.current.querySelectorAll<HTMLTableRowElement>("tr[data-row-id]")
    );
    if (!rows.length) return;

    const newState = Flip.getState(rows);
    if (prevFlipStateRef.current) {
      Flip.from(prevFlipStateRef.current, {
        duration: 0.65,
        ease: "power2.out",
        absolute: true,
        stagger: 0.02,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
          ),
        onLeave: (elements) =>
          gsap.to(elements, { opacity: 0, y: -12, duration: 0.3, ease: "power2.in" }),
      });
    }

    const prevRanks = prevRankRef.current;
    rows.forEach((row) => {
      const id = row.getAttribute("data-row-id") ?? "";
      const newRank = Number(row.getAttribute("data-rank") ?? "");
      const prevRank = prevRanks[id];
      if (prevRank && newRank && newRank < prevRank) {
        gsap.fromTo(
          row,
          { boxShadow: "0 0 0 rgba(124,58,237,0)", backgroundColor: "rgba(124,58,237,0)" },
          {
            boxShadow: "0 12px 28px rgba(124,58,237,0.25)",
            backgroundColor: "rgba(124,58,237,0.08)",
            duration: 0.5,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
          }
        );
        const trophy = row.querySelector("[data-trophy]");
        if (trophy) {
          gsap.fromTo(
            trophy,
            { scale: 1 },
            { scale: 1.25, duration: 0.3, yoyo: true, repeat: 1, ease: "back.out(2)" }
          );
        }
      }
    });
    prevRankRef.current = Object.fromEntries(
      rows.map((row) => [
        row.getAttribute("data-row-id") ?? "",
        Number(row.getAttribute("data-rank") ?? ""),
      ])
    );
    prevFlipStateRef.current = newState;
  }, [tableData, sorting, showProgress]);

  return (
    <>
      <Card
        w="100%"
        px="24px"
        py="20px"
        borderRadius="20px"
        bg={glassBg}
        backdropFilter="blur(18px)"
        boxShadow="0 20px 50px rgba(0,0,0,0.08)"
      >
        {/* Header */}
        <Flex justify="space-between" align="center" mb="20px">
          <Box>
            <Text fontSize="32px" fontWeight="800">
              Leaderboard
            </Text>
            <Text fontSize="14px" color="gray.500">
              Code. Compete. Conquer
            </Text>
          </Box>

          <Button
            size="sm"
            borderRadius="full"
            onClick={() => {
              setShowProgress(!showProgress);
              setShowText(
                showProgress ? "Show Leaderboard" : "Show Progress"
              );
            }}
          >
            {showText}
          </Button>
        </Flex>

        {/* Table */}
        {showProgress && (
          <Table variant="unstyled">
            <Thead>
            {table.getHeaderGroups().map((hg) => (
              <Tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <Th
                      key={header.id}
                      fontSize="11px"
                      textTransform="uppercase"
                      color="gray.400"
                    >
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
                  data-rank={row.original.position}
                  _hover={{ bg: rowHover }}
                  transition="background 0.2s ease"
                >
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id} py="16px">
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
        )}

        {!showProgress && (
          <LeaderboardGraph
            eventName={decodeURIComponent(eventName)}
            topN={5}
            startDate="2024-12-26"
            endDate="2025-01-25"
          />
        )}
      </Card>

      <Box position="fixed" inset={0} pointerEvents="none" zIndex={1}>
        <Snowfall
          width={width}
          height={height}
          snowflakeCount={110}
          color="rgba(176, 144, 255, 0.85)"
          style={{ filter: "drop-shadow(0 0 6px rgba(124, 58, 237, 0.35))" }}
        />
      </Box>
    </>
  );
}
