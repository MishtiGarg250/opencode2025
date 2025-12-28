// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Link,
  Text,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';
import { PullRequest } from 'app/user/profile/page';
import Card from 'components/card/Card';
import { FaGithub, FaCodeBranch } from 'react-icons/fa';

export default function Project({ pr }: { pr: PullRequest; [x: string]: any }) {
  const textPrimary = useColorModeValue('gray.800', 'white');
  const textSecondary = useColorModeValue('gray.500', 'gray.400');
  const bg = useColorModeValue(
    'rgba(255,255,255,0.9)',
    'rgba(15,23,42,0.8)',
  );

  const status = pr.status.toLowerCase();

const statusColor =
  status === 'merged'
    ? 'green'
    : status === 'open'
    ? 'purple'
    : status === 'rejected'
    ? 'red'
    : 'gray';


  return (
    <Card
      bg={bg}
      mb="16px"
      p="16px"
      borderRadius="16px"
      backdropFilter="blur(12px)"
      transition="all 0.25s ease"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
      }}
      key={pr.prNumber}
    >
      <Flex gap="14px" align="flex-start">
        {/* ICON */}
        <Box
          p="10px"
          borderRadius="full"
          bg={useColorModeValue('gray.100', 'navy.800')}
        >
          <Icon as={FaGithub} h="20px" w="20px" color="gray.500" />
        </Box>

        {/* CONTENT */}
        <Box flex="1">
          {/* ISSUE */}
          <Link
            href={`https://github.com/opencodeiiita/${pr.issue.repoName}/issues/${pr.issue.issueNumber}`}
            isExternal
          >
            <Text
              fontWeight="700"
              fontSize="md"
              color={textPrimary}
              _hover={{ textDecoration: 'underline' }}
            >
              Issue #{pr.issue.issueNumber}
            </Text>
          </Link>

          {/* PR + REPO */}
          <Flex
            mt="4px"
            gap="6px"
            wrap="wrap"
            align="center"
            fontSize="sm"
            color={textSecondary}
          >
            <Icon as={FaCodeBranch} />

            <Link
              href={`https://github.com/opencodeiiita/${pr.issue.repoName}/pull/${pr.prNumber}`}
              isExternal
              fontWeight="600"
              _hover={{ textDecoration: 'underline' }}
            >
              PR #{pr.prNumber}
            </Link>

            <Text>•</Text>

            <Link
              href={`https://github.com/opencodeiiita/${pr.issue.repoName}`}
              isExternal
              fontWeight="600"
              _hover={{ textDecoration: 'underline' }}
            >
              {pr.issue.repoName}
            </Link>
          </Flex>

          {/* STATUS */}
          <Flex mt="8px" align="center" gap="8px">
            <Text fontSize="sm" color={textSecondary}>
              Status
            </Text>
            <Badge
              colorScheme={statusColor}
              px="10px"
              py="2px"
              borderRadius="full"
              fontWeight="800"
              textTransform="capitalize"
            >
              {pr.status}
            </Badge>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
}

