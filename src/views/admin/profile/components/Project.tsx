// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import { useState,useEffect } from 'react';
import Card from 'components/card/Card';
import { FaGithub } from "react-icons/fa";
import { Image } from 'components/image/Image';
// Assets


export default function Project(props: {
  title: string;
  ranking: number | string;
  repoName: string;
  image: string;
  language:string
  status:string
  [x: string]: any;
}) {
  const { title, ranking, repoName,language, image, status, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const brandColor = useColorModeValue('brand.500', 'white');
  const bg = useColorModeValue('white', 'navy.700');
  
  return (
    <Card bg={bg} {...rest} p="14px">
      <Flex align="center" direction={{ base: 'column', md: 'row' }}>
        {/* <Image
          alt=""
          h="80px"
          w="80px"
          src={image}
          borderRadius="8px"
          me="20px"
        /> */}
        <Icon as={FaGithub} color="secondaryGray.500" h="30px" w="30px" mr="10px"/>
        <Box mt={{ base: '10px', md: '0' }}>
          <Text
            color={textColorPrimary}
            fontWeight="500"
            fontSize="md"
            mb="4px"
          >
            Issue #{title}
          </Text>
          <Flex>
            <Text
              fontWeight="500"
              color={textColorSecondary}
              fontSize="sm"
              me="4px"
            >
              PR #{ranking} • Repo: 
            </Text>
            <Link fontWeight="500" color={textColorSecondary} href={JSON.parse(localStorage.getItem('GithubData')).data.githubUrl+"/"+repoName} fontSize="sm">
              {language}
            </Link>
          </Flex>
            <Text
              fontWeight="500"
              color={textColorPrimary}
              fontSize="sm"
              me="4px"
            >
                Status: {status}
            </Text>
        </Box>
        <Link
          href={JSON.parse(localStorage.getItem('GithubData')).data.githubUrl+"/"+repoName}
          variant="no-hover"
          me="16px"
          ms="auto"
          p="0px !important"
        >
          {/* <Icon as={MdEdit} color="secondaryGray.500" h="18px" w="18px" /> */}
        </Link>
      </Flex>
    </Card>
  );
}
