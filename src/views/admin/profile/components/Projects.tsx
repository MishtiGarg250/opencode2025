import {
  Text,
  useColorModeValue,
  Stack,
  Box,
  Icon,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import Project from 'views/admin/profile/components/Project';
import { PullRequest } from 'app/user/profile/page';
import { FaInbox } from 'react-icons/fa';

export default function Projects(props: { PRs: PullRequest[] }) {
  const textPrimary = useColorModeValue('gray.800', 'white');
  const textSecondary = useColorModeValue('gray.500', 'gray.400');
  const cardBg = useColorModeValue('white', 'gray.800');
  const mutedBg = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Card
      mb={{ base: '0px', '2xl': '20px' }}
      p="20px"
      borderRadius="20px"
      bg={cardBg}
    
      borderColor={borderColor}
    >
      {/* Header */}
      <Box mb="28px">
        <Text
          color={textPrimary}
          fontWeight="800"
          fontSize="2xl"
          mb="4px"
        >
          Recent Contributions
        </Text>
        <Text color={textSecondary} fontSize="md">
          Pull requests created by this user
        </Text>
      </Box>

      {/* Content */}
      {props.PRs.length ? (
        <Stack spacing="14px">
          {props.PRs.map((pr) => (
            <Project
              key={`${pr.issue.repoName}-${pr.prNumber}`}
              pr={pr}
            />
          ))}
        </Stack>
      ) : (
        <Box
          p="40px"
        
          borderRadius="16px"
          textAlign="center"
          border="1px dashed"
          borderColor={borderColor}
        >
          <Icon
            as={FaInbox}
            boxSize="32px"
            color={textSecondary}
            mb="12px"
          />
          <Text fontSize="lg" fontWeight="700" color={textPrimary}>
            No contributions yet
          </Text>
          <Text fontSize="sm" color={textSecondary} mt="4px">
            This user hasn’t opened any pull requests.
          </Text>
        </Box>
      )}
    </Card>
  );
}

