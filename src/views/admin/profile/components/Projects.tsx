// Chakra imports
import { Text, useColorModeValue } from '@chakra-ui/react';
// Assets
import Card from 'components/card/Card';
import Project from 'views/admin/profile/components/Project';
import { PullRequest } from 'app/user/profile/page';

export default function Projects(props: { PRs: PullRequest[] }) {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';

  return (
    <Card mb={{ base: '0px', '2xl': '20px' }} bg="transparent" >
      <Text
        color={textColorPrimary}
        fontWeight="bold"
        fontSize="2xl"
        mt="10px"
        mb="4px"
      >
        Recent Contributions
      </Text>
      <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
        Here you can find more details about your prs.
      </Text>

      {props.PRs.length ? (
        props.PRs.map((pr) => (
          <Project
            key={pr.title}
            ranking={pr.prNumber}
            repoName={pr.issue.repoName}
            title={String(pr.issue.issueNumber)}
            status={pr.status}
            pr={pr}
          />
        ))
      ) : (
        <div className="flex justify-start items-center text-xl text-red-400">
          This User has made 0 PRs.
        </div>
      )}
    </Card>
  );
}
