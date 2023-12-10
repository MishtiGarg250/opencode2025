// Chakra imports
import { Text, useColorModeValue } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
// Assets
import Project1 from 'img/profile/Project1.png';
import Project2 from 'img/profile/Project2.png';
import Project3 from 'img/profile/Project3.png';
// Custom components
import Card from 'components/card/Card';
import Project from 'views/admin/profile/components/Project';
import axios from 'axios';
import { min } from '@floating-ui/utils';
import { RingLoader } from 'react-spinners';
import { getPRDetails } from 'app/api/profile/profile';
import { useQuery } from '@tanstack/react-query';
export default function Projects(props: { name: string; [x: string]: any }) {

  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset',
  );
  const { name, ...rest } = props;
  // Chakra Color Mode
  const [TempData, setTempData] = useState(null);
  const [PRs, setPRs] = useState([]);

  const profName = name;

  const { data: PrDetails, isLoading } = useQuery({
    queryKey: ['PrDetails'],
    queryFn: () => getPRDetails(profName),
  });

  useEffect(() => {
    if (PrDetails) {
      setPRs(PrDetails);
    }
  }, [PrDetails]);

  console.log(PRs);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#36d7b7" />
      </div>
    );
  }


  return (
    <Card mb={{ base: '0px', '2xl': '20px' }} {...rest}>
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

      {PRs.length ? (
        PRs.map((pr, index) => (
          <Project
            key={index}
            boxShadow={cardShadow}
            mb="20px"
            image={Project1}
            ranking={pr.prNumber}
            language={pr.issue.repoName}
            repoName={pr.issue.repoName}
            title={pr.issue.issueNumber}
            status={pr.status}
          />
        ))
      ) : (
        <div className="flex justify-center items-center text-xl">
          {name} has made 0 PRs.
        </div>
      )}
    </Card>
  );
}
