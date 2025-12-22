"use client";
import { Flex, Box, Table, Checkbox, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, Link, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, useDisclosure } from '@chakra-ui/react';
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
import LeaderboardGraph from './LeadearboardGraph';
import { NextAvatar } from 'components/image/Avatar';
import Confetti from 'react-confetti';
import { color } from '@chakra-ui/system';

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
	const [showProgress, setShowProgress] = React.useState(true);
	const [showText, setShowText] = React.useState('Show Progress');

	const [ sorting, setSorting ] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

	const firstPos = useColorModeValue('#6464ce', '#2B2D9A');
	const secondPos = useColorModeValue('#9292dd', '#1A1C7C');
	const thirdPos = useColorModeValue('#c1c1ec', '#0D0F66');
	const defaultPos = useColorModeValue('white', 'navy.800');


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
			cell: (info : any) => (
                <Link href={"/user/profile/"+info.getValue()} color={textColor} fontSize='lg' fontWeight='700'>
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
			cell: (info : any) => (
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
			cell: (info : any) => (
				
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

	const [width, setWidth] = React.useState(0);
	const [height, setHeight] = React.useState(0);

	React.useEffect(() => {
		const setSizes = () => {
			if (typeof window !== 'undefined') {
				setWidth(window.innerWidth);
				setHeight(window.innerHeight);
			}
		};
		setSizes();
		window.addEventListener('resize', setSizes);
		return () => window.removeEventListener('resize', setSizes);
	}, []);
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

			<Button onClick={() => {setShowProgress(!showProgress);
				 (showProgress? setShowText('Show Leaderboard') : setShowText('Show Progress')
				 )}}>{showText}</Button>
				
        
		</Flex>
        {showProgress && <Box>
          <Table variant="simple" color="gray.500" mb="24px" mt="12px">
            <Thead>
              {table.getHeaderGroups().map((headerGroup : any) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header : any) => {
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
                .rows
                .map((row : any) => {
				
					if(row.original.position === 1){
						return (
							<Tr key={row.id} bg={firstPos}>
							  {row.getVisibleCells().map((cell : any) => {
									return (
										<Td
										  key={cell.id}
										  fontSize={{ sm: '14px' }}
										  minW={{ sm: '150px', md: '200px', lg: 'auto' }}
										  borderColor="transparent"
										  bg={firstPos}
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
					}
					else if(row.original.position === 2){
						return (
							<Tr key={row.id} bg={secondPos}>
							  {row.getVisibleCells().map((cell : any) => {
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
					}
					else if(row.original.position === 3){
						return (
							<Tr key={row.id} bg={thirdPos}>
							  {row.getVisibleCells().map((cell : any) => {
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
					}
					else{
						return (
							<Tr key={row.id} bg={defaultPos}>
							  {row.getVisibleCells().map((cell : any) => {
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
					}
                  
                })}
            </Tbody>
          </Table>
        </Box>}

		{!showProgress && <LeaderboardGraph eventName={decodeURIComponent(eventName)} topN={5} />} 
	  </Card>
	  
	  <Confetti 
	  	width={width}
		height={height}
		numberOfPieces={700}
		friction={1.005}
		gravity={0.15}
		initialVelocityY ={20}
		tweenDuration={10000}
		recycle={false}
		/>
    </>
  );
} 