import { Flex, Box, Table, Checkbox, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, Link } from '@chakra-ui/react';
import * as React from 'react';
import {FaTrophy} from 'react-icons/fa'

import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table';

// Custom components
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import { NextAvatar } from 'components/image/Avatar';

type RowObj = {
	position: string;
	name: string;
    avatarUrl: string;
	githubid: number;
	prmerged: string;
	points:string; 
};
 
const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function ColumnTable(props: { tableData: any; eventName : string; }) {
	const { tableData,eventName } = props;
	const [ sorting, setSorting ] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	let defaultData= tableData;
	
	const columns = [
		columnHelper.accessor('position', {
			id: 'position',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					SR NO
				</Text>
			),
			cell: (info: any) => (
				<Flex align='center'> 
					<Text color={textColor} fontSize='lg' fontWeight='700'>
						{info.getValue()}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('name', {
			id: 'name',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					NAME
				</Text>
			),
			cell: (info: any) => (
				<Flex align='center'> 
					<Text color={textColor} fontSize='lg' fontWeight='700'>
						{info.getValue()}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('githubid', {
			id: 'githubid',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					GITHUB ID
				</Text>
			),
			cell: (info) => (
                <Link href={"https://github.com/"+info.getValue()} color={textColor} fontSize='lg' fontWeight='700'>
                    <Flex align='center'>
                        <NextAvatar
                            mx='auto'
                            src={info.row.original.avatarUrl}
                            h='47px'
                            w='47px'
                            border='4px solid'
                            borderColor={borderColor}
                            margin="7px"
                        />
                        {info.getValue()}
                    </Flex>
                </Link>
			)
		}),
		
		columnHelper.accessor('prmerged', {
			id: 'prmerged',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					PR MERGED
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='lg' fontWeight='700'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('points', {
			id: 'points',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					TOTAL POINTS	
				</Text>
			),
			cell: (info) => (
				
				<Flex align='center' gap='4'> 
					<Text color={textColor} fontSize='lg' fontWeight='700'>
					{info.getValue()}
					
					
				</Text>
				<FaTrophy color='#ffae03' fontSize='2xl'/>
				</Flex>
				
			)
		})
	];


	const [data, setData] = React.useState(() => (defaultData ? [...defaultData] : [] ));
	console.log(data)

	
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true
	});
	return (
    <>
      <Card
        flexDirection="column"
        w="100%"
        px="0px"
        overflowX={{ sm: 'scroll', lg: 'hidden' }}
      >
        <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
          <Text
            color={textColor}
            fontSize="30px"
            mb="4px"
            fontWeight="700"
            lineHeight="100%"
          >
            {eventName}
          </Text>
        </Flex>
        <Box>
          <Table variant="simple" color="gray.500" mb="24px" mt="12px">
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <Th
                        key={header.id}
                        colSpan={header.colSpan}
                        pe="10px"
                        borderColor={borderColor}
                        cursor="pointer"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <Flex
                          justifyContent="space-between"
                          align="center"
                          fontSize={{ sm: '10px', lg: '12px' }}
                          color="gray.400"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: '',
                            desc: '',
                          }[header.column.getIsSorted() as string] ?? null}
                        </Flex>
                      </Th>
                    );
                  })}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table
                .getRowModel()
                .rows.slice(0, 11)
                .map((row) => {
                  return (
                    <Tr key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <Td
                            key={cell.id}
                            fontSize={{ sm: '14px' }}
                            minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                            borderColor="transparent"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </Box>
      </Card>
    </>
  );
} 