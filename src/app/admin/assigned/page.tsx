'use client'
import { useState } from 'react';
import { useEffect } from 'react';
import { Input, Select, Box, TableContainer, Table, TableCaption, Tr, Th, Thead, Tbody, Td } from '@chakra-ui/react';
import { Search2Icon } from "@chakra-ui/icons";

export default function Assigned() {
  const [samplespace, setSamplespace] = useState([{ username: "om222", issues: 5 }]);
  const [searchClicked, setSearchClicked] = useState(false);

  useEffect(() => {
    if (searchClicked) {
      // Fetch data from the backend and update the state
      const fetchData = async () => {
        try {
          // Simulate fetching data from the backend
          var newData=[{ username: "om222", issues: 5 }, { username: "om333", issues: 10 }, { username: "aksahyw", issues: 69 }];
          setSamplespace(newData);
          //alert("Data fetched successfully!");
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
      setSearchClicked(false);
    }
  });

  function handleSearch() {
    setSearchClicked(true);
  }

  var events = ["OpenCode", "Lorem", "Ipsum"];

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <div style={{ display: 'flex', paddingBottom: '10px', alignItems: 'center' }}>
        <Select placeholder='Select option' w='25%' mr='2%'>
          {events.map((event) => (
            <option key={event}>{event}</option>
          ))}
        </Select>
        <Input placeholder='Enter Username (om_123)' w="69%" mr="2%" />
        <Search2Icon w={4} h={4} color="teal.500" onClick={handleSearch} />
      </div>
      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
          <TableCaption>OM_sample_123 </TableCaption>
          <Thead>
            <Tr>
              <Th>UserName</Th>
              <Th isNumeric>Number of Issues Assigned</Th>
            </Tr>
          </Thead>
          <Tbody>
            {samplespace.map((sample, index) => (
              <Tr key={index}>
                <Td>{sample.username}</Td>
                <Td isNumeric>{sample.issues}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
