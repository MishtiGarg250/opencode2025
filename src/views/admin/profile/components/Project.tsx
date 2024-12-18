// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { PullRequest } from 'app/user/profile/page';
// Custom components
import Card from 'components/card/Card';
import { FaGithub } from "react-icons/fa";
// Assets


export default function Project({ pr }: {
  pr: PullRequest;
  [x: string]: any;
}) {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const bg = useColorModeValue('white', 'navy.700');
  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset',
  );

  return (
    <Card bg={bg} mb="20px" p="14px" boxShadow={cardShadow}>
      <Flex align="center" direction={{ base: 'column', md: 'row' }}>
        <Icon as={FaGithub} color="secondaryGray.500" h="30px" w="30px" mr="10px"/>
        <Box mt={{ base: '10px', md: '0' }}>
          <Text
            color={textColorPrimary}
            fontWeight="500"
            fontSize="md"
            mb="4px"
          >
            Issue #{pr.issue.issueNumber}
          </Text>
          <Flex>
            <Text
              fontWeight="500"
              color={textColorSecondary}
              fontSize="sm"
              me="4px"
            >
              PR #{pr.prNumber} • Repo: 
            </Text>
            <Link className='font-semibold underline text-sm' color={textColorSecondary} href={`https://github.com/opencodeiiita/${pr.issue.repoName}`} >
              {pr.issue.repoName}
            </Link>
          </Flex>
            <Text
              fontWeight="500"
              color={textColorPrimary}
              fontSize="sm"
              me="4px"
            >
                Status: {pr.status}
            </Text>
        </Box>
        <Link
          href={JSON.parse(localStorage.getItem('GithubData')).data.githubUrl+"/"+pr.issue.repoName}
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
