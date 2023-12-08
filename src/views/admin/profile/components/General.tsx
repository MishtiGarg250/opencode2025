// Chakra imports
import { useState,useEffect } from 'react';
import { SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import Information from 'views/admin/profile/components/Information';

// Assets
export default function GeneralInformation(props: { [x: string]: any }) {
	const { ...rest } = props;
	// Chakra Color Mode
	const[TempData,setTempData] = useState(' ');

  useEffect(() => {
    const GitDatalocal = localStorage.getItem('GithubData');
    const ParseData = JSON.parse(GitDatalocal);
    setTempData(ParseData.data);
}, []);

console.log("Tempdata from general: ")
  console.log(TempData)
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'gray.400';
	const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');
	return (
		<Card mb={{ base: '0px', '2xl': '20px' }} {...rest}>
			<Text color={textColorPrimary} fontWeight='bold' fontSize='2xl' mt='10px' mb='15px'>
				General Information
			</Text>
			<SimpleGrid columns={2} gap='20px'>
				<Information boxShadow={cardShadow} title='Name' value={TempData.name} />
				<Information boxShadow={cardShadow} title='Github Username' value={TempData.githubId} />
				<Information boxShadow={cardShadow} title='College' value={TempData.college} />
				<Information boxShadow={cardShadow} title='Discord ID' value={TempData.discordId }/>
				<Information boxShadow={cardShadow} title='Email' value={TempData.email}/>
				
			</SimpleGrid>
		</Card>
	);
}
