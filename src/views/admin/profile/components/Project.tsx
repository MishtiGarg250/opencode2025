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
    <Card bg="gray.900" mb="20px" p="14px" boxShadow={cardShadow} border="1px solid"
      borderColor="navy.800">
      <Flex align="center" direction={{ base: 'column', md: 'row' }}>
        <Icon as={FaGithub} color="secondaryGray.500" h="30px" w="30px" mr="10px"/>
        <Box mt={{ base: '10px', md: '0' }}>
          <Link textDecorationLine='underline' href={`https://github.com/opencodeiiita/${pr.issue.repoName}/issues/${pr.issue.issueNumber}`} >
            <Text
              color={textColorPrimary}
              fontWeight="500"
              fontSize="md"
              mb="4px"
            >
              Issue #{pr.issue.issueNumber}
            </Text>
          </Link>
          <Flex fontWeight="500"
              color={textColorSecondary}
              fontSize="sm"
              me="4px">
            <Link
              mr={2}
              textDecorationLine='underline'
              href={`https://github.com/opencodeiiita/${pr.issue.repoName}/pull/${pr.prNumber}`}
            >
              PR #{pr.prNumber}
            </Link>
            • Repo:
            <Link className='font-semibold text-sm ml-2' textDecorationLine='underline' color={textColorSecondary} href={`https://github.com/opencodeiiita/${pr.issue.repoName}`} >
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
      </Flex>
    </Card>
  );
}
