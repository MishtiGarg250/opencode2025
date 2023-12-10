// Chakra imports
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import Card from 'components/card/Card'
import { NextAvatar } from 'components/image/Avatar'
import { useState,useEffect } from 'react'
export default function Banner (props: {
  banner: string
  avatar: string
  name: string
  
  githubUrl:string
  prMerged: number
  prContributed: number
  pointsEarned: number
 
  [x: string]: any
}) {
  const {
    banner,
    githubUrl,
    avatar,
    name,
    pointsEarned,
  
    prMerged,
    prContributed,
    posts,
    followers,
    following,
 
    ...rest
  } = props
  // Chakra Color Mode

  const[TempData,setTempData] = useState(' ');

  useEffect(() => {
    const GitDatalocal = localStorage.getItem('GithubData');
    const ParseData = JSON.parse(GitDatalocal);
    setTempData(ParseData.data);
  }, []);
  
  
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white')
  const textColorSecondary = 'gray.400'
  const borderColor = useColorModeValue(
    'white !important',
    '#111C44 !important'
  )
  return (
    <Card mb={{ base: '0px', lg: '20px' }} mt={{base: '20px'}} padding="0" paddingBottom="20px" alignItems='center' {...rest}>
      <Box
        bg={banner}
        bgSize='cover'
        borderRadius='16px'
        h='100%'
        w='100%'
        opacity={0.5}
        position={'absolute'}
      />
      <NextAvatar
        mx='auto'
        src={avatar}
        h='87px'
        w='87px'
        mt='-43px'
        border='4px solid'
        borderColor={borderColor}
        postion='relative'
        top='10px'
      />
      <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
    {name}
      </Text>
      <Text color={textColorSecondary} fontSize='sm'>
     {githubUrl}
      </Text>
      <Flex w='max-content' mx='auto' mt='26px' position='relative' left='30px'>
       
        <Flex mx='auto' me='60px' alignItems='center' flexDirection='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
           {prMerged}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            PRs <br/>Merged
          </Text>
        </Flex>
        <Flex mx='auto' me='60px' alignItems='center' flexDirection='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
           {pointsEarned}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
Recent Points <br/>Earned         </Text>
        </Flex>
      </Flex>
    </Card>
  )
}
